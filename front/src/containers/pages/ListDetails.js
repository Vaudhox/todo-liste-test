import React, { useEffect, useState } from 'react';
import { Row, Col, List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 75, color: "chocolate" }} spin />;

export default function ListDetails () {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.list.lists);
    const tasks = useSelector((state) => state.list.tasks);
    const loadingList = useSelector((state) => state.list.loading);
    const { id } = useParams();
    const navigate = useNavigate();
    const [listShow, setListShow] = useState(null)

    useEffect(() => {
        if (lists.lenght != 0) {
            const listToShow = lists.find(list => list.id === id);
            if (listToShow) {
                setListShow(listToShow)
                dispatch({type: "TASKS_REQUEST", payload: {listId: listToShow.id}})
            } else {
                navigate('/lists')
            }
        } else {
                navigate('/lists')
        }
    },[])

    return (
        <Row justify="center" align="middle">
            <Col span={12}>
            { loadingList || !listShow ? <Spin size='large' indicator={antIcon} /> : <>
           
                <List
                    header={<div>{listShow.title}</div>}
                    bordered
                    dataSource={tasks}
                    renderItem={item => (
                        <List.Item>
                            {item.text}
                        </List.Item>
                    )}
                />
            </>
           }
            </Col>
        </Row>
    )
}
