#### TimePicker 时间下拉滚动选择 组件功能Api描述

----------

##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| value  | 选中时间（ HH:mm:ss ） | String | - |
| onChange | 选中变化事件 | Function | function (selectedTime) {} |


##### Examples  

###### 基础用法
```javascript
    import { TimePicker } from 'cc-ui';

    ...

    class App extends Component {
        ...

        render () {
            return (
                <div>
                    <TimePicker value={this.state.selectedTime}></TimePicker>
                </div>
            )
        }
        ...
    }
```
