import Layout from "../components/Layout";
import React, {useState} from "react";
import {DataFilter} from "../components/DataFilter";

const Statistic=()=> {
  const [type,setType] = useState<"-"|"+">("-")
  const [date,setDate] = useState<"day"|"month"|"year">("day")
  console.log(type,date)//todo
    return  (
        <Layout>
            <DataFilter getType={type=>setType(type)} getDate={date => setDate(date)}/>
        </Layout>
    );
}
export default Statistic