#### Pagination 分页 组件功能Api描述

----------

样式参照墨客 https://app.mockplus.cn/app/xSIVqCAMqaD/specs/h-gPz3a0p9v


##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| total | 总条目数 | Number | 必填 |
| pageSize  | 每页条目书 | Number | 必填 |
| pageIndex | 当前页码 | Number | 非必填, 最小值“1” |
| onChange | 分页改变回调 | Function | 接受两个参数， 分别是 pageIndex, pageSize。 示例： function (pageIndex, pageSize) {} |
| disabled | 不可用状态 | Boolen | 默认 false |


##### Examples  

###### 基础用法
```javascript
    import { Pagination } from 'cc-ui';

    class App extends Component {
        constructor (props) {
            super(props);

            this.state = {
                total: null,
                pageSize: 10,
                pageIndex: 1
            };
            this.state.list = null;

            this.onPageChange = this.onPageChange.bind(this);
        }

        componentDidMount () {
            this.updatePageData();
        }

        fetchPagedData () {
            this.$http.get('url', { pageIndex: this.state.pageIndex, pageSize: this.state.pageSize }).then(response => {
                var { data: { status, data } } = response;
                return data;
            });
        }

        updatePageData () {
            return this.fetchPagedData().then(response => {
                var { data: { status, data } } = response;

                this.state.list = data.list;
                this.state.total = data.total;
                this.state.pageIndex = data.pageIndex || this.state.pageIndex || 1;

                this.setState(this.state);
            });
        }

        onPageChange (pageIndex, pageSize) {
            this.state.pageIndex = pageIndex;
            this.state.pageSize = pageSize;
            this.updatePageData();
        }

        render () {
            return (
                <div>
                    <div className="list-container">
                        { this.state.list && this.state.list.map((data, idx) => (
                            <div key={idx}>{data}</div>
                        )) }
                    </div>

                    { this.state.total &&
                        <Pagination
                            total={this.state.total}
                            pageSize={this.state.pageSize}
                            pageIndex={this.state.pageIndex}
                            onChange={this.state.onPageChange}
                        >
                        </Pagination>
                    }
                </div>
            )
        }
    }
```
