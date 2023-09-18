import {BillType} from "../bills/type";

export type CommonTag = {
  name: string;
  icon: string;
  type: BillType;
}
export type TagItem = {
  id: number;
  name: string;
  icon: string;
  type: BillType;
  createAt: string;
}