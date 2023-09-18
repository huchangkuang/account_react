import {post} from "../../utils/request";
import {LoginDto, LoginParam, SignUpParam} from "./type";

const prefix = '/api/user'

export const login = (data: LoginParam) => post<LoginDto>(`${prefix}/login`, data)
export const signUp = (data: SignUpParam) => post(`${prefix}/signUp`, data)