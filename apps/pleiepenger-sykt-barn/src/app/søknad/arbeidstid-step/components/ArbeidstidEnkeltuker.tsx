import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { DateRange, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';
import { dateFormatter, dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { ArbeidsukeInfo } from '../../../types/ArbeidsukeInfo';
import {
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
} from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';
import { ArbeidsukeFieldName } from '../types/Arbeidsuke';
import { getArbeidsukerIPerioden } from '../utils/arbeidstidStepUtils';

export const getArbeidsukeKey = (week: ArbeidsukeInfo): string => {
    return `${dateRangeToISODateRange(week.periode)}`;
};

const getArbeidsukeFieldName = (parentFieldName: string, week: ArbeidsukeInfo): ArbeidsukeFieldName =>
    `${parentFieldName}.${getArbeidsukeKey(week)}`;

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
    label: string;
    periode: DateRange;
    timerPerUkeValidator?: (uke: ArbeidsukeInfo) => (value: any) => ValidationResult<ValidationError>;
    parentFieldName: string;
    arbeidIPeriode: ArbeidIPeriodeFormValues;
}

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
                                    <AppText
                                        id="arbeidIPeriode.uke.ukenummer"
                                        values={{ ukenummer: arbeidsuke.ukenummer }}
                                    />
                                    <br />
                                    <BodyShort as="div">
                                        <AppText
                                            id="arbeidIPeriode.uke.ukedatoer"
                                            values={{
                                                ukedatoer: `${dateFormatter.compact(
                                                    arbeidsuke.periode.from,
                                                )} - ${dateFormatter.compact(arbeidsuke.periode.to)}`,
                                            }}
                                        />
                                    </BodyShort>
                                </>
                            }
                            validate={timerPerUkeValidator ? timerPerUkeValidator(arbeidsuke) : undefined}
                            data-testid="timer-verdi"
                            width="xs"
                            maxLength={5}
                        />
                    </div>
                );
            })}
        </SøknadFormComponents.InputGroup>
    );
};

export default ArbeidstidEnkeltuker;
