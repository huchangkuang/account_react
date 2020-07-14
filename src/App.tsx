import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Layout from "./components/Layout";



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

function Money() {
  return (
      <Layout>
        <h2>Money</h2>
      </Layout>
  );
}

function Bill() {
  return  (
      <Layout>
        <h2>Bill</h2>
      </Layout>
  );
}

function Statistic() {
  return  (
      <Layout>
        <h2>Statistic</h2>
      </Layout>
  );
}

function Tags() {
  return  (
      <Layout>
        <h2>Tags</h2>
      </Layout>
  );
}

function Target() {
  return  (
      <Layout>
        <h2>Target</h2>
      </Layout>
  );
}
function NotFound() {
  return <h2>404：当前页面不存在</h2>;
}
export default App