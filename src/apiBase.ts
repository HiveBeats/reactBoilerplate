import axios from 'axios';
import TokenService from './Shared/Auth/TokenService';
import eventBus from './eventBus';
// export default axios.create({
//   baseURL: `https://localhost:5001/api/`
// });

const instance = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "Auth/Login" && err.response) {
      // Refresh Token was not valid too
      if (originalConfig.url === "/auth/refresh-token") {
        eventBus.dispatch("movetologin", null);
      }
      else {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const user = TokenService.getUser();
            const rs = await instance.post("/auth/refresh-token", {
              refreshToken: user?.refreshToken,
              userName: user?.userName
            });
  
            const accessToken = rs.data.accessToken;
            TokenService.updateLocalAccessToken(accessToken);
  
            const refreshToken = rs.data.refreshToken;
            TokenService.updateLocalRefreshToken(refreshToken);
            
            if (accessToken) {
              originalConfig.headers["Authorization"] = 'Bearer ' + accessToken;
            }
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        else {
         //handle basic error
         eventBus.dispatch("error", ''+ originalConfig.url + ': ' + err.message); 
        }
      }
      
    }

    return Promise.reject(err);
  }
);

export default instance;