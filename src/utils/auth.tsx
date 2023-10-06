// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useToast } from "@chakra-ui/react";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState
} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "../config/axios";
import Loading from "../pages/loading";
import { AxiosError, AxiosPromise } from "axios";

interface UserInfo {
  id: string;
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  registerTime: string;
  loginTime: string;
}

interface IAuthContext {
  userInfo: UserInfo;

  login(username: string, password: string): AxiosPromise;

  logout(): void;

  register(username: string, email: string, password: string): AxiosPromise;

  getUserInfo(callback: () => void): void;

  updateUserInfo(nickname: string): void;
}

const AuthContext = createContext<IAuthContext | null>(null);

const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const toast = useToast();

  const item = localStorage.getItem("userInfo");
  const [userInfo, setUserInfo] = useState(item ? JSON.parse(item) : null);

  const clearLoginState = () => {
    setUserInfo(null);
    localStorage.clear();
  };

  const register = (username: string, email: string, password: string) => {
    return axios.post("/auth/register", {
      username,
      email,
      password
    });
  };

  const login = async (username: string, password: string) => {
    const response = await axios.post("/auth/login", {
      username,
      password
    });
    const resBody = response.data;
    const userInfo = resBody.data.userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUserInfo(userInfo);
    return resBody;
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
      .catch((error: AxiosError) => {
        clearLoginState();
        let errorMessage: string;
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
      .patch("/user", { nickname })
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
  const auth = useAuth()!;
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
  const auth = useAuth()!;

  return auth.userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export { AuthProvider, RequireAuth, RequireNotAuth, useAuth };
export type { UserInfo };
