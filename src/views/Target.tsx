import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { TouchCard } from "./Target/TouchCard";
import { Remain } from "./Target/Remain";
import { Budget } from "./Target/Budget";
import { UserInfo } from "./Target/UserInfoCard";
import { userInfo } from "../api/user";
import { UserInfoDto } from "../api/user/type";

const Target = () => {
  const [info, setInfo] = useState<UserInfoDto>();
  const { budget = 0, expense = 0, income = 0 } = info || {};
  const fetchUserInfo = async () => {
    try {
      const { data } = await userInfo();
      setInfo(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <Layout>
      <TouchCard />
      <UserInfo />
      <Remain expense={expense} income={income} />
      <Budget _budget={budget} expense={expense} />
    </Layout>
  );
};
export default Target;
