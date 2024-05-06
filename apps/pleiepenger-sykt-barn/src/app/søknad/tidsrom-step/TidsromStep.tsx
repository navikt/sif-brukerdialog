import { Alert } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/FerieuttakListAndDialog';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/types';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { date1YearAgo, date1YearFromNow, date3YearsAgo, DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../components/responsive-panel/ResponsivePanel';
import { SøkerdataContext } from '../../context/SøkerdataContext';
import { AppText } from '../../i18n';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { søkerKunHelgedager } from '../../utils/formValuesUtils';
import {
    validateFerieuttakIPerioden,
    validateFradato,
    validateTildato,
    validateUtenlandsoppholdIPerioden,
} from '../../validation/fieldValidations';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadFormStep from '../SøknadFormStep';
import harUtenlandsoppholdUtenInnleggelseEllerInnleggeleForEgenRegning from './harUtenlandsoppholdUtenInnleggelseEllerInnleggelseForEgenRegning';

dayjs.extend(minMax);

const TidsromStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const søkerdata = React.useContext(SøkerdataContext);

    const barnetSøknadenGjelder = values.barnetSøknadenGjelder
        ? søkerdata?.barn.find((barn) => barn.aktørId === values.barnetSøknadenGjelder)
        : undefined;

    const periodeFra = datepickerUtils.getDateFromDateString(values.periodeFra);

    const periodeTil = datepickerUtils.getDateFromDateString(values.periodeTil);
    const periode: DateRange = {
        from: periodeFra || date1YearAgo,
        to: periodeTil || date1YearFromNow,
    };
    const { text } = useAppIntl();

    const validateFraDatoField = (date?: string) => {
        return validateFradato(date, values.periodeTil, barnetSøknadenGjelder?.fødselsdato);
    };

    const validateTilDatoField = (date?: string) => {
        return validateTildato(date, values.periodeFra);
    };

    const visInfoOmUtenlandsopphold =
        values.skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES &&
        values.utenlandsoppholdIPerioden &&
        harUtenlandsoppholdUtenInnleggelseEllerInnleggeleForEgenRegning(values.utenlandsoppholdIPerioden);

    return (
        <SøknadFormStep
            stepId={StepID.TIDSROM}
            onValidFormSubmit={onValidSubmit}
            showSubmitButton={!søkerKunHelgedager(values.periodeFra, values.periodeTil)}>
            <SøknadFormComponents.DateRangePicker
                legend={text('steg.tidsrom.hvilketTidsrom.spm')}
                description={
                    <ExpandableInfo title={text('steg.tidsrom.hvilketTidsrom.info.tittel')}>
                        <p>
                            <AppText id="steg.tidsrom.hvilketTidsrom.info.1" />
                        </p>
                        <p>
                            <strong>
                                <AppText id="steg.tidsrom.hvilketTidsrom.info.2" />
                            </strong>
                            <br />
                            <AppText id="steg.tidsrom.hvilketTidsrom.info.3" />
                        </p>
                    </ExpandableInfo>
                }
                minDate={
                    barnetSøknadenGjelder?.fødselsdato
                        ? dayjs
                              .max(
                                  dayjs(date3YearsAgo).endOf('day'),
                                  dayjs(barnetSøknadenGjelder?.fødselsdato).endOf('day'),
                              )!
                              .toDate()
                        : date3YearsAgo
                }
                fromInputProps={{
                    label: text('steg.tidsrom.hvilketTidsrom.fom'),
                    validate: validateFraDatoField,
                    name: SøknadFormField.periodeFra,
                }}
                toInputProps={{
                    label: text('steg.tidsrom.hvilketTidsrom.tom'),
                    validate: validateTilDatoField,
                    name: SøknadFormField.periodeTil,
                    defaultMonth: periodeFra ? new Date(periodeFra) : undefined,
                }}
            />
            {søkerKunHelgedager(values.periodeFra, values.periodeTil) && (
                <Block padBottom="xl">
                    <Alert variant="warning">
                        <AppText id="step.tidsrom.søkerKunHelgedager.alert" />
                    </Alert>
                </Block>
            )}

            {!søkerKunHelgedager(values.periodeFra, values.periodeTil) && (
                <>
                    <Block margin="xl">
                        <SøknadFormComponents.YesOrNoQuestion
                            legend={text('steg.tidsrom.iUtlandetIPerioden.spm')}
                            name={SøknadFormField.skalOppholdeSegIUtlandetIPerioden}
                            validate={getYesOrNoValidator()}
                        />
                    </Block>
                    {values.skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && (
                        <Block margin="m">
                            <ResponsivePanel border={true}>
                                <UtenlandsoppholdListAndDialog<SøknadFormField>
                                    name={SøknadFormField.utenlandsoppholdIPerioden}
                                    minDate={periode.from}
                                    maxDate={periode.to}
                                    labels={{
                                        modalTitle: text('steg.tidsrom.iUtlandetIPerioden.modalTitle'),
                                        listTitle: text('steg.tidsrom.iUtlandetIPerioden.listTitle'),
                                        addLabel: text('steg.tidsrom.iUtlandetIPerioden.addLabel'),
                                    }}
                                    validate={
                                        periode
                                            ? (opphold: Utenlandsopphold[]) =>
                                                  validateUtenlandsoppholdIPerioden(periode, opphold)
                                            : undefined
                                    }
                                />
                            </ResponsivePanel>
                        </Block>
                    )}
                    {visInfoOmUtenlandsopphold && (
                        <Block margin="l" padBottom="l">
                            <Alert variant="info">
                                <AppText id="steg.tidsrom.veileder.utenlandsopphold" />
                            </Alert>
                        </Block>
                    )}

                    <Block margin="xl">
                        <SøknadFormComponents.YesOrNoQuestion
                            legend={text('steg.tidsrom.ferieuttakIPerioden.spm')}
                            name={SøknadFormField.skalTaUtFerieIPerioden}
                            validate={getYesOrNoValidator()}
                        />
                    </Block>
                    {values.skalTaUtFerieIPerioden === YesOrNo.YES && (
                        <Block margin="m" padBottom="l">
                            <ResponsivePanel border={true}>
                                <FerieuttakListAndDialog<SøknadFormField>
                                    name={SøknadFormField.ferieuttakIPerioden}
                                    minDate={periode.from}
                                    maxDate={periode.to}
                                    labels={{
                                        modalTitle: text('steg.tidsrom.ferieuttakIPerioden.modalTitle'),
                                        listTitle: text('steg.tidsrom.ferieuttakIPerioden.listTitle'),
                                        addLabel: text('steg.tidsrom.ferieuttakIPerioden.addLabel'),
                                    }}
                                    validate={
                                        periode
                                            ? (ferie: Ferieuttak[]) => validateFerieuttakIPerioden(periode, ferie)
                                            : undefined
                                    }
                                />
                            </ResponsivePanel>
                        </Block>
                    )}
                </>
            )}
        </SøknadFormStep>
    );
};

export default TidsromStep;
