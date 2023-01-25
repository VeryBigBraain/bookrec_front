import {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const loginUser = async (formData) => {

        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': formData.email, 'password': formData.password })
        })
        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/');
        } else {
            alert('Something not good!')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })
        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    const contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }

        const expireTime = 1000 * 60 * 4
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, expireTime)

        return () => clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
