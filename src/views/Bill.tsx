import Layout from "../components/Layout";
import React from "react";
import {DataFilter} from "../components/DataFilter";
import {useRecord} from "../hooks/useRecord";

type Category = "-" | "+"
type ReceiptData = {
  amount:string,date:string, selectedId:number,note:string,type:Category
}
const Bill=()=> {
  const {recordItem} = useRecord()
  const getGroupRecord = ()=>{
    const newRecord:ReceiptData[] = JSON.parse(JSON.stringify(recordItem))
    const result = [{title:newRecord[0].date,item:newRecord[0],total:0}]
    const titleList:string[] = []
    for (let i=1;i<newRecord.length;i++){
      let current = newRecord[i]
      for (let j=0;j<result.length;j++){
        if (titleList.indexOf(result[j].title)){
          titleList.push(result[j].title)
        }
      }

    }
    return result
  }
  return  (
        <Layout>
            <DataFilter/>
            <ol>

            </ol>
        </Layout>
    );
}
export default Bill
