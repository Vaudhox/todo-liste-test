import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { Capitalize } from '../../../utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../../services/API';
import { useNavigate  } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const antIcon = <LoadingOutlined style={{ fontSize: 75, color: "chocolate" }} spin />;

function Login() {
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
    dispatch({type: "LOGIN_REQUESTED", payload: {email: values.email, password: values.password}})
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
      initialValues={{ remember: false }}
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
        label={Capitalize(t('auth.password'))}
        name="password"
        rules={[{ required: true, message: Capitalize(t('auth.please-enter-input')) + t('auth.password')  + ' !'}]}
      >
        <Input.Password />
      </Form.Item>

     {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>{Capitalize(t('auth.remember-me'))}</Checkbox>
      </Form.Item>
*/}
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
};

export default Login
