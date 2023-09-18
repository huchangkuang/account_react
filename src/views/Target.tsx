import Layout from "../components/Layout";
import React from "react";
import { TouchCard } from "./Target/TouchCard";
import { Remain } from "./Target/Remain";
import { Budget } from "./Target/Budget";
import {UserInfo} from "./Target/UserInfoCard";

const Target = () => {
  return (
    <Layout>
        <TouchCard />
        <UserInfo />
        <Remain />
        <Budget />
    </Layout>
  );
};
export default Target;
