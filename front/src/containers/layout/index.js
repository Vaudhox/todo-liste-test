import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lang from '../../composents/SwitchLanguage';
import Root from '../../Root';
import { useSelector } from 'react-redux';
import { Banner } from '../../composents/Banner/Banner';
import TweenOne from 'rc-tween-one';
const { Header, Content, Footer, Sider } = Layout;


function LayoutDefault() {
  const { t } = useTranslation();
  const access_token = useSelector((state) => state.user.access_token)

  // Force rerender
  useEffect(() => {
  }, [access_token])


  const renderLinks = () => {
    if (access_token) {
      return(
        <>
          <Link to="/whoiam" style={{ marginLeft: 20}}>Whoiam</Link>
          <Link to="/logout" style={{ marginLeft: 20}}>Logout</Link>
        </>
      )
    } else {
      return (
          <>
            <Link to="/register" style={{ marginLeft: 20}}>Register</Link>
            <Link to="/login" style={{ marginLeft: 20}}>Login</Link>
          </>
      )
    }
  }

  const renderHeaderBar = () => {
    return (
      <div style={{ display: 'flex', position: 'absolute', right: 8, top:10, zIndex: 100 }}>
        <TweenOne style={{fontSize: 20}} animation={{ y: 30, opacity: 0, type: 'from' }}>
          <Link to="/about">{t('Welcome to React')}</Link>
          { renderLinks() }
        </TweenOne>
        <TweenOne style={{fontSize: 20, marginLeft: 10}} animation={{ y: 30, opacity: 0, type: 'from' }}>
          <Lang />
        </TweenOne>
      </div>
    )
  }
  return (
    <Layout style={{ padding: 0, backgroundColor: 'white'}}>
      <Banner title="Briere Todo List" subTitle="Test technique" renderHeaderBar={renderHeaderBar}/>
      <Content style={{ padding: '45px 40px 0', minHeight: 400, width: '100%' }}>
        <Root/>
      </Content>
      <Footer style={{position: 'relative', marginTop: 20, backgroundColor: 'white'}}>Gift Historical ©2021 Created by Nicolas Briere</Footer>
    </Layout>
  );
}

export default LayoutDefault;
