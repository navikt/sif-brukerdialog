import React from 'react';
import { useIntl } from 'react-intl';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormValues } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { FrilansFormField, Frilanstype } from '../../../types/søknad-form-values/FrilansFormValues';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
import ArbeidIPeriodeInfo from './info/ArbeidIPeriodeInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { BodyLong } from '@navikt/ds-react';

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
        arbeidsforholdType: ArbeidsforholdType.FRILANSER,
    });

    return (
        <ArbeidstidArbeidsaktivitet
            periode={periode}
            arbeidsforholdType={ArbeidsforholdType.FRILANSER}
            arbeidIPeriode={arbeidIPeriode}
            parentFieldName={FrilansFormField.arbeidsforhold}
            normalarbeidstid={normalarbeidstid}
            intlValues={intlValues}
            tittel={intlHelper(intl, 'frilans.tittel')}
            arbeiderIPeriodenDescription={
                frilanstype === Frilanstype.FRILANS_HONORAR ? (
                    <p>{intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.description')}</p>
                ) : undefined
            }
            info={
                <ArbeidIPeriodeInfo
                    søkerFremITid={søkerFremITid}
                    arbeidsforholdType={ArbeidsforholdType.FRILANSER}
                    tittel="Delvis jobb som frilanser i perioden">
                    <BodyLong as="div">
                        {frilanstype === Frilanstype.FRILANS && (
                            <p>Nå må vi å vite hvor mange timer du jobber som frilanser i perioden du søker for.</p>
                        )}
                        {frilanstype === Frilanstype.FRILANS_HONORAR && (
                            <p>
                                Nå må vi vite hvor mange timer du jobber som frilanser i perioden du søker for. Du skal
                                altså legge sammen tiden du jobber som frilanser, med tiden du bruker på det du mottar
                                honorar for. Du skal oppgi denne tiden samlet.
                            </p>
                        )}
                        {frilanstype === Frilanstype.HONORAR && (
                            <>
                                <p>
                                    Nå må vi å vite hvor mange timer du jobber som frilanser i perioden du søker for.
                                    Det vil si hvor mange timer du bruker på arbeidet du får honorar for.
                                </p>
                            </>
                        )}
                    </BodyLong>
                </ArbeidIPeriodeInfo>
            }
        />
    );
};

export default ArbeidstidFrilans;
