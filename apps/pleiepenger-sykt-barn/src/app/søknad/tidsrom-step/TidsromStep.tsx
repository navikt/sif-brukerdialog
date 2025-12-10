import { useAppIntl } from '@i18n/index';
import { Alert, Box } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { datepickerUtils, YesOrNo } from '@navikt/sif-common-formik-ds';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/FerieuttakListAndDialog';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/types';
import { UtenlandsoppholdUtvidet } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';

import { SøkerdataContext } from '../../context/SøkerdataContext';
import { AppText } from '../../i18n';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { søkerKunHelgedager } from '../../utils/formValuesUtils';
import {
    getPeriodeMaksDato,
    getPeriodeMinDato,
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
        from: periodeFra || getDate1YearAgo(),
        to: periodeTil || getDate1YearFromNow(),
    };
    const { text } = useAppIntl();

    const validateFraDatoField = (date?: string) => {
        return validateFradato(date, values.periodeTil, barnetSøknadenGjelder?.fødselsdato);
    };

    const validateTilDatoField = (date?: string) => {
        return validateTildato(date, values.periodeFra);
    };

    const visInfoOmUtenlandsopphold = useMemo(() => {
        return (
            values.skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES &&
            values.utenlandsoppholdIPerioden &&
            harUtenlandsoppholdUtenInnleggelseEllerInnleggeleForEgenRegning(values.utenlandsoppholdIPerioden)
        );
    }, [values.skalOppholdeSegIUtlandetIPerioden, values.utenlandsoppholdIPerioden]);

    return (
        <SøknadFormStep
            stepId={StepID.TIDSROM}
            onValidFormSubmit={onValidSubmit}
            showSubmitButton={!søkerKunHelgedager(values.periodeFra, values.periodeTil)}>
            <FormLayout.Questions>
                <SøknadFormComponents.DateRangePicker
                    legend={text('steg.tidsrom.hvilketTidsrom.spm')}
                    description={
                        <Box marginBlock="0 4">
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
                        </Box>
                    }
                    minDate={getPeriodeMinDato(barnetSøknadenGjelder?.fødselsdato)}
                    maxDate={getPeriodeMaksDato(values.periodeFra)}
                    fromInputProps={{
                        label: text('steg.tidsrom.hvilketTidsrom.fom'),
                        validate: validateFraDatoField,
                        name: SøknadFormField.periodeFra,
                    }}
                    toInputProps={{
                        label: text('steg.tidsrom.hvilketTidsrom.tom'),
                        validate: validateTilDatoField,
                        name: SøknadFormField.periodeTil,
                        defaultMonth: periodeFra,
                    }}
                />
                {søkerKunHelgedager(values.periodeFra, values.periodeTil) && (
                    <FormLayout.QuestionRelatedMessage>
                        <Alert variant="warning">
                            <AppText id="step.tidsrom.søkerKunHelgedager.alert" />
                        </Alert>
                    </FormLayout.QuestionRelatedMessage>
                )}

                {!søkerKunHelgedager(values.periodeFra, values.periodeTil) && (
                    <>
                        <SøknadFormComponents.YesOrNoQuestion
                            legend={text('steg.tidsrom.iUtlandetIPerioden.spm')}
                            name={SøknadFormField.skalOppholdeSegIUtlandetIPerioden}
                            validate={getYesOrNoValidator()}
                        />

                        {values.skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && (
                            <FormLayout.Panel bleedTop={true}>
                                <UtenlandsoppholdListAndDialog<SøknadFormField>
                                    variant="utvidet"
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
                                            ? (opphold: UtenlandsoppholdUtvidet[]) =>
                                                  validateUtenlandsoppholdIPerioden(periode, opphold)
                                            : undefined
                                    }
                                />
                            </FormLayout.Panel>
                        )}
                        {visInfoOmUtenlandsopphold && (
                            <FormLayout.QuestionRelatedMessage>
                                <Alert variant="info">
                                    <AppText id="steg.tidsrom.veileder.utenlandsopphold" />
                                </Alert>
                            </FormLayout.QuestionRelatedMessage>
                        )}

                        <SøknadFormComponents.YesOrNoQuestion
                            legend={text('steg.tidsrom.ferieuttakIPerioden.spm')}
                            name={SøknadFormField.skalTaUtFerieIPerioden}
                            validate={getYesOrNoValidator()}
                        />

                        {values.skalTaUtFerieIPerioden === YesOrNo.YES && (
                            <FormLayout.Panel bleedTop={true}>
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
                            </FormLayout.Panel>
                        )}
                    </>
                )}
            </FormLayout.Questions>
        </SøknadFormStep>
    );
};

export default TidsromStep;
