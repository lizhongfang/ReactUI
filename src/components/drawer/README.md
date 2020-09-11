#### Drawer 抽屉容器 组件功能Api描述

----------

样式参照墨客 https://app.mockplus.cn/app/xSIVqCAMqaD/specs/4GVf7caL2N


##### Tabs 组件 PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| toggle  | 开关状态 | Boolen | 非必填 |
| onClosed | 关闭回调 | Function | function () {} |
| clickOutsideHide | 点击外面区域关闭抽屉 | Boolen | 默认 false |
| parentAsContainer | 组件结构父节点作为抽屉父容器 | Boolen | 默认 false |

##### Examples  

###### 基础用法
```javascript
    import { Drawer } from 'cc-ui';

    class App extends Component {
        constructor (props) {
            super(props);

            this.state = { };
            this.state.drawerToggle = false;

            // this.onTabChange = this.onTabChange.bind(this);
            this.openDrawer = this.openDrawer.bind(this);
            this.onDrawerClosed = this.onDrawerClosed.bind(this);
        }

        onDrawerClosed () {
            this.state.drawerToggle = false;
            this.setState({ drawerToggle: this.state.drawerToggle });
        }

        openDrawer () {
            this.state.drawerToggle = true;
            this.setState({ drawerToggle: this.state.drawerToggle });
        }

        render () {
            return (
                <div>
                    <span onClick={this.openDrawer}>Click To Open Drawer</span>

                    <Drawer toggle={this.state.drawerToggle} clickOutsideHide={false} onClosed={this.onDrawerClosed} parentAsContainer={true}>
                        <div> 抽屉容器内元素 </div>
                    </Drawer>
                </div>
            );
        }
    }
```
