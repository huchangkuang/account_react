import { get, post } from "../../utils/request";
import { BillItem, CommonBill } from "./type";

const prefix = "/api/bills";

export const addBill = (data: CommonBill) => post(`${prefix}/add`, data);
export const updateBill = (data: CommonBill & { id: number }) =>
  post(`${prefix}/update`, data);
export const delBill = (id: number) =>
  post(`${prefix}/del`, {id});
export const billList = () => get<BillItem[]>(`${prefix}/list`);
