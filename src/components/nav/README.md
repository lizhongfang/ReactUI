构思两种用法：
1.
```javascript
var data = [
    {
        id: 'Module1',
        name: '模块1',
        dataChildren: [
            {
                id: 'Module1.1',
                name: '模块1.1',
                path: '/module1/module1.1',
                parentId: 'Module1'
            },
            {
                id: 'Module1.2',
                name: '模块1.2',
                path: '/module1/module1.2',
                parentId: 'Module1'
            },
        ]
    },
    {
        id: 'Module2',
        name: '模块2',
        dataChildren: [
            {
                id: 'Module2.1',
                name: '模块2.1',
                path: '/module2/module2.1',
                parentId: 'Module2'
            },
            {
                id: 'Module2.2',
                name: '模块2.2',
                path: '/module2/module2.2',
                parentId: 'Module2'
            }
        ]
    }
];
<Nav dataChildren={data} ...>
</Nav>
```

2.
```javascript
<Nav>
    <Nav.Item enableCollapse={true}>
        模块1
        <Nav.SubNav>
            <Nav.Item navHref={"/module1/module1.1"}>模块1.1</NavItem>
            <Nav.Item navHref={"/module1/module1.2"}>模块1.2</NavItem>
        </Nav.SubNav>
    </Nav.Item>
    <Nav.Item enableCollapse={true}>
        模块2
        <Nav.SubNav>
            <Nav.Item navHref={"/module2/module2.1"}>模块2.1</NavItem>
            <Nav.Item navHref={"/module2/module2.2"}>模块2.2</NavItem>
        </Nav.SubNav>
    </Nav.Item>
</Nav>
```

###### 第一个：
组件结构在 传入数据中描述，  
优点， 构造另一个 nav 结构时 ，只需要改动传入的 data 属性 就可以了  
缺点， 每个nav 元素组件不能独立定制

###### 第二个：
组件结构在 组件构造DOM 中描述  
优点， 可以独立定制任何维度 任何一个 Item  
缺点， 构造另一个 相似 nav 的时候 需要重写 Dom 结构


出于某些原因 ( OOPLOVER ) 两种Api都会支持 以下为基础Props结构

###### Type1:
Nav 组件支持以下 Props ( 其中， dataChildren不为Null或undefined 标识该Nav组件使用Type1模式 )
```javascript
{
    dataChildren: [ // 如最开头 data 变量, 标识 nav 组件数据源
        {
            id: 'Module1', // ID
            name: '模块1', // 显示文本
            href: '', // 目标链接 ( 非必填 )
            dataChildren: [
                {
                    id: 'Module1.1',
                    name: '模块1.1',
                    path: '/module1/module1.1',
                    parentId: 'Module1'
                },
                {
                    id: 'Module1.2',
                    name: '模块1.2',
                    path: '/module1/module1.2',
                    parentId: 'Module1'
                },
            ]
        },
    ],
    activeId: 'Module1.2', // Active Nav 元素ID
    onItemClick: function ({ id: 'Module1.1', name... }) { }, // 点击节点事件

    //  以下暂不提供
    isMulti: false,
    selectedIds: [],
    onClick: function (id, dataChildren) { }, // 点击事件
    onChange: function (activeId, dataChildren) {  }, // 触发变化事件
}
```

###### Type2:
Nav 组件 Props
```javascript
{
    activeId: 'Module1.2', // Active Nav 元素ID    
    onItemClick: function ({ id: 'Module1.1', name... }) { }, // 点击节点事件

    //  以下暂不提供
    isMulti: false,
    selectedIds: [],
    onClick: function (id, dataChildren) { }, // 点击事件
    onChange: function (activeId, dataChildren) {  }, // 触发变化事件
}
```
Item 组件Props如下
```javascript
{
    id: 'Module1', // ID
    name: '模块1', // 显示文本
    href: '', // 目标链接 ( 非必填 )
    isActive: true, // 组件是否Active
    isExpand: true, // 组件是否展开
    onChange: function () { } // 触发变化事件
    onClick: function (id) { } // 点击事件
}
```
