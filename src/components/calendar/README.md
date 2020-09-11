#### Calendar 日历 组件功能Api描述

----------

##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| value  | 选中日期（ YYYY-MM-DD ） | String | - |
| selectMode  | 视图模式（天/月/年） | String | 'day': 天选择视图, 'month': 月选择视图, 'year': 年选择视图 |
| onChange | 选中变化事件 | Function | function (selectedDate) {} |
| withTodayBtn | 底部是否需要跳转“今天”按钮 | Boolen | 默认 false |


##### Examples  

###### 基础用法
```javascript
    import { Calendar } from 'cc-ui';

    ...

    class App extends Component {
        ...

        render () {
            return (
                <div>
                    <Calendar value={this.state.selectedDate}></Calendar>
                </div>
            )
        }
        ...
    }
```
