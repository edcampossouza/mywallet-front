import { useContext, useState } from "react";
import { UserContext } from "../contexts/contexts";
import { ContainerStyle } from "../styles/AuthPages";
import { signUp } from "../services/api";
import Dots from "./Dots";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang } = useContext(UserContext);
  async function userSignUp(e) {
    e.preventDefault();
    if (userInfo.password !== confirmPassword) {
      alert("Senhas não conferem!");
      return;
    }
    setLoading(true);
    signUp(
      userInfo,
      (data) => {
        setLoading(false);
        alert(data);
        navigate("/");
      },
      (err) => {
        setLoading(false);
        alert(err);
      }
    );
  }
  function onChange(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <ContainerStyle>
      <span>MyWallet</span>
      <form onSubmit={userSignUp}>
        <input
          placeholder={lang.NAME}
          name="name"
          value={userInfo.name}
          required
          disabled={loading}
          onChange={onChange}
          data-test="name"
        />
        <input
          placeholder={lang.EMAIL}
          name="email"
          type="email"
          value={userInfo.email}
          required
          disabled={loading}
          onChange={onChange}
          data-test="email"
        />
        <input
          placeholder={lang.PASSWORD}
          name="password"
          value={userInfo.password}
          type="password"
          required
          disabled={loading}
          onChange={onChange}
          data-test="password"
        />
        <input
          placeholder={lang.CONFIRM_PASSWORD}
          name="confirm-password"
          type="password"
          value={confirmPassword}
          required
          disabled={loading}
          data-test="conf-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button data-test="sign-up-submit" type="submit" disabled={loading}>
          {loading ? <Dots /> : lang.SIGNUP_BTN}
        </button>
        <Link to="/">
          <p data-test="login-link">{lang.LOGIN_LINK}</p>
        </Link>
      </form>
    </ContainerStyle>
  );
}
