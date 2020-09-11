import React, { Component } from 'react';

export default class Pagination extends Component {
     constructor(props){
         super(props);
         this.state = {
           pagesArr:[1],
           previousLimit:0,
           limit:props.limit,
           page:props.page
         };
     }
    componentDidMount(){
      this.refreshPages(this.props.total,this.props.limit);
    }

    triggerOnPaginate () {
        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange({page:this.state.page,limit:this.state.limit});
    }
    hasNext() {
        return this.state.page * this.state.limit < this.props.total;
    }
    hasPrevious() {
            return this.state.page > 1;
    }
    max() {
        return this.hasNext() ? this.state.page * this.state.limit : this.props.total;
    }

    min() {
        return this.isPositive(this.props.total) ? this.state.page * this.state.limit - this.state.limit + 1 : 0;
    }

    isPositive(number) {
        return parseInt(number, 10) > 0;
    }
    onPaginationChange(e){
      this.setState({
         page:e.target.value
      },()=>{
         this.triggerOnPaginate();
      })
    }
    pages() {
      return this.isPositive(this.props.total) ? Math.ceil(this.props.total / (this.isPositive(this.props.limit) ? this.props.limit : 1)) : 1;
    }
    previous(){
         if(!this.hasPrevious()){
           return;
         }
         this.setState({
           page: this.state.page - 1
         },()=>{
            this.triggerOnPaginate();
         })
    }
    next() {
      if(!this.hasNext()){
        return;
      }
      this.setState({
        page: ++this.state.page
      })
    }
    refreshPages(total, limit) {
    // 重新计算最大页面数
        const maxPage = Math.ceil(total / limit);
        this.state.pagesArr = Array(maxPage).fill(1);
        this.setState({
          pagesArr:this.state.pagesArr,
        })
    }
    limitChangeHandler(e){
         this.setState({
             limit:e.target.value
         }, ()=>{
           const previousValue = this.state.previousLimit;
           const currentValue = this.state.limit;
           this.state.previousLimit = this.state.limit;
           this.refreshPages(this.props.total, currentValue);
           this.state.page = Math.floor(((this.props.page * previousValue - previousValue) + currentValue) / (this.isPositive(currentValue) ? currentValue : 1));
           this.triggerOnPaginate();
         })
    }

     render(){
       return (
           <div className={`cc-pagination`}>
               <div className="total-current">共{this.props.total}条记录，当前为1-10条</div>
               <div className="pagination-wrap">
                  <div className="custom-select-icon">
                       <select onChange={(e)=>this.limitChangeHandler(e)}>
                           {
                             this.props.limitOptions.map((item,index)=>{
                                return (
                                   <option key={index}>{item}</option>
                                )
                             })
                           }
                       </select>
                       <i className="iconfont iconexpand"></i>
                  </div>
                  <span className="terms-of-page">条/页</span>
                  <div className="md-icon-button" onClick={()=>this.previous()}>
                     <i className="iconfont iconarrow-left"></i>
                  </div>
                  <div className="custom-select-icon page-size">
                      <select value={this.state.page} onChange={(e)=>this.onPaginationChange(e)}>
                          {
                            this.state.pagesArr.map((item,index)=>{
                                return (
                                    <option key={index}>{index + 1}</option>
                                )
                            })
                          }
                      </select>
                      <i className="iconfont iconexpand"></i>
                  </div>
                  <div className="md-icon-button" onClick={()=>this.next()}>
                     <i className="iconfont iconarrow-right1"></i>
                  </div>
               </div>
           </div>

       )
     }

}
