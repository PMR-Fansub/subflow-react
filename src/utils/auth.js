import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "../config/axios";
import Loading from "../pages/loading";
import PropTypes from "prop-types";
import { getErrorMessageFromError } from "./request-helper";

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
        let errorMessage = getErrorMessageFromError(error);
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

  const updateUserInfo = nickname => {
    axios
      .patch(`/user/${userInfo.id}`, { nickname })
      .then(() => {
        setUserInfo({ ...userInfo, nickname });
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        toast({
          description: "已成功修改昵称",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      })
      .catch(error => {
        const errorMessage = getErrorMessageFromError(error);
        toast({
          title: "修改昵称失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      });
  };

  let value = {
    userInfo,
    register,
    login,
    logout,
    getUserInfo,
    updateUserInfo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element
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
