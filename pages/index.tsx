"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const images: string[] = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
  ];

  const nextSlide = (): void => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (): void => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, []);

  const [audioPlaying, setAudioPlaying] = useState(false);

  const handlePlayAudio = () => {
    setAudioPlaying(true);
    const audio = document.querySelector('audio') as HTMLAudioElement;
    audio.play();
  };

  useEffect(() => {
    // Handle the blur effect removal after the button is clicked
    if (audioPlaying) {
      // Remove the blur effect from the content once audio starts
      document.querySelector('.blur-container')?.classList.add('no-blur');
    }
  }, [audioPlaying]);

  return (
    <div>
      <div className={`blur-container ${audioPlaying ? 'no-blur' : ''}`}>
        <div className="carousel">
          {images.map((img, index) => (
            <div
              key={index}
              className={`slide ${currentImage === index ? "active" : ""}`}
            >
              <img src={img} alt={`Birthday photo ${index + 1}`} />
            </div>
          ))}

          <div className="overlay" />

          <h1 className="title">
            <span>Happy Birthday!</span>
          </h1>

          <div className="iframe-container">
            <iframe
              src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x63F06373039408D66Ead3b19660e0722a760EE87&chain=%7B%22name%22%3A%22Polygon+Mainnet%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F137.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22POL%22%2C%22symbol%22%3A%22POL%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22matic%22%2C%22chainId%22%3A137%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22polygon%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmd58rKLnBfteouAcmdjQ1HzDvRLSLjMbHjuXRytsKwAkD%22%2C%22width%22%3A360%2C%22height%22%3A360%2C%22format%22%3A%22svg%22%7D%7D&clientId=0c5afd5a76b87e8db64c94c392d149ae&theme=dark&primaryColor=purple"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
                overflow: "hidden",
              }}
            />
          </div>

          <button
            onClick={prevSlide}
            className={`nav-button prev ${isHovering ? "visible" : ""}`}
            aria-label="Previous slide"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className={`nav-button next ${isHovering ? "visible" : ""}`}
            aria-label="Next slide"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Audio Element */}
      <audio loop>
        <source src="/audio/song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Button to start music */}
      <button
        className={`musicButton ${audioPlaying ? 'audioPlaying' : ''}`}
        onClick={handlePlayAudio}
      >
        <span>с др<br /><br /><br /><br /><br /><br /><br /><br /><label>(клац-клац)</label></span>
      </button>
    </div>
  );
}
