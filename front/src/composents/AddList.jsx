import React, { useState } from 'react';
import { Input, Button, DatePicker, Modal, notification } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Capitalize } from '../utils/index';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function AddList ({styleIcon, style}) {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [endDate, setEndDate] = useState("")
    const [showModal, setShowModal] = useState(false);

    const handleCancel = () => {
        setShowModal(false)
    }

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
                title={t('list.add-list')}
                centered
                closable
                visible={showModal}
                onCancel={handleCancel}
                bodyStyle={{display: 'grid'}}
                footer={null}
            >

                <Input value={title} placeholder={Capitalize(t('common.title'))} onChange={(event) => setTitle(event.target.value)}/>

                <DatePicker onChange={onChangeDatePicker} placement="bottomRight"/>
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                    {Capitalize(t('common.submit'))}
                </Button>
            </Modal>
        </div>
    )
}
