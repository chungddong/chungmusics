package com.sophra.chungmusic;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Users")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue
    private Long id;
    private String userid;
    private String passwd;
    private String email;
    private Boolean isAllow;
    private Long lastplayMusic;
    
    
}
