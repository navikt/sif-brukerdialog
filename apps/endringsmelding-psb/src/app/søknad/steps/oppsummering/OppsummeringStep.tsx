import { Alert, ErrorSummary, Heading } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { getDatesInDateRange, ISODateRangeToDateRange, ISODurationToDuration } from '@navikt/sif-common-utils/lib';
import ArbeidstidUkeListe, {
    ArbeidstidUkeListeItem,
} from '../../../components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import {
    ArbeidstakerApiData,
    ArbeidstidPeriodeApiData,
    ArbeidstidPeriodeApiDataMap,
} from '../../../types/søknadApiData/SøknadApiData';
import { summerTimerPerDag } from '../../../utils/beregnUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';

enum OppsummeringFormFields {
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
}

export interface OppsummeringFormValues {
    [OppsummeringFormFields.harBekreftetOpplysninger]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    OppsummeringFormFields,
    OppsummeringFormValues
>();

const OppsummeringStep = () => {
    const stepId = StepId.OPPSUMMERING;
    const intl = useIntl();
    const {
        state: { søknadsdata, sak, arbeidsgivere },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig();
    const step = stepConfig[stepId];
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError, resetSendSøknad } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søknadsdata, sak);

    if (!apiData) {
        return <Alert variant="error">ApiData er undefined</Alert>;
    }

    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } =
        apiData.ytelse.arbeidstid;

    const arbeidstidKolonneTittel = 'Endret arbeidstid';

    return (
        <SøknadStep stepId={stepId}>
            {arbeidstakerList &&
                Object.keys(arbeidstakerList).map((key) => {
                    const { organisasjonsnummer, arbeidstidInfo }: ArbeidstakerApiData = arbeidstakerList[key];
                    const arbeidsgiver = arbeidsgivere.find((a) => a.id === organisasjonsnummer);
                    if (!arbeidsgiver) {
                        return null;
                    }
                    const arbeidsuker = getArbeidstidUkeListeItem(arbeidstidInfo.perioder);
                    return (
                        <FormBlock key={key} paddingBottom="l">
                            <Heading level="2" size="medium">
                                {arbeidsgiver.navn}
                            </Heading>
                            <>
                                <ArbeidstidUkeListe
                                    listItems={arbeidsuker}
                                    arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                                />
                            </>
                        </FormBlock>
                    );
                })}
            {frilanserArbeidstidInfo && (
                <FormBlock paddingBottom="l">
                    <Heading level="2" size="medium">
                        Frilanser
                    </Heading>
                    <>
                        <ArbeidstidUkeListe
                            listItems={getArbeidstidUkeListeItem(frilanserArbeidstidInfo.perioder)}
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </FormBlock>
            )}
            {selvstendigNæringsdrivendeArbeidstidInfo && (
                <FormBlock paddingBottom="l">
                    <Heading level="2" size="medium">
                        Selvstendig næringsdrivende
                    </Heading>
                    <>
                        <ArbeidstidUkeListe
                            listItems={getArbeidstidUkeListeItem(selvstendigNæringsdrivendeArbeidstidInfo.perioder)}
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </FormBlock>
            )}
            <FormBlock margin="xxl">
                <FormikWrapper
                    initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                    onSubmit={(values) => {
                        apiData
                            ? sendSøknad({
                                  ...apiData,
                                  harBekreftetOpplysninger:
                                      values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                              })
                            : undefined;
                    }}
                    renderForm={() => {
                        return (
                            <>
                                <Form
                                    formErrorHandler={getIntlFormErrorHandler(intl, 'oppsummeringForm')}
                                    submitDisabled={isSubmitting || hasInvalidSteps}
                                    includeValidationSummary={true}
                                    submitButtonLabel="Send søknad"
                                    submitPending={isSubmitting}
                                    onValidSubmit={() => {
                                        resetSendSøknad();
                                    }}
                                    onBack={goBack}>
                                    <ConfirmationCheckbox
                                        label="Bekrefter opplysninger"
                                        validate={getCheckedValidator()}
                                        name={OppsummeringFormFields.harBekreftetOpplysninger}
                                    />
                                </Form>
                                {sendSøknadError && (
                                    <FormBlock>
                                        <ErrorSummary ref={sendSøknadErrorSummary}>
                                            {sendSøknadError.message}
                                        </ErrorSummary>
                                    </FormBlock>
                                )}
                            </>
                        );
                    }}
                />
            </FormBlock>
        </SøknadStep>
    );
};

export default OppsummeringStep;

const getArbeidstidUkeListeItem = (perioder: ArbeidstidPeriodeApiDataMap): ArbeidstidUkeListeItem[] => {
    const arbeidsuker: ArbeidstidUkeListeItem[] = [];

    Object.keys(perioder).forEach((isoDateRange) => {
        const dateRange = ISODateRangeToDateRange(isoDateRange);
        const {
            faktiskArbeidTimerPerDag,
            _opprinneligFaktiskPerDag,
            _opprinneligNormaltPerDag,
            _endretProsent,
        }: ArbeidstidPeriodeApiData = perioder[isoDateRange];
        const antallDager = getDatesInDateRange(dateRange, true).length;

        const arbeidsuke: ArbeidstidUkeListeItem = {
            søktFor: true,
            kanEndres: false,
            antallDager,
            isoDateRange,
            periode: dateRange,
            opprinnelig: {
                normalt: summerTimerPerDag(ISODurationToDuration(_opprinneligNormaltPerDag), antallDager),
                faktisk: summerTimerPerDag(ISODurationToDuration(_opprinneligFaktiskPerDag), antallDager),
            },
            endret: {
                faktisk: summerTimerPerDag(ISODurationToDuration(faktiskArbeidTimerPerDag), antallDager),
                endretProsent: _endretProsent,
            },
        };
        arbeidsuker.push(arbeidsuke);
    });
    return arbeidsuker;
};
