#### Steps 步骤 组件功能Api描述

----------

样式参照墨客 https://app.mockplus.cn/app/xSIVqCAMqaD/specs/gy8wypcwMF


##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| dataList | 步骤数据列表 | Array | 必填 [{ // 数据源
        id: 'id', // 步骤ID （选填， 默认 index）
        name: 'name', // 步骤名字（选填， 默认 第{{NUM}步}）
    }] |
| currentId  | 当前步骤ID | String | 非必填 |
| onChange | 步骤改变回调 | Function | 接受参数：currentId。 示例： function (currentId) {} |
| disabled | 不可用状态 | Boolen | 默认 false |


##### Examples  

###### 基础用法
```javascript
    import { Steps } from 'cc-ui';

    class App extends Component {
        constructor (props) {
            super(props);

            this.state = { };
            this.state.stepDataList = [
                { id: 'step1', name: '吃钵钵鸡' },
                { id: 'step2', name: '吃烤鱼' },
                { id: 'step3', name: '吃螺狮粉' },
            ];
            this.state.currentStepId = 'step1';

            this.onStepChange = this.onStepChange.bind(this);
        }

        onStepChange (currentStepId) {
            this.state.currentStepId = currentStepId;
            this.setState({ currentStepId: this.state.currentStepId });
        }

        render () {
            return (
                <div>
                    <Steps
                        dataList={this.state.stepDataList}
                        currentId={this.state.currentStepId}
                        onChange={this.onStepChange}>
                    </Steps>

                    { this.state.currentStepId == 'step1' &&
                    <div>
                        这是 Step1 的内容
                    </div> }
                    { this.state.currentStepId == 'step2' &&
                    <div>
                        这是 Step2 的内容
                    </div> }
                    { this.state.currentStepId == 'step3' &&
                    <div>
                        这是 Step3 的内容
                    </div> }
                </div>
            )
        }
    }
```
