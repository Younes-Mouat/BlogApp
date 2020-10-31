import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom' ; 
import NavBar from './components/layout/NavBar'
import Dashboard from './components/dashboard/Dashboard'
import Messages from './components/Friends/Messages'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';


class App extends Component {
  render(){
    return(
      <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/messages/:id' component={Messages}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
