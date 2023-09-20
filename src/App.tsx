import React from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Money from "./views/Money";
import Target from "./views/Target";
import Statistic from "./views/Statistic";
import Bill from "./views/Bill";
import Tags from "./views/Tags";
import NotFound from "./views/NotFound";
import { EditTag } from "./views/Tags/EditTag";
import { AddTag } from "./views/Tags/AddTag";
import { Login } from "./views/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/money" />} />
        <Route path="/money" element={<Money />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tags/:id" element={<EditTag />} />
        <Route path="/tag/add" element={<AddTag />} />
        <Route path="/target" element={<Target />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
