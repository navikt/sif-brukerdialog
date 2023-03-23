import { Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { SamtykkeFormPart } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { SKJEMANAVN } from '../../App';
import { getPeriodeTekst } from '../../components/periode-tekst/PeriodeTekst';
import { getSøknadStepRoute } from '../../søknad/config/SøknadRoutes';
import { getSøknadSteps } from '../../søknad/config/søknadStepConfig';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { EndringType } from '../../types/EndringType';
import { Sak } from '../../types/Sak';
import { getAktiviteterSomKanEndres } from '../../utils/arbeidAktivitetUtils';
import OmSøknaden from './OmSøknaden';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';

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
    const aktiviteterSomKanEndres = sak ? getAktiviteterSomKanEndres(sak.arbeidAktiviteter) : [];

    const { logSoknadStartet, logInfo } = useAmplitudeInstance();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const startSøknad = (sak: Sak, hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        const steps = getSøknadSteps(sak, hvaSkalEndres, false);
        logSoknadStartet(SKJEMANAVN);
        logInfo({
            antallAktiviteterSomKanEndres: aktiviteterSomKanEndres.length,
            erArbeidstaker: sak.arbeidAktiviteter.arbeidstakerArktiviteter.length > 0,
            erFrilanser: sak.arbeidAktiviteter.frilanser !== undefined,
        });
        dispatch(
            actionsCreator.startSøknad(
                sak,
                aktiviteterSomKanEndres?.length === 1 ? aktiviteterSomKanEndres[0] : undefined,
                hvaSkalEndres
            )
        );
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
                                    Du har pleiepenger for <strong>{barnetsNavn}</strong>.
                                </p>
                                <p>
                                    Du kan melde om endring i{' '}
                                    {sak.søknadsperioder.length === 1
                                        ? 'din pleiepengeperiode'
                                        : 'dine pleiepengeperioder'}{' '}
                                    i tidsrommet {getPeriodeTekst(sak.samletSøknadsperiode, false, true)}.
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
                                                'data-testid': 'endreArbeidstid',
                                                label: 'Jobb i pleiepengeperioden',
                                                description: 'Endre hvor mye du jobber i perioden med pleiepenger',
                                                value: EndringType.arbeidstid,
                                            },
                                            {
                                                'data-testid': 'endreLovbestemtFerie',
                                                label: 'Lovbestemt ferie',
                                                description:
                                                    'Legg til, fjern eller endre lovebestemt ferie i perioden med pleiepenger',
                                                value: EndringType.lovbestemtFerie,
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
