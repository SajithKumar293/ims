import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
    </Router>
  );
}

export default App;
