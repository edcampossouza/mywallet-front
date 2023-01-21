import { useContext } from "react";
import { UserContext } from "../contexts/contexts";
import InputContainer from "../styles/InputPages.js";

export default function AddExpense() {
  const { lang } = useContext(UserContext);
  function submit(e) {
    e.preventDefault();
  }
  return (
    <InputContainer>
      <h1>{lang.NEW_EXPENSE}</h1>
      <form onSubmit={submit}>
        <input placeholder={lang.VALUE} />
        <input placeholder={lang.DESCRIPTION} />
        <button>{lang.SAVE_EXPENSE}</button>
      </form>
    </InputContainer>
  );
}
