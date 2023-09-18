export type LoginParam = {
  idName: string;
  password: string;
}
export type SignUpParam = {
  idName: string;
  password: string;
}
export type LoginDto = {
  token: string;
  userName: string;
  avatar: string;
}
export type EditInfoParam = {
  userName: string;
  avatar: string;
}
export type UserInfoDto ={
  id: number;
  idName: string;
  userName: string;
  avatar: string;
  budget: number;
  expense: number;
  income: number;
}