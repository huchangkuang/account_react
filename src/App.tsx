import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Nav from "components/Nav";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid red;
  height: 100vh;
`
const Main = styled.div`
  flex-grow: 1;
  overflow: auto;
`

function App() {
  return (
      <Router>
        <Wrapper>
          <Main>
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
          </Main>
          <Nav/>
        </Wrapper>
      </Router>
  );
}

function Money() {
  return <h2>Money</h2>;
}

function Bill() {
  return <h2>Bill</h2>;
}

function Statistic() {
  return <h2>Statistic</h2>;
}

function Tags() {
  return <h2>Tags</h2>;
}

function Target() {
  return <h2>Target</h2>;
}
function NotFound() {
  return <h2>404：当前页面不存在</h2>;
}
export default App