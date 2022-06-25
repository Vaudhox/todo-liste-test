import React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import {Col, Row, Spin} from "antd";

export default function SpinnerCustom({color, size}) {

    const antIcon = <LoadingOutlined style={{ fontSize: size ? size : 75, color: color ? color : "blue" }} spin />;
    return (
        <Row justify="center" align="middle">
            <Col>
                <Spin size='large' indicator={antIcon} />
            </Col>
        </Row>
    )
}
