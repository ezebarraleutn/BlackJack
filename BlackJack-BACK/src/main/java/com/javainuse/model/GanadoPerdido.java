package com.javainuse.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GanadoPerdido {
    
    private int ganado;
    private int perdido;
    private int empatado;
    
}
