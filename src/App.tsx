import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Money from "./views/Money";
import Target from "./views/Target";
import Statistic from "./views/Statistic";
import Bill from "./views/Bill";
import Tags from "./views/Tags";
import NotFound from "./views/NotFound";



function App() {
  return (
      <Router>
            <Switch>
              <Route path="/money">
                <Money/>
              </Route>
              <Route path="/Bill">
                <Bill />
              </Route>
              <Route path="/Statistic">
                <Statistic />
              </Route>
              <Route path="/Tags">
                <Tags />
              </Route>
              <Route path="/Target">
                <Target />
              </Route>
              <Redirect exact from="/" to="/money"/>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
      </Router>
  );
}
export default App