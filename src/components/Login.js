import { useState, useContext } from "react";
import { ContainerStyle } from "../styles/AuthPages";
import { UserContext } from "../contexts/contexts";
import Dots from "./Dots";
import { Link } from "react-router-dom";
import { signIn } from "../services/api";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ password: "", email: "" });
  const [loading, setLoading] = useState(false);
  const { setUser, lang } = useContext(UserContext);
  function onChange(e) {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function userLogin(e) {
    e.preventDefault();
    setLoading(true);
    signIn(
      loginInfo,
      (response) => {
        setLoading(false);
        setUser(response);
        alert("Autenticado com sucesso");
      },
      (err) => {
        setLoading(false);
        alert(err);
      }
    );
  }
  return (
    <ContainerStyle>
      <span>MyWallet</span>
      <form onSubmit={userLogin}>
        <input
          placeholder="email"
          name="email"
          value={loginInfo.email}
          type="email"
          required
          onChange={onChange}
          disabled={loading}
          data-test="email-input"
        />
        <input
          placeholder={lang.PASSWORD}
          name="password"
          value={loginInfo.password}
          type="password"
          required
          onChange={onChange}
          disabled={loading}
          data-test="password-input"
        />
        <button data-test="login-btn" type="submit" disabled={loading}>
          {loading ? <Dots /> : lang.LOGIN_BTN}
        </button>
      </form>
      <Link to="/sign-up">
        <p data-test="signup-link">{lang.SIGNUP_LINK}</p>
      </Link>
    </ContainerStyle>
  );
}
