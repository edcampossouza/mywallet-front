import { useContext, useState } from "react";
import { UserContext } from "../contexts/contexts";
import InputContainer from "../styles/InputPages.js";
import { postAuthenticated } from "../services/api";

export default function AddRegistry({ type }) {
  const { lang } = useContext(UserContext);
  const [ammount, setAmmount] = useState(0);
  const [description, setDescription] = useState("");
  function submit(e) {
    e.preventDefault();
    postAuthenticated(
      type,
      { ammount, description },
      (message) => {
        alert(message);
      },
      (error) => {
        alert(error);
      }
    );
  }

  function setFormattedAmmount(e) {
    let ammnt = e.target.value;
    ammnt = ammnt.replace(/\D/g, "");
    ammnt = parseFloat(ammnt) || 0.0;
    ammnt = ammnt / 100.0;
    setAmmount(ammnt);
  }

  return (
    <InputContainer>
      <h1>{type === "expense" ? lang.NEW_EXPENSE : lang.NEW_INCOME}</h1>
      <form onSubmit={submit}>
        <input
          placeholder={lang.VALUE}
          value={ammount.toLocaleString(lang.LOCALE_STRING, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          onChange={(e) => setFormattedAmmount(e)}
          required
        />
        <input
          placeholder={lang.DESCRIPTION}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button>
          {type === "expense" ? lang.SAVE_EXPENSE : lang.SAVE_INCOME}
        </button>
      </form>
    </InputContainer>
  );
}
