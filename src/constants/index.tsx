export interface ConditionToLabel {
  "id": number,
  "idSpot": number,
  "spot": string,
  "fecha": string,
  "dir": string,
  "velmedia": number,
  "racha": number,
  "alturaOleaje": number,
  "periodoMedioOleaje": number,
  "periodoPicoOleaje": number,
  "direccionOleaje": number,
  "velocidadViento": number,
  "direccionViento": number,
  "velocidadCorriente": number,
  "direccionCorriente": number,
  "idDeporte": number,
  "deporte": string,
  "idModalidad": number,
  "modalidad": string,
  "valoracion": number,
  "perfilRider": string,
  "pesoRider": number,
  "edadRider": number,
  "kiteSize": number,
  "sailSize": number,
  "wingSize": number,
  "kiteBoardSize": number,
  "kiteBoardType": string,
  "windBoardSize": number,
  "windBoardType": string,
  "wingBoardSize": number,
  "wingFfoilSize": number,
  "labeled": boolean
}

export interface ConditionToLabelResponse
{
  success: boolean;
  response?: Response;
}