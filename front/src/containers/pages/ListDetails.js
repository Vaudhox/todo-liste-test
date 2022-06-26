import React, { useEffect, useState } from 'react';
import {Row, Col, List, Spin, Switch, Button} from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import AddTask from "../../composents/AddTask";
import SpinnerCustom from "../../composents/SpinnerCustom";
import { LeftCircleFilled } from '@ant-design/icons';


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

    const renderHeader = () => {
        return (
            <div style={{textAlign: "center"}}>
                <LeftCircleFilled
                    style={{fontSize: 28, position: "absolute", left: 10, top: 10}}
                    onClick={() => navigate('/lists')}
                />
                <h2 style={{marginTop: 8}}>{listShow.title}</h2>
                { listShow.endDate ? <p>{t('list.date-end')}: {listShow.endDate.toString().split('T')[0]}</p> : <p>{t('list.no-end-date')}</p>}
                <AddTask listId={listShow.id} styleIcon={{fontSize: 32}} style={{position: "absolute", right: 10, top: 10}}/>
            </div>
        )
    }

    const onChangeStatus = (value, item) => {
        dispatch({type: "UPDATE_TASK_REQUEST", payload: {taskId: item.id, listId: item.listId, text: item.text, status: value}})
    }

    const onDeleteTask = (item) => {
        dispatch({type: "DELETE_TASK_REQUEST", payload: {taskId: item.id, listId: item.listId }})
    }

    const renderList = () => {
        return (
            <List
                header={renderHeader()}
                bordered
                dataSource={tasks}
                renderItem={item => (
                    <List.Item>
                        <Row justify="center" gutter={16}>
                            <Col>
                            <h3>{item.text}</h3>
                            </Col>
                            <Col>
                                <Switch style={{marginLeft: 5}} checked={item.status} onChange={(value) => {onChangeStatus(value, item)}} />
                            </Col>
                            <Col>
                                <Button type="danger" onClick={() =>{ onDeleteTask(item)}}>
                                    {t('common.delete')}
                                </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        )
    }

    return (
        <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
            { loadingList || !listShow ? <SpinnerCustom /> : renderList() }
        </div>
    )
}
