import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AddPlaylist.css';

function AddPlaylist({ isOpen, onClose }) {
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchPlaylists();
    }
  }, [isOpen]);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('/api/getPlaylists'); // API 경로에 맞게 수정
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists', error);
    }
  };

  const handleAddPlaylist = async () => {
    if (!playlistName) return;
    try {
      await axios.post('/api/addPlaylist', { name: playlistName });
      setPlaylistName('');
      fetchPlaylists(); // 새 플레이리스트 추가 후 업데이트
    } catch (error) {
      console.error('Error adding playlist', error);
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
          <button onClick={handleAddPlaylist}>Add</button>
        </div>
        <div className="AddPlaylistContent">
          <ul className="PlaylistList">
            {playlists.map((playlist) => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
        </div>
        <div className="AddPlaylistActions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddPlaylist;
