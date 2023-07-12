export enum TypeSignal {
    Conseiller = 1,
    Etudiant = 2,
    Parent = 3,
    Value1
  }
    
    export class UserSignalDto {
      UserSingalId!: string ;
      type!: TypeSignal;
      raison: string | null = '';
    }
    
    export class CreateResponse {
      message: string = '';
    }
    