import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./ShowProduct.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

const ShowProduct = ({ product }) => {
  return (
    <motion.div
      className="swiperContainer mt-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Swiper
        className="swiper-container"
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1800}
        pagination={{ dynamicBullets: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {product.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img
              src={image.image}
              alt={`Slide ${index + 1}`}
              className="swiper-image"
            />
            <div className="swiper-info">
              <h3>{image.title}</h3>
              <p>ราคา: {image.price} .-</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default ShowProduct;
