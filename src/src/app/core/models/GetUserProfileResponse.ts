export interface GetUserProfileResponse {
    profileImage: string;
    firstName: string;
    lastName: string;
    email?: string;
    dateNaissance: Date;
    phoneNumber?: string;
    id:string;
  }
  