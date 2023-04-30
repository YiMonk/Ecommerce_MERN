import { createContext, useState, useEffect } from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false)

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get("/api/user/refreshToken")
                setToken(res.data.accesstoken)
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    }, [])

    ProductsAPI()

    const state = {
        token: [token, setToken],
        ProductsAPI: ProductsAPI(),
        UserAPI: UserAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}