package com.javainuse.mapper;

import com.javainuse.model.CantidadXFecha;
import com.javainuse.model.CantidadXHora;
import com.javainuse.model.Carta;
import com.javainuse.model.DetalleResultado;
import com.javainuse.model.Resultado;
import com.javainuse.model.ResultadoInfo;
import com.javainuse.model.UserDTO;
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
            "AND iduser = #{iduser})")
    List<Carta> getCartasJugadas(@Param("idresultado") int idresultado, @Param("iduser") int iduser);
    
    
    
    @Update("UPDATE RESULTADO SET ganador = #{ganador}  WHERE idresultado = #{idresultado}")
    Long setGanador(@Param("idresultado") int idresultado, @Param("ganador") int ganador);
    
    @Select("SELECT * FROM RESULTADO WHERE idresultado = #{idresultado}")
    ResultadoInfo getResultado(@Param("idresultado") int idresultado);
    
    @Select("SELECT COUNT(*) \n" +
            "FROM resultado\n" +
            "WHERE ganador = #{ganador}\n" +
            "AND idresultado IN (\n" +
            "	SELECT DISTINCT idresultado \n" +
            "	FROM blackjack.detalle_resultado\n" +
            "	WHERE iduser = #{iduser}\n" +
            ")")
    Integer getResultadoXUserId(@Param("iduser") int iduser, @Param("ganador") int ganador);
    
    @Select("SELECT HOUR(fecha) hora, COUNT(*) cantidad FROM resultado\n" +
            "WHERE DAY(fecha) = DAY(now())\n" +
            "AND HOUR(fecha) BETWEEN HOUR(NOW())-4 AND HOUR(NOW())\n" +
            "AND ganador = #{resultado}\n" +
            "AND idresultado IN (\n" +
            "	SELECT idresultado FROM detalle_resultado\n" +
            "    WHERE iduser = #{iduser}\n" +
            ")\n" +
            "GROUP BY hora\n"+
            "ORDER BY hora DESC")
    List<CantidadXHora> getCantidadXHora(@Param("iduser") int iduser, @Param("resultado") int resultado);
    
    @Select("SELECT MAX(idresultado)+1 FROM RESULTADO")
    int getResultadoid();
    
    @Select("SELECT MAX(r.idresultado) idresultado, r.fecha " +
            "FROM resultado r " +
            "JOIN detalle_resultado dr " +
            "ON r.idresultado = dr.idresultado " +
            "WHERE iduser = #{iduser} " +
            "AND 1 = ( " +
            "	SELECT count(iduser) " +
            "	FROM blackjack.detalle_resultado " +
            "	WHERE idresultado = r.idresultado " +
            "	AND iduser = 1) " +
            "AND r.idresultado = ( " +
            "	SELECT MAX(rr.idresultado) " +
            "	FROM resultado rr )")
    Resultado getUltimoResultado(@Param("iduser") int iduser);
    
    @Insert("INSERT INTO RESULTADO(idresultado, fecha) VALUES(#{idresultado}, #{fecha})")     
    long nuevoResultado(@Param("idresultado") int idresultado, @Param("fecha") LocalDateTime fecha);
    
    @Insert("INSERT INTO DETALLE_RESULTADO(idresultado, idcarta, iduser) VALUES(#{idresultado}, #{idcarta}, #{iduser})")
    long insertarDetalleResultado(@Param("idresultado") int idresultado, @Param("idcarta") int idcarta, @Param("iduser") int iduser);
    
    @Select("SELECT COUNT(*) " +
            "FROM resultado r " +
            "JOIN detalle_resultado dr " +
            "ON r.idresultado = dr.idresultado " +
            "WHERE iduser = #{iduser} " +
            "AND 1 = ( " +
            "	SELECT count(iduser) " +
            "	FROM blackjack.detalle_resultado " +
            "	WHERE idresultado = r.idresultado " +
            "	AND iduser = 1) " +
            "AND r.idresultado = ( " +
            "	SELECT MAX(rr.idresultado) " +
            "	FROM resultado rr )")
    int getCantidadCrupier(@Param("iduser") int iduser);
    
    @Select("SELECT * FROM detalle_resultado " +
            "WHERE idresultado = #{idresultado}")
    DetalleResultado getDetalleXIdResultado(@Param("idresultado") int idresultado);
    
    @Select("SELECT COUNT(*) FROM resultado")
    Integer getTotalPartidas();
    
    @Select("SELECT COUNT(r.ganador)\n" +
            "FROM resultado r\n" +
            "WHERE r.ganador = 1")
    Integer getTotalGanadasCrupier();
    
    
    
    
    
    @Select("SELECT p.username" +
            "FROM USER p " +
            "WHERE p.iduser = (" +
            "SELECT iduser " +
            "FROM DETALLE_RESULTADO " +
            "WHERE idresultado = #{idresultado} " +
            "AND iduser != 1 " +
            "LIMIT 1)")
    String getPlayerXResultado(@Param("idresultado") int idresultado);
    
    @Select("SELECT username, password FROM USER WHERE iduser = #{iduser}")
    UserDTO getPlayer(@Param("iduser") int iduser);
    
    @Select("SELECT id FROM USER WHERE username = #{username}")
    int getIdPlayer(@Param("username") String username);
    
    
    @Select("SELECT COUNT(*) cantidad, date_format( date_add(now(), INTERVAL -#{num} DAY) , \"%d/%m/%Y\") fecha \n" +
            "FROM resultado r\n" +
            "WHERE DAY(fecha) = DAY(now())-#{num}\n" +
            "AND MONTH(fecha) = MONTH(now())\n" +
            "AND YEAR(fecha) = YEAR(now())")
    CantidadXFecha getCantidadJugadas(@Param("num") int num);
    
    @Select("SELECT count(u.id) cantidad, date_format( date_add(now(), INTERVAL -#{num} DAY) , \"%d/%m/%Y\") fecha\n" +
            "FROM user u\n" +
            "WHERE u.id IN (\n" +
            "	SELECT dr.iduser\n" +
            "	FROM detalle_resultado dr\n" +
            "	JOIN resultado r\n" +
            "	ON dr.idresultado = r.idresultado\n" +
            "	WHERE dr.iduser <> 1\n" +
            "	AND DAY(fecha) = DAY(now())-#{num}\n" +
            "	AND MONTH(fecha) = MONTH(now())\n" +
            "	AND YEAR(fecha) = YEAR(now())\n" +
            "	GROUP BY dr.iduser\n" +
            ");")
    CantidadXFecha getCantidadJugadores(@Param("num") int num);
    
    
    @Select("SELECT COUNT(*)\n" +
            "FROM resultado\n" +
            "WHERE idresultado in (\n" +
            "	SELECT idresultado\n" +
            "	FROM detalle_resultado dr\n" +
            "	JOIN carta c\n" +
            "	ON dr.idcarta = c.idcarta\n" +
            "	WHERE iduser = #{iduser}\n" +
            "	GROUP BY idresultado)")
    Integer getCantidadJugadasXJugador(@Param("iduser") int iduser);
    
    @Select("SELECT SUM(c.valor)\n" +
            "FROM detalle_resultado dr\n" +
            "JOIN carta c\n" +
            "ON dr.idcarta = c.idcarta\n" +
            "WHERE iduser = #{iduser}")
    Integer getSumaCartasJugadasXJugador(@Param("iduser") int iduser);
    
    @Select("SELECT COUNT(*)\n" +
            "FROM resultado\n" +
            "WHERE idresultado in (\n" +
            "	SELECT idresultado\n" +
            "	FROM detalle_resultado dr\n" +
            "	JOIN carta c\n" +
            "	ON dr.idcarta = c.idcarta\n" +
            "	WHERE iduser <> 1\n" +
            "	GROUP BY idresultado)")
    Integer getCantidadSinCrupier();
    
    @Select("SELECT SUM(c.valor)\n" +
            "FROM detalle_resultado dr\n" +
            "JOIN carta c\n" +
            "ON dr.idcarta = c.idcarta\n" +
            "WHERE iduser <> 1")
    Integer getSumaCartasSinCrupier();
}
