import React, { Component } from 'react';


const ItemTriggerClickHandlerClass = 'J_accordion_item_handler';
/**
    <Accordion isMulti={true}>
        <Accordion.Item title={'AccordionTitle1'}>

        </Accordion.Item>
    </Accordion>
*/
class AccordionRoot extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isMulti: !!props.isMulti,
            activeIndex: props.activeIndex,
            activeIndexes: props.activeIndexes || []
        };
    }

    filterChildren () {
        var children = this.props.children;
        !Array.isArray(children) && (children = [children]);

        return children.filter(childEle => childEle.type && childEle.type === Item);
    }

    checkIsActive (idx) {
        return this.state.isMulti ?
            (this.state.activeIndexes && (this.state.activeIndexes.indexOf(idx) > -1)) :
            (this.state.activeIndex > -1 && (this.state.activeIndex == idx));
    }

    toggleActive (idx) {
        if (this.state.isMulti) {
            var targetIdx = this.state.activeIndexes.indexOf(idx);
            if (targetIdx > -1) {
                this.state.activeIndexes.splice(targetIdx, 1);
            } else {
                this.state.activeIndexes.push(idx);
            }
        } else {
            this.state.activeIndex = idx;
        }

        this.setState({
            activeIndex: this.state.activeIndex,
            activeIndexes: this.state.activeIndexes
        });
    }

    clickAccordion (e, idx) {
        // console.log(e.target);
        if (e.target.className && (e.target.className.indexOf(ItemTriggerClickHandlerClass) > -1)) {
            this.toggleActive(idx);
        }
    }


    render () {
        this.accordionChildren = this.filterChildren();

        return (
            <div className="cc-accordion">
            {
                this.accordionChildren.map((childEle, idx) => (
                    <div key={idx} className={
                        'cc-accordion-item-wrap' +
                        (this.checkIsActive(idx) ? ' active' : '')
                    }
                        onClick={(e) => this.clickAccordion(e, idx)}
                    >
                        {childEle}
                    </div>
                ))
            }
            </div>
        );
    }
}

class Item extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="cc-accordion-item">
                <div className={"cc-accordion-item-title " + ItemTriggerClickHandlerClass}>
                    { this.props.title }
                </div>
                <div className="cc-accordion-item-content">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

AccordionRoot.Item = Item;

const Accordion = AccordionRoot;
export default Accordion;
