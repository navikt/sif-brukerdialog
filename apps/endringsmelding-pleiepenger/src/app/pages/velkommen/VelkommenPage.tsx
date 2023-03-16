import { Checkbox, CheckboxGroup, Heading, Ingress } from '@navikt/ds-react';
import React, { useState } from 'react';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { SKJEMANAVN } from '../../App';
import { getSøknadStepRoute } from '../../søknad/config/SøknadRoutes';
import { getSøknadSteps } from '../../søknad/config/søknadStepConfig';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { Sak } from '../../types/Sak';
import { getAktiviteterSomKanEndres, getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import OmSøknaden from './OmSøknaden';
import { EndringType } from '../../types/EndringType';
import { Feature, isFeatureEnabled } from '../../utils/featureToggleUtils';
import { getPeriodeTekst } from '../../components/periode-tekst/PeriodeTekst';

const VelkommenPage = () => {
    const {
        state: { søker, sak },
        dispatch,
    } = useSøknadContext();

    const aktiviteterSomKanEndres = sak ? getAktiviteterSomKanEndres(sak.arbeidAktiviteter) : [];
    const [hvaSkalEndres, setHvaSkalEndres] = useState<EndringType[]>([
        EndringType.lovbestemtFerie,
        EndringType.arbeidstid,
    ]);

    const { logSoknadStartet, logInfo } = useAmplitudeInstance();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const startSøknad = (sak: Sak, hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        const steps = getSøknadSteps(sak, hvaSkalEndres);
        logSoknadStartet(SKJEMANAVN);
        logInfo({
            antallAktiviteterSomKanEndres: aktiviteterSomKanEndres.length,
            erArbeidstaker: sak.arbeidAktiviteter.arbeidstakerArktiviteter.length > 0,
            erFrilanser: sak.arbeidAktiviteter.frilanser !== undefined,
        });
        dispatch(actionsCreator.startSøknad(sak, aktiviteterSomKanEndres, hvaSkalEndres));
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
            <SifGuidePanel poster={true}>
                <Heading level="1" size="large" data-testid="velkommen-header" spacing={true}>
                    Hei {søker.fornavn}
                </Heading>
                <Ingress as="div">
                    <p>
                        Du har pleiepenger for <strong>{barnetsNavn}</strong>.
                    </p>
                    <p>
                        Her kan du melde fra om endringer som gjelder perioden hvor du har pleiepenger. Du kan melde fra
                        om
                    </p>
                    <InfoList>
                        <li>hvor mye du jobber i perioden med pleiepenger</li>
                        <li>når du tar ut lovbestemt ferie</li>
                    </InfoList>

                    {1 + 1 === 3 && (
                        <>
                            <p>
                                Du kan melde om endringer i perioden{' '}
                                {getPeriodeTekst(sak.samletSøknadsperiode, false, true)}.
                            </p>
                            <Block margin="xl">
                                <CheckboxGroup
                                    legend={
                                        <Heading level={'2'} size="small">
                                            Hva ønsker du å endre?
                                        </Heading>
                                    }
                                    value={hvaSkalEndres}
                                    name="hvaSkalEndres"
                                    onChange={(values) => {
                                        setHvaSkalEndres(values);
                                    }}>
                                    {isFeatureEnabled(Feature.FEATURE_ENDRE_ARBEIDSTID) && (
                                        <Checkbox
                                            value={EndringType.arbeidstid}
                                            description={'Endre hvor mye du jobber i perioden med pleiepenger'}>
                                            Jobb i pleiepengeperioden
                                        </Checkbox>
                                    )}
                                    {isFeatureEnabled(Feature.FEATURE_ENDRE_LOVBESTEMT_FERIE) && (
                                        <Checkbox
                                            value={EndringType.lovbestemtFerie}
                                            description="Legg til, fjern eller endre lovebestemt ferie i perioden med pleiepenger">
                                            Lovbestemt ferie
                                        </Checkbox>
                                    )}

                                    {isFeatureEnabled(Feature.FEATURE_ENDRE_UTENLANDSOPPHOLD) && (
                                        <Checkbox
                                            value={EndringType.utenlandsopphold}
                                            description="Legg til, fjern eller endre utenlandsopphold i perioden med pleiepenger">
                                            Utenlandsopphold i perioden
                                        </Checkbox>
                                    )}
                                </CheckboxGroup>
                            </Block>
                            <p>Arbeidsforhold:</p>
                            <InfoList>
                                {aktiviteterSomKanEndres.map((aktivitet, index) => {
                                    return (
                                        <li key={index}>
                                            <strong>{getArbeidAktivitetNavn(aktivitet)}</strong>
                                        </li>
                                    );
                                })}
                            </InfoList>
                        </>
                    )}
                    {/* <p>
                        Dersom det mangler et arbeidsforhold, kan du ta{' '}
                        <Link href={getLenker().kontaktOss}>kontakt med oss</Link>.
                    </p> */}
                </Ingress>
                <OmSøknaden />
            </SifGuidePanel>

            <SamtykkeForm onValidSubmit={() => startSøknad(sak, hvaSkalEndres)} submitButtonLabel="Start" />
        </Page>
    );
};

export default VelkommenPage;
