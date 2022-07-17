
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import menuIcon from '../../icones/hamburguer.svg';
import logo from '../../logo-in8-dev.svg';
import menuIconSel from '../../icones/hamburguer-aberto0.svg';
import '../../App.css';


const nearestIndex = (
    currentPosition,
    sectionPositionArray,
    startIndex,
    endIndex
  ) => {
    if (startIndex === endIndex) return startIndex;
    else if (startIndex === endIndex - 1) {
      if (
        Math.abs(
          sectionPositionArray[startIndex].current.offsetTop -
            currentPosition
        ) <
        Math.abs(
          sectionPositionArray[endIndex].current.offsetTop -
            currentPosition
        )
      )
        return startIndex;
      else return endIndex;
    } else {
      var nextNearest = ~~((startIndex + endIndex) / 2);
      var a = Math.abs(
        sectionPositionArray[nextNearest].current.offsetTop -
          currentPosition
      );
      var b = Math.abs(
        sectionPositionArray[nextNearest + 1].current.offsetTop -
          currentPosition
      );
      if (a < b) {
        return nearestIndex(
          currentPosition,
          sectionPositionArray,
          startIndex,
          nextNearest
        );
      } else {
        return nearestIndex(
          currentPosition,
          sectionPositionArray,
          nextNearest,
          endIndex
        );
      }
    }
  };

export function NavBarMobile({ navHeader }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    useEffect(() => {
    const handleScroll = (e) => {
      var index = nearestIndex(
        window.scrollY,
        navHeader,
        0,
        navHeader.length - 1
      );
      setActiveIndex(index);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
    }, []);


    return (
        <div className='mb-nv-wrapper' style={{ backgroundColor: activeIndex > 0 ? '#0005' : '#0000'}}>
            <div className='mobile-navbar'>
            
                <button style={{backgroundColor:'transparent', border:'none'}} onClick={()=>{
                    setMenuVisible(true);
                }}><img src={menuIcon} className="hamburguer" alt="menu"/></button>
                <a href="#idx-img">
                    <img src={logo} className="app-logo-mobile" alt="logo"/>
                </a>
            </div>
            <div className="mobile-menu" style={{display:menuVisible ? 'inline' : 'none'}}>
                <button style={{backgroundColor:'transparent', border:'none', marginTop:'2vh'}} onClick={()=>{
                    setMenuVisible(false);
                }}><img src={menuIconSel} className="hamburguer" alt="menu"/></button>
                <div style={{marginTop:'8vh'}}><a href='#register' style={{textDecoration:'none'}}>cadastro</a></div>
                <div style={{marginTop:'3vh'}}><a href='#list'  style={{textDecoration:'none'}}>lista</a></div>
                <div style={{marginTop:'3vh'}}><a href='#footer'  style={{textDecoration:'none'}}>sobre mim</a></div>
            </div>
        </div>
        
    )
}

NavBarMobile.propTypes = {
    navHeader: PropTypes.arrayOf(PropTypes.object).isRequired
};