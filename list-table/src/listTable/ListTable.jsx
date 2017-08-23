import React, { PropTypes } from 'react';
import { Table, Row, Col, Input, Select, Button, Form, DatePicker, Tabs, AutoComplete } from 'antd';
import _ from 'lodash';
import deepEqual from './../common/deepEqual';
import 'antd/dist/antd.css';
// import moment from 'moment';

const FormItem = Form.Item;
const OptGroup = Select.OptGroup;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const AutoOption = AutoComplete.Option;

/**
 * 得到类型正确的值
 * @param initData
 * @param value
 * @returns {*}
 */
function getRightTypeValue(initData, value) {
  if (initData && value) {
    const typeRefObj = _.isArray(initData) && initData.length > 0 ? initData[0] : initData;
    if (_.isNumber(typeRefObj.key)) {
      return Number(value);
    } else if (_.isString(typeRefObj.key)) {
      return String(value);
    }
  }
  return null;
}

export default class ListTable extends React.Component {

  static propTypes = {
    initSearchParams: PropTypes.object,
    columns: PropTypes.array.isRequired,
    searchTerms: PropTypes.arrayOf(PropTypes.shape({
      param: PropTypes.string,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })).isRequired,
    toolTerms: PropTypes.arrayOf(PropTypes.shape({
        toolName:PropTypes.string.isRequired,
        toolFunc:PropTypes.func.isRequired
    })).isRequired,
    data: PropTypes.shape({
      dataList: PropTypes.array,
      currentPage: PropTypes.number,
      totalCount: PropTypes.number,
    }).isRequired,
    onSearch: PropTypes.func.isRequired,
    rowClassName: PropTypes.func,
    pageSizeOptions: PropTypes.array,
  };

  constructor(props) {
    super(props);
    let pageSizeOptions = ['10', '20', '30', '40'];
    if(props.pageSizeOptions) {
      pageSizeOptions = props.pageSizeOptions;
    }
    const initSearchParams = _.cloneDeep(this.props.initSearchParams);
    _.defaults(initSearchParams, {
      limit: 10,
      pageIndex: 1,
    });
    this.state = {
      params: initSearchParams,
      pagination: {
        pageSize: Number(initSearchParams.limit), // 保证从任何地方（如 url ）中取出的类型为数字
        current: Number(initSearchParams.pageIndex),
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions,
      },
    };
  }

