import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Music } from "lucide-react";

export default function Home() {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [iframeVisible, setIframeVisible] = useState<boolean>(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const images: string[] = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",
    "/images/photo7.jpg",
    "/images/photo8.jpg",
    "/images/photo9.jpg",
    "/images/photo10.jpg",
    "/images/photo11.jpg",
    "/images/photo12.jpg",
  ];

  const audioTracks: string[] = [
    "/audio/song.mp3",
    "/audio/song2.mp3",
    "/audio/song3.mp3",
    "/audio/song4.mp3",
    "/audio/song5.mp3",
    "/audio/song6.mp3",
    "/audio/song7.mp3",
  ];

  const nextSlide = (): void => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (): void => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3200);
    return () => clearInterval(timer);
  }, []);

  const handlePlayAudio = () => {
    setAudioPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const switchMusic = () => {
    setCurrentTrack((prev) => (prev + 1) % audioTracks.length);
  };

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Force reload the audio with new source
      if (audioPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio play failed:", error);
          });
        }
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioPlaying) {
      document.querySelector('.blur-container')?.classList.add('no-blur');
    }
  }, [audioPlaying]);

  const toggleIframe = () => {
    setIframeVisible(!iframeVisible);
  };

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

          <h1 className="title">
            <span>Happy Birthday!</span>
          </h1>

          <div
            className={`iframe-container ${iframeVisible ? 'visible' : 'hidden'}`}
          >
            <iframe
              src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x63F06373039408D66Ead3b19660e0722a760EE87&chain=%7B%22name%22%3A%22Polygon+Mainnet%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F137.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22POL%22%2C%22symbol%22%3A%22POL%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22matic%22%2C%22chainId%22%3A137%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22polygon%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmd58rKLnBfteouAcmdjQ1HzDvRLSLjMbHjuXRytsKwAkD%22%2C%22width%22%3A360%2C%22height%22%3A360%2C%22format%22%3A%22svg%22%7D%7D&clientId=0c5afd5a76b87e8db64c94c392d149ae&theme=dark&primaryColor=purple"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
                overflow: "visible",
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

          <button onClick={toggleIframe} className="iframe-toggle-button">
            {iframeVisible ? <ChevronDown /> : <ChevronUp />}
          </button>

          <button onClick={switchMusic} className="music-toggle-button">
            <Music size={18} />
            <span>switch cringe {currentTrack + 1}/7</span>
          </button>
        </div>
      </div>

      <audio ref={audioRef} loop>
        <source src={audioTracks[currentTrack]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        className={`musicButton ${audioPlaying ? 'audioPlaying' : ''}`}
        onClick={handlePlayAudio}
      >
        <span>
          tl;dr : <b>С ДР</b>
          <br /><br />
          <label className="birthdayGreetingsLabel">Андрей, 8 лет с тобой — это подвиг, достойный занесения в скрижали нашей истории.
            Мы решили, что такая важная дата не может пройти без пафоса и, конечно, этой открытки. Это, конечно, что-то вроде тех фотографий, которые делают, чтобы люди почувствовали себя важными.
            С Днем Рождения! 🎉
            Мы даже создали для тебя NFT — пиксельное чудо, которое ты можешь гордо носить в своем виртуальном кармане.
            Желаем счастья, успехов, нескончаемых поводов для праздников и, конечно, терпения (особенно терпения к нам, ведь ты нас знаешь). Ты для нас как коллекционная монета — уникален, ценный и немного старомодный.</label>
          <br /><br /><br /><br /><br /><br /><br />
          <label className="reccomendationLabel">-better view on PC-</label>
          <br />
          <label className="callToArmsLabel">(клац-клац)</label>
        </span>
      </button>
    </div>
  );
}