import { useState, createContext } from "react";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [picture, setPicture] = useState([]);

  // useEffect(() => {
  //   console.log(picture);
  // }, [picture]);

  return (
    <AppContext.Provider
      value={{
        picture,
        setPicture,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
