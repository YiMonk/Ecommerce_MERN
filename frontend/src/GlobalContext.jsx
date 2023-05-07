import { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import axios from "axios";

export const GlobalContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin"); 
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/api/user/refreshToken");
        setToken(res.data.accesstoken);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

    const state={
        token: [token, setToken],
        ProductsAPI: ProductsAPI(),
        UserAPI : UserAPI(token),
    }

    return(
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
};