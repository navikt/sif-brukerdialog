import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import InntektOppgave from '../components/oppgaver/InntektOppgave';
import { getRapporterInntektUrl } from '../utils/urlUtils';

type OppgavePageParams = {
    periode: string;
    kvittering?: string;
};

const RapporterInntektPage = () => {
    const { periode, kvittering } = useParams<OppgavePageParams>();
    const { deltakelse } = useDeltakerContext();

    const rapporteringsperiode = deltakelse.rapporteringsPerioder.find(
        (p) => dateRangeToISODateRange(p.periode) === periode,
    );

    const navigate = useNavigate();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side', handleInApp: true },
            { title: 'Ungdomsytelse', url: '/', handleInApp: true },
            { title: 'Inntekt', url: `/inntekt`, handleInApp: true },
        ]);
    });

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    if (!rapporteringsperiode) {
        return <>Ugyldig periode</>;
    }

    if (kvittering && rapporteringsperiode.harRapportert === false) {
        navigate(getRapporterInntektUrl(rapporteringsperiode.periode), { replace: true });
    }

    if (kvittering !== undefined && rapporteringsperiode.harRapportert === true) {
        return (
            <Page title="Din ungdomsytelse">
                <VStack gap="8">
                    <Kvittering tittel="Inntekt mottatt">
                        <BodyShort>
                            Vi har nå mottatt inntekten din for perioden{' '}
                            {dateRangeToISODateRange(rapporteringsperiode.periode)}.
                        </BodyShort>
                        <BodyShort>{JSON.stringify(rapporteringsperiode, undefined, 2)}</BodyShort>
                    </Kvittering>
                </VStack>
            </Page>
        );
    }

    return (
        <Page title="Din ungdomsytelse">
            <VStack gap="8">
                <Heading level="1" size="large">
                    Meld inn inntekt
                </Heading>
                <InntektOppgave rapporteringsperiode={rapporteringsperiode} />
            </VStack>
        </Page>
    );
};

export default RapporterInntektPage;
