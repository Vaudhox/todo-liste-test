import {
    BrowserRouter as Router,
    Switch,
    Route, useNavigate,
} from 'react-router-dom';
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

export function PrivateRoute ({children}) {

    const access_token = useSelector((state) => state.user.access_token)
    
    const emailConfirm = useSelector((state) => state.user.emailConfirm)
    let navigate = useNavigate();


    useEffect(() => {
        if (!access_token || !emailConfirm) {
            navigate("/login");
        }
    })

    return children
}
