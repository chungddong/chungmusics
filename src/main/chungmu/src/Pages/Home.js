import React, { useState, useEffect } from "react";
import axios from "axios";

import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";

import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoPlay } from "react-icons/io5";

import useStore from '../js/store';

import "../css/Home.css";


function Home() {

    const [results, setResults] = useState([]);
    const { setSelectedTrack, setCurrentPlayUrl, setCurrentPlaylist } = useStore();
    const { addPlaylistTrack, setAddPlaylistTrack } = useStore();
    const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false); // 다이얼로그 상태 state

    //시작 시 데이터 가져오기
    useEffect(() => {
        fetchAllTracks();
    }, []); 

    const fetchAllTracks = async () => {
        try {
            const response = await axios.get('/api/getAllTracks');
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching tracks', error);
        }
    };

    const handleListItemClick = async (track) => {
        setSelectedTrack(track);
        try {
            setCurrentPlaylist(null);
            const response = await axios.post('http://studyswh.synology.me:32599/get-audio-url', { videoUrl: track.videoUrl });
            setCurrentPlayUrl(response.data.videoUrl);
        } catch (error) {
            console.error("Error fetching track info", error);
        }
    };

    const handleAddPlaylistClick = (track) => {
        setAddPlaylistTrack(track);
        setIsAddPlaylistOpen(true); // 다이얼로그 열기
    };

    const handleCloseAddPlaylist = () => {
        setIsAddPlaylistOpen(false); // 다이얼로그 닫기
    };


    return (
        <div className="Home">

            <UserBar />

            <TitleHeader title={'My Music'} />

            <div>
                All musics
            </div>
            <div className="ListContainer">
                {results.map((item, index) => (
                    <ListItem
                        key={index}
                        item={item}
                        onClick={() => handleListItemClick(item)}
                        onAddPlaylistClick={() => handleAddPlaylistClick(item)} // 추가: 재생목록 추가 버튼 클릭 시 이벤트 핸들러 전달
                    />
                ))}
            </div>


        </div>
    );
}

function ListItem({ item, onClick, onAddPlaylistClick }) {
    return (
        <div className="ListItem" >
            <div className="thumbnailbox">
                <img src={item.thumbUrl} alt="thumbnail" />
            </div>
            <div className="infobox">
                <div className="MusicTitle">
                    {item.title}
                </div>
                <div className="MusicArtist">
                    {item.author}
                </div>
            </div>
            <div className="listbtn">
                <MdOutlinePlaylistAdd size={30} className="btns" onClick={onAddPlaylistClick} />
                <IoPlay size={30} className="btns" onClick={onClick} />
            </div>
        </div>
    );
}

export default Home