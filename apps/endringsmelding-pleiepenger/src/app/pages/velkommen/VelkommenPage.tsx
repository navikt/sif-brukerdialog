import { Heading, Ingress } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { SamtykkeFormPart } from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import { SKJEMANAVN } from '../../App';
import { getSøknadStepRoute } from '../../søknad/config/SøknadRoutes';
import { getSøknadSteps } from '../../søknad/config/søknadStepConfig';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { EndringType } from '../../types/EndringType';
import { Sak } from '../../types/Sak';
import OmSøknaden from './OmSøknaden';
import { getDateRangeText } from '@navikt/sif-common-utils';

export enum VelkommenFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    hvaSkalEndres = 'hvaSkalEndres',
}

export interface VelkommenFormValues {
    [VelkommenFormFields.harForståttRettigheterOgPlikter]: boolean;
    [VelkommenFormFields.hvaSkalEndres]: EndringType[];
}

const { FormikWrapper, Form, CheckboxGroup } = getTypedFormComponents<
    VelkommenFormFields,
    VelkommenFormValues,
    ValidationError
>();

const VelkommenPage = () => {
    const {
        state: { søker, sak },
        dispatch,
    } = useSøknadContext();

    const intl = useIntl();

    const { logSoknadStartet, logInfo } = useAmplitudeInstance();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const startSøknad = (sak: Sak, hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        const steps = getSøknadSteps(hvaSkalEndres, false, sak.harNyArbeidsgiver);
        logSoknadStartet(SKJEMANAVN);
        logInfo({
            antallAktiviteterSomKanEndres: sak.utledet.aktiviteterSomKanEndres.length,
            erArbeidstaker: sak.arbeidAktiviteter.arbeidstakerAktiviteter.length > 0,
            erFrilanser: sak.arbeidAktiviteter.frilanser !== undefined,
        });
        dispatch(actionsCreator.startSøknad(sak, hvaSkalEndres));
        dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(steps[0])));
    };

    if (!sak) {
        return (
            <Page title="Velkommen">
                <SifGuidePanel>
                    <Heading level="1" size="large">
                        Velkommen {søker.fornavn}
                    </Heading>
                    <p>Vi kan ikke finne en aktiv sak på deg</p>
                </SifGuidePanel>
            </Page>
        );
    }

    const { fornavn, mellomnavn, etternavn } = sak.barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);

    return (
        <Page title="Velkommen">
            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false, hvaSkalEndres: [] }}
                onSubmit={(values) => startSøknad(sak, values.hvaSkalEndres)}
                renderForm={() => (
                    <Form
                        includeValidationSummary={true}
                        includeButtons={true}
                        submitButtonLabel={intlHelper(intl, 'velkommenForm.submitButtonLabel')}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'velkommenForm')}>
                        <SifGuidePanel poster={true}>
                            <Heading level="1" size="large" data-testid="velkommen-header" spacing={true}>
                                Hei {søker.fornavn}
                            </Heading>
                            <Ingress as="div">
                                <p>
                                    Du kan melde fra om endringer i pleiepenger for <strong>{barnetsNavn}</strong> i
                                    tidsrommet{' '}
                                    {getDateRangeText(sak.samletSøknadsperiode, {
                                        compact: false,
                                        includeDayName: true,
                                    })}
                                    .
                                </p>
                                <Block margin="xl">
                                    <CheckboxGroup
                                        name={VelkommenFormFields.hvaSkalEndres}
                                        legend={
                                            <Heading level={'2'} size="small">
                                                Hva ønsker du å endre?
                                            </Heading>
                                        }
                                        validate={getListValidator({ minItems: 1 })}
                                        checkboxes={[
                                            {
                                                'data-testid': 'endreLovbestemtFerie',
                                                label: 'Ferie',
                                                value: EndringType.lovbestemtFerie,
                                            },
                                            {
                                                'data-testid': 'endreArbeidstid',
                                                label: 'Jobb',
                                                value: EndringType.arbeidstid,
                                            },
                                        ]}
                                    />
                                </Block>
                            </Ingress>
                            <OmSøknaden />
                        </SifGuidePanel>
                        <FormBlock>
                            <SamtykkeFormPart />
                        </FormBlock>
                    </Form>
                )}
            />
        </Page>
    );
};

export default VelkommenPage;
