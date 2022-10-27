package com.dabd.bj.service;

import com.dabd.bj.mapper.CartaMapper;
import com.dabd.bj.model.Carta;
import com.dabd.bj.model.DetalleResultado;
import com.dabd.bj.model.PlayerDto;
import com.dabd.bj.model.ResultadoInfo;
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

    public Optional<ResultadoInfo> nuevoResultado() {

        try {

            ResultadoInfo resultado = new ResultadoInfo();
            DetalleResultado dr = new DetalleResultado();
            List<Carta> cartasJ = new ArrayList<>();
            List<Carta> cartasC = new ArrayList<>();
            int totalC = 0;
            int totalJ = 0;
            PlayerDto cr = cartaMapper.getPlayer(1);
            PlayerDto jg = cartaMapper.getPlayer(2);
            
            List<Carta> cartasJugadas = new ArrayList<>();

            resultado.setJugador(jg);

            int id = cartaMapper.getResultadoid();

            resultado.setIdresultado(id);
            resultado.setFecha(LocalDateTime.now());

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
                    dr.setIdplayer(1); //CAMBIAR !!!
                } else {
                    
                    cartasJugadas.addAll(cartasJ);
                    cartasJugadas.addAll(cartasC);
                    
                    c = pedirCarta(cartasJugadas).get();
                    cartasJ.add(c);
                    resultado.setCartasJ(cartasJ);
                    totalJ += c.getValor();
                    resultado.setTotalJ(totalJ);
                    dr.setIdplayer(2); //CAMBIAR !!!
                }

                dr.setIdcarta(c.getIdcarta());
                dr.setIdresultado(id);

                cartaMapper.insertarDetalleResultado(dr.getIdresultado(), dr.getIdcarta(), dr.getIdplayer());
            }

            return Optional.of(resultado);

        } catch (Exception e) {

            return Optional.empty();

        }

    }
    
    public Optional<ResultadoInfo> hit(int id, boolean player) {

        try{
            
            ResultadoInfo resultado = cartaMapper.getResultado(id);
        
            resultado.setJugador(cartaMapper.getPlayerXResultado(id));
            
            List<Carta> cartasJugadas = new ArrayList<>();

            Carta c = new Carta();

            List<Carta> cartasJ = cartaMapper.getCartasJugadas(id, 2);
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

                cartaMapper.insertarDetalleResultado(id, c.getIdcarta(), resultado.getJugador().getIdplayer());

            }else{

                while(totalC < 17){

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
            
        }catch(Exception e){
            
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

        if(!cartasJ.isEmpty()){
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

    public Optional<PlayerDto> getPlayer(int id) {

        PlayerDto p = cartaMapper.getPlayer(id);

        if (p == null) {
            return Optional.empty();
        }

        return Optional.of(p);
    }

}
