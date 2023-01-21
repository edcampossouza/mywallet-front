import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi/";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";
import { UserContext } from "../contexts/contexts";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser, lang, logout } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      const userLs = localStorage.getItem("user");
      if (userLs) {
        setUser(JSON.parse(userLs));
      } else navigate("/");
    }
  }, [user]);
  return (
    <HomeContainer>
      <h1>
        {lang.HELLO}, {user?.name}
        <LogoutIcon onClick={logout} />
      </h1>
      <EmptyRegistries>
        <span>{lang.NO_REGISTRIES_MSG}</span>
      </EmptyRegistries>
      <ButtonsRow>
        <AddButton>
          <PlusIcon />
          {lang.NEW_INCOME}
        </AddButton>
        <AddButton onClick={() => navigate("/nova-saida")}>
          <MinusIcon />
          {lang.NEW_EXPENSE}
        </AddButton>
      </ButtonsRow>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  padding: 15px;
  font-family: "Raleway", sans-serif;
  color: #fff;
  h1 {
    font-weight: bold;
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
`;
const LogoutIcon = styled(HiOutlineLogout)`
  :hover {
    cursor: pointer;
  }
`;

const EmptyRegistries = styled.div`
  color: #868686;
  background-color: #fff;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  span {
    max-width: 180px;
    text-align: center;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const AddButton = styled.button`
  background-color: #a328d6;
  border: none;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  font-size: 17px;
  color: #fff;
  border-radius: 5px;
  width: calc(50% - 7px);
  height: 114px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  :hover {
    cursor: pointer;
  }
`;

const PlusIcon = styled(AiOutlinePlusCircle)`
  font-size: 25px;
`;
const MinusIcon = styled(AiOutlineMinusCircle)`
  font-size: 25px;
`;
