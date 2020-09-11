import React, { Component } from 'react';

export default class Button extends Component {
     constructor(props){
         super(props);
         this.state = {};
         this.state.isLoading = this.props.isLoading;
         this.triggerOnClick = this.triggerOnClick.bind(this);
     }

    onClickBtn(){
        this.triggerOnClick();

    }
    triggerOnClick () {
        var props = this.props;
        this.props.onClick && typeof this.props.onClick == 'function' && this.props.onClick(`${
          this.props.hasOwnProperty('isLoading') ? this.setState({ isLoading:true}, () => {
              setTimeout(() => {
                  this.setState({ isLoading:false});
              }, 3000);
           }):''
        }`);
    }

     render(){
       return (
           <div className={`cc-btn ${this.props.type == 'primary' ? 'primary' :'cc-btn'} ${this.props.disabled == true ? 'disabled' :'cc-btn'}`}   onClick={() => this.onClickBtn()}>
                {this.state.isLoading ? (<div className='iconfont iconloading'></div>)  : null}
                <span>{this.props.value}</span>
           </div>

       )
     }

}
