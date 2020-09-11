#### Select 下拉选择 组件功能Api描述

-----------

Select 组件构建可选列表提供两种方式
1. dataList 数据源 模式
2. Option 子组件 模式 

备注：
平铺列表模式的组件理论上都应该提供这两种创建模式，
第一种符合 angular 等数据驱动动态模版的api惯例， 且 对接业务数据时比较方便。 比如 获取API接口返回列表数据后， 稍加整理， 注入 组件 dataSource 相关属性， 即可完成创建。
但相对来说也存在缺点， 即 列表组件对其中各个子组件的管控无法深入， 不方便进行定制化的元素开发。
第二种符合 react 万物组件化的思路， 列表作为组件容器， 父组件接受到数据源之后， 遍历数据列表针对每个元素独立渲染。 缺点在于需要在于容器组件不仅需要创建List组件， List内部的元素组件也需要通过遍历生成。 有点就在于每一个元素组件都在外部可见，样式，行为都可以独立定制， 不依赖List容器。


##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
| value | 选中值 | String | 非必填 |
| dataList  | 可选范围数据列表 | Array | 非必填 （ 拥有较高优先级 ） |
| onChange | 改变回调 | Function | 接受参数 value: 当前选中值。 示例： function (value) {} |
| disabled | 不可用状态 | Boolen | 默认 false |



##### 示例：

###### dataList 数据源 模式
```javascript
class DemoComponent extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.selectDataList = [
            {
                value: 'boboChicken',
                label: '钵钵鸡'
            },
            {
                value: 'fish',
                label: '烤鱼'
            }
        ];
        this.state.selectValue = 'boboChicken';
    }

    render () {
        return (
            <div>
                <Select value={this.state.selectValue} dataList={this.state.selectDataList}></Select>
            </div>
        );
    }
}
```

###### Option 子组件 模式
```javascript
class DemoComponent extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.selectDataList = [
            {
                value: 'boboChicken',
                label: '钵钵鸡'
            },
            {
                value: 'fish',
                label: '烤鱼'
            }
        ];
        this.state.selectValue = 'boboChicken';
    }

    render () {
        return (
            <div>
                <Select value={this.state.selectValue}>
                {
                    this.state.selectDataList && this.state.selectDataList.map(data => (
                        <Select.Option value={data.value}>{data.label}</Select.Option>
                    ))
                }
                </Select>
            </div>
        );
    }
}
```
