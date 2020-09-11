import React from 'react';
import storageDB from './localStorageDB';

// 动态 className 生成器
export const classes = function (ClassObj) {
    return Object.keys(ClassObj).filter(cn => ClassObj[cn]).join(' ');
}


export const getAbsolutePos = function (domEle) {
    var posTop = 0, posLeft = 0;
    while (domEle) {
        posTop = posTop + domEle.offsetTop;
        posLeft = posLeft + domEle.offsetLeft;
        domEle = domEle.offsetParent;
    }
    return { top: posTop, left: posLeft };
};

export const extendNestedChildren = function (children, matchCallback, extendCallback) {
    function dealWithChildEle (childEle, idx) {
        if (matchCallback(childEle)) {
            return extendCallback(childEle, idx);
        } else {
            if (childEle.props && childEle.props.children) {
                return React.cloneElement(childEle, { children: extendNestedChildren(childEle.props.children, matchCallback, extendCallback), key: childEle.props.key || idx })
            }
            return childEle;
        }
        return childEle;
    }

    if (children) {
        if (Array.isArray(children)) {
            return children.map((childEle, idx) => {
                return dealWithChildEle(childEle, idx);
            });
        } else {
            let childEle = children;
            return dealWithChildEle(childEle, (childEle.props && childEle.props.key) || Math.random());
        }
    }
    return children;
}

export const cloneExtendNestedChildren = function (children, matchCallback, extendPropsCallback) {
    function dealWithChildEle (childEle, idx) {
        if (matchCallback(childEle)) {
            var newProps = extendPropsCallback(childEle, idx);
            return React.cloneElement(childEle, Object.assign({ key: idx }, childEle.props, newProps));
        } else {
            if (childEle.props && childEle.props.children) {
                return React.cloneElement(childEle, { children: cloneExtendNestedChildren(childEle.props.children, matchCallback, extendPropsCallback), key: childEle.props.key || idx })
            }
            return childEle;
        }
        return childEle;
    }

    if (children) {
        if (Array.isArray(children)) {
            return children.map((childEle, idx) => {
                return dealWithChildEle(childEle, idx);
            });
        } else {
            let childEle = children;
            return dealWithChildEle(childEle, (childEle.props && childEle.props.key) || Math.random());
        }
    }
    return children;
}

export const getElementTextContent = function (eleChildren) {
    var textContent = '';

    function dealWithChildEle (childEle) {
        if (childEle && typeof childEle == 'string') {
            textContent += childEle
        } else {
            if (childEle && childEle.props && childEle.props.children) {
                pickEleForDeal(childEle.props.children);
            }
        }
    }

    function pickEleForDeal (eleChildren) {
        if (eleChildren) {
            if (Array.isArray(eleChildren)) {
                eleChildren.map(childEle => {
                    dealWithChildEle(childEle);
                })
            } else {
                dealWithChildEle(eleChildren);
            }
        }
    }

    pickEleForDeal(eleChildren);

    return textContent;
}

// window['getElementTextContent'] = getElementTextContent;

export default { classes, getAbsolutePos, storageDB, extendNestedChildren, cloneExtendNestedChildren, getElementTextContent };
