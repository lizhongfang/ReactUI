import React, { Component } from 'react';

import {
    HashRouter,
    Link,
} from 'react-router-dom';

import CCUI, { Nav, DropDown,Accordion, Calendar, DatePicker, Timer, TimePicker, DateTimePicker, Tree, Radiobox, RadioboxGroup, Checkbox, CheckboxGroup  } from 'cc-ui';

import './index.scss';

export default class Menu extends Component {
    constructor (props) {
        super (props);

        this.state = {
            currentIndex:0,
            menuList:[
              {href:'/Home',name:'组件总览',
                common:[
                 {href:'/Select',name:'Select'},
                 {href:'/DropDown',name:'DropDown'},
                 {href:'/TimePicker',name:'TimePicker'},
                 {href:'/Calendar',name:'Calendar'},
                 {href:'/DatePicker',name:'DatePicker'}],
                demo:[
                 {href:'/Nav',name:'Nav'},
                 {href:'/Todo',name:'Todo'}],
               },
            ],
        };
    }
    itemClick(index){
      this.setState({
         currentIndex:index
      })
    }

    render () {
        return (
            <div>
              <HashRouter>
               {this.state.menuList.map((item,index)=>{
                 return (
                   <div key={index} className="main-menu-inner">
                       <ul className="aside-container">
                           <li className={`menu-item ${this.state.currentIndex == index ? 'menu-item-selected':'menu-item'}`}  onClick={() => this.itemClick(index)}>
                                 <Link to={item.href}>{item.name}</Link>
                           </li>
                           <li className="menu-item-group">
                               <div className="menu-item-group-title">通用</div>
                               <ul className="menu-item-group-list">
                                  {
                                  item.common.map((v,index) =>{
                                    return (
                                      <li key={index} className={`menu-item ${this.state.currentIndex == index+1 ? 'menu-item-selected':'menu-item'}`}  onClick={() => this.itemClick(index+1)}>
                                            <Link to={v.href}>{v.name}</Link>
                                      </li>
                                    )
                                  })
                                 }
                               </ul>
                           </li>
                           <li className="menu-item-group">
                               <div className="menu-item-group-title">一些事例</div>
                               <ul className="menu-item-group-list">
                                  {
                                  item.demo.map((v,index) =>{
                                    return (
                                      <li key={index} className={`menu-item ${this.state.currentIndex == index+ item.common.length+1? 'menu-item-selected':'menu-item'}`}  onClick={() => this.itemClick(index + item.common.length+1)}>
                                            <Link to={v.href}>{v.name}</Link>
                                      </li>
                                    )
                                  })
                                 }
                               </ul>
                           </li>
                       </ul>
                   </div>
                 )
               })}
               </HashRouter>
            </div>
        );
    }
}
