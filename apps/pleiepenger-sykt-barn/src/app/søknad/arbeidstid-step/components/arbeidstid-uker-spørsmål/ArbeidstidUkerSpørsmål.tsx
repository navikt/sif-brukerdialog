import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter, dateRangeToISODateRange, decimalDurationToDuration } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { ArbeidIPeriodeIntlValues } from '../../../../local-sif-common-pleiepenger';
import { formatTimerOgMinutter } from '../../../../local-sif-common-pleiepenger/components/timer-og-minutter/TimerOgMinutter';
import { TimerEllerProsent } from '../../../../types';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from '../../../../types/ArbeidIPeriodeFormValues';
import { ArbeidsukeInfo } from '../../../../types/ArbeidsukeInfo';
import SøknadFormComponents from '../../../SøknadFormComponents';
import { ArbeidsukeFieldName } from '../../types/Arbeidsuke';
import {
    ArbeidsperiodeIForholdTilSøknadsperiode,
    getArbeidsperiodeIForholdTilSøknadsperiode,
    getArbeidsukerIPerioden,
} from '../../utils/arbeidstidUtils';
import ArbeidstidInput from './ArbeidstidInput';

dayjs.extend(weekOfYear);

export const getArbeidsukeKey = (week: ArbeidsukeInfo): string => {
    return `${dateRangeToISODateRange(week.periode)}`;
};

const getArbeidsukeFieldName = (parentFieldName: string, week: ArbeidsukeInfo): ArbeidsukeFieldName =>
    `${parentFieldName}.${ArbeidIPeriodeFormField.arbeidsuker}.${getArbeidsukeKey(week)}`;

interface Props {
    periode: DateRange;
    søknadsperiode: DateRange;
    parentFieldName: string;
    normalarbeidstid: number;
    timerEllerProsent: TimerEllerProsent;
    arbeidIPeriode: ArbeidIPeriodeFormValues;
    intlValues: ArbeidIPeriodeIntlValues;
    erFrilanser?: boolean;
    frilansVervString?: string;
    frilansVervValideringString?: string;
}

const getPeriodeISøknadsperiodeInfo = (intl: IntlShape, periode: DateRange, søknadsperiode: DateRange) => {
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

const ArbeidstidUkerSpørsmål: React.FunctionComponent<Props> = ({
    periode,
    søknadsperiode,
    parentFieldName,
    normalarbeidstid,
    timerEllerProsent,
    arbeidIPeriode,
    intlValues,
    erFrilanser,
    frilansVervString,
    frilansVervValideringString,
}) => {
    const arbeidsuker = getArbeidsukerIPerioden(periode);
    const intl = useIntl();

    const timerNormaltString = formatTimerOgMinutter(intl, decimalDurationToDuration(normalarbeidstid));

    return (
        <SøknadFormComponents.InputGroup
            name={`${parentFieldName}_ukerGroup` as any}
            data-testid="arbeidsuker"
            legend={
                erFrilanser === true
                    ? intlHelper(intl, 'arbeidIPeriode.ulikeUkerGruppe.frilanser.timer.spm', { frilansVervString })
                    : intlHelper(
                          intl,
                          `arbeidIPeriode.ulikeUkerGruppe.${
                              timerEllerProsent === TimerEllerProsent.PROSENT ? 'prosent' : 'timer'
                          }.spm`,
                          {
                              ...intlValues,
                              timerNormaltString,
                              periode: getPeriodeISøknadsperiodeInfo(intl, periode, søknadsperiode),
                          }
                      )
            }>
            {arbeidsuker.map((arbeidsuke) => {
                return (
                    <div key={dateRangeToISODateRange(arbeidsuke.periode)}>
                        <ArbeidstidInput
                            arbeidsuke={arbeidsuke}
                            parentFieldName={getArbeidsukeFieldName(parentFieldName, arbeidsuke)}
                            arbeidIPeriode={arbeidIPeriode}
                            intlValues={intlValues}
                            normalarbeidstid={normalarbeidstid}
                            timerEllerProsent={timerEllerProsent}
                            frilans={erFrilanser}
                            frilansVervString={frilansVervString}
                            frilansVervValideringString={frilansVervValideringString}
                        />
                    </div>
                );
            })}
        </SøknadFormComponents.InputGroup>
    );
};

export default ArbeidstidUkerSpørsmål;
