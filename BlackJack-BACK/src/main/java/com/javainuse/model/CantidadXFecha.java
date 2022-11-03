package com.javainuse.model;

import java.time.LocalDateTime;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CantidadXFecha {
    
    private int cantidad;
    private String fecha;
    
}
