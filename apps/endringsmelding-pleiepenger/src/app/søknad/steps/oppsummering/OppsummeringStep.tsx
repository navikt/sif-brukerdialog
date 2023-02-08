import { Alert, ErrorSummary, Heading, Ingress, Link } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import {
    getDatesInDateRange,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODurationToDuration,
} from '@navikt/sif-common-utils/lib';
import ArbeidstidUkeTabell, {
    ArbeidstidUkeTabellItem,
} from '../../../components/arbeidstid-uke-liste/ArbeidstidUkeTabell';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import {
    ArbeidstakerApiData,
    ArbeidstidPeriodeApiData,
    ArbeidstidPeriodeApiDataMap,
} from '../../../types/søknadApiData/SøknadApiData';
import { getTimerPerUkeFraTimerPerDag } from '../../../utils/beregnUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';

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

    const stepConfig = getSøknadStepConfig(sak);
    const step = stepConfig[stepId];
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
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

    const harEndringer =
        arbeidstakerList.length > 0 || frilanserArbeidstidInfo || selvstendigNæringsdrivendeArbeidstidInfo;

    if (!harEndringer) {
        return (
            <SøknadStep stepId={stepId} sak={sak}>
                <Alert variant="info">
                    <Heading level="2" size="small" spacing={true}>
                        Ingen endringer er registert
                    </Heading>
                    <p>
                        Du har ikke gjort noen endringer i arbeidstiden din. Gå tilbake til forrige steg og gjør
                        endringene.
                    </p>
                    <Link href="#" onClick={goBack}>
                        Gå tilbake
                    </Link>
                </Alert>
            </SøknadStep>
        );
    }

    return (
        <SøknadStep stepId={stepId} sak={sak}>
            <SifGuidePanel>
                <Ingress as="div">
                    <p>
                        Nedenfor ser du endringene som du har lagt inn. Når du has sett over og sjekket at alt er
                        riktig, bekrefter du opplysningene og sender inn meldingen om endring.
                    </p>
                </Ingress>
            </SifGuidePanel>
            {arbeidstakerList &&
                Object.keys(arbeidstakerList).map((key) => {
                    const { organisasjonsnummer, arbeidstidInfo }: ArbeidstakerApiData = arbeidstakerList[key];
                    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);
                    if (!arbeidsgiver) {
                        return null;
                    }
                    const arbeidsuker = getArbeidstidUkeTabellItems(arbeidstidInfo.perioder);
                    return (
                        <FormBlock key={key} paddingBottom="l" data-testid={`oppsummering-${organisasjonsnummer}`}>
                            <Heading level="2" size="medium">
                                {arbeidsgiver.navn}
                            </Heading>
                            <>
                                <ArbeidstidUkeTabell
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
                        <ArbeidstidUkeTabell
                            listItems={getArbeidstidUkeTabellItems(frilanserArbeidstidInfo.perioder)}
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
                        <ArbeidstidUkeTabell
                            listItems={getArbeidstidUkeTabellItems(selvstendigNæringsdrivendeArbeidstidInfo.perioder)}
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </FormBlock>
            )}
            <FormBlock margin="l">
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
                                    submitButtonLabel="Send melding om endring"
                                    submitPending={isSubmitting}
                                    backButtonDisabled={isSubmitting}
                                    onBack={goBack}>
                                    <ConfirmationCheckbox
                                        disabled={isSubmitting}
                                        label="Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger."
                                        validate={getCheckedValidator()}
                                        data-testid="bekreft-opplysninger"
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

const getArbeidsukeListItemFromArbeidstidPeriodeApiData = (
    {
        faktiskArbeidTimerPerDag,
        _opprinneligFaktiskPerDag,
        _opprinneligNormaltPerDag,
        _endretProsent,
    }: ArbeidstidPeriodeApiData,
    isoDateRange: ISODateRange
): ArbeidstidUkeTabellItem => {
    const periode = ISODateRangeToDateRange(isoDateRange);
    const antallDagerMedArbeidstid = getDatesInDateRange(periode).length;

    const arbeidsuke: ArbeidstidUkeTabellItem = {
        kanEndres: false,
        isoDateRange,
        periode,
        antallDagerMedArbeidstid,
        opprinnelig: {
            normalt: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligNormaltPerDag),
                antallDagerMedArbeidstid
            ),
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligFaktiskPerDag),
                antallDagerMedArbeidstid
            ),
        },
        endret: {
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(faktiskArbeidTimerPerDag),
                antallDagerMedArbeidstid
            ),
            endretProsent: _endretProsent,
        },
    };
    return arbeidsuke;
};

const getArbeidstidUkeTabellItems = (perioder: ArbeidstidPeriodeApiDataMap): ArbeidstidUkeTabellItem[] => {
    const arbeidsuker: ArbeidstidUkeTabellItem[] = [];
    Object.keys(perioder).forEach((isoDateRange) => {
        arbeidsuker.push(getArbeidsukeListItemFromArbeidstidPeriodeApiData(perioder[isoDateRange], isoDateRange));
    });
    return arbeidsuker;
};
