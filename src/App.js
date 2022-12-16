import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Import components
import Login from './auth/login.js'
import AdminLogin from './auth/admin.js'
import User from './user/index.js'
import Admin from './admin/index.js'
import AdminUsersAdd from './admin/add.js'

function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"/ >
      <BrowserRouter>
        <Switch>
          <Route path ="/user" component={User} />
          <Route path ="/admin/login" component={AdminLogin} />
          <Route path ="/admin/users/add" component={AdminUsersAdd} />
          <Route path ="/admin" component={Admin} />
          <Route path ="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;