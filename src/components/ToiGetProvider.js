import React, { useState, createContext, useContext, useEffect } from "react";

import users from "../users.json";
import toiget from "../toiget.json";
import openingHours from "../openingHours.json";

import { atualizaDistancias } from "../util/utils";

const userAuthContext = createContext();

const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("2342f2f1d131rf12"), 250);
  });

  // Componente de contexto

export default function ToiGetProvider({ children }) {
  const [token, setToken] = useState(null);               // Indica se há um usuário logado
  const [userList, setUserList] = useState(users.users);  // lista de usuários (via JSON)
  const [user, setUser] = useState(null);                 // Se há um usuário logado, contém suas propriedades

  const [toiletList, setToiletList] = useState(null);     // lista de banheiros (versão inicial, via JSON)
  const [distanceList, setDistanceList] = useState([]);   // distâncias em relação ao ponto de referência
  const [currentPosition, setCurrentPosition] = useState(null);  // ponto de referência para o cálculo das distâncias
  const [toiletPosition, setToiletPosition] = useState(null);    // posição do banheiro que será incluído ou alterado

  const [insertMode, setInsertMode] = useState(false);           // indica se há uma inclusão em andamento
  const [insertError, setInsertError] = useState(false);         // indica se há um erro que impede a inclusão de um banheiro
  const [updateMode, setUpdateMode] = useState(false);           // indica se há uma alteração em andamento
  const [updateError, setUpdateError] = useState(false);         // indica se há um erro que impede a alteração de um banheiro
  const [updateAuthorizationError, setUpdateAuthorizationError] = useState(false);         
                                  // indica se há um erro que impede a alteração de um banheiro por falta de autorização

  useEffect(() => {
    if (currentPosition) {                 // se a posição de referência ou a lista de banheiros mudou, atualiza as distâncias
      localStorage.setItem("currentPosition", JSON.stringify(currentPosition));
      localStorage.setItem("toiletList", JSON.stringify(toiletList));
      setDistanceList(() => atualizaDistancias(toiletList, currentPosition));
    }
  }, [currentPosition, toiletList]);

  useEffect(() => {                        // guarda o token do usuário logado
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));  // recupera o token do usuário logado, caso exista
    if (token) {
      setToken(token);
    }
    const currentPosition = JSON.parse(localStorage.getItem("currentPosition"));  // posição de referência
    if (currentPosition) {
      setCurrentPosition(() => currentPosition);
    } else {
      setCurrentPosition(() => [-23.004678325889472, -43.31867551816686]);
    }
    const toiletList = JSON.parse(localStorage.getItem("toiletList"));  // lista de banheiros atual
    if (toiletList) {
      setToiletList(() => toiletList);
      if (!(currentPosition == null)) {
        setDistanceList(() => atualizaDistancias(toiletList, currentPosition));
        }
    } else {
      let toiletList = [];
      let openingHoursList = openingHours.openingHours;
      for (let i = 0; i < toiget.toilets.length; i++) {
        let toilet = toiget.toilets[i];
        let toiletOpeningHours = openingHoursList.filter(
          (horario) => horario.toiletId === toilet.pk_toilet
        );
        let horarios = [];
        for (let j = 0; j < toiletOpeningHours.length; j++) {
          horarios.push({
            weekday: toiletOpeningHours[j].weekday,
            openClosed: toiletOpeningHours[j].openClosed,
            openingTime: toiletOpeningHours[j].openingTime,
            closingTime: toiletOpeningHours[j].closingTime,
          })
        }
        toiletList.push({
          id: toilet.pk_toilet,
          latitude: toilet.latitude,
          longitude: toilet.longitude,
          classification: toilet.classification,
          description: toilet.description,
          toiletType: toilet.toiletType,
          insertDate: toilet.insertDate,
          user: toilet.user,
          openingHours: horarios,
        });
      }
      setToiletList(() => toiletList);
      localStorage.setItem("toiletList", JSON.stringify(toiletList));
      if (currentPosition) {
        setDistanceList(() => atualizaDistancias(toiletList, currentPosition)); 
        }
    }
  }, []);

  const handleLogin = async () => {   // login "fake"
    const token = await fakeAuth();
    setToken(token);
  };

  const handleLogout = () => {        // processamento do logout
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setInsertMode(() => false);
    setUpdateMode(() => false);
  };

  const value = {                // lista de propriedades compartilhadas entre os componentes
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    userList,
    setUserList,
    toiletList,
    setToiletList,
    currentPosition,
    setCurrentPosition,
    toiletPosition,
    setToiletPosition,
    distanceList,
    setDistanceList,
    insertMode,
    setInsertMode,
    insertError,
    setInsertError,
    updateMode,
    setUpdateMode,
    updateError,
    setUpdateError,
    updateAuthorizationError,
    setUpdateAuthorizationError,
    user,
    setUser,
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useToiGet() {
  return useContext(userAuthContext);
}
