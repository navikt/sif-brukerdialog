import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import { AppText, useAppIntl } from '@i18n/index';
import { DateRange } from '@navikt/sif-common-utils';
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
    mottarOmsorgsstønad: boolean;
}

const ArbeidstidFrilans: React.FunctionComponent<Props> = ({
    frilanstype,
    arbeidIPeriode,
    periode,
    normalarbeidstid,
    søkerFremITid,
    mottarOmsorgsstønad,
}) => {
    const appIntl = useAppIntl();
    const intlValues = getArbeidstidIPeriodeIntlValues(appIntl, {
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
            tittel={appIntl.text('frilans.tittel')}
            arbeiderIPeriodenDescription={
                frilanstype === Frilanstype.FRILANS_HONORAR ? (
                    <p>
                        <AppText id="arbeidIPeriode.arbeiderIPerioden.description" />
                    </p>
                ) : undefined
            }
            info={
                <ArbeidIPeriodeInfo
                    søkerFremITid={søkerFremITid}
                    arbeidsforholdType={ArbeidsforholdType.FRILANSER}
                    mottarOmsorgsstønad={mottarOmsorgsstønad}
                    tittel="Delvis jobb som frilanser i perioden">
                    <BodyLong as="div">
                        {frilanstype === Frilanstype.FRILANS && (
                            <>Nå må vi å vite hvor mange timer du jobber som frilanser i perioden du søker for.</>
                        )}
                        {frilanstype === Frilanstype.FRILANS_HONORAR && (
                            <>
                                Nå må vi vite hvor mange timer du jobber som frilanser i perioden du søker for. Du skal
                                altså legge sammen tiden du jobber som frilanser, med tiden du bruker på det du mottar
                                honorar for. Du skal oppgi denne tiden samlet.
                            </>
                        )}
                        {frilanstype === Frilanstype.HONORAR && (
                            <>
                                Nå må vi å vite hvor mange timer du jobber som frilanser i perioden du søker for. Det
                                vil si hvor mange timer du bruker på arbeidet du får honorar for.
                            </>
                        )}
                    </BodyLong>
                </ArbeidIPeriodeInfo>
            }
        />
    );
};

export default ArbeidstidFrilans;
