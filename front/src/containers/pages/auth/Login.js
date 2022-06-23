import { Form, Input, Button, Row, Spin, Col, notification } from 'antd';
import { Capitalize, useQuery } from '../../../utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../../services/API';
import { useNavigate  } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

const antIcon = <LoadingOutlined style={{ fontSize: 75, color: "chocolate" }} spin />;

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.app.formError)
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const query = useQuery();

  useEffect(() =>{
    if(query.get('emailConfirm')) {
      notification["success"]({
        message: "Votre email a bien été confirmé vous pouvez vous connecter",
      });
    }
  }, [])

  useEffect(() => {
    if (errorMessage) {
      setMessageError(errorMessage)
      setLoading(false);
    }
  }, [errorMessage])

  const onFinish = async (values) => {
    setLoading(true);
    dispatch({type: "LOGIN_REQUESTED", payload: {email: values.email, password: values.password}})
  };

  return (
      <Row justify="center" align="middle">
      <Col span={12} offset={6}>
      { loading ? <Spin size='large' indicator={antIcon} />  : <>

          {
            messageError.length > 0 && <div style={{color: 'red'}}>{Capitalize(t("auth." + messageError.toLowerCase()))}</div>
          }
          <Form
            name="login"
            labelCol= {{ span: 4 }}
            wrapperCol={ { span: 8 }}
            onFinish={onFinish}
          >
            <Form.Item
              label={Capitalize(t('user.email'))}
              name="email"
              rules={[{ required: true, message:  Capitalize(t('auth.please-enter-input')) + t('user.email')  + ' !' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={Capitalize(t('auth.password'))}
              name="password"
              rules={[{ required: true, message: Capitalize(t('auth.please-enter-input')) + t('auth.password')  + ' !'}]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button type="primary" htmlType="submit">
                {Capitalize(t('common.submit'))}
              </Button>
            </Form.Item>
          </Form>

        </> }

      </Col>
  </Row>
  );
};

export default Login
