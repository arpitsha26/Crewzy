import React, { useState, useEffect, useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

function VideoPlayer({ media }) {
  const videoTag = useRef();
  const [mute, setMute] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleClick = () => {
    if (isPlaying) {
      videoTag.current.pause();
      setIsPlaying(false);
    } else {
      videoTag.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoTag.current;
        if (entry.isIntersecting) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    if (videoTag.current) {
      observer.observe(videoTag.current);
    }

    return () => {
      if (videoTag.current) {
        observer.unobserve(videoTag.current);
      }
    };
  }, []);

  return (
    <div className="h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden">
      <video
        ref={videoTag}
        src={media}
        autoPlay
        loop
        muted={mute}
        className="h-[100%] w-full object-cover rounded-2xl"
        onClick={handleClick}
      />

      {/* Overlay play icon when paused */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300"
          onClick={handleClick}
        >
          <FaPlay className="text-white text-6xl drop-shadow-lg" />
        </div>
      )}

      {/* Volume toggle button */}
      <div
        className="absolute bottom-[10px] right-[10px]"
        onClick={() => setMute((prev) => !prev)}
      >
        {!mute ? (
          <FiVolume2 className="w-[22px] h-[22px] text-white font-semibold" />
        ) : (
          <FiVolumeX className="w-[22px] h-[22px] text-white font-semibold" />
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
