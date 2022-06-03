import { ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    //partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    //partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    //partialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const EndlessCarousel = ({
  children,
  gap,
}: {
  children?: ReactNode;
  gap?: string;
}) => {
  return (
    <Carousel
      pauseOnHover
      centerMode
      responsive={responsive}
      infinite={true}
      itemClass="carousel_item mx-2"
    >
      {children}
    </Carousel>
  );
};

export default EndlessCarousel;
