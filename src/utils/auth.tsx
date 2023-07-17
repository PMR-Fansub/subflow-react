// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "../config/axios";
import Loading from "../pages/loading";

const AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const toast = useToast();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const clearLoginState = () => {
    setUserInfo(null);
    localStorage.clear();
  };

  const register = (username: string, email: string, password: string) => {
    return axios.post("/user/register", {
      username,
      email,
      password
    });
  };

  const login = (username: string, password: string) => {
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

  const logout = () => {
    clearLoginState();
    toast({
      description: "已成功退出登录",
      status: "success",
      duration: 5000,
      isClosable: true
    });
  };

  const getUserInfo = (callback: () => void) => {
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

  const updateUserInfo = (nickname: string) => {
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
        const errorMessage = error.response
          ? `${error.response.data.message} (${error.response.data.code})`
          : error.message;
        toast({
          title: "修改昵称失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      });
  };

  const value = {
    userInfo,
    register,
    login,
    logout,
    getUserInfo,
    updateUserInfo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
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
  const auth = useAuth();

  return auth.userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export { AuthProvider, RequireAuth, RequireNotAuth, useAuth };
