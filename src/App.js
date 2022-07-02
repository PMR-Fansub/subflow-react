import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, RequireAuth, RequireNotAuth } from "./utils/auth";
import { Flex, useToast } from "@chakra-ui/react";
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import Kanban from "./pages/Kanban";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Flex
        direction={"column"}
        minHeight={"100vh"}
        justify={"space-between"}
        backgroundColor={"gray.50"}
      >
        <NavBar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="loading" element={<Loading />} />
          <Route element={<RequireNotAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="kanban" element={<Kanban />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Flex>
    </AuthProvider>
  );
}

export default App;
