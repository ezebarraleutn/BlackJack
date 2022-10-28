package com.dabd.bj.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRequest {
    
    private String nombre;
    private String password;
    
}
