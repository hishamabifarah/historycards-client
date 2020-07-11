import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HomeSlider = props => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const slides = [
    {

      img: "/images/slider1.jpg",
      lineTwo: "Lebanese Civil War"
    }
    ,
    {
      img: "/images/slider2.jpg",
      lineTwo: "Cuban Missile Crisis"
    },
    {
        img: "/images/slider3.jpg",
        lineTwo: "The Crusades"
      }
  ];

  const generateSlides = () =>
    slides
      ? slides.map((slide, index) => (
          <div key={index}>
            <div
              className="featured_image"
              style={{
                background: `url(${slide.img})`,
                height: `${window.innerHeight - 100}px`
              }}
            >
              <div className="featured_action">
                <div className="tag low_title">{slide.lineTwo}</div>
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
        <div>
      <Slider {...settings}>{generateSlides()}</Slider>
      </div>
    </div>
  );
};

export default HomeSlider;