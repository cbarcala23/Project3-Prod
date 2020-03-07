import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import "./Slide.css";
import Slider from "react-slick";
import pic1 from "./pics/pic1.jpg";
import pic3 from "./pics/pic3.jpg";
import pic4 from "./pics/pic4.jpg";
import pic5 from "./pics/pic5.jpg";

const pics = [
  {
    name: "pic1",
    src: pic1
  },
  {
    name: "pic3",
    src: pic3
  },
  {
    name: "pic4",
    src: pic4
  },
  {
    name: "pic5",
    src: pic5
  }
];

const Wrapper = styled.div`
// border: 1px solid red; 
  position: relative;
  width: 100%;
  
// height: 100vh; 
  box-sizing: border-box;
`;

// const Page = styled.div`
//   width: 100%;
// `;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: false,
      autoplay: true,
      slidesToScroll: 1,
    //   className: "slides"
    };
    return (
      <Wrapper>
    
        <Slider {...settings}>
          {/* <Page> Page one </Page> */}

          {pics.map((pic) => {
              return(
                  <div className="slides" key={pic.name}>
                      <img width="100%" src={pic.src} alt={pic.name} />
                  </div>
              )
          })}

        </Slider>
        
     </Wrapper>
    );
  }
}
