import React from 'react';
import 'antd/dist/antd.css';
import nodeExpressPng from '../../../assets/node_express.png'
import swaggerPng from '../../../assets/swagger.png'
import postgresTypeormPng from '../../../assets/postgres_typeorm.png'
import './home.css';
import {Col, Row, Divider} from "antd";
import antDesignSvg from '../../../assets/antdesign.svg'
import reactJsPng from '../../../assets/reactjs.png'
import reduxPng from '../../../assets/redux.png'
import { useTranslation } from 'react-i18next';


export default function Home () {
    const { t } = useTranslation();
    return (
        <div className="container padding">
            <div>
                <h1>{t('home.welcome')}</h1>
                <div  dangerouslySetInnerHTML={
                    {__html: t('home.description', {interpolation: {escapeValue: false}})}
                } />
            </div>
            <div>
                <h2>{t('home.realisation')}</h2>
                <div className="space-children">
                    <h3>Backend</h3>
                    <div>{t('home.backend-description')}</div>
                    <Row justify="center" align="middle" gutter={16}>
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6} >
                            <img src={nodeExpressPng} alt={"Node et Express"} />
                        </Col>
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6} >
                            <div>{t('home.backend-nodejs')}</div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" gutter={16}>
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6}>
                            <div dangerouslySetInnerHTML={
                                {__html: t('home.backend-swagger', {interpolation: {escapeValue: false}})}
                            } />
                        </Col>
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <img src={swaggerPng} alt={"Tsoa et Typescript"} />
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" gutter={16}>
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <img src={postgresTypeormPng} alt={"Typeorm et Postgres"} />
                        </Col>
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <div>{t('home.backend-typeorm')}</div>
                        </Col>
                    </Row>
                </div>
                <Divider/>
                <div className="space-children">
                    <h3>Frontend</h3>
                    <div>{t('home.frontend-description')}</div>
                    <Row justify="center" align="middle" gutter={16}>
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <div>React</div>
                        </Col>
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6}>
                            <img src={reactJsPng} alt={"React"} />
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <img src={reduxPng} alt={"redux et redux-saga"} />
                        </Col>
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6}>
                            <div>Redux {t('common.and')} Redux saga</div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <div><a target={"_blank"} href={"https://ant.design/"}>Ant Design</a></div>
                        </Col>
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6}>
                            <img src={antDesignSvg} alt={"Ant Design"} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
