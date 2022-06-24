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


export default function Home () {

    return (
        <div className="container padding">
            <div>
                <h1>Bienvenue sur mon site de todo list</h1>
                <div>Celui-ci à été réaliser dans le cadre d'un test technique</div>
                <div>
                    Cette solution permet de créer des listes et des tâches à effectuer, quelques fonctionnallité:
                </div>
                <br/>
                <div className="container-list">
                    <ul>
                        <li>Connexion JWT et Refresh token</li>
                        <li>Vérification email et envoie de mail avec Sendgrid</li>
                        <li>Déploiment continue sur un VPS pour le backend et sur Netlify pour le front</li>
                        <li>Multi-language</li>
                    </ul>
                </div>

            </div>
            <div>
                <h2>Réalisation</h2>
                <div className="space-children">
                    <h3>Backend</h3>
                    <div>Architecture API Domain Driven Development</div>
                    <Row justify="center" align="middle">
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6} >
                            <img src={nodeExpressPng} alt={"Node et Express"} />
                        </Col>
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6} >
                            <div>NodeJs et Express</div>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col  xs={20} sm={20} md={6} lg={6} xl={6}>
                            <div>Typescript avec Tsoa et <a target={"_blank"} href={process.env.REACT_APP_API_URL + "api-docs"}>swagger pour la documentation API</a></div>
                        </Col>
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <img src={swaggerPng} alt={"Tsoa et Typescript"} />
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <img src={postgresTypeormPng} alt={"Typeorm et Postgres"} />
                        </Col>
                        <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                            <div>Typeorm pour l'orm connecter à une base de donnée Postgres héberger sur Heroku</div>
                        </Col>
                    </Row>
                </div>
                <Divider/>
                <div className="space-children">
                    <h3>Frontend</h3>
                    <div>Architecture containers et components</div>
                    <Row justify="center" align="middle">
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
                            <div>Redux et Redux saga</div>
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
