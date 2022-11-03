package com.javainuse.service;

import com.javainuse.mapper.CartaMapper;
import com.javainuse.model.CantidadXFecha;
import com.javainuse.model.CantidadXHora;
import com.javainuse.model.Carta;
import com.javainuse.model.DetalleResultado;
import com.javainuse.model.GanadoPerdido;
import com.javainuse.model.GanadoPerdidoCrupier;
import com.javainuse.model.Resultado;
import com.javainuse.model.ResultadoInfo;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class CartaService {

    private final CartaMapper cartaMapper;

    public Optional<ResultadoInfo> nuevoResultado(String username) {

        try {

            int iduser = cartaMapper.getIdPlayer(username);

            ResultadoInfo resultado = new ResultadoInfo();
            DetalleResultado dr = new DetalleResultado();
            List<Carta> cartasJ = new ArrayList<>();
            List<Carta> cartasC = new ArrayList<>();
            int totalC = 0;
            int totalJ = 0;

            List<Carta> cartasJugadas = new ArrayList<>();

            int id = cartaMapper.getResultadoid();

            resultado.setIdresultado(id);
            resultado.setFecha(LocalDateTime.now().minusHours(3));

            cartaMapper.nuevoResultado(resultado.getIdresultado(), resultado.getFecha());

            for (int index = 0; index < 3; index++) {

                Carta c = new Carta();

                if (index == 1) {
                    cartasJugadas.addAll(cartasJ);
                    cartasJugadas.addAll(cartasC);

                    c = pedirCarta(cartasJugadas).get();
                    cartasC.add(c);
                    resultado.setCartasC(cartasC);
                    totalC += c.getValor();
                    resultado.setTotalC(totalC);
                    dr.setIduser(1);
                } else {

                    cartasJugadas.addAll(cartasJ);
                    cartasJugadas.addAll(cartasC);

                    c = pedirCarta(cartasJugadas).get();
                    cartasJ.add(c);
                    resultado.setCartasJ(cartasJ);
                    totalJ += c.getValor();
                    resultado.setTotalJ(totalJ);
                    dr.setIduser(iduser);
                }

                dr.setIdcarta(c.getIdcarta());
                dr.setIdresultado(id);

                cartaMapper.insertarDetalleResultado(dr.getIdresultado(), dr.getIdcarta(), dr.getIduser());
            }

            return Optional.of(resultado);

        } catch (Exception e) {

            return Optional.empty();

        }

    }

    public Optional<ResultadoInfo> hit(int id, String username, boolean player) {

        try {

            int iduser = cartaMapper.getIdPlayer(username);

            ResultadoInfo resultado = cartaMapper.getResultado(id);

            List<Carta> cartasJugadas = new ArrayList<>();

            Carta c = new Carta();

            List<Carta> cartasJ = cartaMapper.getCartasJugadas(id, iduser);
            List<Carta> cartasC = cartaMapper.getCartasJugadas(id, 1);
            int totalJ = 0;
            int totalC = 0;

            for (Carta carta : cartasC) {
                totalC += carta.getValor();
            }

            for (Carta carta : cartasJ) {
                totalJ += carta.getValor();
            }

            resultado.setCartasC(cartasC);
            resultado.setTotalC(totalC);
            resultado.setCartasJ(cartasJ);
            resultado.setTotalJ(totalJ);

            if (player) {

                cartasJugadas.addAll(cartasJ);
                cartasJugadas.addAll(cartasC);
                c = pedirCarta(cartasJugadas).get();

                cartasJ.add(c);
                resultado.setCartasJ(cartasJ);
                totalJ += c.getValor();
                resultado.setTotalJ(totalJ);

                cartaMapper.insertarDetalleResultado(id, c.getIdcarta(), iduser);

            } else {

                while (totalC < 17) {

                    cartasJugadas.addAll(cartasJ);
                    cartasJugadas.addAll(cartasC);
                    c = pedirCarta(cartasJugadas).get();

                    cartasC.add(c);
                    resultado.setCartasC(cartasC);
                    totalC += c.getValor();
                    resultado.setTotalC(totalC);

                    cartaMapper.insertarDetalleResultado(id, c.getIdcarta(), 1);

                }

            }

            return Optional.of(resultado);

        } catch (Exception e) {

            return Optional.empty();

        }

    }

    public Optional<ResultadoInfo> ultimoResultado(String username) {
        try {

            int iduser = cartaMapper.getIdPlayer(username);

            Resultado r = cartaMapper.getUltimoResultado(iduser);

            ResultadoInfo resultado = new ResultadoInfo();
            int totalC = 0;
            int totalJ = 0;

            resultado.setIdresultado(r.getIdresultado());
            resultado.setFecha(r.getFecha());

            resultado.setCartasC(cartaMapper.getCartasJugadas(r.getIdresultado(), 1));
            resultado.setCartasJ(cartaMapper.getCartasJugadas(r.getIdresultado(), iduser));

            for (Carta carta : resultado.getCartasC()) {
                totalC += carta.getValor();
            }

            for (Carta carta : resultado.getCartasJ()) {
                totalJ += carta.getValor();
            }

            resultado.setTotalC(totalC);
            resultado.setTotalJ(totalJ);

            return Optional.of(resultado);

        } catch (Exception e) {

            return Optional.empty();

        }
    }

    public Optional<Carta> getCarta(int id) {

        Carta carta = cartaMapper.getCarta(id);

        if (carta == null) {
            return Optional.empty();
        }

        return Optional.of(carta);

    }

    public Optional<Carta> pedirCarta(List<Carta> cartasJ) {

        List<Carta> cartas = cartaMapper.getCartasTodas();

        if (!cartasJ.isEmpty()) {
            //eliminar las jugadas
            for (Carta carta : cartas) {
                for (Carta cartaJ : cartasJ) {
                    if (carta == cartaJ) {
                        cartas.remove(carta);
                    }
                }
            }
        }

        Random random = new Random();
        int ri = random.nextInt(cartas.size());

        Carta carta = getCarta(ri).get();

        return Optional.of(carta);

    }

    public Optional<Boolean> partidaFinalizada(String username) {

        int iduser = cartaMapper.getIdPlayer(username);

        int cantidad = cartaMapper.getCantidadCrupier(iduser);

        if (cantidad == 0) {
            return Optional.of(true);
        }

        return Optional.of(false);
    }
    
    public Optional<Boolean> setGanador(int resultado, int ganador){
        
        long update = cartaMapper.setGanador(resultado, ganador);
        
        if (update == 1) {
            return Optional.of(true);
        }
        
        return Optional.empty();
    }
    
    //REPORTES

    public Optional<GanadoPerdido> pieGP(String username) {
        
        GanadoPerdido gp = new GanadoPerdido();

        int iduser = cartaMapper.getIdPlayer(username);

        gp.setGanado(cartaMapper.getResultadoXUserId(iduser, 2));
        gp.setPerdido(cartaMapper.getResultadoXUserId(iduser, 1));
        gp.setEmpatado(cartaMapper.getResultadoXUserId(iduser, 3));

        return Optional.of(gp);

    }
    
    public Optional<List<CantidadXHora>> lineCantidadXHora(String username) {
        
        List<CantidadXHora> cxhList = new ArrayList<>();

        int iduser = cartaMapper.getIdPlayer(username);
        
        cxhList = cartaMapper.getCantidadXHora(iduser, 2);

        return Optional.of(cxhList);

    }
    
    public Optional<Float> indiceVictoriasCrupier() {
        
        float indice = 0;

        int total = cartaMapper.getTotalPartidas();
        
        int totalGanadas = cartaMapper.getTotalGanadasCrupier();
        
        indice = totalGanadas * 100 / total;

        return Optional.of(indice);

    }
    
    public Optional<GanadoPerdidoCrupier> pieGPC() {
        
        GanadoPerdidoCrupier gp = new GanadoPerdidoCrupier();
        
        int cantidad = 0;
        float indice = 0f;
        
        int total = cartaMapper.getTotalPartidas();
        
        for (int i = 1; i < 4; i++) {
            
            cantidad = cartaMapper.getResultadoXUserId(1, i);
            
            indice = cantidad*100/total;
            
            switch (i){
                case 1: gp.setGanado(indice);
                break;
                case 2: gp.setPerdido(indice);
                break;
                case 3: gp.setEmpatado(indice);
                break;
            }
            
        }

        return Optional.of(gp);

    }
    
    public Optional<CantidadXFecha> getCantidadJugadas(int num) {
        
        CantidadXFecha cxf = cartaMapper.getCantidadJugadas(num);

        return Optional.of(cxf);

    }
    
    public Optional<CantidadXFecha> getCantidadJugadores(int num) {
        
        CantidadXFecha cxf = cartaMapper.getCantidadJugadores(num);

        return Optional.of(cxf);

    }
    
    public Optional<Float> promedioCrupier() {
        
        float promedio = 0f;

        int cantidadJugador = cartaMapper.getCantidadJugadasXJugador(1);
        
        int sumaCartasJugador = cartaMapper.getSumaCartasJugadasXJugador(1);
        
        promedio = sumaCartasJugador/cantidadJugador;

        return Optional.of(promedio);

    }
    
    public Optional<Float> promedioJugadores() {
        
        float promedio = 0f;

        int cantidadJugadores = cartaMapper.getCantidadSinCrupier();
        
        int sumaCartasJugadores = cartaMapper.getSumaCartasSinCrupier();
        
        promedio = sumaCartasJugadores/cantidadJugadores;

        return Optional.of(promedio);

    }

}
