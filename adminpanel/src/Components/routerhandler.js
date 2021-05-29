import React, { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import PersistentDrawerLeft from "../Components/MainLayout/MainLayout";
import LoginPage from "./LoginPage/LoginPage";
import Questions from "./Questionpage/Questions";
import RegisteredUsers from "./RegisteredUser/RegisteredUsers";
import { AuthContext } from "./Context/Auth-Context";
let logouttimer;
function Routerhandler() {
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
        admind: adminid,
        token: token,
        adminname: adminname,
        expiration: tokenexpirationdate.toISOString(),
      })
    );
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
    if (token && tokenexpirationdate) {
      const remainingtime =
        tokenexpirationdate.getTime() - new Date().getTime();
      logouttimer = setTimeout(logout, remainingtime);
    } else {
      clearTimeout(logouttimer);
    }
  }, [token, logout, tokenexpirationdate]);

  //Checks the remaining time in the token
  useEffect(() => {
    if (token && tokenexpirationdate) {
      const remainingtime =
        tokenexpirationdate.getTime() - new Date().getTime();
      logouttimer = setTimeout(logout, remainingtime);
    } else {
      clearTimeout(logouttimer);
    }
  }, [token, logout, tokenexpirationdate]);

  //Auto logins if the token is still present
  useEffect(() => {
    const storeddata = JSON.parse(localStorage.getItem("adminData"));
    if (
      storeddata &&
      storeddata.token &&
      new Date(storeddata.expiration) > new Date()
    ) {
      login(
        storeddata.admind,
        storeddata.token,
        storeddata.adminname,
        new Date(storeddata.expiration)
      );
    }
  }, []);

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
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          {!token && <Redirect to="/" />}
          <Route exact path="/home">
            <PersistentDrawerLeft />
          </Route>
          <Route exact path="/questions/:cid">
            <Questions />
          </Route>
          <Route exact path="/registeredusers/:cid">
            <RegisteredUsers />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routerhandler;