  componentWillMount() {
    if (this.props.initSearchParams) {
      this.search();
    }
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;
    const pagination = {
      ...this.state.pagination,
      current: data.currentPage,
      total: data.totalCount,
      totalPage: data.totalPage,
      pageSize: this.state.params.limit || 10,
    };
    const params = {
      ...this.state.params,
    };
    this.setState({
      params,
      pagination,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsName = ['data', 'columns', 'searchTerms']; // 只要这些不一样，肯定刷新
    if (!deepEqual(this.props, nextProps, propsName)) {
      return true;
    }
    const searchStateName = ['pageIndex', 'sortFieldList', 'sortTypeList', 'limit'];
    if (!deepEqual(this.state.params, nextState.params, searchStateName)) {
      // 分页改变
      this.search(nextState.params);
      return false;
    }
    return false;
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.search({ ...this.state.params, pageIndex: 1 });
    }
  };

  onSearchBtnClick = () => {
    this.search({ ...this.state.params, pageIndex: 1 });
  };

  onFirstChange = (keys, v, callback) => {
    let key0Value = v;
    if (key0Value !== undefined && key0Value.indexOf('brand') === 0) {
      key0Value = key0Value.substring(5);
    }
    this.setInputValue([{
      key: keys[0],
      value: key0Value,
    }, {
      key: keys[1],
      value: undefined,
    }]);
    callback(v);
  };

  onSecondChange = (key, v, callback) => {
    this.setInputValue(key, v);
    callback(v);
  };

  onChange = (pagination, filters, sorter) => {
    const inputValue = [];
    if (!_.isEmpty(sorter)) {
      const field = sorter.field;
      const orderBy = sorter.order === 'ascend' ? 'ASC' : 'DESC';
      inputValue.push({ key: 'sortFieldList', value: field });
      inputValue.push({ key: 'sortTypeList', value: orderBy });
    }
    if (!_.isEmpty(pagination)) {
      inputValue.push({ key: 'pageIndex', value: pagination.current });
      inputValue.push({ key: 'limit', value: pagination.pageSize });
    }
    this.setInputValue(inputValue);
  };

  setInputValue = (key, value) => {
    const params = _.cloneDeep(this.state.params);
    if (_.isArray(key)) {
      key.forEach(pair => {
        params[pair.key] = pair.value;
      });
    } else {
      params[key] = value;
    }
    this.setState({
      params,
    });
  };

  getPagination = () => {
    return {
      ...this.state.pagination,
      showTotal: total => `共${total}条`,
    };
  };

  search = (params = this.state.params) => {
    this.props.onSearch(params);
  };
  onTabChange = (key) => {
    this.onTabSearchClick(key);
  };
  onTabSearchClick = (key) => {
    let filed = this.props.tabs.field;
    this.state.params[filed] = key;
    this.search({...this.state.params, pageIndex: 1});
  };
    onTabPanelChange = (key) => {
        this.onTabPanelSearchClick(key);
    };
    onTabPanelSearchClick = (key) => {
        let filed = this.props.tabPanels.field;
        this.state.params[filed] = key;
        this.search({...this.state.params, pageIndex: 1});
    };

  buildSearchContent = () => {
    const { data, columns, tabs ,tabCount, rowClassName} = this.props;
    const pagination = this.getPagination();
    if (data.loading === undefined) {
      return;
    }
    //tabs为空，则无tags展示
    if (tabs == null || tabs.length == 0 || tabCount == null) {
      return (
        <Table
          dataSource={data.dataList}
          loading={data.loading}
          columns={columns}
          pagination={pagination}
          onChange={this.onChange}
          rowClassName={rowClassName}
        />
      );
    }
    // tabs 不为空，则根据tags筛选标签
    //tabs格式：{field:"xxx","showTotal":true,defaultShow:"", tags:[{"fieldValue":"","displayValue":"全部"},{"fieldValue":"男","displayValue":"男","showTotal":true},{"fieldValue":"女","displayValue":"女"}]}
    let tags = tabs.tags;
    let reactTabPane = [];
    for (let [index,elem] of tags.entries()) {
      //全部
      let tabValue = elem.displayValue;
      if (tabs.showTotal) {
        if(data.dataList===undefined){
          tabValue += " ( " + 0 + " )";
        }else{
          tabValue += " ( " + data.dataList.length + " )";
        }
      }
      if (elem.fieldValue == "") {
        reactTabPane[index] = (<TabPane tab={tabValue} key={elem.fieldValue}>
          <Table
            dataSource={data.dataList}
            loading={data.loading}
            columns={columns}
            pagination={pagination}
            onChange={this.onChange}
            rowClassName={rowClassName}
          /></TabPane>);
        continue;
      }
      let countMap = new Map();
      for (let k of Object.keys(tabCount)) {
        countMap.set(k, tabCount[k]);
      }
      let childTabValue = elem.displayValue;
      if (tabs.showTotal) {
        childTabValue += " ( " + countMap.get(elem.fieldValue) + " )";
      }
      reactTabPane[index] = (
        <TabPane tab={childTabValue} key={elem.fieldValue}>
          <Table
            dataSource={data.dataList}
            loading={data.loading}
            columns={columns}
            pagination={pagination}
            onChange={this.onChange}
            rowClassName={rowClassName}
          />
        </TabPane>
      );
    }
    const lst = reactTabPane.map((k, idx)=> {
      return (k);
    });
    return (
      <Tabs type="card" defaultActiveKey={tabs.defaultShow} onChange={this.onTabChange}>
        {lst}
      </Tabs>
    );
  };
  buildSearchBar=() => {
      const { searchTerms, initSearchParams} = this.props;
      const params = this.state.params;

      const searchArea =searchTerms && searchTerms.map((term, key) => {
          if (term.type === 'text') {
              return (
                  <Col key={key} span={8}>
                    <div>
                      <FormItem
                          label={term.label}
                          labelCol={{ span: 4 }}
                          wrapperCol={{ span: 20 }}
                      >
                        <Input
                            placeholder={ `请输入${term.label}` } style={{ width: 200 }}
                            onChange={e => this.setInputValue(term.param, e.target.value)}
                            defaultValue={initSearchParams[term.param]}
                        />
                      </FormItem>
                    </div>
                  </Col>
              );
          } else if (term.type === 'select') {
              const initData = term.initData;
              let defaultValue = getRightTypeValue(initData, initSearchParams[term.param]);
              if (defaultValue === null) {
                  const obj = !_.isEmpty(initData) && initData.filter(d => d.default);
                  defaultValue = _.isArray(obj) && !_.isEmpty(obj) ? String(obj[0].key) : defaultValue;
              }
              const selectKey = `${term.param}-${defaultValue}`;
              const options = initData.map((v, k) => {
                  return (
                      <Option key={`option${k}`} value={String(v.key)}>{v.value}</Option>
                  );
              });
              return (
                  <Col key={key} span={8}>
                    <div>
                      <FormItem
                          label={term.label}
                          labelCol={{ span: 4 }}
                          wrapperCol={{ span: 20 }}
                      >
                        <Select
                            showSearch
                            key={selectKey}
                            style={{ width: 200 }}
                            placeholder={`可输入${term.label}选择`}
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={e => this.setInputValue(term.param, e)}
                            defaultValue={defaultValue}
                        >
                            {options}
                        </Select>
                      </FormItem>
                    </div>
                  </Col>
              );
          } else if (term.type === 'groupSelect') {
              const initData = term.initData;
              const defaultValue = getRightTypeValue(initData, initSearchParams[term.param]);
              const optGroups = initData.map((v, k) => {
                  let options = [];
                  if (v.children) {
                      options = v.children.map((cv, ck) => {
                          return (
                              <Option key={`option${ck}`} value={String(cv.key)}>{cv.value}</Option>
                          );
                      });
                  }
                  return (
                      <OptGroup key={`optgroup${k}`} label={v.value}>{options}</OptGroup>
                  );
              });
              return (
                  <Col key={key} span={8}>
                    <div>
                      <FormItem
                          label={term.label}
                          labelCol={{ span: 4 }}
                          wrapperCol={{ span: 20 }}
                      >
                        <Select
                            showSearch
                            style={{ width: 300 }}
                            placeholder={`可输入${term.label}选择`}
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={e => this.setInputValue(term.param, e)}
                            defaultValue={defaultValue}
                        >
                            {optGroups}
                        </Select>
                      </FormItem>
                    </div>
                  </Col>
              );
          } else if (term.type === 'cascaderSelect') {
              const initData = term.initData;
              // 处理第一级select
              const firstSelect = initData.firstSelect;
              const firstLabel = firstSelect.label;
              const firstInitData = firstSelect.initData;
              const firstOnChange = firstSelect.onChange;
              let firstDefault = getRightTypeValue(firstInitData.data, initSearchParams[`${term.param}_first`]);
              if (firstDefault === null) {
                  const obj = !_.isEmpty(firstInitData.data) && firstInitData.data.filter(d => d.default);
                  firstDefault = _.isArray(obj) && !_.isEmpty(obj) ? String(obj[0].key) : firstDefault;
              }
              if (firstDefault && !this.state.firstInited) {
                  firstOnChange(firstDefault);
                  this.state.firstInited = true;
              }
              const firstSelectKey = `${term.param}-first-${firstDefault}`;
              const fuuid = firstInitData.uuid;
              const firstOptions = firstInitData.data.map((v, k) => {
                  return (
                      <Option key={`firstOption${fuuid + k}`} value={String(v.key)}>{v.value}</Option>
                  );
              });
              // 处理第二级select
              const secondSelect = initData.secondSelect;
              const secondLabel = secondSelect.label;
              const secondInitData = secondSelect.initData;
              const secondOnChange = secondSelect.onChange;
              const secondSelectKey = `${term.param}-${firstDefault}`;
              const suuid = secondInitData.uuid;
              let secondValue;
              let secondOptions = [];
              if (secondInitData.data.length > 0) {
                  secondValue = getRightTypeValue(secondInitData.data, params[term.initData.secondSelect.param]);
                  secondOptions = secondInitData.data.map((v, k) => {
                      return (
                          <Option key={`secondOption${suuid + k}`} value={String(v.key)}>{v.value}</Option>
                      );
                  });
              }

              return (
                  <Col key={key} span={16}>
                    <div>
                      <FormItem
                          label={term.label}
                          labelCol={{ span: 2 }}
                          wrapperCol={{ span: 20 }}
                      >
                        <Select
                            showSearch
                            key={firstSelectKey}
                            style={{ width: 300 }}
                            placeholder={`可输入${firstLabel}选择`}
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={e => this.onFirstChange([term.initData.firstSelect.param, term.initData.secondSelect.param], e, firstOnChange)}
                            defaultValue={firstDefault}
                        >
                            {firstOptions}
                        </Select>
                        &nbsp;
                        <Select
                            showSearch
                            key={secondSelectKey}
                            style={{ width: 300 }}
                            placeholder={`可输入${secondLabel}选择`}
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={e => this.onSecondChange(term.initData.secondSelect.param, e, secondOnChange)}
                            value={secondValue}
                        >
                            {secondOptions}
                        </Select>
                      </FormItem>
                    </div>
                  </Col>
              );
          }else if (term.type === 'dateAndTimePicker') {
              //const defaultValue = [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')];
              let disabledDate = term.disabledDate;
              if(typeof disabledDate == "undefined"){
                  disabledDate = (current)=>{
                      return current && current.valueOf() > Date.now();
                  }
              }
              let disabledTime = term.disabledTime;
              if(typeof disabledTime == "undefined"){
                  //console.log("sdf");
              }
              return (
                  <Col key={key} span={6} >
                    <div>
                      <FormItem
                          label={term.label}
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 8 }}
                      >
                        <RangePicker style={{ width: 300 }}
                                     showTime={true}
                                     format="YYYY-MM-DD HH:mm:ss"
                                     disabledDate = {disabledDate}
                                     disabledTime = {disabledTime}
                                     onChange={(e) => this.setInputValue(term.param, e)}
                        />
                      </FormItem>
                    </div>
                  </Col>
              )
          }else if (term.type === 'searchInput') {
              const children = term.dataSource.map((item) => {
                  return <AutoOption key={item.id} value={item.id+''}>{item.value}</AutoOption>;
              });
              return (
                  <Col key={key} span={6}>
                    <div>
                      <FormItem
                          label={term.label}
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 8 }}
                      >
                        <AutoComplete
                            style={{ width: 200 }}
                            onSelect={(v) =>this.setInputValue(term.param, v)}
                            onSearch={ term.handleSearch }
                            placeholder={ `请输入${term.label}` }
                        >
                            {children}
                        </AutoComplete>
                      </FormItem>
                    </div>
                  </Col>
              );
          }
          return null;
      });
      return (searchArea &&
          <div>
            <Row>
                { searchArea }
            </Row>
            <Row>
              <Col span={12} offset={12} style={{ textAlign: 'right', marginBottom: 8 }}>
                <Button type="primary" icon="search" size="large" onClick={this.onSearchBtnClick}>搜索</Button>
              </Col>
            </Row>
          </div>
      );
  };
  buildToolContent=() => {
    const {toolTerms} =this.props;
    const toolArea=toolTerms && toolTerms.map((term,key)=>{
        return (
            <Button type="primary" onClick={term.toolFunc} style={{marginBottom:8,marginRight:8}}>{ term.toolName }</Button>
        );
    });

    return (
        <div>
          <Row>
              {toolArea}
          </Row>
        </div>
    );
  };
  buildTabPanels=() => {
      const { data, columns, tabPanels ,tabPanelCount, tabPanelContent ,rowClassName} = this.props;
      if (data.loading === undefined) {
          return;
      }
      const showContent = this.buildSearchContent();
      const showSearchArea=this.buildSearchBar();
      const toolContent=this.buildToolContent();

      //tabs为空，则无tags展示
      if (tabPanels == null || tabPanels.length == 0 || tabPanelCount == null) {
          return (
              <div>
                <Row type="flex" justify="start" gutter={16} onKeyDown={this.onKeyDown}>
                    { showSearchArea }
                </Row>
                <Row>
                    { toolContent }
                </Row>
                <Row>
                    { showContent }
                </Row>
              </div>
          );
      }
      // tabs 不为空，则根据tags筛选标签
      //tabs格式：{field:"xxx","showTotal":true,defaultShow:"", tags:[{"fieldValue":"","displayValue":"全部"},{"fieldValue":"男","displayValue":"男","showTotal":true},{"fieldValue":"女","displayValue":"女"}]}
      let tags = tabPanels.tags;
      let reactTabPane = [];
      for (let [index,elem] of tags.entries()) {
          //全部
          let tabValue = elem.displayValue;
          /*if (tabPanels.showTotal) {
              if(data.dataList===undefined){
                  tabValue += " ( " + 0 + " )";
              }else{
                  tabValue += " ( " + data.dataList.length + " )";
              }
          }*/
          if (elem.fieldValue == "") {
              reactTabPane[index] = (<TabPane tab={tabValue} key={elem.fieldValue}>
                <div>
                  <Row>
                    {tabPanelContent}
                  </Row>
                  <Row type="flex" justify="start" gutter={16} onKeyDown={this.onKeyDown}>
                      { showSearchArea }
                  </Row>
                  <Row>
                      { toolContent }
                  </Row>
                  <Row>
                      { showContent }
                  </Row>
                </div></TabPane>);
              continue;
          }
          let countMap = new Map();
          for (let k of Object.keys(tabPanelCount)) {
              countMap.set(k, tabPanelCount[k]);
          }
          let childTabValue = elem.displayValue;
          /*if (tabPanels.showTotal) {
              childTabValue += " ( " + countMap.get(elem.fieldValue) + " )";
          }*/
          reactTabPane[index] = (
              <TabPane tab={childTabValue} key={elem.fieldValue}>
                <div>
                  <Row>
                      {tabPanelContent}
                  </Row>
                  <Row type="flex" justify="start" gutter={16} onKeyDown={this.onKeyDown}>
                      { showSearchArea }
                  </Row>
                  <Row>
                      { toolContent }
                  </Row>
                  <Row>
                      { showContent }
                  </Row>
                </div>
              </TabPane>
          );
      }
      const lst = reactTabPane.map((k, idx)=> {
          return (k);
      });
      return (
          <Tabs type="card" defaultActiveKey={tabPanels.defaultShow} onChange={this.onTabPanelChange}>
              {lst}
          </Tabs>
      );
  };

  render() {
    const tabContent=this.buildTabPanels();
    return (
      <div>
          {tabContent}
      </div>
    );
  }
}
