// Legacy export (for bakoverkompatibilitet)
export * from './generated/client';
export * from './generated/client/sdk.gen';
export * from './generated/client/types.gen';
export * from './generated/client/zod.gen';
export * from './generated/client/client.gen';

// Omsorgspenger API
export * as omsorgspenger from './generated/omsorgspenger';

// Ungdomsytelse API
export * as ungdomsytelse from './generated/ungdomsytelse';

// Ettersendelse API
export * as ettersendelse from './generated/ettersendelse';

// Omsorgspenger Aleneomsorg API
export * as omsorgspengerAleneomsorg from './generated/omsorgspenger-aleneomsorg';

// Omsorgspenger Midlertidig Alene API
export * as omsorgspengerMidlertidigAlene from './generated/omsorgspenger-midlertidig-alene';

// Omsorgspengerutbetaling Arbeidstaker API
export * as omsorgspengerutbetalingArbeidstaker from './generated/omsorgspengerutbetaling-arbeidstaker';

// Omsorgspengerutbetaling SNF API
export * as omsorgspengerutbetalingSnf from './generated/omsorgspengerutbetaling-snf';

// Opplæringspenger API
export * as opplaeringspenger from './generated/opplaeringspenger';

// Pleiepenger Livets Sluttfase API
export * as pleiepengerLivetsSluttfase from './generated/pleiepenger-livets-sluttfase';

// Pleiepenger Sykt Barn Endringsmelding API
export * as pleiepengerSyktBarnEndringsmelding from './generated/pleiepenger-sykt-barn-endringsmelding';

// Pleiepenger Sykt Barn Søknad API
export * as pleiepengerSyktBarnSoknad from './generated/pleiepenger-sykt-barn-soknad';

export * from './initAllK9BrukerdialogProsesseringApiClients';
