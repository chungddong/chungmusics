import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AddPlaylist.css';

import useStore from '../js/store';

function AddPlaylist({ isOpen, onClose }) {
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const { addPlaylistTrack, setAddPlaylistTrack } = useStore();

  useEffect(() => {
    if (isOpen) {
      fetchPlaylists();
    }
  }, [isOpen]);

  // 플레이리스트 동기화
  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('/api/getPlaylists');
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists', error);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!playlistName) return;
    try {
      await axios.post('/api/createPlaylist', { title: playlistName });
      setPlaylistName('');
      fetchPlaylists(); // 새 플레이리스트 추가 후 업데이트
    } catch (error) {
      console.error('Error adding playlist', error);
    }
  };

  const handleCheckboxChange = (playlistId) => {
    setSelectedPlaylists((prevSelected) =>
      prevSelected.includes(playlistId)
        ? prevSelected.filter((id) => id !== playlistId)
        : [...prevSelected, playlistId]
    );
  };

  const handleAdd = async () => {
    try {
      const track = addPlaylistTrack;
      const playlistIds = selectedPlaylists.join(',');

      await axios.post('/api/addTracksToPlaylists', { 
        playlistIds: playlistIds,
        trackTitle: track.title,
        trackAuthor: track.author,
        trackPlaytime : track.playtime,
        trackVideoUrl: track.videoUrl,
        trackThumbUrl: track.thumbUrl
      });
      
      setAddPlaylistTrack([]);
      setSelectedPlaylists([]);
      onClose();
    } catch (error) {
      console.error('Error adding tracks to playlists', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="AddPlaylistOverlay">
      <div className="AddPlaylist">
        <div className="AddPlaylistHeader">
          <input
            type="text"
            placeholder="New Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <button onClick={handleCreatePlaylist}>Create</button>
        </div>
        <div className="AddPlaylistContent">
          <ul className="PlaylistList">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                {playlist.title}
                <input
                  type="checkbox"
                  checked={selectedPlaylists.includes(playlist.id)}
                  onChange={() => handleCheckboxChange(playlist.id)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="AddPlaylistActions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddPlaylist;
