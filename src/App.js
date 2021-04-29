
import './App.css';

import React from "react";
import logo from './logo.svg';
import TodoList from "./TodoList";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import {Header,Menu} from './Header'

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            items:[
            {
                text:"TodoList",
                link:"/TodoList"
            },
            {
                text:"Movies",
                link:"/movies"
            },
            {
                text:"Login",
                link:"/logout"
            }
        ]
    }
    }

    toggleActive=(text)=>{
        
        this.state.items.forEach((item)=>item.active=false);
        let item = this.state.items.find(x=>x.text==text);
        item.active = !item.active
        this.setState({items:this.state.items});
        //this.forceUpdate();
    }


    render(){
        return <Router>
        <Header title="My website" logo={logo} menu={this.state.items} toggleActive={this.toggleActive} />
        <Switch>
            <Route path="/TodoList" >
                <TodoList/>
            </Route>
            <Route path="/movies" >
                <UserView />
            </Route>
            <Route path="/logout" >
                <Logout />
            </Route>
            
        </Switch>
    </Router>
        
    }
}

//hyb2o e; side menu


class UserView extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            loading:false
        };
    }

    async componentDidMount(){
        this.setState({loading:true});
        setTimeout(async ()=>{

        
        let res= await fetch("https://reqres.in/api/users?page=1",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        });
        let resJson = await res.json();
        this.setState({users:resJson.data,loading: false});
    },5000)
    }

    render(){
        return <div>
            {!this.state.loading ? this.state.users.map((item)=>{
                return <UserView key={item.id}  user={item} />
            }): "Loading Users"}
        </div>
    }
}

class Logout extends React.Component{
    render(){
        return <div><Login/></div>;
    }
}



class Login extends React.Component{
    
    constructor(){
        super();
        this.state={
            username:"",
            email:"",
            password:""
        }
    }

    setInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    login=async ()=>{
        let user = {
            email:this.state.email,
            password:this.state.password
        }
        let res= await fetch("https://reqres.in/api/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(user)
        });
        let resJson = await res.json();
        if(resJson.token){
            alert("login successfull")

        }else{
            alert(resJson.error)
        }
    }

    render(){
        return <div>
            <h1>Login</h1>
            Username:<input type="text" value={this.state.username} onChange={this.setInputValue} name="username" /><br/>
            Password:<input type="password" value={this.state.password} onChange={this.setInputValue} name="password" /><br/>
            Email:<input type="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} name="email" /><br/>
            <button onClick={this.login}>Login</button>
        </div>
    }
}



  
  

export default App;