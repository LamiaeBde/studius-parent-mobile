export interface Message {
    systemDate: string | number | Date;
    alignment: string;
    id: string;
    userId: string;
    textMessage: string;
    orientationId: string;
    createdDateTime: string;
    orientation: {
      id: string;
      createdDateTime: string;
      createdBy: string;
      updatedDateTime: string;
      lastUpdatedBy: string;
      etudiantId: string;
      parentId: string;
      titre: string;
      description: string;
      conseillerId: string;
      statut: number;
      parent: {
        id: string;
        createdDateTime: string;
        createdBy: string;
        updatedDateTime: string;
        lastUpdatedBy: string;
        userID: string;
        nom: string;
        prenom: string;
        etudiantId: string;
      };
      etudiant: {
        id: string;
        createdDateTime: string;
        createdBy: string;
        updatedDateTime: string;
        lastUpdatedBy: string;
        userID: string;
        class: string;
        etablissement: string;
        nom: string;
        prenom: string;
        dateNaissance: string;
        pays: string;
      };
      conseiller :{
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
      };
    };
  }
  