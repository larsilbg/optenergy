export type UserType = {
  UserID: string;
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

export type Device = {
  SteckdoseID?: string;
  Bezeichnung: string;
  IstAn: boolean;
  UserID?: string;
  AktivStartzeit: string | null
  AktivEndzeit: string | null;
  SteckdosengruppeID: string;
  SteckdosengruppeBezeichnung?: string;
  Verbrauch?: number[];
}

export type Analyse = {
  ersparnisInEuro: number;
  ersparnisInkWh: number;
  steckdosen: Device[];
}

export type DeviceGroup = {
  SteckdosengruppeID: string;
  Bezeichnung: string;
  UserID: string;
}

export type Optimierung = {
  steckdosen: Device[];
  ersparnisInEuro: number;
  ersparnisInkWh: number;
  AutoOptimierung: boolean;
}
