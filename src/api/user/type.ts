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