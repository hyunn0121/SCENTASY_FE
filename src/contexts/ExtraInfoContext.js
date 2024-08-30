import React, { createContext, useState} from "react";

export const ExtraInfoContext = createContext();

export const ExtraInfoProvider = ({ children}) => {
  const [extraInfo, setExtraInfo] = useState({
    email: "",
    nickname: "",
    tempNickname: "",
    gender: "",
    age: "",
    season: "",
    likedScents: [],
    dislikedScents: [],
    isLoggedIn: false,
    });

    return (
      <ExtraInfoContext.Provider value={{ extraInfo, setExtraInfo}}>
        {children}
      </ExtraInfoContext.Provider>
    );
};