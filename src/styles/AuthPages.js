import styled from "styled-components";

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > span {
    font-family: "Saira Stencil One", cursive;
    color: #fff;
    font-size: 32px;
    margin-top: 100px;
    margin-bottom: 40px;
    width: 180px;
  }
  input,
  button {
    width: 303px;
    height: 45px;
    font-size: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    background-color: #a328d6;
    border-width: 0;
    font-size: 21px;
    color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  input {
    padding: 8px;
    border: 1px solid #dbdbdb;
    &::placeholder {
      color: #dbdbdb;
    }
    border-width: 1px;
  }
  a {
    margin-top: 20px;
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
