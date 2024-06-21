package com.sophra.chungmusic;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TrackRepository extends JpaRepository<Track, Long> {
    List<Track> findByUser(Users user);
    List<Track> findByPlaylist(Playlist playlist);
    List<Track> findByPlaylistOrderById(Playlist playlist, Sort sort);

}
