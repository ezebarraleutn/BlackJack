package com.dabd.bj.controller;

import com.dabd.bj.model.ResultadoInfo;
import com.dabd.bj.service.CartaService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartaController {
    
    @Autowired
    private CartaService srv;
    
    @GetMapping("/inicio")
    public ResponseEntity<ResultadoInfo> nuevoResultado() {
        Optional<ResultadoInfo> resultado = srv.nuevoResultado();
        
        if (resultado.isPresent())
            return ResponseEntity.ok(resultado.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/pedir/{id}/{player}")
    public ResponseEntity<ResultadoInfo> pedir(@PathVariable int id, @PathVariable boolean player) {
        Optional<ResultadoInfo> resultado = srv.hit(id, player);
        
        if (resultado.isPresent())
            return ResponseEntity.ok(resultado.get());
        
        return ResponseEntity.badRequest().build();
    }
    
}
