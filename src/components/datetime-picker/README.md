#### DateTimePicker 时间下拉滚动选择 组件功能Api描述

----------

##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| value  | 选中日期时间（ YYYY-MM-DD HH:mm:ss ） | String | - |
| onChange | 选中变化事件 | Function | function (selectedDateTime) {} |


##### Examples  

###### 基础用法
```javascript
    import { DateTimePicker } from 'cc-ui';

    ...

    class App extends Component {
        ...

        render () {
            return (
                <div>
                    <DateTimePicker value={this.state.selectedDateTime}></DateTimePicker>
                </div>
            )
        }
        ...
    }
```
