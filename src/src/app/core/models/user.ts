export interface User{

    Prenoms:string;
    Nom:string;
    Email:string;
    DateNaissance:Date;
    PhoneNumber:string;
    Password:string;
    ConfirmPassword:string;
    ProfileImage:File;
    CodeConfirmation:number;
    CodeEtablissementEtudiant:string;
}
export class Ville {
    id: string;
    libelle: string;
    paysId: string;
  
    constructor(id: string, libelle: string, paysId: string) {
      this.id = id;
      this.libelle = libelle;
      this.paysId = paysId;
    }
  }
  
  export class Pays {
    [x: string]: any;
    id: string;
    libelle: string;
    paysId?: string;
  
    constructor(id: string, libelle: string) {
      this.id = id;
      this.libelle = libelle;
    }
  }