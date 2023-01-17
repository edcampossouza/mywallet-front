import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/contexts";
import { en, pt } from "./assets/strings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GlobalStyle from "./styles/GlobalStyles";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const [lang, setLang] = useState(pt);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider
        value={{
          user,
          setUser,
          lang,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
