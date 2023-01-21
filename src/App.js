import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/contexts";
import { pt } from "./assets/strings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GlobalStyle from "./styles/GlobalStyles";
import { useState } from "react";
import Home from "./components/Home";
import AddExpense from "./components/AddRegistry.js";

function App() {
  const [user, setUser] = useState(null);
  const [lang] = useState(pt);

  function logout() {
    setUser(null);
    localStorage.clear("token");
    localStorage.clear("user");
  }
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider
        value={{
          user,
          setUser,
          lang,
          logout,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/nova-saida" element={<AddExpense type="expense" />} />
            <Route path="/nova-saida" element={<AddExpense type="income" />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
