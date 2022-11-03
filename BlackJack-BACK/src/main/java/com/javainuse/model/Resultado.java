package com.javainuse.model;

import java.time.LocalDateTime;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Resultado {
    
    private int idresultado;
    private LocalDateTime fecha;
    private int ganador; //1 es perdedor, 2 es ganador, 3 empate
    
}
