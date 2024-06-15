package com.sophra.chungmusic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlaylistDTO {
    private Long id;
    private String title;
    private String thumbnailUrl;
}
