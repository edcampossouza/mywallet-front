import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi/";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";
import { UserContext } from "../contexts/contexts";
import { getAuthenticated } from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser, lang, logout } = useContext(UserContext);
  const [registries, setRegistries] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user) {
      const userLs = localStorage.getItem("user");
      if (userLs) {
        setUser(JSON.parse(userLs));
      } else navigate("/");
    }
  }, [user]);

  useEffect(() => {
    async function fetchRegistries() {
      getAuthenticated(
        "registry",
        (data) => setRegistries(data),
        (error) => alert(error)
      );
    }
    fetchRegistries();
  }, []);

  useEffect(() => {
    const value = registries.reduce(
      (prev, curr) =>
        curr.type === "C" ? prev + curr.ammount : prev - curr.ammount,
      0
    );
    setBalance(value);
  }, [registries]);

  return (
    <HomeContainer>
      <h1>
        {lang.HELLO}, {user?.name}
        <LogoutIcon onClick={logout} />
      </h1>
      {registries.length == 0 ? (
        <EmptyRegistries>
          <span>{lang.NO_REGISTRIES_MSG}</span>
        </EmptyRegistries>
      ) : (
        <RegistriesContainer>
          <RegistriesStyle>
            {registries.map((registry) => (
              <RegistryRow type={registry.type}>
                <span className="registry-details">
                  <div className="date">
                    {(() => {
                      const date = new Date();
                      date.setTime(registry.datetime);
                      return date.toLocaleString(lang.LOCALE_STRING, {
                        day: "2-digit",
                        month: "2-digit",
                      });
                    })()}
                  </div>
                  <div className="description">{registry.description}</div>
                </span>
                <div className="value">{registry.ammount.toFixed(2)}</div>
              </RegistryRow>
            ))}
          </RegistriesStyle>
          <BalanceRow type={balance >= 0 ? "C" : "D"}>
            <span className="text">{lang.BALANCE}</span>
            <span className="value">{Math.abs(balance).toFixed(2)}</span>
          </BalanceRow>
        </RegistriesContainer>
      )}
      <ButtonsRow>
        <AddButton onClick={() => navigate("/nova-entrada")}>
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

const RegistriesContainer = styled(EmptyRegistries)`
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;
const RegistriesStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 90%;
  overflow-y: auto;
`;

const RegistryRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .registry-details {
    display: flex;
  }
  .date {
    margin-right: 5px;
    color: #c6c6c6;
  }
  .description {
    color: #000;
    white-space: nowrap;
  }
  .value {
    color: ${(props) => (props.type === "D" ? "#C70000" : "#03AC00")};
  }
`;

const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  max-height: 20px;
  .text {
    color: #000;
    font-weight: bold;
  }
  .value {
    color: ${(props) => (props.type === "D" ? "#C70000" : "#03AC00")};
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
