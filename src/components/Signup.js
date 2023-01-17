import { useContext, useState } from "react";
import { UserContext } from "../contexts/contexts";
import { ContainerStyle } from "../styles/AuthPages";
import Dots from "./Dots";
import { Link } from "react-router-dom";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const { lang } = useContext(UserContext);
  function userSignUp(e) {}
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
          placeholder="email"
          name="email"
          type="email"
          value={userInfo.email}
          required
          disabled={loading}
          onChange={onChange}
          data-test="email-input"
        />
        <input
          placeholder={lang.PASSWORD}
          name="password"
          value={userInfo.password}
          type="password"
          required
          disabled={loading}
          onChange={onChange}
          data-test="password-input"
        />
        <input
          placeholder={lang.NAME}
          name="name"
          value={userInfo.name}
          required
          disabled={loading}
          onChange={onChange}
          data-test="user-name-input"
        />
        <input
          placeholder={lang.PICTURE}
          name="image"
          value={userInfo.image}
          required
          disabled={loading}
          onChange={onChange}
          data-test="user-image-input"
        />
        <button data-test="signup-btn" type="submit" disabled={loading}>
          {loading ? <Dots /> : lang.SIGNUP_BTN}
        </button>
        <Link to="/">
          <a data-test="login-link">{lang.LOGIN_LINK}</a>
        </Link>
      </form>
    </ContainerStyle>
  );
}
