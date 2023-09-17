import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Money from "./views/Money";
import Target from "./views/Target";
import Statistic from "./views/Statistic";
import Bill from "./views/Bill";
import Tags from "./views/Tags";
import NotFound from "./views/NotFound";
import { EditTag } from "./components/Tags/EditTag";
import { AddTag } from "./components/Tags/AddTag";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/money">
          <Money />
        </Route>
        <Route exact path="/bill">
          <Bill />
        </Route>
        <Route exact path="/statistic">
          <Statistic />
        </Route>
        <Route exact path="/tags">
          <Tags />
        </Route>
        <Route exact path="/tags/:id">
          <EditTag />
        </Route>
        <Route exact path="/tag/add">
          <AddTag />
        </Route>
        <Route exact path="/target">
          <Target />
        </Route>
        <Redirect exact from="/" to="/money" />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
