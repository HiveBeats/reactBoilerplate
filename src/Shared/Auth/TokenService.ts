
export interface IUser {
  accessToken?: string;
  refreshToken?: string;
  userName?: string;
}

const getUser = (): IUser|null => {
  const userData = localStorage.getItem("user");
  if (userData)
      return JSON.parse(userData);
  else return null;
};

const getLocalRefreshToken = (): string|undefined => {
  return getUser()?.refreshToken;
};
  
const getLocalAccessToken = (): string|undefined => {
  return getUser()?.accessToken;
};
  
const updateLocalAccessToken = (token: string) => {
  let user = getUser();
  if (user && token)
  {
      user.accessToken = token;
      setUser(user);
  }
};

const updateLocalRefreshToken = (token: string) => {
  let user = getUser();
  if (user && token)
  {
      user.refreshToken = token;
      setUser(user);
  }
};
  
const setUser = (user: IUser) => {
  const userJson = JSON.stringify(user);
  localStorage.setItem("user", userJson);
};
  
const removeUser = () => {
  localStorage.removeItem("user");
};
  
const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  getUser,
  setUser,
  removeUser,
};
  
export default TokenService;