// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

instance.interceptors.request.use(config => {
  // const token = localStorage.getItem("token")
  // if (token) {
  //   config.headers["Authorization"] = `Bearer ${token}`
  // }
  config.withCredentials = true;
  return config;
});

export default instance;
