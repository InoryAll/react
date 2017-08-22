import React, { PropTypes } from 'react';
import { Table, Row, Col, Input, Select, Button, Form, DatePicker, Tabs, AutoComplete } from 'antd';
import _ from 'lodash';
import deepEqual from './common/deepEqual';
// import moment from 'moment';

const FormItem = Form.Item;
const OptGroup = Select.OptGroup;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const AutoOption = AutoComplete.Option;

export default class ListTable extends React.Component {

  static propTypes = {
    initSearchParams: PropTypes.object,
    columns: PropTypes.array.isRequired,
    data: PropTypes.shape({
      dataList: PropTypes.array,
      currentPage: PropTypes.number,
      totalCount: PropTypes.number,
    }).isRequired,
    rowClassName: PropTypes.func,
    pageSizeOptions: PropTypes.array,
    onSearch:PropTypes.func.isRequired
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
        const propsName = ['data', 'columns']; // 只要这些不一样，肯定刷新
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
    console.log(key);
  };
  onTabSearchClick = (key) => {
    let filed = this.props.tabs.field;
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

  render() {
    const {initSearchParams} = this.props;
    const params = this.state.params;

    const showContent = this.buildSearchContent();
    return (
      <div>
        { showContent }
      </div>
    );
  }
}
