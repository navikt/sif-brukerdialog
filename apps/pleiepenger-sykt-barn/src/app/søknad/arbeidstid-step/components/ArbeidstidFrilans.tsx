import React from 'react';
import { useIntl } from 'react-intl';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormValues } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { FrilansFormField, Frilanstype } from '../../../types/søknad-form-values/FrilansFormValues';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
import ArbeidIPeriodeInfo from './info/ArbeidIPeriodeInfo';

interface Props {
    frilanstype: Frilanstype;
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    normalarbeidstid: number;
    periode: DateRange /** Periode som frilanser i søknadsperioden */;
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
            tittel="Frilans og oppdrag som regnes som frilansoppdrag"
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
                        </>
                    )}
                </ArbeidIPeriodeInfo>
            }
        />
    );
};

export default ArbeidstidFrilans;
