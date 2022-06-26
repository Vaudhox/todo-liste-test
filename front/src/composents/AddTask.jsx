import React, { useState } from 'react';
import { Input, Button, Row, Col, Switch, Modal, notification } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Capitalize } from '../utils/index';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function AddTask ({styleIcon, style, listId}) {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const [status, setStatus] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const handleCancel = () => {
        setShowModal(false)
    }


    const onFinish = () => {
        if (text) {
            setShowModal(false)
            dispatch({type: "ADD_TASK_REQUEST", payload: {listId: listId, text: text, status: status}})
            setText()
            setStatus(false)
        } else {
            notification.error({
                message: "A task is require",
              })
        }
    }

    return (
        <div style={style}>
            <PlusCircleFilled onClick={() => setShowModal(true)} style={styleIcon}/>
            <Modal
                title={t('list.add-task')}
                centered
                closable
                visible={showModal}
                onCancel={handleCancel}
                footer={null}
            >
                <Row justify="center" align="middle" gutter={16}>
                    <Col>
                        <Input value={text} placeholder={Capitalize(t('common.task'))} onChange={(event) => setText(event.target.value)}/>
                    </Col>
                    <Col>
                        <Switch onChange={(value) => setStatus(value)} />
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{marginTop: 10}} gutter={16}>
                    <Button type="primary" htmlType="submit" onClick={onFinish}>
                        {Capitalize(t('common.create'))}
                    </Button>
                </Row>

            </Modal>
        </div>
    )
}
