import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { dateFormatter, ISODate } from '@navikt/sif-common-utils/lib';
import PerioderAccordion from '../../../components/perioder-accordion/PerioderAccordion';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import EndretTag from '../../../components/tags/EndretTag';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { getFeriedagerIPeriode } from '../../../utils/ferieUtils';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { getFeriedagerMeta, harFjernetLovbestemtFerie } from '../../../utils/lovbestemtFerieUtils';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import FeriedagerISøknadsperiode from './FeriedagerISøknadperiode';
import {
    getLovbestemtFerieStepInitialValues,
    getLovbestemtFerieSøknadsdataFromFormValues,
} from './lovbestemtFerieStepUtils';

export enum LovbestemtFerieFormFields {
    perioder = 'perioder',
    feriedager = 'feriedager',
}

export interface Feriedag {
    dato: Date;
    liggerISak: boolean;
    skalHaFerie: boolean;
}
export interface FeriedagMap {
    [isoDate: ISODate]: Feriedag;
}

export interface LovbestemtFerieFormValues {
    // [LovbestemtFerieFormFields.perioder]: LovbestemtFeriePeriode[];
    [LovbestemtFerieFormFields.feriedager]: FeriedagMap;
}

const { FormikWrapper, Form } = getTypedFormComponents<LovbestemtFerieFormFields, LovbestemtFerieFormValues>();

const LovbestemtFerieStep = () => {
    const stepId = StepId.LOVBESTEMT_FERIE;
    const intl = useIntl();

    const {
        dispatch,
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const harFjernetFerie = harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie);
    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres, harFjernetFerie);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: LovbestemtFerieFormValues) => {
        const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values);
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

    /** Kalles hver gang values i formik endres */
    const oppdaterSøknadState = (values: LovbestemtFerieFormValues) => {
        const ferie = getLovbestemtFerieSøknadsdataFromFormValues(values);
        dispatch(actionsCreator.setSøknadLovbestemtFerie(ferie));
        dispatch(actionsCreator.requestLagreSøknad());
    };

    const initialValues = getLovbestemtFerieStepInitialValues(søknadsdata, stepFormValues.lovbestemtFerie);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <Heading level="2" size="xsmall" spacing={true}>
                            Slik endrer du ferie
                        </Heading>
                        <InfoList>
                            <li>Du kan legge til, endre eller fjerne ferie i perioder du har søkt om pleiepenger.</li>
                            <li>Ferie overstyrer eventuell arbeidstid for dagene du legger til.</li>
                            <li>Du trenger kun registrere ferie for ukedager</li>
                        </InfoList>
                        <ReadMore header="Hvordan registrere ferie hvis du jobber helg?">
                            <p>
                                Har du arbeid som innebærer jobb lørdag/søndag, og derfor ønsker å legge inn ferie for
                                helg, må du ta hensyn til det totale antall timer jobb du har registrert i uken det
                                gjelder.
                            </p>
                            <p>
                                Du får kun utbetalt pleiepenger for hverdager. I søknaden må man legge inn arbeidstid
                                som snitt per uke. Disse timene blir smurt mandag til fredag, uavhengig av du jobber i
                                helg. Ferie derimot reduserer utbetaling per dag.
                            </p>
                            <p>
                                Skal du legge inn ferie for helg, må du derfor også legge inn ferie for ukedager timene
                                er blitt smurt på. Skal du ha ferie i kun deler av en uke som inkluderer helg, må du
                                justere ned timer med jobb for de resterende dagene den uken.
                            </p>
                            <Heading level="4" size="xsmall" spacing={true}>
                                Eksempel:{' '}
                            </Heading>
                            <p>
                                Du jobber 15 timer hver tredje helg i pleiepengeperioden. I sommerferien skal du legge
                                inn ferie for en av disse helgene.
                            </p>
                            <p>
                                I søknaden la du inn 15 timer jobb i snitt hver tredje uke, som smøres til 3 timer per
                                dag mandag til fredag.
                            </p>
                            <p>
                                For at ferien skal bli riktig registrert må du legge inn ferie mandag til fredag denne
                                uken så all arbeidstid blir overstyrt. Det er ikke nødvendig å legge inn ferie for
                                lørdag til søndag.
                            </p>
                        </ReadMore>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    const feriedager: FeriedagMap = values[LovbestemtFerieFormFields.feriedager] || {};
                    return (
                        <>
                            <PersistStepFormValues
                                stepId={stepId}
                                onChange={() => {
                                    oppdaterSøknadState({ feriedager });
                                }}
                            />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'lovbestemtFerieForm')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                runDelayedFormValidation={true}
                                onBack={goBack}>
                                <FormBlock>
                                    {sak.søknadsperioder.length === 1 ? null : (
                                        <div
                                            style={{
                                                borderBottom:
                                                    '2px solid var(--ac-accordion-header-border, var(--a-border-strong)',
                                            }}>
                                            <Block margin="xl">
                                                <Heading level="3" size="small" spacing={true}>
                                                    Dine perioder med pleiepenger
                                                </Heading>
                                            </Block>
                                        </div>
                                    )}
                                    <PerioderAccordion
                                        perioder={sak.søknadsperioder}
                                        defaultOpen={'all'}
                                        renderContent={(søknadsperiode) => {
                                            return (
                                                <Block
                                                    margin={sak.søknadsperioder.length === 1 ? 'l' : 'm'}
                                                    padBottom="l">
                                                    <Heading
                                                        level={sak.søknadsperioder.length === 1 ? '3' : '4'}
                                                        size={sak.søknadsperioder.length === 1 ? 'small' : 'xsmall'}
                                                        spacing={true}
                                                        onChange={(feriedager) => {
                                                            setFieldValue(
                                                                LovbestemtFerieFormFields.feriedager,
                                                                feriedager
                                                            );
                                                        }}>
                                                        Registrert ferie
                                                    </Heading>
                                                    <FeriedagerISøknadsperiode
                                                        feriedager={values.feriedager || {}}
                                                        søknadsperiode={søknadsperiode}
                                                        onChange={(feriedager) => {
                                                            setFieldValue(
                                                                LovbestemtFerieFormFields.feriedager,
                                                                feriedager
                                                            );
                                                        }}
                                                    />
                                                </Block>
                                            );
                                        }}
                                        renderHeader={(periode) => {
                                            const feriedagerIPeriode = getFeriedagerIPeriode(feriedager, periode);
                                            return (
                                                <>
                                                    <span style={{ display: 'inlineBlock' }}>
                                                        {dateFormatter.full(periode.from)} -{' '}
                                                        {dateFormatter.full(periode.to)}
                                                    </span>
                                                    {getFeriedagerMeta(feriedagerIPeriode).erEndret && (
                                                        <span
                                                            style={{
                                                                position: 'relative',
                                                                marginLeft: '.5rem',
                                                                top: '-.125rem',
                                                            }}>
                                                            {` `}
                                                            <EndretTag />
                                                        </span>
                                                    )}
                                                </>
                                            );
                                        }}
                                    />
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default LovbestemtFerieStep;
