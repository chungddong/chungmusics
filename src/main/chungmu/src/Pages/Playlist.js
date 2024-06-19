import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Playlist.css';

import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";

function Playlist() {

    const [playlists, setPlaylists] = useState([]);

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
            //const response = await axios.post('/api/getSelectPlaylists', { query: playlist.id });

            const response = await axios.post('/api/getNextSong', { listID: playlist.id, type: 0, currentNum : -1 });
            //setCurrentPlayUrl(response.data.videoUrl);
            //setCurrentPlayUrl(response.data.videoUrl);
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
