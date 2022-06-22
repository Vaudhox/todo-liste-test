import * as React from "react";
import "./App.css";
import Layout from "./containers/layout";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();
  const lang = useSelector((state) => state.app.language);
  //const rememberMe = useSelector((state) => state.user.remember_me);
  //const dispatch = useDispatch()

  useEffect(()=> {
    i18n.changeLanguage(lang);//Init language

  }, []);

  return (
    <Layout />
  );
}

export default App;
