package com.dabd.bj.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerDto {
    
    private int idplayer;
    private String nombre;
    private int rol;
    
}
