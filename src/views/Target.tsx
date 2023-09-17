import Layout from "../components/Layout";
import React from "react";
import { TouchCard } from "../components/Target/TouchCard";
import { Remain } from "../components/Target/Remain";
import { Budget } from "../components/Target/Budget";
import {UserInfo} from "../components/Target/UserInfoCard";

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
