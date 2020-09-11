#### Tabs 标签页 组件功能Api描述

----------

样式参照墨客 https://app.mockplus.cn/app/xSIVqCAMqaD/specs/oKC-cAqzR3 ( 实现第二行所示样式即可 )


##### Tabs 组件 PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| activeTabId  | 当前TabID | String | 非必填 |
| onChange | 步骤改变回调 | Function | 接受参数：activeTabId。 示例： function (activeTabId) {} |
| disabled | 不可用状态 | Boolen | 默认 false |


##### Tabs.TabContent 组件(内容容器) PROPS -

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| tabId  | tabID | String | 必填 |
| title | 标题 | String | 必填 |
| disabled | 不可用状态 | Boolen | 默认 false |


##### Examples

###### 基础用法
```javascript
    import { Tabs } from 'cc-ui';

    class App extends Component {
        constructor (props) {
            super(props);

            this.state = { };
            this.state.activeTabId = 'boboChicken';

            this.onTabChange = this.onTabChange.bind(this);
        }

        onTabChange (activeTabId) {
            this.state.activeTabId = activeTabId;
            this.setState({ activeTabId: this.state.activeTabId });
        }

        render () {
            return (
                <div>
                    <Tabs activeTabId={'boboChicken'} onChange={this.onTabChange}>
                        <Tabs.TabContent tabId={'boboChicken'} title={'钵钵鸡'}>
                            <div>钵钵鸡制作步骤... </div>
                        </Tabs.TabContent>
                        <Tabs.TabContent tabId={'fish'} title={'烤鱼'}>
                            <div>烤鱼制作步骤... </div>
                        </Tabs.TabContent>
                        <Tabs.TabContent tabId={'riceNoodle'} title={'螺狮粉'}>
                            <div>螺狮粉制作步骤... </div>
                        </Tabs.TabContent>
                    </Tabs>
                </div>
            );
        }
    }
```
