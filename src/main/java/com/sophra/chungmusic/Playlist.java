package com.sophra.chungmusic;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Playlist")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Playlist {


    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String thumbnailUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;
}
