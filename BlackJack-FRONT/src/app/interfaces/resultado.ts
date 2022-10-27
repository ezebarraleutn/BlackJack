import { Carta } from "./carta";
import { Player } from "./player";

export interface Resultado{
    idresultado: number,
    fecha: Date,
    cartasJ: Carta[],
    cartasC: Carta[],
    totalJ: number,
    totalC: number,
    jugador: Player
}