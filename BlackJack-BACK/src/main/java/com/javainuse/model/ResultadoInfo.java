package com.javainuse.model;

import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
        
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class ResultadoInfo extends Resultado{
    
    List<Carta> cartasJ;
    List<Carta> cartasC;
    int totalJ;
    int totalC;
    
}
