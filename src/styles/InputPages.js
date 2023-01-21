import styled from "styled-components";

export default styled.div`
  padding: 15px;
  font-family: "Raleway", sans-serif;
  color: #fff;
  h1 {
    font-weight: bold;
    font-size: 26px;
    display: flex;
    margin: 15px 0;
  }
  form {
    display: flex;
    flex-direction: column;
    input {
      margin: 5px;
      height: 38px;
      border-radius: 5px;
      border: none;
      ::placeholder {
        font-family: "Raleway", sans-serif;
        color: #000;
        padding: 5px;
      }
    }
    button {
      border: none;
      border-radius: 5px;
      margin: 5px;
      height: 38px;
      background-color: #a328d6;
      color: #fff;
      font-weight: bold;
      :hover {
        cursor: pointer;
      }
    }
  }
`;
