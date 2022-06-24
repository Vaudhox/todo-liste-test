import React, { useEffect } from 'react';
import { Language } from '../config/lang/Language.ts';
import { useDispatch, useSelector } from 'react-redux';
import { switchLang } from '../redux/app/appSlice';
import { useTranslation } from 'react-i18next';

function Lang({style, selectStyle}) {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const lang = useSelector((state) => state.app.language)

  useEffect(()=> {
    async function changeLanguage() {
      await i18n.changeLanguage(lang);
    }
    changeLanguage();
    return
  }, [lang])

  let changeLanguage = (event) => {
    let language = event.target.value;
    switch (language) {
      case Language.EN:
        dispatch(switchLang(Language.EN))
        break;
      case Language.FR:
      default:
        dispatch(switchLang(Language.FR))
        break;
    }
  }

  return (
    <div style={style}>
      <select style={selectStyle} value={lang} name="language" onChange={changeLanguage}>
        <option value={Language.FR}>FR</option>
        <option value={Language.EN}>EN</option>
      </select>
    </div>
  )
}

export default Lang;
