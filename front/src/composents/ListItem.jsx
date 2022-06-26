import {Button, Collapse, DatePicker, Input, List, Modal, notification, Tabs} from "antd";
import {Capitalize} from "../utils";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import moment from 'moment';
const { Panel } = Collapse;
const { TabPane } = Tabs;

export default function ListItem({item}) {

    const { t } = useTranslation();
    const [title, setTitle] = useState(item.title)
    const [endDate, setEndDate] = useState(item.endDate ? item.endDate.toString().split('T')[0] : '');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setTitle(item.title);
        setEndDate(item.endDate ? item.endDate.toString().split('T')[0] : '')
    }, [item])

    const onChangeDatePicker = (date) => {
        if (date) {
            const dateEnd = date.format('L')
            setEndDate(dateEnd);
        } else {
            setEndDate(null);
        }

    }

    const onFinish = () => {
        if (title) {
            dispatch({type: "UPDATE_LIST_REQUEST", payload: {listId: item.id, title: title, endDate: endDate}})
            setEndDate('');
            setTitle('');
        } else {
            notification.error({
                message: "A title is require",
            })
        }
    }

    const renderPanelHeader = (item) => {
        return (
            <h4 onClick={() => navigate('/list/' + item.id)}>{item.title}</h4>
        )
    }


    const onDelete = () => {
        dispatch({type: "DELETE_LIST_REQUEST", payload: { listId: item.id }})
    }

    return (
        <Collapse style={{width: "100%"}} accordion ghost>
            <Panel header={renderPanelHeader(item)} key="1">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('common.details')} key="detailsKey">
                        { item.endDate ? <p>{t('list.date-end')}: {item.endDate.toString().split('T')[0]}</p> : <p>{t('list.no-end-date')}</p>}
                        <p>{t('list.cron-details')}</p>
                    </TabPane>
                    <TabPane tab={t('common.update')} key="updateKey">
                        <div>
                            <div style={{display: 'grid', maxWidth: 200}}>
                                <Input value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)}/>

                                <DatePicker style={{marginTop: 5}} value={moment(item.endDate)} onChange={onChangeDatePicker} placement="bottomRight"/>
                                <Button style={{marginTop: 5}} type="primary" htmlType="submit" onClick={onFinish}>
                                    {t('common.update')}
                                </Button>
                            </div>
                            <div>
                                <Button type="danger" onClick={onDelete}>
                                    {t('common.delete')}
                                </Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Panel>
        </Collapse>
    )
}
