// import React from 'react';
// import { FormattedMessage, useIntl } from 'react-intl';
// import { DateRange } from '@navikt/sif-common-utils/lib';
// import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
// import { ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
// import { FrilansFormField } from '../../../types/FrilansFormData';
// import { ArbeidsaktivitetType } from '../ArbeidstidStep';
// import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
// import ArbeidIPeriodeInfo from './info/ArbeidIPeriodeInfo';

// interface Props {
//     arbeidIPeriode?: ArbeidIPeriodeFormValues;
//     normalarbeidstid: number;
//     /** Periode som frilanser i søknadsperioden */
//     periode: DateRange;
//     søkerFremITid: boolean;
// }

// const ArbeidstidFrilansarbeid: React.FunctionComponent<Props> = ({
//     arbeidIPeriode,
//     periode,
//     normalarbeidstid,
//     søkerFremITid,
// }) => {
//     const intl = useIntl();

//     const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
//         periode: periode,
//         jobberNormaltTimer: normalarbeidstid,
//     });

//     return (
//         <ArbeidstidArbeidsaktivitet
//             periode={periode}
//             arbeidsaktivitetType={ArbeidsaktivitetType.FRILANSARBEID}
//             arbeidIPeriode={arbeidIPeriode}
//             parentFieldName={FrilansFormField.arbeidsforholdFrilansarbeid}
//             normalarbeidstid={normalarbeidstid}
//             intlValues={intlValues}
//             tittel="Jobb som frilanser"
//             info={
//                 <ArbeidIPeriodeInfo
//                     søkerFremITid={søkerFremITid}
//                     arbeidsaktivitetType={ArbeidsaktivitetType.FRILANSARBEID}
//                     tittel="Delvis jobb som frilanser i perioden">
//                     <p>
//                         <FormattedMessage id="arbeidIPeriode.info.frilansarbeid.tekst.1" />
//                     </p>
//                 </ArbeidIPeriodeInfo>
//             }
//         />
//     );
// };

// export default ArbeidstidFrilansarbeid;
