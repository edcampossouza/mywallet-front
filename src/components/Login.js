import { useState, useContext } from "react";
import { ContainerStyle } from "../styles/AuthPages";
import { UserContext } from "../contexts/contexts";
import Dots from "./Dots";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
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
        navigate("/home");
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
          placeholder={lang.EMAIL}
          name="email"
          value={loginInfo.email}
          type="email"
          required
          onChange={onChange}
          disabled={loading}
          data-test="email"
        />
        <input
          placeholder={lang.PASSWORD}
          name="password"
          value={loginInfo.password}
          type="password"
          required
          onChange={onChange}
          disabled={loading}
          data-test="password"
        />
        <button data-test="sign-in-submit" type="submit" disabled={loading}>
          {loading ? <Dots /> : lang.LOGIN_BTN}
        </button>
      </form>
      <Link to="/cadastro">
        <p data-test="signup-link">{lang.SIGNUP_LINK}</p>
      </Link>
    </ContainerStyle>
  );
}
