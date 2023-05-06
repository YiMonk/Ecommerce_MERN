import { useState, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useState(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            "/api/user/Detalles",
            { header: { Authorization: token } }
          );

          setIsLogged(true);

          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

        } catch (error) {
          alert(error.res.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
  };
}
