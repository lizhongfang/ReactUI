import React from 'react';
import {
    HashRouter,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';
import Home from '../modules/home';
import DropDown from '../modules/dropDown';
import Select from '../modules/select';
import TimePicker from '../modules/timePicker';
import Calendar from '../modules/calendar';
import DatePicker from '../modules/datePicker';
import Todo from '../modules/todo';


const SetRouter  = ()=>{
  return (
      <div>
      <HashRouter>
            <div>
                <Switch>
                    <Route exact path="/Home" component={Home}></Route>
                    <Route exact path="/Select" component={Select}></Route>
                    <Route exact path="/DropDown" component={DropDown}></Route>
                    <Route exact path="/TimePicker" component={TimePicker}></Route>
                    <Route exact path="/Calendar" component={Calendar}></Route>
                    <Route exact path="/DatePicker" component={DatePicker}></Route>
                    <Route exact path="/Todo" component={Todo}></Route>
                    <Redirect to='/Home' />
                </Switch>
            </div>
        </HashRouter>
      </div>
  )
}


export default SetRouter
