import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Playlist.css';

import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";
import useStore from '../js/store';

function Playlist() {

    const [playlists, setPlaylists] = useState([]);

    const { currentPlayTrackNum, setCurrentPlayTrackNum,
        setSelectedTrack, setCurrentPlayUrl, setCurrentPlaylist} = useStore();



    useEffect(() => {
        fetchPlaylists();
    }, []);

    // 플레이리스트 동기화
    const fetchPlaylists = async () => {
        try {
            const response = await axios.get('/api/getPlaylists');
            setPlaylists(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching playlists', error);
        }
    };

    // 재생목록 리스트 아이템 클릭 이벤트
    const handleListItemClick = async (playlist) => {

        try {
            //현재 재생목록 설정
            setCurrentPlaylist(playlist.id);
            //다음곡 요청 -- 여기의 경우는 첫 곡 요청인데 컨트롤러 코드 재활용 위해 -1로 전송
            const response = await axios.post('/api/getNextSong', { listID: playlist.id, type: 0, currentNum : -1 });
            
            //현재 재생 트랙 번호를 0 번째로 설정
            setCurrentPlayTrackNum(0);
            const track = response.data;

            //받아온 트랙데이터로 플레이어 설정
            setSelectedTrack(track);
            
            //첫곡 플레이 url 받아오기
            const urlInfo = await axios.post('http://studyswh.synology.me:32599/get-audio-url', { videoUrl: track.videoUrl });
            setCurrentPlayUrl(urlInfo.data.videoUrl);

            
        } catch (error) {
            console.error("Error fetching track info", error);
        }
    };

    return (
        <div className="Playlist">
            <UserBar />
            <TitleHeader title={'My PlayList'} />

            <div className="DefaultPlaylist">
                <br></br>
                <div className="listTitle">
                    Default playlist
                </div>
                <div className="listView">
                    <ListView />
                    <ListView />
                </div>
            </div>

            <div className="UserPlaylist">
                <br></br>
                <div className="listTitle">
                    User playlist
                </div>
                <div className="listView">
                    {playlists.map((playlist) => (
                        <ListView
                            key={playlist.id}
                            playlist={playlist}
                            onItemClick={() => handleListItemClick(playlist)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ListView({ playlist, onItemClick }) {
    return (
        <div className="ListView" onClick={onItemClick}>
            <div className="ListThumbnail">
                {playlist && playlist.thumbnailUrl ? (
                    <img src={playlist.thumbnailUrl} alt="thumbnail" />
                ) : null}
            </div>
            <div className="ListText">
                {playlist ? playlist.title : 'No Title'}
            </div>
        </div>
    );
}

export default Playlist;
