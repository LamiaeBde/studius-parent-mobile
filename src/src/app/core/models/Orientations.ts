export interface Orientations {
    id: string;
    etudiantId: string;
    parentId?: string;
    titre: string;
    description: string;
    conseillerId?: string;
    
    statut: Statut;
    createdDateTime: string;
    etudiant?: Etudiant;
    accesProfil: boolean; conseiller?:Conseiller;
  }

  export interface Conseiller {
    userID: string;
    demandeRecrutementId: string;
    estActive: boolean;
    nom: string;
    prenoms: string;
    dateNaissance: string;
    villeLibelle: string;
    paysLibelle: string;
    email: string;
    telephone: string;
    dateValidation: string;
  }
  
export interface Etudiant {

    class: string;
    etablissement: string;
    nom: string;
    prenom: string;
    dateNaissance: string; 
    pays: string;
  }
  
  export enum Statut {
    Saisie = 1,
    EnCours = 2,
    Validé = 3,
    Refusé = 4,
  }
  