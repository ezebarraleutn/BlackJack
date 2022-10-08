import { Carta } from "./carta";

export interface Resultado{
    cartasJ: Carta[],
    cartasC: Carta[],
    totalJ: number,
    totalC: number
}