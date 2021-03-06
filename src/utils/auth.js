import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "../config/axios";
import Loading from "../pages/loading";

let AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const toast = useToast();
  let [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  let clearLoginState = () => {
    setUserInfo(null);
    localStorage.clear();
  };

  let register = (username, email, password) => {
    return axios.post("/user/register", {
      username,
      email,
      password
    });
  };

  let login = (username, password) => {
    return axios
      .post("/user/login", {
        username,
        password
      })
      .then(response => {
        const resBody = response.data;
        const tokenInfo = resBody.data.saTokenInfo;
        const userInfo = resBody.data.userInfo;
        localStorage.setItem("tokenName", tokenInfo.tokenName);
        localStorage.setItem("tokenValue", tokenInfo.tokenValue);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUserInfo(userInfo);
        return resBody;
      });
  };

  let logout = () => {
    clearLoginState();
    toast({
      description: "已成功退出登录",
      status: "success",
      duration: 5000,
      isClosable: true
    });
  };

  const getUserInfo = callback => {
    axios
      .get("/user")
      .then(response => {
        setUserInfo(response.data.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
      })
      .catch(error => {
        clearLoginState();
        let errorMessage = "";
        if (error.response) {
          errorMessage = `${error.response.data.message} (${error.response.data.code})`;
        } else {
          errorMessage = error.message;
        }
        toast({
          title: "获取用户信息失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        if (callback) {
          callback();
        }
      });
  };

  let value = {
    userInfo,
    register,
    login,
    logout,
    getUserInfo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const RequireAuth = () => {
  let auth = useAuth();
  let location = useLocation();
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    auth.getUserInfo(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return auth.userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const RequireNotAuth = () => {
  let auth = useAuth();

  return auth.userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export { AuthProvider, RequireAuth, RequireNotAuth, useAuth };
