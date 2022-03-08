import {useEffect} from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import {getUserAuth} from './actions';
import {connect} from 'react-redux';

function App(props) {

     useEffect(()=>{
       props.getUserAuth();
     },[])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}



const mapStateToProps = (state)=>{
  return {
   
  }
};

const mapDispatchToProps = (dispatch)=> ({
  getUserAuth: ()=> dispatch(getUserAuth()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);


// React Linkedin clone App with Redux, Hooks,styled-components, firebase.

// The project has all the features including:

//     Good  UI/Ux designed with styled-components.
//     The app handles authentication with firebase.
//     The app lets posting of stories in the Newsfeed and data is stored in firebase.
//     Real-time database with Firebase’s Firestore
