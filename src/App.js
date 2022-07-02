// import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider, RequireAuth, RequireNotAuth } from "./utils/auth";
import { Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import Profile from "./pages/Profile";
// import Kanban from "./pages/Kanban";

const App = () => {
  return (
    <AuthProvider>
      <Flex direction={"column"} minHeight={"100vh"} justify={"space-between"}>
        <NavBar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="loading" element={<Loading />} />
          <Route element={<RequireNotAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />}>
            {/* <Route path="kanban" element={<Kanban />} /> */}
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Flex>
    </AuthProvider>
  );
};

export default App;
