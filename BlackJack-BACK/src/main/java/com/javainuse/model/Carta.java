package com.javainuse.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Carta {
    
    private int idcarta;
    private int numero;
    private String tipo;
    private int valor;
    private String img;
    
}
