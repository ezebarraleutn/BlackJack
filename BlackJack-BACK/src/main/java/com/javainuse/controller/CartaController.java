package com.javainuse.controller;

import com.javainuse.model.CantidadXFecha;
import com.javainuse.model.CantidadXHora;
import com.javainuse.model.GanadoPerdido;
import com.javainuse.model.GanadoPerdidoCrupier;
import com.javainuse.model.ResultadoInfo;
import com.javainuse.service.CartaService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
public class CartaController {
    
    @Autowired
    private CartaService srv;
    
    @GetMapping("/inicio/{player}")
    public ResponseEntity<ResultadoInfo> nuevoResultado(@PathVariable String player) {
        Optional<ResultadoInfo> resultado = srv.nuevoResultado(player);
        
        if (resultado.isPresent())
            return ResponseEntity.ok(resultado.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/pedir/{id}/{username}/{player}")
    public ResponseEntity<ResultadoInfo> pedir(@PathVariable int id, @PathVariable String username,@PathVariable boolean player) {
        Optional<ResultadoInfo> resultado = srv.hit(id ,username ,player);
        
        if (resultado.isPresent())
            return ResponseEntity.ok(resultado.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/ultima/{player}")
    public ResponseEntity<ResultadoInfo> ultimoResultado(@PathVariable String player) {
        Optional<ResultadoInfo> resultado = srv.ultimoResultado(player);
        
        if (resultado.isPresent() || resultado.isEmpty())
            return ResponseEntity.ok(resultado.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/esFinalizada/{player}")
    public ResponseEntity<Boolean> esFinalizada(@PathVariable String player) {
        Optional<Boolean> resultado = srv.partidaFinalizada(player);
        
        if (resultado.isPresent())
            return ResponseEntity.ok(resultado.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/setGanador/{resultado}/{ganador}")
    public ResponseEntity<Boolean> setGanador(@PathVariable int resultado, @PathVariable int ganador) {
        
        Optional<Boolean> r = srv.setGanador(resultado, ganador);
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    
    //REPORTES
    @GetMapping("/pieGP/{username}")
    public ResponseEntity<GanadoPerdido> ganadoPerdido(@PathVariable String username) {
        
        Optional<GanadoPerdido> r = srv.pieGP(username);
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/lineCXH/{username}")
    public ResponseEntity<List<CantidadXHora>> lineCXH(@PathVariable String username) {
        
        Optional<List<CantidadXHora>> r = srv.lineCantidadXHora(username);
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/indiceVictoriasCrupier")
    public ResponseEntity<GanadoPerdidoCrupier> indiceVictoriasCrupier() {
        
        Optional<GanadoPerdidoCrupier> r = srv.pieGPC();
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/lineCJXDC/{num}")
    public ResponseEntity<CantidadXFecha> lineCJXDC(@PathVariable int num) {
        
        Optional<CantidadXFecha> r = srv.getCantidadJugadas(num);
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/lineCPXDC/{num}")
    public ResponseEntity<CantidadXFecha> lineCPXDC(@PathVariable int num) {
        
        Optional<CantidadXFecha> r = srv.getCantidadJugadores(num);
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/promedioCrupier")
    public ResponseEntity<Float> promedioCrupier() {
        
        Optional<Float> r = srv.promedioCrupier();
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/promedioJugadores")
    public ResponseEntity<Float> promedioJugadores() {
        
        Optional<Float> r = srv.promedioJugadores();
        
        if (r.isPresent())
            return ResponseEntity.ok(r.get());
        
        return ResponseEntity.badRequest().build();
    }
}
