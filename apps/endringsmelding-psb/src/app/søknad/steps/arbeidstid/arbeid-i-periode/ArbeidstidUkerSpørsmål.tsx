import React from 'react';
import { useIntl } from 'react-intl';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import ArbeidstidInput from './ArbeidstidInput';
import { ArbeidsukeInfo } from '../ArbeidsukeInfo';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues, TimerEllerProsent } from './ArbeidIPeriodeFormValues';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getArbeidsukerIPerioden } from './arbeidstidUtils';

dayjs.extend(weekOfYear);

export const getArbeidsukeKey = (week: ArbeidsukeInfo): string => {
    return `${dateRangeToISODateRange(week.periode)}`;
};

const getArbeidsukeFieldName = (parentFieldName: string, week: ArbeidsukeInfo): string =>
    `${parentFieldName}.${ArbeidIPeriodeFormField.arbeidsuker}.${getArbeidsukeKey(week)}`;

interface Props {
    periode: DateRange;
    parentFieldName: string;
    timerEllerProsent: TimerEllerProsent;
    arbeidIPeriode: ArbeidIPeriodeFormValues;
    intlValues: ArbeidIPeriodeIntlValues;
}

const { InputGroup } = getTypedFormComponents<ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues, ValidationError>();

const ArbeidstidUkerSpørsmål: React.FunctionComponent<Props> = ({
    periode,
    parentFieldName,
    timerEllerProsent,
    arbeidIPeriode,
    intlValues,
}) => {
    const arbeidsuker = getArbeidsukerIPerioden(periode);
    const intl = useIntl();

    const legendKey = `arbeidIPeriode.ulikeUkerGruppe.${
        timerEllerProsent === TimerEllerProsent.PROSENT ? 'prosent' : 'timer'
    }.spm`;
    const legend = intlHelper(intl, legendKey, intlValues);

    return (
        <InputGroup name={`${parentFieldName}_ukerGroup` as any} data-testid="arbeidsuker" legend={legend}>
            {arbeidsuker.map((arbeidsuke) => {
                return (
                    <div key={dateRangeToISODateRange(arbeidsuke.periode)}>
                        <ArbeidstidInput
                            arbeidsuke={arbeidsuke}
                            parentFieldName={getArbeidsukeFieldName(parentFieldName, arbeidsuke)}
                            arbeidIPeriode={arbeidIPeriode}
                            intlValues={intlValues}
                            timerEllerProsent={timerEllerProsent}
                        />
                    </div>
                );
            })}
        </InputGroup>
    );
};

export default ArbeidstidUkerSpørsmål;
