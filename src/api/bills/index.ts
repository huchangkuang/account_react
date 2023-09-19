import { get, post } from "../../utils/request";
import {BillItem, BillListQuery, CommonBill} from "./type";

const prefix = "/api/bills";

export const addBill = (data: CommonBill) => post(`${prefix}/add`, data);
export const updateBill = (data: CommonBill & { id: number }) =>
  post(`${prefix}/update`, data);
export const delBill = (id: number) =>
  post(`${prefix}/del`, {id});
export const billList = (query?: BillListQuery) => get<BillItem[]>(`${prefix}/list`, query);
