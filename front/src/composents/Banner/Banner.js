import BannerAnim, { Element } from 'rc-banner-anim';
import React from 'react';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import './banner.css'
import hmeImg from '../../assets/header.jpg';
import hmeImg2 from '../../assets/140.jpg';
import { useNavigate  } from "react-router-dom";

const BgElement = Element.BgElement;
export const Banner = ({title, subTitle, renderHeaderBar}) =>{
  const navigate = useNavigate()
  const redirectHome = () => {
    navigate("/");
  }
  return (
    <BannerAnim prefixCls="banner-user">
      <Element
        prefixCls="banner-user-elem"
        key="0"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: `url(${hmeImg2})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        {renderHeaderBar()}
        <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }} onClick={redirectHome}>
          {title}
        </TweenOne>
        <TweenOne 
          className="banner-user-text"
          animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          onClick={redirectHome}
        >
          {subTitle}
        </TweenOne>
      </Element>
      <Element
        prefixCls="banner-user-elem"
        key="1"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: `url('https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        {renderHeaderBar()}
        <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }} onClick={redirectHome}>
          {title}
        </TweenOne>
        <TweenOne className="banner-user-text"
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                  onClick={redirectHome}
        >
          {subTitle}
        </TweenOne>
      </Element>
    </BannerAnim>
  )
}
