package com.dabd.bj.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Player {
    
    private int idplayer;
    private String nombre;
    private String password;
    private int rol;
    
}
