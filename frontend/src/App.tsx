import React from "react";
import "./App.css";
import { NavBar } from "./components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  OrderConfirmPage,
  OrderHistoryPage,
  SearchPage,
} from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Switch>
            <Route path={"/"} exact>
              <HomePage />
            </Route>
            <Route path={"/search"} exact>
              <SearchPage />
            </Route>
            <Route path={"/orderHistory"} exact>
              <OrderHistoryPage />
            </Route>
            <Route path={"/orderConfirm"} exact>
              <OrderConfirmPage />
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <Foot />
      </div>
    </Router>
  );
}

export default App;
