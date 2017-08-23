# 带搜索头的表格

| 参数| 说明              | 类型          | 默认值      |
| --------   | -----  | :--------  | ----------------|
| initSearchParams     |初始化搜索条件|   object     | - |
| columns   |   表格列的配置描述，具体项见[antd][1]   |   array   |-|
| searchTerms  | param：搜索用的字段；<br>label:显示的字段;<br>type:组建的类型(text,select,cascaderSelect, dateAndTimePicker,searchInput)|  PropTypes.arrayOf(PropTypes.shape({<br>&nbsp;&nbsp;&nbsp;&nbsp;param: PropTypes.string,<br>&nbsp;&nbsp;&nbsp;&nbsp;label: PropTypes.string.isRequired,<br>&nbsp;&nbsp;&nbsp;&nbsp;type: PropTypes.string.isRequired,<br>})).isRequired,  | |
| onSearch |页码改变的回调，参数是改变后的页码及每页条数|  Function(page, pageSize)  | -|
|data|dataList:antd中的[dataSource][2]数据数组;<br>currentPage:当前页码;<br>totalCount:数据总数|PropTypes.shape({<br>&nbsp;&nbsp;&nbsp;&nbsp;dataList: PropTypes.array,<br>&nbsp;&nbsp;&nbsp;&nbsp;currentPage: PropTypes.number,<br>&nbsp;&nbsp;&nbsp;&nbsp;totalCount: PropTypes.number,<br>}).isRequired|-|
|rowClassName|表格行的类名|Function(record, index):string|-|
|pageSizeOptions|指定每页可以显示多少条|string[]|['10', '20', '30', '40']|
|tabs|需要多张表切换时可选，切换头信息|{<br>field:"sex"（切换查询字段）,<br>showTotal:true,（是否显示总数）<br>defaultShow:"",（默认现实的表）<br>tags:[<br>&nbsp;&nbsp;&nbsp;&nbsp;{fieldValue:"",displayValue:"全部",},<br>&nbsp;&nbsp;&nbsp;&nbsp;{fieldValue:"1",displayValue:"男"}<br>]}|-|
|tabCount|切换头部总数|{<br>0（对应tabs的fieldValue字段值）: 2, <br>1: 1,<br> 2: 54<br>}|-|

  [1]: https://ant.design/components/table-cn/#Column
  [2]: https://ant.design/components/table-cn/#Table