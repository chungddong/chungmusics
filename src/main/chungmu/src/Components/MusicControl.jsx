import React, { useState, useEffect } from "react";
import {
  TbPlayerTrackPrevFilled, TbPlayerPlayFilled, TbPlayerPauseFilled,
  TbPlayerTrackNextFilled, TbHeart, TbRepeat, TbPlaylist
} from "react-icons/tb";
import RangeBar from './RangeBar';
import useStore from '../js/store';
import '../css/MusicControl.css';
import axios from 'axios';

function MusicControl() {
  const { currentPlayUrl, togglePlaylist, currentPlaylist,
    currentPlayTrackNum, currentPlayType, setCurrentPlayTrackNum,
    setSelectedTrack, setCurrentPlayUrl } = useStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = document.getElementById('globalAudio');



  const [isChangingSong, setIsChangingSong] = useState(false);

  useEffect(() => {
    const handleLoadedMetadata = () => setDuration(audioElement.duration);
    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);
    const handleEnded = () => nextSong();

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('ended', handleEnded);


    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [currentPlayTrackNum]);

  useEffect(() => {
    const playAudio = async () => {
      if (currentPlayUrl) {
        try {
          // 기존 재생 중지 및 초기화
          await audioElement.pause();
          audioElement.currentTime = 0;

          // 새 소스 설정 및 로드
          audioElement.src = currentPlayUrl;
          await audioElement.load();

          // 재생 시도
          await audioElement.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing audio :", error);
          setIsPlaying(false);
        }
      }
    };

    playAudio();
  }, [currentPlayUrl]);

  // seek바 변동 이벤트
  const handleRangeBarChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioElement.currentTime = newTime;
  };

  // 음악 재생-플레이 기능
  const togglePlayPause = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying); // 재생 상태 토글
  };

  //이전 곡으로 넘어가기
  const prevSong = async () => {

    //현재 재생목록이 비어있지 않다면
    if (currentPlaylist != null) {

      //다음곡 요청 -- 여기의 경우는 첫 곡 요청인데 컨트롤러 코드 재활용 위해 -1로 전송
      const response = await axios.post('/api/getPrevSong',
        {
          listID: currentPlaylist, type: currentPlayType,
          currentNum: currentPlayTrackNum
        });

      //TODO : 여기서 response 로 trackNum 을 가져와야 할것임 - 랜덤재생 위해서
      const track = response.data;
      const playNum = track.trackNum;

      //현재 재생 트랙 번호를 다음 번호로 설정
      setCurrentPlayTrackNum(playNum);

      //받아온 트랙데이터로 플레이어 설정
      setSelectedTrack(track);

      //플레이 url 받아오기
      const urlInfo = await axios.post('http://studyswh.synology.me:32599/get-audio-url', { videoUrl: track.videoUrl });
      setCurrentPlayUrl(urlInfo.data.videoUrl);

      console.log("tracknum : " + currentPlayTrackNum);

    }
  }

    //TODO : 한곡재생 구현해야함, 리스트 보여줘야함, 랜덤재생 버튼 만들어야함

    //다음 곡으로 넘어가기
    const nextSong = async () => {
      console.log("다음곡으로 넘어가야함");
      console.log("현재 트랙 NUM : " + currentPlayTrackNum);
      console.log("현재 재생목록 ID : " + currentPlaylist);

      //현재 재생목록이 비어있지 않다면
      if (currentPlaylist != null) {

        //다음곡 요청 -- 여기의 경우는 첫 곡 요청인데 컨트롤러 코드 재활용 위해 -1로 전송
        const response = await axios.post('/api/getNextSong',
          {
            listID: currentPlaylist, type: currentPlayType,
            currentNum: currentPlayTrackNum
          });

        //TODO : 여기서 response 로 trackNum 을 가져와야 할것임 - 랜덤재생 위해서
        const track = response.data;
        const playNum = track.trackNum;

        //현재 재생 트랙 번호를 다음 번호로 설정
        setCurrentPlayTrackNum(playNum);

        //받아온 트랙데이터로 플레이어 설정
        setSelectedTrack(track);

        //플레이 url 받아오기
        const urlInfo = await axios.post('http://studyswh.synology.me:32599/get-audio-url', { videoUrl: track.videoUrl });
        setCurrentPlayUrl(urlInfo.data.videoUrl);

        console.log("tracknum : " + currentPlayTrackNum);

      }



    }

    //테스트용
    const handleTestClick = () => {
      console.log("클릭");

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

            <div className="button">
              <TbPlayerTrackPrevFilled className="trackBtn" size={40} onClick={prevSong}/>
            </div>


            <div className="button">
              {isPlaying ? (
                <TbPlayerPauseFilled className="trackBtn" size={40} onClick={togglePlayPause} />
              ) : (
                <TbPlayerPlayFilled className="trackBtn" size={40} onClick={togglePlayPause} />
              )}
            </div>

            <div className="button">
              <TbPlayerTrackNextFilled className="trackBtn" size={40} onClick={nextSong}/>
            </div>

          </div >
          <div className="bottom">

            <div className="button">
              <TbPlaylist className="trackBtn" size={40} onClick={togglePlaylist} />
            </div>

            <div className="button">
              <TbHeart className="trackBtn" size={40} />
            </div>

            <div className="button">
              <TbRepeat className="trackBtn" size={40} />
            </div>

          </div>
        </div>
      </div>
    );
}

export default MusicControl;
