import { useContext } from "react"
import AuthContext from './../../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

function NotAuth() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate() ;

    if (user) navigate('/');

    return (
        <Outlet />
    );
}

export default NotAuth
