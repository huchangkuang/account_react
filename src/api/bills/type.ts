export enum BillType {
  paid = 1,
  receive
}
export type CommonBill = {
  cash: string;
  type: BillType;
  time?: string;
  remark?: string;
  tags?: number[]
}
export type BillItem = {
  id: number
  cash: string;
  type: BillType;
  remark: string;
  tags: number[];
  createAt: string;
}