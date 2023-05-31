import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import TemporaryDrawer from "./components/Navigation/sidebar/Sidebar";
// import List from "./components/Navigation/sidebar"
const drawerWidth = 240;
function App({hidden, setHidden, hiddenTwo,}) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  
  return (
    <div>
      <Navigation isLoaded={isLoaded} hidden={hidden} setHidden={setHidden}/>
     
       {/* <TemporaryDrawer/> */}
     
   
   
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
