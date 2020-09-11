import React, { Component } from 'react';

export default class Steps extends Component {
     constructor(props){
         super(props);
         this.state ={};
         this.state.arrowFlag = '999999';
         this.state.arrowLengthPer = 4;
         this.state.currentStepId =  this.props.currentStepId;
     }
     componentWillReceiveProps (newProps) {
         if (newProps) {
             this.setState({
               currentStepId:newProps.currentStepId
             })

         }
     }
    widthCalculter () {
        let length = this.props.stepDataList.length;
        return (100 - (length - 1) * this.state.arrowLengthPer) / length;
    }

     render(){
       return (
           <div className="cc-steps">
                {
                  this.props.stepDataList.map((item,index)=>{
                    return(
                      <div key={index}  className={(index != this.state.arrowFlag ? 'cc-step-wrap':'') + (index == this.state.arrowFlag ? 'cc-step-arrow':'')}
                        style={{width: (index != this.state.arrowFlag) ? (this.widthCalculter() + '%') : (this.state.arrowLengthPer + '%')}}   >
                         <div className="cc-step"  className={`${((index+1) == this.state.currentStepId ? 'current':''
                       )} ${((index + 1) < this.state.currentStepId ? 'finished':'')} ${((index + 1) > this.state.currentStepId ? 'behind':'')}`}>
                             {
                               (index + 1) < this.state.currentStepId ?  <span className="cc-step-num"> <i className="iconfont iconSubmission"></i></span>
                               :<span className="cc-step-num">{index+1}</span>
                             }
                             <span className="cc-step-name">{item.name}</span>
                         </div>
                      </div>
                    )
                  })
                }
           </div>

       )
     }

}
