import {
    BrowserRouter as Router,
    Switch,
    Route, useNavigate,
} from 'react-router-dom';
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

export function PrivateRoute ({children}) {

    const access_token = useSelector((state) => state.user.access_token)
    let navigate = useNavigate();


    useEffect(() => {
        if (!access_token) {
            navigate("/login");
        }
    })

    return children
}
