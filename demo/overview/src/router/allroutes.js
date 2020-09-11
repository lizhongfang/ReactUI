import AllComponent from '../modules'
import Home from '../modules/home';
import DropDown from '../modules/dropDown';
import Select from '../modules/select';
import TimePicker from '../modules/timePicker';
import Calendar from '../modules/calendar';
import DatePicker from '../modules/datePicker';
import Todo from '../modules/todo';
import Child from '../modules/Childs';
import First from '../modules/Childs/First';
import Second from '../modules/Childs/Second';
import Form from '../modules/form';

// var testImport = import('../modules/index');
//
// console.log(testImport);
//
// testImport.then(response => {
//   console.log(response);
// });

const routes = [ {
        path: '/',
        component: AllComponent,
        routes: [ {
                path: '/Home',
                component:Home ,
                title:'组件总览',
                routes: [],
            },
            {
              path: '/Home',
              component: Home,
              title:'数据录入',
              sort:true,
            },
            {
                path: '/Form',
                component: Form,
                title:'Form',
                routes: [],
            },
            {
                path: '/DropDown',
                component: DropDown,
                title:'DropDown',
                routes: [],
            },
            {
                path: '/Select',
                component: Select,
                title:'Select',
                routes: [],
            },
            {
                path: '/TimePicker',
                component: TimePicker,
                title:'TimePicker',
                routes: [],
            },
            {
              path: '/',
              component:Home,
              title:'布局',
              sort:true,
              routes: [],
            },
            {
                path: '/Child',
                component: Child,
                title:'Child',
                routes: [ {
                        path: '/Child/first',
                        component: First,
                        title:'ChildFirst',
                        routes: []
                    },
                    {
                        path: '/Child/second',
                        component: Second,
                        title:'ChildSecond',
                        routes: []
                    }
                ],
            },
        ],
    },

]

export default routes
