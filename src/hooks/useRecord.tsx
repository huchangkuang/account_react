import { useEffect, useState } from "react";
import { useUpdate } from "./useUpdate";

export enum BillType {
  paid = 1,
  receive,
}
export type ReceiptData = {
  cash: string;
  id?: number;
  remark: string;
  type: BillType;
};
const useRecord = () => {
  const [recordItem, setRecordItem] = useState<ReceiptData[]>([]);
  useEffect(() => {
    setRecordItem(JSON.parse(window.localStorage.getItem("record") || "[]"));
  }, []);
  useUpdate(() => {
    save();
  }, [recordItem]);
  const save = () => {
    window.localStorage.setItem("record", JSON.stringify(recordItem));
  };
  return { recordItem, setRecordItem };
};
export { useRecord };
