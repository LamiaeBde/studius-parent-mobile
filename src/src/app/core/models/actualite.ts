import { ActualiteImage } from "./actualiteImage";

export interface Actualite{
titre:string;
description:string;
datePublication:Date;
actualiteImages:ActualiteImage[];
isLiked:boolean;
}