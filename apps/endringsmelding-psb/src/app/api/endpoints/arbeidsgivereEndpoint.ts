import { ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Arbeidsgiver, ArbeidsgiverType } from '../../types/Arbeidsgiver';
import api from '../api';
import { ApiEndpointPsb } from './';

type AAregArbeidsgiver = {
    organisasjoner?: {
        organisasjonsnummer: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }[];
    privatarbeidsgiver?: {
        offentligIdent: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }[];
};

// const getOrganisasjonerIkkeRegistrertiAaReg = (
//     k9arbeidstakere: K9FormatArbeidsgiverOrganisasjon[],
//     arbeidsgivereAaReg: Arbeidsgiver[]
// ): K9FormatArbeidsgiver[] => {
//     return k9arbeidstakere.filter(
//         (k9a) => arbeidsgivereAaReg.find((a) => a.id === k9a.organisasjonsnummer) === undefined
//     );
// };

// /** Når K9 har informasjon om en arbeidsgiver som ikke enda er
//  * registrert i aa-reg, hentes navn på organisasjon fra
//  * enhetsregisteret */

// export const getOrganisasjonerSomArbeidsgivere = async (
//     k9arbeidsgivere: K9FormatArbeidsgiver[],
//     aaArbeidsgivere: Arbeidsgiver[]
// ) => {
//     const k9ArbeidsgivereOrganisasjon: K9FormatArbeidsgiverOrganisasjon[] = k9arbeidsgivere.filter((a) =>
//         isK9FormatArbeidsgiverOrganisasjon(a)
//     ) as any;

//     const organisasjonerIkkeIAaReg = getOrganisasjonerIkkeRegistrertiAaReg(
//         k9ArbeidsgivereOrganisasjon,
//         aaArbeidsgivere
//     ).map((a: K9FormatArbeidsgiverOrganisasjon) => a.organisasjonsnummer);

//     if (organisasjonerIkkeIAaReg.length > 0) {
//         const organisasjonerParams = `orgnr=${organisasjonerIkkeIAaReg.join('&orgnr=')}`;
//         const { data } = await api.psb.get<OrganisasjonResponseType>(
//             ApiEndpointPsb.organisasjoner,
//             organisasjonerParams
//         );
//         return Object.keys(data).map(
//             (organisasjonsnummer): Arbeidsgiver => ({
//                 type: ArbeidsgiverType.ORGANISASJON,
//                 id: organisasjonsnummer,
//                 navn: data[organisasjonsnummer],
//                 erUkjentIAareg: true,
//             })
//         );
//     }
//     return [];
// };

export const arbeidsgivereEndpoint = {
    fetch: async (fom: string, tom: string): Promise<Arbeidsgiver[]> => {
        try {
            const { data } = await api.psb.get<AAregArbeidsgiver>(
                ApiEndpointPsb.arbeidsgiver,
                `ytelse=endringsmelding-pleiepenger&fra_og_med=${fom}&til_og_med=${tom}`
            );
            const aaArbeidsgivere: Arbeidsgiver[] = [];
            (data.organisasjoner || []).forEach((a) => {
                aaArbeidsgivere.push({
                    id: a.organisasjonsnummer,
                    type: ArbeidsgiverType.ORGANISASJON,
                    navn: a.navn,
                    ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
                    ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
                });
            });
            (data.privatarbeidsgiver || []).forEach((a) => {
                aaArbeidsgivere.push({
                    id: a.offentligIdent,
                    type: ArbeidsgiverType.PRIVATPERSON,
                    navn: a.navn,
                    ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
                    ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
                });
            });
            return Promise.resolve(aaArbeidsgivere);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
