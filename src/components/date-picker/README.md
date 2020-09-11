#### DatePicker - 日期下拉选择器 组件功能Api描述

----------

##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| value  | 选中日期（ YYYY-MM-DD ） | String | - |
| onChange | 选中变化事件 | Function | function (selectedDate) {} |


##### Examples  

###### 基础用法
```javascript
    import { DatePicker } from 'cc-ui';

    ...

    class App extends Component {
        ...

        render () {
            return (
                <div>
                    <DatePicker value={this.state.selectedDate} onChange={this.onDateValueChange}></DatePicker>
                </div>
            )
        }
        ...
    }
```
