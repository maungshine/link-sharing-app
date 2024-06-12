import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Full Stack Developer",
    image: "/assets/images/jane.jpg",
    quote:
      "DevLink has made it incredibly easy to share my social profiles and projects with other developers. Highly recommend!",
  },
  {
    name: "John Smith",
    role: "UI/UX Designer",
    image: "/assets/images/john.jpg",
    quote:
      "I love how customizable my DevLink profile is. It reflects my personal brand perfectly.",
  },
  {
    name: "Alice Johnson",
    role: "Software Engineer",
    image: "/assets/images/alice.jpg",
    quote:
      "The analytics feature helps me understand how people interact with my profile. It's fantastic!",
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Testimonials</h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto"
              >
                <Image
                  height={100}
                  width={100}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                <p className="text-gray-500">{testimonial.role}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
