import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TrendingCard } from "@components/ui/card";
 
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function TrendingSlideshow(items) {
  items = items.items;
  items = items.map((item, index) => {
    return <TrendingCard course={item} key={index} />;
  });

  return (
    <div className="my-10">
      <Carousel
        centerMode={true}
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        //   deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-10-px"
      >
        {items}
      </Carousel>
    </div>
  );
}
