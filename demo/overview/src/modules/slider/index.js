import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import routeList from '../../router/allroutes'

const renderMenu=(routeList)=>{
       return routeList && routeList.length > 0 && routeList.map((item,index)=>{
           if (item.routes && item.routes.length >0) {  //如果有子节点，继续递归调用，直到没有子节点
               return (
                <NavLink to={item.path} key={index}>
                    {item.title}
                    <object>
                      {renderMenu(item.routes)}
                    </object>

                </NavLink>
               )
           }
           //没有子节点就返回当前的父节点
           return  item.sort ? <div className="sort-group-title"  key={index}>{item.title}</div> : <NavLink activeClassName="selected" to={item.path} key={index}>{item.title}</NavLink>
       })
}


export default memo(function Sider() {
    return (
        <div className="slider">
            {
             renderMenu(routeList[0].routes)
              /*routeList[0].routes.map((item,index)=>{
                return (
                     <Link key={index} to={item.path}>
                          {item.title}
                          <div>
                           {
                            item.routes && item.routes.length>0 && item.routes.map((v,index)=>{
                               return(
                                 <Link key={index} to={v.path}>{v.title}</Link>
                               )
                            })
                           }
                          </div>
                     </Link>
                )
              }) */
            }
        </div>
    )
})
