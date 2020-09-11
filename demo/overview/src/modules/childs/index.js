import React, { memo ,useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
import { withRouter} from 'react-router-dom'

export default memo(withRouter(function Index(props) {
    console.log(props.route.routes,'props.route.routes')
        useEffect(() => {
            if(props.location.pathname === '/Child'){
                props.history.push('/Child/first')
            }

        }, [props.history, props.location.pathname])
    return (
        <div>
            <div className="content">
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
}))
