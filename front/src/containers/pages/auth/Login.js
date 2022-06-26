import { Form, Input, Button, Row, Spin, Col, notification } from 'antd';
import { Capitalize, useQuery } from '../../../utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import SpinnerCustom from "../../../composents/SpinnerCustom";
import listPng from "../../../assets/list-pen.jpg";

function Login() {
  const {t} = useTranslation();
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.app.formError)
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const query = useQuery();

  useEffect(() => {
    if (query.get('emailConfirm')) {
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


  const renderLoginForm = () => {
    return (
        <>
          {
            messageError.length > 0 &&
            <div style={{color: 'red'}}>{Capitalize(t("auth." + messageError.toLowerCase()))}</div>
          }
          <Row justify="center" align="middle" gutter={16}>
            <Col xs={{
              order: 2,
              span: 20
            }} sm={20} md={6} lg={6} xl={6}>
              <Form
                  name="login"
                  onFinish={onFinish}
              >
                <Form.Item
                    label={Capitalize(t('user.email'))}
                    name="email"
                    rules={[{
                      required: true,
                      message: Capitalize(t('auth.please-enter-input')) + t('user.email') + ' !'
                    }]}
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                    label={Capitalize(t('auth.password'))}
                    name="password"
                    rules={[{
                      required: true,
                      message: Capitalize(t('auth.please-enter-input')) + t('auth.password') + ' !'
                    }]}
                >
                  <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 4, span: 14}}>
                  <Button type="primary" htmlType="submit">
                    {Capitalize(t('common.submit'))}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xs={{order: 1, span: 20}} sm={20} md={6} lg={6} xl={6} style={{marginBottom: 10}}>
              <img src={listPng}/>
            </Col>
          </Row>
        </>
    )
  }

  return (
      <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
        {loading ? <SpinnerCustom/> : renderLoginForm()}
      </div>
  )
}
export default Login
