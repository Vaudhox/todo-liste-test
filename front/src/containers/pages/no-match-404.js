import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Result, Button } from 'antd';

function NoMatch404() {
  const [second, setSecond] = useState(5);
  let navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setInterval(() => {
      setSecond(prevCount => prevCount - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (second === 0) {
      navigate("/");
    }
  }, [second])

  return(
    <div style={{textAlign: 'center'}}>
      <Result
        status="404"
        title=""
        style={{textAlign: 'center'}}
      />
      <h1 style={{fontSize: 45}}>404</h1>
      <h3 style={{fontSize: 32}}>{t('common.error404') + ' ' +second}s</h3>
    </div>
  )
}


export default NoMatch404
