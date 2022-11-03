package com.javainuse.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GanadoPerdidoCrupier {
    
    private float ganado;
    private float perdido;
    private float empatado;
    
}
