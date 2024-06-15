package com.sophra.chungmusic;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByUser(Users user);
    Playlist findByid(Long id);
}
