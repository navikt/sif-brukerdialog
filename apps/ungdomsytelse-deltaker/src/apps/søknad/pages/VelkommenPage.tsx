import { dateFormatter } from '@navikt/sif-common-utils';
import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';
import ExternalLink from '@shared/components/external-link/ExternalLink';
import { AppText, useAppIntl } from '@shared/i18n';
import getLenker from '@shared/utils/lenker';
import { StartPage } from '@sif/soknad-ui/pages';

import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import BehandlingAvPersonopplysningerContent from '../components/BehandlingAvPersonopplysningerContent';
import { søknadStepOrder } from '../setup/config/søknadStepConfig';
import { useSøknadsflyt } from '../setup/context/søknadContext';
import { useSøknadMellomlagring } from '../setup/hooks/useSøknadMellomlagring';
import { useAnalyticsInstance } from '../../../analytics/analytics';

const VelkommenPage = () => {
    const { text } = useAppIntl();
    const { søker, deltakelsePeriode } = useDeltakerContext();
    const { startSøknad, navigateToStep } = useSøknadsflyt();
    const { opprettMellomlagring, isPending } = useSøknadMellomlagring();
    const { logSkjemaStartet } = useAnalyticsInstance();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        const førsteStegId = søknadStepOrder[0];
        logSkjemaStartet(førsteStegId);
        startSøknad(førsteStegId, harForståttRettigheterOgPlikter);
        await opprettMellomlagring();
        navigateToStep(førsteStegId);
    };

    return (
        <StartPage
            onStart={handleStart}
            isPending={isPending}
            guide={{
                navn: søker.fornavn,
                content: (
                    <VStack gap="space-16">
                        <BodyLong>
                            <AppText
                                id="velkommenMelding.deltakelsePeriode"
                                values={{
                                    startdato: dateFormatter.dayDateMonthYear(deltakelsePeriode.programPeriode.from),
                                    strong: (children) => <strong>{children}</strong>,
                                }}
                            />
                        </BodyLong>
                        <BodyLong>
                            <AppText id="velkommenMelding.ytelseBeskrivelse" />
                        </BodyLong>
                        <BodyLong>
                            <AppText
                                id="velkommenMelding.søknadBeskrivelse"
                                values={{
                                    Lenke: (children) => (
                                        <ExternalLink href={getLenker().omUngdomsprogramytelsen}>
                                            {children}
                                        </ExternalLink>
                                    ),
                                }}
                            />
                        </BodyLong>
                        <VStack gap="space-0">
                            <ReadMore header={text('velkommenMelding.readMore.dato.header')}>
                                <BodyLong spacing>
                                    <AppText id="velkommenMelding.readMore.dato.content" />
                                </BodyLong>
                            </ReadMore>
                            <ReadMore header={text('personopplysninger.accordion.header')}>
                                <BehandlingAvPersonopplysningerContent />
                            </ReadMore>
                            <ReadMore header={text('velkommenMelding.readMore.rettsregler.header')}>
                                <BodyLong spacing>
                                    <AppText id="velkommenMelding.readMore.rettsregler.content.1" />
                                </BodyLong>
                                <BodyLong spacing>
                                    <AppText id="velkommenMelding.readMore.rettsregler.content.2" />
                                </BodyLong>
                                <BodyLong spacing>
                                    <AppText id="velkommenMelding.readMore.rettsregler.content.3" />
                                </BodyLong>
                            </ReadMore>
                        </VStack>
                    </VStack>
                ),
            }}
            title={text('søknad.tittel')}
        />
    );
};

export default VelkommenPage;
