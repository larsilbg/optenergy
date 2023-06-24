export type UserType = {
  id: string;
  Vorname: string;
  Nachname: string;
  Profilbild: string;
  Telefon: string;
  Land: string;
  Email: string;
  IstPremium: boolean;
  Rechnungsadresse: string;
  Bankadresse: string;
  Strompreis: number;
}

export type Devices = {
  SteckdosenID: string;
  Bezeichnung: string;
  IstAn: boolean;
  UserID: string;
  AktivStartzeit: string;
  AktivEndzeit: string;
  SteckdosengruppeID: string;
  Verbrauch?: number[];
}

export type Analyse = {
  ersparnisInEuro: number;
  ersparnisInkWH: number;
  steckdosen: Devices[];
}
