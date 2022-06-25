import React, { useEffect, useState } from 'react';
import { Row, Col, List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import AddList from '../../composents/AddList';

const antIcon = <LoadingOutlined style={{ fontSize: 75, color: "chocolate" }} spin />;

export default function Lists () {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.list.lists);
    const loadingLists = useSelector((state) => state.list.loading);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: "LISTS_REQUESTED"})
    },[])


    return (
        <Row justify="center" align="middle">
            <Col span={12}>
            { loadingLists ? <Spin size='large' indicator={antIcon} />  : <>
           
                <List
                    header={<div>
                        <h2>My Lists</h2>
                        <AddList />
                    </div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={lists}
                    renderItem={item => (
                        <List.Item style={{cursor: 'pointer'}} onClick={() => navigate('/list/' + item.id)}>
                            {item.title}
                        </List.Item>
                    )}
                />
            </>
           }
            </Col>
        </Row>
    )
}
