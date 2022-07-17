import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import logo from '../../logo-in8-dev.svg';
import '../../App.css';

/**
 * @param {number} currentPosition Current Scroll position
 * @param {Array} sectionPositionArray Array of positions of all sections
 * @param {number} startIndex Start index of array
 * @param {number} endIndex End index of array
 * @return {number} Current Active index
 */
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

export function NavBar({ navHeader }) {
  const [activeIndex, setActiveIndex] = useState(0);
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
    <div className = 'toolbar' style={{ backgroundColor: activeIndex > 0 ? '#0005' : '#0000' }}>
        <a href="#idx-img">
            <img src={logo} className="App-logo" alt="logo"/>
        </a>
        <div className='nav-btns'>
            <a href="#register" style={{ textDecoration: activeIndex === 1 ? 'underline' : 'none' }}>cadastro </a>
            ●
            <a href="#list" style={{ textDecoration: activeIndex === 2 ? 'underline' : 'none' }}> lista </a>
            ●
            <a href = "#footer" style={{ textDecoration: activeIndex === 3 ? 'underline' : 'none' }}> sobre mim</a>
        </div>
    </div>
  );
}

NavBar.propTypes = {
    navHeader: PropTypes.arrayOf(PropTypes.object).isRequired
};
