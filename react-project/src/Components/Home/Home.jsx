import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import Results from '../Content/Results';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';

// Check Swiper settings for consistency
const slideImg = [
  { src: '/room2.jpg', alt: 'Room 2' },
  { src: '/room3.jpg', alt: 'Room 3' },
  { src: '/room5.jpg', alt: 'Room 5' },
  { src: '/room7.jpg', alt: 'Room 7' },
  { src: '/room8.jpg', alt: 'Room 8' },
];

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [imageHeight, setImageHeight] = useState(null);

  const handleShowResults = () => {
    setShowResults(true);
    fetchHotels();
  };

  useEffect(() => {
    // Calculate the height of the first loaded image
    const firstImage = new Image();
    firstImage.onload = () => {
      setImageHeight(firstImage.height);
    };
    firstImage.src = slideImg[0].src;
  }, []);

  const fetchHotels = () => {
    fetch('http://localhost:8000/hotels', {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        return response.json();
      })
      .then((data) => {
        setHotels(data);
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  };

  return (
    <div>
      {showResults ? (
        <Results searchResults={hotels} />
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50} 
          slidesPerView={1}
          effect="fade" 
          autoplay={{ delay: 2500, disableOnInteraction: false }} 
          loop={true} 
          centeredSlides={true} 
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {slideImg.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full object-cover"
                  style={{ height: imageHeight ? `${imageHeight}px` : 'auto' }}
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
                  <h1 className="text-shadow-lg text-shadow-black mb-6">Book Smarter, Travel Easier</h1>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                    onClick={handleShowResults}
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
