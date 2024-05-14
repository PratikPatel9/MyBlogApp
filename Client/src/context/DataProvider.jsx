import React from "react";
import { createContext, useState } from "react"; //import creatContext

export const DataContext = createContext(null); //export context using DataContext name

const DataProvider = ({children}) => {
  const [accounts, setAccounts] = useState({ username: "", name: "" });
  return (
    <DataContext.Provider
      value={{
        accounts,
        setAccounts
      }}
    >
      { children }
    </DataContext.Provider>
  );
};

export default DataProvider;
