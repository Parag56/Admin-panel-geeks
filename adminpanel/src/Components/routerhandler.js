import React, { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import PersistentDrawerLeft from "../Components/MainLayout/MainLayout";
import LoginPage from "./LoginPage/LoginPage";
import Questions from "./Questionpage/Questions";
import RegisteredUsers from "./RegisteredUser/RegisteredUsers";
import { AuthContext } from "./Context/Auth-Context";
let logouttimer;
function Routerhandler(){
  const history=useHistory()
  const [token, settoken] = useState(null);
  const [adminid, setadminid] = useState(null);
  const [adminname, setadminname] = useState(null);
  const [tokenexpirationdate, settokenexpirationdate] = useState();
  //This will set the admin object in the local storage when login is successfull
  const login = useCallback((adminid, token, adminname, expirationdate) => {
    settoken(token);
    setadminid(adminid);
    setadminname(adminname);
    const tokenexpirationdate =
      expirationdate || new Date(new Date().getTime() + 1000 * 60 * 60);
    settokenexpirationdate(tokenexpirationdate);
    localStorage.setItem(
      "adminData",
      JSON.stringify({
        adminid: adminid,
        token: token,
        adminname: adminname,
        expiration: tokenexpirationdate.toISOString(),
      })
    );
    <Redirect to="/home"/>
  });

  //This will remove the admin object from the local storage when logout is pressed
  const logout = useCallback(() => {
    settoken(null);
    setadminid(null);
    setadminname(null);
    settokenexpirationdate(null);
    localStorage.removeItem("adminData");
  });
  useEffect(() => {
    const storeddata = JSON.parse(localStorage.getItem("adminData"));
    if(
      storeddata &&
      storeddata.token &&
      new Date(storeddata.expiration) > new Date()
    ){
      login(
        storeddata.adminid,
        storeddata.token,
        storeddata.adminname,
        new Date(storeddata.expiration)
      );
    }else{
      logout()
    }
  },[]);

  // Checks the remaining time in the token
  useEffect(() => {
    if (token && tokenexpirationdate) {
      const remainingtime =
        tokenexpirationdate.getTime() - new Date().getTime();
      logouttimer = setTimeout(logout, remainingtime);
    } else if(logouttimer) {
      clearTimeout(logouttimer);
    }
  }, [token, logout, tokenexpirationdate]);
 
let routes
if(token){
  routes=(
    <Switch>
    <Route exact path="/">
      <LoginPage />
    </Route>
  
    <Route exact path="/home">
      <PersistentDrawerLeft />
    </Route>
    <Route exact path="/questions/:cid">
      <Questions />
    </Route>
    <Route exact path="/registeredusers/:cid">
      <RegisteredUsers />
    </Route>
    <Redirect to="/home" />
  </Switch>
  )
}
else{
  routes=( 
    <Switch>
     <Route path="/">
      <LoginPage />
    </Route>
    </Switch>
  )
 }
  return (
    <AuthContext.Provider
      value={{
        isloggedin: !!token,
        token: token,
        adminid: adminid,
        adminname: adminname,
        login: login,
        logout: logout,
      }}
    >
     <Router>
      {routes}
     </Router>
    </AuthContext.Provider>
  );
}

export default Routerhandler;
