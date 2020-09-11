import React, { Component } from 'react';

const NavSwitcher = function (props) {
    let dataChildren = props.dataChildren;
    var childrenFromProps = dataChildren !== null && dataChildren !== undefined;

    return childrenFromProps ?
        <DTNav {...props}></DTNav> : // 属性数据驱动
        <CPNav {...props}></CPNav>; // 组件实例结构驱动
}

// Nav类 - 属性数据驱动
class DTNav extends Component {
    constructor (props) {
        super (props);

        this.state = {
            activeId: props.activeId
        };
        this.children = null;
        this.state.children = this.props.dataChildren;
    }

    generateChildrenEles (children) {
        var childArr = this.state.children || [];
        return generateChildrenEles(childArr, {
            onNavItemClick: this.props.onItemClick
        });
    }

    render () {
        this.children = this.generateChildrenEles();

        return (
            <div className="cc-nav">
                { this.children }
            </div>
        );
    }
}

const filterVaildChildrenEles = function (children, isItem, otherProps) {
    var childrenEles = children || [];
    !Array.isArray(childrenEles) && (childrenEles = [childrenEles]);

    var vaildChildrenEles = !isItem ?
        childrenEles.filter(childEle => childEle.type && (childEle.type == ItemSwitcher)) :
        childrenEles.filter(childEle => childEle.type && (childEle.type == SubNav));

    vaildChildrenEles = !isItem ? vaildChildrenEles : ( vaildChildrenEles.length > 0 ? [vaildChildrenEles[0]] : []);
    if (otherProps) {
        var newVaildChildrenEles = vaildChildrenEles.map((el, idx) => React.cloneElement(el, Object.assign({ key: el.key || (el.props && el.props.id) || idx }, otherProps)));
        return newVaildChildrenEles;
    }
    return vaildChildrenEles;
}

const generateChildrenEles = function (children, otherProps) {
    var childArr = children || [];
    return childArr.map((childData, idx) => <ItemSwitcher
        key={idx} name={childData.name}
        isActive={childData.isActive}
        dataChildren={childData.dataChildren || childData.children}
        {...otherProps}
    ></ItemSwitcher>);
}

// Nav类 - 组件实例结构驱动
const CPNav = function (props) {
    var children = filterVaildChildrenEles(props.children, false, {
        onNavItemClick: props.onItemClick,
        activeId: props.activeId
    });

    return (
        <div className="cc-nav">
            { children }
        </div>
    );
}

const ItemSwitcher = function (props) {
    let dataChildren = props.dataChildren;
    var childrenFromProps = dataChildren !== null && dataChildren !== undefined;

    return childrenFromProps ?
        <DTItem {...props}></DTItem> : // 属性数据驱动
        <CPItem {...props}></CPItem>; // 组件实例结构驱动
}

export class DTItem extends Component {
    constructor (props) {
        super (props);

        this.state = {
            name: this.props.name,
            isActive: this.props.isActive,
            children: this.props.dataChildren
        };
        this.children = null;
    }

    render () {
        this.children = generateChildrenEles(this.state.children, {
            onNavItemClick: this.props.onNavItemClick
        });

        return (
            <div className="cc-nav-item">
                <div className={'cc-nav-item-content' + (this.state.isActive ? ' active' : '')}>
                    <div className="cc-nav-item-title">{this.state.name}</div>
                </div>
                <SubNav>
                    {this.children}
                </SubNav>
            </div>
        );
    }
}

const CPItem = function (props) {
    var children = filterVaildChildrenEles(props.children, true, { onNavItemClick: props.onNavItemClick, activeId: props.activeId });

    var clickFunc = function () {
        if (!props.disabled) {
            props.onItemClick && typeof props.onItemClick == 'function' && props.onItemClick();
            props.onNavItemClick && typeof props.onNavItemClick == 'function' && props.onNavItemClick(props);

            var hrefTarget = props.path || props.href;

            // hrefTarget && (window.location = hrefTarget);
            // hrefTarget && (window.history.go(hrefTarget))
            hrefTarget && (window.history.pushState(null, null, hrefTarget));
        }
    };

    var isActive = props.isActive || (props.activeId && props.activeId == props.id);

    return (
        <div className="cc-nav-item">
            <div className={'cc-nav-item-content' + (isActive ? ' active' : '') + (props.disabled ? ' disabled' : '')} onClick={clickFunc}>
                <div className="cc-nav-item-title">{props.name}</div>
            </div>
            {children}
        </div>
    );
}

NavSwitcher.Item = ItemSwitcher;

const SubNav = function (props) {
    var children = filterVaildChildrenEles(props.children, false, { onNavItemClick: props.onNavItemClick, activeId: props.activeId });

    return (
        <div className="cc-sub-nav-container">
            {children}
        </div>
    );
}

NavSwitcher.SubNav = SubNav;

const Nav = NavSwitcher;
export default Nav;
