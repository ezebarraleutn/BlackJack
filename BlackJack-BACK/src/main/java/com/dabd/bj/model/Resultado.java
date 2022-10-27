package com.dabd.bj.model;

import java.time.LocalDateTime;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Resultado {
    
    private int idresultado;
    private LocalDateTime fecha;
    
}
