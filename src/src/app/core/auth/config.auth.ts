import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://localhost:7277',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'studius-mobile-ionic',
  responseType: 'code',
  dummyClientSecret: 'secretIonic',
 // scope: 'openid offline_access IdentityServerAPI.read IdentityServerAPI.write profile ActualitesAPI.read ActualitesAPI.write offline_access RecrutementsAPI.read  RecrutementsAPI.write ConseillersAPI.read ConseillersAPI.write OrientationsAPI.read OrientationsAPI.write EtablissementsAPI.read EtablissementsAPI.write' ,
 scope: 'openid offline_access profile ActualitesAPI.read ActualitesAPI.write  ConseillersAPI.read ConseillersAPI.write OrientationsAPI.read OrientationsAPI.write IdentityServerAPI.read IdentityServerAPI.write EtablissementsAPI.read EtablissementsAPI.write',

  showDebugInformation: true
};
