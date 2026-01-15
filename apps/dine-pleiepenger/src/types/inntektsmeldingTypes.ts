import { Inntektsmelding } from '.';

export type Refusjon = Inntektsmelding['refusjon'];
export type EndringerRefusjon = Inntektsmelding['endringerRefusjon'];
export type EndringRefusjon = NonNullable<EndringerRefusjon>[0];
