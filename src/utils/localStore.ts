export class LocalStore {
  static setToken(token: string){
    localStorage.setItem('token', token)
  }
  static setUserName (userName: string) {
    localStorage.setItem('userName', userName)
  }
  static setAvatar(avatar: string) {
    localStorage.setItem('avatar', avatar)
  }
  static getToken(): string | null{
    return localStorage.getItem('token')
  }
  static getUserName (): string | null {
    return localStorage.getItem('userName')
  }
  static getAvatar(): string | null {
    return localStorage.getItem('avatar')
  }
}