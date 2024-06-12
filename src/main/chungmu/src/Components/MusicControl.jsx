import React, { useState, useEffect } from "react";
import { TbPlayerTrackPrevFilled, TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerTrackNextFilled, TbArrowsShuffle, TbHeart, TbRepeat } from "react-icons/tb";
import RangeBar from './RangeBar';
import useStore from '../js/store';

function MusicControl() {
  const { currentPlayUrl } = useStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioElement = document.getElementById('globalAudio');

  useEffect(() => {
    const handleLoadedMetadata = () => setDuration(audioElement.duration);
    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (currentPlayUrl) {
        audioElement.pause(); // 기존 오디오 일시 정지
        audioElement.currentTime = 0; // 오디오 재생 시간 초기화
        audioElement.src = currentPlayUrl; // 새로운 오디오 소스 설정
        audioElement.load(); // 오디오 로드
        try {
          await audioElement.play(); // 새로운 오디오 재생
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    };

    playAudio();
  }, [currentPlayUrl]);

  const handleRangeBarChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioElement.currentTime = newTime;
  };

  return (
    <div className="MusicControl">
      <div className="PlayBar">
        <div className="RangeBarBox">
          <RangeBar
            max={duration}
            value={currentTime}
            onChange={handleRangeBarChange}
          />
        </div>
      </div>
      <div className="PlayControl">
        <div className="top">
          <TbPlayerTrackPrevFilled className="trackBtn" size={40} />
          <TbPlayerPlayFilled className="trackBtn" size={40} />
          <TbPlayerTrackNextFilled className="trackBtn" size={40} />
        </div>
        <div className="bottom">
          <TbArrowsShuffle className="trackBtn" size={40} />
          <TbHeart className="trackBtn" size={40} />
          <TbRepeat className="trackBtn" size={40} />
        </div>
      </div>
    </div>
  );
}

export default MusicControl;
