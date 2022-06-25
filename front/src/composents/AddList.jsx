import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, List, Spin, DatePicker, Modal, notification } from 'antd';
import { LoadingOutlined, PlusCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Capitalize, useQuery } from '../utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 75, color: "chocolate" }} spin />;

export default function AddList () {

    const { t } = useTranslation();
    const dispatch = useDispatch()
  //  const lists = useSelector((state) => state.list.lists);
   // const loadingLists = useSelector((state) => state.list.loading);
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [endDate, setEndDate] = useState(null)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        //dispatch({type: "LISTS_REQUESTED"})
    },[])

    const handleOk = () => {
      
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    const onChangeDatePicker = (date, dateString) => {
        console.log(date, dateString);
        setEndDate(dateString);
    }

    const onFinish = () => {
        if (title) {
            dispatch({type: "ADD_LIST_REQUEST", payload: {title: title, endDate: endDate}})
        } else {
            notification.error({
                message: "A title is require",
              })
        }
    }

    return (
        <div>
            <PlusCircleFilled onClick={() => setShowModal(true)}/>
            <Modal title="Add a list" centered closable visible={showModal} onCancel={handleCancel}>
                    
                <Input value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)}/>

                <DatePicker onChange={onChangeDatePicker} />
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                    {Capitalize(t('common.submit'))}
                </Button>
            </Modal>
        </div>
    )
}
