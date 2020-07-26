import {useEffect, useState} from "react";
import {useUpdate} from "./useUpdate";

type Category = "-" | "+"
type ReceiptData = {
  amount:string,date:string, selectedId:number,note:string,type:Category
}
const useRecord = ()=>{
  const [recordItem,setRecordItem] = useState<ReceiptData[]>([])
  useEffect(()=>{
    setRecordItem(JSON.parse(window.localStorage.getItem("record")||"[]"))
  },[])
  useUpdate(()=>{
    save()
  },[recordItem])
  const save = ()=>{
    window.localStorage.setItem("record",JSON.stringify(recordItem))
  }
  return {recordItem,setRecordItem}
}
export {useRecord}