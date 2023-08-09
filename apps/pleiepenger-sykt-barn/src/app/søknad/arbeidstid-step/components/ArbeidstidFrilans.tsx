import React from 'react';
import { useIntl } from 'react-intl';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
import { FrilansFormField, Frilanstype } from '../../../types/FrilansFormData';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
import ArbeidIPeriodeInfo from './info/ArbeidIPeriodeInfo';

// import ArbeidstidHonorarInfo from './info/ArbeidstidHonorararbeidInfo';

interface Props {
    frilanstype: Frilanstype;
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    normalarbeidstid: number;
    /** Periode som frilanser i søknadsperioden */
    periode: DateRange;
    søkerFremITid: boolean;
}

const ArbeidstidFrilans: React.FunctionComponent<Props> = ({
    frilanstype,
    arbeidIPeriode,
    periode,
    normalarbeidstid,
    søkerFremITid,
}) => {
    const intl = useIntl();

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode: periode,
        jobberNormaltTimer: normalarbeidstid,
    });

    return (
        <ArbeidstidArbeidsaktivitet
            periode={periode}
            arbeidsforholdType={ArbeidsforholdType.FRILANSER}
            arbeidIPeriode={arbeidIPeriode}
            parentFieldName={FrilansFormField.arbeidsforhold}
            normalarbeidstid={normalarbeidstid}
            intlValues={intlValues}
            tittel="Jobb som frilanser, oppdragstaker og honorarer"
            info={
                <ArbeidIPeriodeInfo
                    søkerFremITid={søkerFremITid}
                    arbeidsforholdType={ArbeidsforholdType.FRILANSER}
                    tittel="Delvis jobb som frilanser i perioden">
                    {frilanstype === Frilanstype.FRILANS && (
                        <p>Nå trenger vi å vite hvor mange timer du jobber som frilanser i perioden du søker for.</p>
                    )}
                    {frilanstype === Frilanstype.FRILANS_HONORAR && (
                        <p>
                            Nå trenger vi å vite hvor mange timer du jobber som frilanser i perioden du søker for. Du
                            skal oppgi både tiden du bruker som frilanser og tiden du bruker på arbeidet du får honorar
                            for.
                        </p>
                    )}
                    {frilanstype === Frilanstype.HONORAR && (
                        <>
                            <p>
                                Nå trenger vi å vite hvor mange timer du jobber som frilanser i perioden du søker for.
                                Det vil si hvor mange timer du bruker på arbeidet du får honorar for.
                            </p>
                            {/* <ArbeidstidHonorarInfo /> */}
                        </>
                    )}
                </ArbeidIPeriodeInfo>
            }
        />
    );
};

export default ArbeidstidFrilans;
