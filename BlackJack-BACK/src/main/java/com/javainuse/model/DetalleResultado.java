package com.javainuse.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetalleResultado {
    
    private int idresultado;
    private int idcarta;
    private int iduser;
    
}
