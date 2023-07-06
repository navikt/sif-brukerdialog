import React from 'react';
import SøknadFormComponents from '../../../SøknadFormComponents';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { useIntl } from 'react-intl';
// import { getArbeidIPeriodeErLiktHverUkeValidator } from '../../validationArbeidIPeriodeSpørsmål';
import { ArbeidIPeriodeIntlValues } from '../../../../local-sif-common-pleiepenger';
import { RedusertArbeidAktivitetType } from '../ArbeidRedusertPart';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
// import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { SøknadFormField } from '../../../../types/SøknadFormValues';

interface Props {
    fieldName: SøknadFormField;
    aktivitetType: RedusertArbeidAktivitetType;
    intlValues: ArbeidIPeriodeIntlValues;
}

const ArbeiderLiktHverUkeSpørsmål: React.FunctionComponent<Props> = ({ fieldName, intlValues }) => {
    const intl = useIntl();
    return (
        <SøknadFormComponents.YesOrNoQuestion
            name={fieldName}
            legend={intlHelper(intl, `arbeidIPeriode.erLiktHverUke.spm`, intlValues)}
            validate={getArbeidIPeriodeErLiktHverUkeValidator(intlValues)}
            labels={{
                yes: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.ja`),
                no: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.nei`),
            }}
        />
    );
};

export const getArbeidIPeriodeErLiktHverUkeValidator = (intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: 'validation.arbeidIPeriode.erLiktHverUke',
              values: intlValues,
              keepKeyUnaltered: true,
          }
        : undefined;
};

// const messages: MessageFileFormat = {
//     nb: {
//         'arbeidIPeriode.erLiktHverUke.arbeidstaker.spm': 'Jobber du like mye hver uke {hvor} i perioden?',
//         'arbeidIPeriode.erLiktHverUke.frilansarbeid.spm': 'Jobber du like mye hver uke som frilanser i perioden?',
//         'arbeidIPeriode.erLiktHverUke.honorararbeid.spm':
//             'Bruker du like mange timer på det du får honorar for hver uke, eller varierer det fra uke til uke?',
//         'arbeidIPeriode.erLiktHverUke.frilansOgHonorararbeid.spm':
//             'Jobber du like mye hver uke som frilanser i perioden og bruker du like mange timer på det du får honorar for hver uke?',
//         'arbeidIPeriode.erLiktHverUke.prosent.spm': 'Jobber du like mye hver uke {hvor} i perioden?',
//         'arbeidIPeriode.erLiktHverUke.timer.spm': 'Jobber du like mange timer hver uke {hvor} i perioden?',
//         'arbeidIPeriode.erLiktHverUke.ja': 'Ja',
//         'arbeidIPeriode.erLiktHverUke.nei': 'Nei, det varierer',
//         'validation.arbeidIPeriode.erLiktHverUke.arbeidstaker':
//             'Du må svare på om du jobber like mye hver uke {hvor} i perioden.',
//         'validation.arbeidIPeriode.erLiktHverUke.frilansarbeid':
//             'Du må svare på om antall timer er likt hver uke, eller varierer det fra uke til uke.',
//         'validation.arbeidIPeriode.erLiktHverUke.honorararbeid':
//             'Du må svare på om antall timer er likt hver uke, eller varierer det fra uke til uke.',
//     },
// };

export default ArbeiderLiktHverUkeSpørsmål;
