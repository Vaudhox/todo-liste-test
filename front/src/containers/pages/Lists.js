import React, { useEffect, useState } from 'react';
import {Row, Tabs, List, Collapse, Form, Input, Button, DatePicker, Modal} from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import AddList from '../../composents/AddList';
import SpinnerCustom from '../../composents/SpinnerCustom';
import {Capitalize} from "../../utils";
import ListItem from "../../composents/ListItem";


export default function Lists () {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.list.lists);
    const loadingLists = useSelector((state) => state.list.loading);

    useEffect(() => {
        dispatch({type: "LISTS_REQUESTED"})
    },[])

    const renderHeader = () => {
        return (
            <div style={{textAlign: "center"}}>
                <h2 style={{marginTop: 8}}>My Lists</h2>
                <AddList styleIcon={{fontSize: 32}} style={{position: "absolute", right: 15, top: 15}}/>
            </div>
        )
    }

    const renderList =() => {
        return (
            <List
                header={renderHeader()}
                bordered
                dataSource={lists}
                renderItem={item => (
                    <List.Item style={{width: "100%"}}>
                       <ListItem item={item} />
                    </List.Item>
                )}
            />
        )
    }
    return (
        <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
            { loadingLists ? <SpinnerCustom /> : renderList() }
        </div>
    )
}
