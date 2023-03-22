import { BodyLong, Button, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FerieuttakForm from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakForm';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/types';
import {
    dateFormatter,
    DateRange,
    dateRangeToISODateRange,
    getDateRangesWithinDateRange,
} from '@navikt/sif-common-utils/lib';
import LovbestemtFerieListe from '../../../components/lovbestemt-ferie-liste/LovbestemtFerieListe';
import LovbestemtFerieModal from '../../../components/lovbestemt-ferie-modal/LovbestemtFerieModal';
import PeriodeTekst from '../../../components/periode-tekst/PeriodeTekst';
import PerioderAccordion from '../../../components/perioder-accordion/PerioderAccordion';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { getLovbestemtFerieEndringer } from '../../../utils/lovbestemtFerieUtils';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import {
    getLovbestemtFerieStepInitialValues,
    getLovbestemtFerieSøknadsdataFromFormValues,
} from './lovbestemtFerieStepUtils';

export enum LovbestemtFerieFormFields {
    perioder = 'perioder',
}
export interface LovbestemtFerieFormValues {
    [LovbestemtFerieFormFields.perioder]: LovbestemtFeriePeriode[];
}

const { FormikWrapper, Form } = getTypedFormComponents<LovbestemtFerieFormFields, LovbestemtFerieFormValues>();

const LovbestemtFerieStep = () => {
    const stepId = StepId.LOVBESTEMT_FERIE;
    const intl = useIntl();

    const {
        // dispatch,
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres);
    const step = stepConfig[stepId];
    const [visFerieModal, setVisFerieModal] = useState<
        { periode: DateRange | undefined; søknadsperiode: DateRange; andrePerioder: DateRange[] } | undefined
    >();

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: LovbestemtFerieFormValues) => {
        const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values, sak.lovbestemtFerie.perioder);
        if (perioder) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadLovbestemtFerie(perioder)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    // const oppdaterSøknadState = (values: LovbestemtFerieFormValues) => {
    //     const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values, sak.lovbestemtFerie.perioder);
    //     dispatch(actionsCreator.setSøknadLovbestemtFerie(perioder));
    //     dispatch(actionsCreator.requestLagreSøknad());
    // };

    const initialValues = getLovbestemtFerieStepInitialValues(søknadsdata, stepFormValues.lovbestemtFerie);
    const harFlereSøknadsperioder = sak.søknadsperioder.length > 1;

    const leggTilPeriode = (
        periode: DateRange,
        perioderIMelding: LovbestemtFeriePeriode[]
    ): LovbestemtFeriePeriode[] => {
        return getLovbestemtFerieEndringer(
            [...perioderIMelding, { ...periode, skalHaFerie: true }],
            sak.lovbestemtFerie.perioder
        ).perioder;
    };

    const oppdaterPeriode = (
        opprinneligPeriode: DateRange,
        endretPeriode: DateRange,
        perioderIMelding: LovbestemtFeriePeriode[]
    ): LovbestemtFeriePeriode[] => {
        return perioderIMelding.map((periode) => {
            if (dateRangeToISODateRange(periode) === dateRangeToISODateRange(opprinneligPeriode)) {
                return {
                    ...endretPeriode,
                    skalHaFerie: true,
                };
            }
            return periode;
        });
    };

    // const handleOnEditPeriode = (
    //     periode: DateRange,
    //     søknadsperiode: DateRange,
    //     perioderIMelding: LovbestemtFeriePeriode[]
    // ) => {
    //     const andrePerioder = getFerieIPeriode(søknadsperiode, sak.lovbestemtFerie.perioder, perioderIMelding);
    //     setVisFerieModal({ periode, søknadsperiode, andrePerioder });
    // };

    const deletePeriode = (
        periode: DateRange,
        perioderIMelding: LovbestemtFeriePeriode[]
    ): LovbestemtFeriePeriode[] => {
        const endringIndex = perioderIMelding.findIndex(
            (e) => dateRangeToISODateRange(e) === dateRangeToISODateRange(periode)
        );
        if (endringIndex >= 0) {
            const perioder = [...perioderIMelding];
            perioder.splice(endringIndex, 1);
            return perioder;
        }
        return getLovbestemtFerieEndringer(
            [...perioderIMelding, { ...periode, skalHaFerie: false }],
            sak.lovbestemtFerie.perioder
        ).perioder;
    };

    const undoDeletePeriode = (periode: LovbestemtFeriePeriode, perioderIMelding: LovbestemtFeriePeriode[]) => {
        const endringIndex = perioderIMelding.findIndex(
            (e) => dateRangeToISODateRange(e) === dateRangeToISODateRange(periode)
        );
        if (endringIndex >= 0) {
            const perioder = [...perioderIMelding];
            perioder.splice(endringIndex, 1);
            return perioder;
        }
        return [...perioderIMelding, { ...periode, skalHaFerie: true }];
    };
    return (
        <SøknadStep stepId={stepId} sak={sak} hvaSkalEndres={hvaSkalEndres}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <Heading level="2" size="xsmall" spacing={true}>
                            Slik endrer du ferie
                        </Heading>
                        <InfoList>
                            <li>
                                Du kan legge til, endre eller fjerne ferie i tidsrommet{' '}
                                <PeriodeTekst periode={sak.samletSøknadsperiode} compact={false} />.
                            </li>
                            <li>
                                Vi trenger kun å vite om ferie som tas ut på ukedager
                                {harFlereSøknadsperioder ? ', og i tidsrom hvor du har pleiepenger' : ''}.
                            </li>
                            <li>
                                Endringer i ferie kan medføre at du må også endre på hvor mye du jobber i perioden.
                                Dette kan du gjøre på neste steg.
                            </li>
                        </InfoList>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    // const endringer = getLovbestemtFerieEndringer(
                    //     values[LovbestemtFerieFormFields.perioder] || [],
                    //     sak.lovbestemtFerie.perioder
                    // );

                    // const handleAngreFjernFerie = (ferie: Ferieuttak) => {
                    //     const perioder: Ferieuttak[] = [
                    //         ...(values[LovbestemtFerieFormFields.perioder] || []),
                    //         { id: dateRangeToISODateRange(ferie), ...ferie },
                    //     ].sort(sortDateRange);
                    //     const oppdatertPeriodeliste = joinAdjacentDateRanges(perioder).map((p) => ({
                    //         ...p,
                    //         id: dateRangeToISODateRange(p),
                    //     }));
                    //     setFieldValue(LovbestemtFerieFormFields.perioder, oppdatertPeriodeliste);
                    // };
                    const perioderIMelding = values[LovbestemtFerieFormFields.perioder] || [];

                    return (
                        <>
                            <PersistStepFormValues
                                stepId={stepId}
                                onChange={() => {
                                    // oppdaterSøknadState({ perioder: values[LovbestemtFerieFormFields.perioder] || [] });
                                }}
                            />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'lovbestemtFerieForm')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                runDelayedFormValidation={true}
                                onBack={goBack}>
                                <FormBlock>
                                    <Block margin="xl">
                                        <Heading level="3" size="small" spacing={true}>
                                            {sak.søknadsperioder.length > 1
                                                ? 'Dine perioder med pleiepenger'
                                                : 'Din periode med pleiepenger'}
                                        </Heading>
                                    </Block>
                                    <PerioderAccordion
                                        perioder={sak.søknadsperioder}
                                        renderContent={(søknadsperiode) => {
                                            const ferieIPerioden = getFerieIPeriode(
                                                søknadsperiode,
                                                perioderIMelding,
                                                sak.lovbestemtFerie.perioder
                                            );
                                            return (
                                                <Block margin="m" padBottom="l">
                                                    <Heading level="3" size="xsmall" spacing={true}>
                                                        Registrert ferie
                                                    </Heading>
                                                    <LovbestemtFerieListe
                                                        perioder={ferieIPerioden}
                                                        onUndoDelete={(periode) => {
                                                            const perioder = undoDeletePeriode(
                                                                periode,
                                                                perioderIMelding
                                                            );
                                                            setFieldValue(LovbestemtFerieFormFields.perioder, perioder);
                                                        }}
                                                        onEdit={(periode) => {
                                                            setVisFerieModal({
                                                                periode,
                                                                søknadsperiode,
                                                                andrePerioder: perioderIMelding.filter(
                                                                    (p) =>
                                                                        dateRangeToISODateRange(p) !==
                                                                        dateRangeToISODateRange(periode)
                                                                ),
                                                            });
                                                        }}
                                                        onDelete={(periode) => {
                                                            const perioder = deletePeriode(
                                                                periode,
                                                                values[LovbestemtFerieFormFields.perioder] || []
                                                            );
                                                            setFieldValue(LovbestemtFerieFormFields.perioder, perioder);
                                                        }}
                                                    />
                                                    <Block>
                                                        <Button
                                                            onClick={() => {
                                                                setVisFerieModal({
                                                                    periode: undefined,
                                                                    søknadsperiode,
                                                                    andrePerioder: perioderIMelding,
                                                                });
                                                            }}
                                                            type="button"
                                                            variant="secondary"
                                                            size="small">
                                                            Legg til ferie
                                                        </Button>
                                                    </Block>
                                                </Block>
                                            );
                                        }}
                                        renderHeader={(periode) => {
                                            return (
                                                <>
                                                    {dateFormatter.full(periode.from)} -{' '}
                                                    {dateFormatter.full(periode.to)}
                                                </>
                                            );
                                        }}
                                    />
                                </FormBlock>
                            </Form>
                            {visFerieModal && (
                                <LovbestemtFerieModal
                                    onClose={() => setVisFerieModal(undefined)}
                                    title={'Lovbestemt ferie'}
                                    open={visFerieModal !== undefined}>
                                    <FerieuttakForm
                                        ferieuttak={visFerieModal.periode}
                                        alleFerieuttak={visFerieModal.andrePerioder}
                                        minDate={visFerieModal.søknadsperiode.from}
                                        maxDate={visFerieModal.søknadsperiode.to}
                                        onSubmit={(ferieuttak: Ferieuttak) => {
                                            const perioder = visFerieModal.periode
                                                ? oppdaterPeriode(visFerieModal.periode, ferieuttak, perioderIMelding)
                                                : leggTilPeriode(ferieuttak, perioderIMelding);
                                            setFieldValue(LovbestemtFerieFormFields.perioder, perioder);
                                            setVisFerieModal(undefined);
                                        }}
                                        onCancel={() => setVisFerieModal(undefined)}
                                    />
                                </LovbestemtFerieModal>
                            )}
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export const getFerieIPeriode = (
    periode: DateRange,
    perioderIMelding: LovbestemtFeriePeriode[],
    perioderISak: LovbestemtFeriePeriode[]
): LovbestemtFeriePeriode[] => {
    const endringer = getLovbestemtFerieEndringer(
        getDateRangesWithinDateRange(perioderIMelding, periode),
        getDateRangesWithinDateRange(perioderISak, periode)
    );
    return endringer.perioder;
};

export default LovbestemtFerieStep;
