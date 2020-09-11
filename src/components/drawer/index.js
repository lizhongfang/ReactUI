import React, { Component } from 'react';
import {Button} from 'cc-ui';

export default class Drawer extends Component {
     constructor(props){
         super(props);
         this.state = {
           toggle:this.props.toggle
         };

     }
     componentWillReceiveProps (newProps) {
         if (newProps) {
             this.setState({
               toggle:newProps.toggle
             })

         }
     }
    onClickBtn(){


    }
    triggerOnClick () {
        var props = this.props;
        this.props.onClick && typeof this.props.onClick == 'function' && this.props.onClick();
    }
    cancel(){
      this.setState({
        toggle:false
      })
    }
     render(){
       return (
         <div className="cc-drawer" style={{display:this.state.toggle ?  'block':'none'}}>
           <div className="drawer-mask" onClick={()=>{this.cancel()}}></div>
           <div className="drawer-wrap">
             <div  className="drawer-header">
                <div className="drawer-title">
                    {this.props.title}
                </div>
                <div className="drawer-btn">
                    <Button value={'取消'} onClick={()=>{this.cancel()}}/>
                    <Button type={'primary'} value={'确定'} onClick={()=>{this.confirm()}}/>
                </div>
             </div>
              <div  className="drawer-content">
                  {this.props.children}
              </div>
           </div>
         </div>


       )
     }

}
