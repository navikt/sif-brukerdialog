import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from '../../../types/_ArbeidIPeriodeFormValues';
import { ArbeidsukeInfo } from '../../../types/_ArbeidsukeInfo';
import SøknadFormComponents from '../../SøknadFormComponents';
import { ArbeidsaktivitetType } from '../ArbeidstidStep';
import { ArbeidsukeFieldName } from '../types/Arbeidsuke';
import {
    ArbeidsperiodeIForholdTilSøknadsperiode,
    getArbeidsperiodeIForholdTilSøknadsperiode,
    getArbeidsukerIPerioden,
} from '../utils/arbeidstidUtils';

export const getArbeidsukeKey = (week: ArbeidsukeInfo): string => {
    return `${dateRangeToISODateRange(week.periode)}`;
};

const getArbeidsukeFieldName = (parentFieldName: string, week: ArbeidsukeInfo): ArbeidsukeFieldName =>
    `${parentFieldName}.${getArbeidsukeKey(week)}`;

interface Props {
    arbeidsaktivitetType: ArbeidsaktivitetType;
    label: string;
    periode: DateRange;
    timerPerUkeValidator?: (uke: ArbeidsukeInfo) => (value: any) => ValidationResult<ValidationError>;
    parentFieldName: string;
    arbeidIPeriode: ArbeidIPeriodeFormValues;
}

export const getPeriodeISøknadsperiodeInfo = (intl: IntlShape, periode: DateRange, søknadsperiode: DateRange) => {
    const arbeidsperiodeVariant = getArbeidsperiodeIForholdTilSøknadsperiode(periode, søknadsperiode);
    switch (arbeidsperiodeVariant) {
        case ArbeidsperiodeIForholdTilSøknadsperiode.slutterIPerioden:
            return intlHelper(intl, 'arbeidIPeriode.arbeidsperiode.slutterIPerioden', {
                fra: dateFormatter.full(periode.to),
            });
        case ArbeidsperiodeIForholdTilSøknadsperiode.starterIPerioden:
            return intlHelper(intl, 'arbeidIPeriode.arbeidsperiode.starterIPerioden', {
                fra: dateFormatter.full(periode.from),
            });
        case ArbeidsperiodeIForholdTilSøknadsperiode.starterOgSlutterIPerioden:
            return intlHelper(intl, 'arbeidIPeriode.arbeidsperiode.starterOgSlutterIPerioden', {
                fra: dateFormatter.full(periode.from),
                til: dateFormatter.full(periode.to),
            });
        default:
            return '';
    }
};

const ArbeidstidEnkeltuker: React.FunctionComponent<Props> = ({
    periode,
    parentFieldName,
    label: spørsmål,
    timerPerUkeValidator,
}) => {
    const arbeidsuker = getArbeidsukerIPerioden(periode);

    const getFieldName = (arbeidsuke: ArbeidsukeInfo): any =>
        `${getArbeidsukeFieldName(parentFieldName, arbeidsuke)}.${ArbeidIPeriodeFormField.snittTimerPerUke}`;

    return (
        <SøknadFormComponents.InputGroup
            name={`${parentFieldName}_ukerGroup` as any}
            data-testid="arbeidsuker"
            legend={spørsmål}>
            {arbeidsuker.map((arbeidsuke) => {
                return (
                    <div key={dateRangeToISODateRange(arbeidsuke.periode)}>
                        <SøknadFormComponents.NumberInput
                            className="arbeidstidUkeInput"
                            name={getFieldName(arbeidsuke)}
                            label={
                                <>
                                    <FormattedMessage
                                        id="arbeidIPeriode.uke.ukenummer"
                                        values={{ ukenummer: arbeidsuke.ukenummer }}
                                    />
                                    <br />
                                    <BodyShort as="div">
                                        <FormattedMessage
                                            id="arbeidIPeriode.uke.ukedatoer"
                                            values={{
                                                ukedatoer: `${dateFormatter.compact(
                                                    arbeidsuke.periode.from
                                                )} - ${dateFormatter.compact(arbeidsuke.periode.to)}`,
                                            }}
                                        />
                                    </BodyShort>
                                </>
                            }
                            validate={timerPerUkeValidator ? timerPerUkeValidator(arbeidsuke) : undefined}
                            data-testid="timer-verdi"
                            width="xs"
                            maxLength={4}
                        />
                    </div>
                );
            })}
        </SøknadFormComponents.InputGroup>
    );
};

export default ArbeidstidEnkeltuker;
