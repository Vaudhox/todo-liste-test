import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, List, Spin, DatePicker, Modal, notification } from 'antd';
import { LoadingOutlined, PlusCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Capitalize, useQuery } from '../utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 75, color: "chocolate" }} spin />;

export default function AddList ({styleIcon, style}) {

    const { t } = useTranslation();
    const dispatch = useDispatch()
  //  const lists = useSelector((state) => state.list.lists);
   // const loadingLists = useSelector((state) => state.list.loading);
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [endDate, setEndDate] = useState("")
    const [showModal, setShowModal] = useState(false);

    const handleCancel = () => {
        setShowModal(false)
    }

    const onChangeDatePicker = (date) => {
        if (date) {
            const dateEnd = date.format('L')
            console.log(dateEnd);
            setEndDate(dateEnd);
        } else {
            setEndDate(null);
        }

    }

    const onFinish = () => {
        if (title) {
            setShowModal(false)
            dispatch({type: "ADD_LIST_REQUEST", payload: {title: title, endDate: endDate}})
            setEndDate('');
            setTitle('');
        } else {
            notification.error({
                message: "A title is require",
              })
        }
    }

    return (
        <div style={style}>
            <PlusCircleFilled onClick={() => setShowModal(true)} style={styleIcon}/>
            <Modal
                title="Add a list"
                centered
                closable
                visible={showModal}
                onCancel={handleCancel}
                bodyStyle={{display: 'grid'}}
                footer={null}
            >

                <Input value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)}/>

                <DatePicker onChange={onChangeDatePicker} placement="bottomRight"/>
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                    {Capitalize(t('common.submit'))}
                </Button>
            </Modal>
        </div>
    )
}
