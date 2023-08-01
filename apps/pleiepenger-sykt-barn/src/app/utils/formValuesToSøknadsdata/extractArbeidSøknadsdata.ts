// import { DateRange } from '@navikt/sif-common-formik-ds/lib';
// import { SøknadFormValues } from '../../types/SøknadFormValues';
// import { ArbeidSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
// import { extractArbeidSelvstendigSøknadsdata } from './extractArbeidSelvstendigSøknadsdata';
// import { extractArbeidsgivereArbeidsforholdSøknadsdata } from './extractArbeidsgivereArbeidsforholdSøknadsdata';
// import { extractFrilanserSøknadsdata } from './extractFrilanserSøknadsdata';
// import { extractOpptjeningUtlandSøknadsdata } from './extractOpptjeningUtlandSøknadsdata';
// import { extractUtenlandskNæringSøknadsdata } from './extractUtenlandskNæringSøknadsdata';

// export const extractArbeidSøknadsdata = (
//     values: SøknadFormValues,
//     søknadsperiode: DateRange
// ): ArbeidSøknadsdata | undefined => {
//     const arbeidsgivere = extractArbeidsgivereArbeidsforholdSøknadsdata(values.ansatt_arbeidsforhold, søknadsperiode);
//     const frilanser = extractFrilanserSøknadsdata(values.frilans, søknadsperiode);
//     const selvstendig = extractArbeidSelvstendigSøknadsdata(values.selvstendig, søknadsperiode);
//     const opptjeningUtland = extractOpptjeningUtlandSøknadsdata(values);
//     const utenlandskNæring = extractUtenlandskNæringSøknadsdata(values);

//     if (!arbeidsgivere && !frilanser && !selvstendig) {
//         return undefined;
//     }
//     return {
//         arbeidsgivere,
//         frilanser,
//         selvstendig,
//         opptjeningUtland,
//         utenlandskNæring,
//     };
// };
