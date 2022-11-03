import { Carta } from "./carta";

export interface Resultado{
    idresultado: number,
    fecha: Date,
    cartasJ: Carta[],
    cartasC: Carta[],
    totalJ: number,
    totalC: number,
    ganador: number
}