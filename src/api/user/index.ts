import { get, post } from "../../utils/request";
import {
  EditInfoParam,
  LoginDto,
  LoginParam,
  SignUpParam,
  UserInfoDto,
} from "./type";

const prefix = "/api/user";

export const login = (data: LoginParam) =>
  post<LoginDto>(`${prefix}/login`, data);
export const signUp = (data: SignUpParam) => post(`${prefix}/signUp`, data);
export const editBudget = (num: number) => post(`${prefix}/budget`, { num });
export const editInfo = (data: EditInfoParam) =>
  post(`${prefix}/editInfo`, data);
export const userInfo = () => get<UserInfoDto>(`${prefix}/info`);
export const reportCard = () => post(`${prefix}/report`);
