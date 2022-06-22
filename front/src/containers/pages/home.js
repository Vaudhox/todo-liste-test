import React, { useEffect, useState } from 'react';
import API from '../../services/API';
import { Card, List } from 'antd';
import 'antd/dist/antd.css';

export default function Home () {
    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true)

    const renderCategories = () => {
      return (
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={categories}
          loading={loadingCategories}
          renderItem={item => {
            return (
              <List.Item>
                <Card  style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  height: 300,
                  position: 'relative',
                }}>
                  <div style={{
                    margin: 0,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}>
                    <p style={{
                      backgroundColor: 'antiquewhite',
                      padding: 10,
                    }}>
                      {item.name}
                    </p>
                  </div>
                </Card>
              </List.Item>
            )
          }}
        />
      )
    }
    return (
        <div>
          {renderCategories()}
        </div>
    )
}
