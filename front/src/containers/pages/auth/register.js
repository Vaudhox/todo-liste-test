import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Button, Spin, Form, Input } from 'antd';
import { Capitalize } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 75, color: "chocolate" }} spin />;

function Register(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.app.formError)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
    }
  }, [errorMessage])

  const onFinish = async (values) => {
    setLoading(true);
    dispatch({type: "REGISTER_REQUESTED", payload: {email: values.email, password: values.password, firstName: values.firstName, lastName: values.lastName}})
  };

  return (
    <div style={{
      display: "flex"
    }}>
      <div className={"boxShadow inlineBlock center"} style={{
        padding: 25,
      }}>
        { loading ? <Spin size='large' indicator={antIcon} />  : <>

        {
           errorMessage.length > 0 && <div style={{color: 'red'}}>{Capitalize(t("auth." + errorMessage.toLowerCase()))}</div>
         }
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={Capitalize(t('user.email'))}
            name="email"
            rules={[{ required: true, message:  Capitalize(t('auth.please-enter-input')) + t('user.email')  + ' !' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={Capitalize(t('user.firstname'))}
            name="firstName"
            rules={[{ required: true, message:  Capitalize(t('auth.please-enter-input')) + t('user.firstname')  + ' !' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={Capitalize(t('user.lastname'))}
            name="lastName"
            rules={[{ required: true, message: Capitalize(t('auth.please-enter-input')) + t('user.lastname')  + ' !'}]}
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
             {Capitalize(t('common.submit'))}
            </Button>
          </Form.Item>
        </Form>

        </> }

      </div>
    </div>


  );

}

export default Register
