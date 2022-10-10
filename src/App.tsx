import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import RequireAuth from "./pages/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import Layout from "./components/Layout";
import Training from "./pages/Training";

const ROLES = {
  Player: "player",
  Assistant: "assistant",
  Coach: "coach",
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            {/* <Route> */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.Player, ROLES.Assistant, ROLES.Coach]}
                />
              }
            >
              <Route path="/training" element={<Training />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
