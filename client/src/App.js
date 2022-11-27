import { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { usersReducer, initialState } from "./reducer/usersReducer";
import 'react-toastify/dist/ReactToastify.css';


export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </UserContext.Provider>

  );
}

export default App;
