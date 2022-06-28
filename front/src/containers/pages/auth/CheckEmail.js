import { Form, Input, Button, Row, Spin, Col, notification  } from 'antd';
import { Capitalize, useQuery } from '../../../utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import SpinnerCustom from "../../../composents/SpinnerCustom";

function CheckYourEmail() {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const [messageError, setMessageError] = useState("");
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const token = query.get("token");
    const id = query.get("id");
    if (token && id) {
      dispatch({type: "CHECK_EMAIL_REQUESTED", payload: {id: id, token: token}})
    } else {
      setMessageError("error-check-email")
    }
  }, [])

  useEffect(() => {
    if (messageError) {
      notification["error"]({
        message: Capitalize(t("auth." + messageError.toLowerCase())),
      });
    }
  }, [messageError])

  const onChange = async (event) => {
    setEmail(event.target.value)
  };

  const SendEmail = async () => {
    dispatch({type: "SEND_VERIFY_EMAIL_REQUESTED", payload: {email: email}})
    notification["success"]({
      message: "Verification Email send",
    });
  }


  const renderInputAskEmail = () => {
    return (
      <>
        <Input
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <Button style={{marginTop: 10}} type="primary" htmlType="submit" onClick={SendEmail}>
          {Capitalize(t('auth.sendEmailVerification'))}
        </Button>
      </>
    )
  }
  return(
    <Row justify="center" align="middle">
      <Col span={12}>
        {
          load ? <SpinnerCustom /> : renderInputAskEmail()
        }
      </Col>
    </Row>
  )
}

export default CheckYourEmail
