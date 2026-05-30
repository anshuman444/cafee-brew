/**
 * Testimonials Component
 * 
 * Customer testimonials carousel/slider.
 * Features:
 * - Swiper.js carousel for smooth sliding
 * - Navigation arrows for manual control
 * - Multiple testimonial cards with quotes
 * - Displays customer name and profession
 * - Responsive design
 */

// Swiper React components for carousel functionality
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS styles (required for carousel to work properly)
import "swiper/css";
import "swiper/css/navigation";

// Swiper modules - Navigation enables prev/next arrow buttons, Autoplay for auto-slide
import { Navigation, Autoplay } from "swiper/modules";

// React Icons - Quote icon for testimonials
import { IoMdQuote } from "react-icons/io";

// Testimonials data - Customer reviews
const testimonials = [
  {
    message:
      "The single-origin V60 pour-over from their micro-roastery is an absolute revelation. I tried the Ethiopian Yirgacheffe, and the delicate jasmine notes were incredibly clean. Cafe-brew is truly in a class of its own.",
    name: "Eleanor Vance",
    profession: "Sensory Analyst & Food Writer",
  },
  {
    message:
      "The Rose Honey Cortado was crafted perfectly, and their Decadent Tiramisu is the best I've tasted outside of Rome. The dark, gold-accented lounge creates an incredibly immersive and premium atmosphere.",
    name: "Dr. Marcus Sterling",
    profession: "Interior & Architectural Designer",
  },
  {
    message:
      "I ordered their gold leaf Affogato during their Live Friday Jazz Night. Splendid table service, direct-trade quality coffee, and wonderful acoustic music. Highly recommend booking a seat!",
    name: "Sophia Thorne",
    profession: "Art Gallery Curator",
  },
];

const Testimonials = () => {
  return (
    <section className="h-[60vh] xl:h-[70vh]">
      <div className="container mx-auto h-full flex items-center">
        {/* Swiper Carousel Component */}
        {/* navigation={true}: Shows prev/next arrow buttons */}
        {/* modules={[Navigation]}: Enables navigation functionality */}
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-[400px]"
        >
          {testimonials.map((person, index) => (
            // Each testimonial is a slide
            <SwiperSlide key={index} className="w-full h-full">
              <div className="flex justify-center h-full xl:pt-14">
                {/* Testimonial Card Content */}
                <div className="max-w-[85%] md:max-w-[70%] xl:max-w-[60%] text-white">
                  {/* Quote Icon - Large, centered */}
                  <IoMdQuote className="text-6xl text-accent mb-8 mx-auto" />
                  
                  {/* Testimonial Message */}
                  <p className="text-xl md:text-2xl font-secondary text-center mb-8">
                    {person.message}
                  </p>
                  
                  {/* Customer Information */}
                  <div className="text-center">
                    {/* Customer Name - Bold */}
                    <p className="text-lg md:text-xl font-bold mb-1">{person.name}</p>
                    {/* Customer Profession - Secondary color */}
                    <p className="text-secondary text-sm md:text-base">{person.profession}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
