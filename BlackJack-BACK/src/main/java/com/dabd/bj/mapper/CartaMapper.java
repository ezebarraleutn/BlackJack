package com.dabd.bj.mapper;

import com.dabd.bj.model.Carta;
import com.dabd.bj.model.PlayerDto;
import com.dabd.bj.model.ResultadoInfo;
import java.time.LocalDateTime;
import java.util.List;
import org.apache.ibatis.annotations.*;

@Mapper
public interface CartaMapper {
    
    @Select("SELECT * FROM CARTA WHERE idcarta = #{idcarta}")
    Carta getCarta(@Param("idcarta") int idcarta);
    
    @Select("SELECT * FROM CARTA")
    List<Carta> getCartasTodas();
    
    @Select("SELECT * FROM CARTA " +
            "WHERE idcarta IN ( " +
            "SELECT idcarta " +
            "FROM DETALLE_RESULTADO " +
            "WHERE idresultado = #{idresultado} " +
            "AND idplayer = #{idplayer})")
    List<Carta> getCartasJugadas(@Param("idresultado") int idresultado, @Param("idplayer") int idplayer);
    
    
    
    @Select("SELECT * FROM RESULTADO WHERE idresultado = #{idresultado}")
    ResultadoInfo getResultado(@Param("idresultado") int idresultado);
    
    @Select("SELECT MAX(idresultado)+1 FROM RESULTADO")
    int getResultadoid();
    
    @Insert("INSERT INTO RESULTADO(idresultado, fecha) VALUES(#{idresultado}, #{fecha})")     
    long nuevoResultado(@Param("idresultado") int idresultado, @Param("fecha") LocalDateTime fecha);
    
    @Insert("INSERT INTO DETALLE_RESULTADO(idresultado, idcarta, idplayer) VALUES(#{idresultado}, #{idcarta}, #{idplayer})")
    long insertarDetalleResultado(@Param("idresultado") int idresultado, @Param("idcarta") int idcarta, @Param("idplayer") int idplayer);
    
    
    
    @Select("SELECT p.idplayer, p.nombre, p.idrol " +
            "FROM PLAYER p " +
            "WHERE p.idplayer = (" +
            "SELECT idplayer " +
            "FROM DETALLE_RESULTADO " +
            "WHERE idresultado = #{idresultado} " +
            "AND idplayer != 1 " +
            "LIMIT 1)")
    PlayerDto getPlayerXResultado(@Param("idresultado") int idresultado);
    
    @Select("SELECT idplayer, nombre, idrol FROM PLAYER WHERE idplayer = #{idplayer}")
    PlayerDto getPlayer(@Param("idplayer") int idplayer);
    
       
}
