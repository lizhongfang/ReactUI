import React, { memo ,useEffect} from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter} from 'react-router-dom'
import Slider from './slider'

export default memo(withRouter(function AllComponent(props) {
    // console.log(props.route,'props.route',props.location)
    useEffect(() => {
        if(props.location.pathname === '/'){
            props.history.push('/Home')
        }
    }, [props.history, props.location.pathname])
    return (
        <div className="flex-column">
            <div style={{ paddingLeft: "200px", position: "relative", flex: 1, overflow: 'auto' }}>
                <div style={{ position: "absolute", width: "200px", left: 0, top: 0, bottom: 0, borderRight: "1px solid #ccc" }}>
                      <Slider />
                </div>
                <div>
                    {
                      renderRoutes(props.route.routes)
                    }
                </div>
            </div>
        </div>
    )
}))
