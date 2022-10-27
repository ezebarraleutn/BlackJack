import { Rol } from "./rol";

export interface Player{
    idplayer: number,
    nombre: string,
    password?: string,
    rol: Rol
}