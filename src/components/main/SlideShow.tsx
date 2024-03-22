import React, { useState, useEffect } from 'react';

const SlideShow = ({ images }: { images: any }) => {
  // 현재 슬라이드의 인덱스를 담을 state
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // setInterval로 일정 시간이 지나면 다음 이미지로 전환
    const imgSlideShow = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    // 컴포넌트가 언마운트되면 clearInterval로 인터벌 제거
    return () => clearInterval(imgSlideShow);
  }, [images.length]); // images 배열의 길이가 변경될 때마다 useEffect 재실행

  return (
    <div className="carousel w-full h-80 overflow-hidden relative">
      {images.map((image: any, index: any) => (
        <div
          key={`slide${index + 1}`}
          className={`carousel-item relative w-full ${index === currentIndex ? '' : 'hidden'}`}
        >
          <img src={image} className="w-full h-80" alt={`Slide ${index + 1}`} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${index === 0 ? images.length : index}`}
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❮
            </a>
            <a
              href={`#slide${index === images.length - 1 ? 1 : index + 2}`}
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideShow;
