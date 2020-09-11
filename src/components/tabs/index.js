import React, { Component } from 'react';


class TabsRoot extends Component {
     constructor(props){
         super(props);
         this.state = {
           selectIndx:0,
           activeTabId:this.props.activeTabId,
         };
         // this.tabsChildren = this.filterChildren({activeTabId:this.state.activeTabId});
     }

     filterChildren (otherProps) {
         var children = this.props.children;
         !Array.isArray(children) && (children = [children]);

         var vaildChildrenEles = children.filter(childEle => childEle.type && childEle.type === TabContent);console.log(otherProps)
         if (otherProps) {
             var newVaildChildrenEles = vaildChildrenEles.map((el, idx) => React.cloneElement(el, Object.assign({ key: el.key || (el.props && el.props.id) || idx }, otherProps)));
             return newVaildChildrenEles;
         }

         // return children.filter(childEle => childEle.type && childEle.type === TabContent);
         return vaildChildrenEles;
     }

    tabsActive(e,index){
         if(this.state.disabledIndx ==  index){
            return;
         }

         this.setState({
             selectIndx:index,
             activeTabId:e.target.innerHTML
         },()=>{
             this.triggerOnClick();
         })
    }
    triggerOnClick () {
        this.props.onChange && typeof this.props.onChange  == 'function' && this.props.onChange(this.state.activeTabId)
    }

     render(){
       this.tabsChildren = this.filterChildren({activeTabId:this.state.activeTabId});console.log(this.tabsChildren)
       this.tabsChildren.forEach((item, i) => {
            if(item.props.disabled){
              this.state.disabledIndx = i;
            }
       });

       return (
           <div className="cc-tabs">
              <div className="tabs-nav">
                  {
                    this.props.tabsNavList.map((nav,index)=>{
                      return(
                        <div key={index} className={`tabs-nav-title ${this.state.selectIndx == index ? 'active':'tabs-nav-title'} ${this.state.disabledIndx == index ? 'disabled':'tabs-nav-title'}`} onClick={(e)=>this.tabsActive(e,index)}>{nav}</div>
                      )
                    })
                  }
              </div>
              <div className="tabs-tab">
              {
                this.tabsChildren.map((childEle,index)=>{
                    return  (
                      <div key={index}>{childEle}</div>
                    )
                })
              }
              </div>
           </div>

       )
     }

}
class TabContent extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className="tabs-content">
                {this.props.activeTabId ==  this.props.title ? this.props.children : ''}
            </div>
        );
    }
}

TabsRoot.TabContent = TabContent;

const Tabs = TabsRoot;
export default Tabs;
