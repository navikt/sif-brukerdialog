import { useParams } from 'react-router-dom';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Oppgavetype } from '@navikt/ung-common';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import Oppgavebekreftelse from '../components/oppgavebekreftelse/Oppgavebekreftelse';
import EndretSluttdatoOppgaveInfo from '../components/oppgaver/parts/EndretSluttdatoOppgaveInfo';
import EndretStartdatoOppgaveInfo from '../components/oppgaver/parts/EndretStartdatoOppgaveInfo';
import { getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../utils/textUtils';
import DefaultPage from '../components/page-layout/DefaultPage';
import { useMarkerOppgaveSomÅpnet } from '../hooks/api/useMarkerOppgaveSomÅpnet';
import { dateFormatter } from '@navikt/sif-common-utils';
import RapporterInntektOppgave from '../components/rapporter-inntekt-oppgave/RapporterInntektOppgave';
import { useAppIntl } from '../../../i18n';
import SendSøknadOppgave from '../components/send-søknad-oppgave/SendSøknadOppgave';
import KorrigertInntektOppgave from '../components/_utsatt/KorrigertInntektOppgave';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';

type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { deltakelsePeriode, søker } = useDeltakerContext();
    const oppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);
    const intl = useAppIntl();

    const { mutateAsync } = useMarkerOppgaveSomÅpnet();

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);

    useEffectOnce(async () => {
        if (!oppgave) {
            return;
        }
        if (oppgave.åpnetDato === undefined) {
            await mutateAsync(oppgave.oppgaveReferanse);
        }
    });

    if (!oppgave) {
        return (
            <DefaultPage documentTitle="Oppgave ikke funnet">
                <VStack gap="4">
                    <Heading size="large" level="1">
                        Oppgave ikke funnet
                    </Heading>
                    {oppgaveReferanse ? (
                        <BodyShort>Vi kunne ikke finne oppgave med id {oppgaveReferanse}.</BodyShort>
                    ) : (
                        <BodyShort>Vi kunne ikke finne oppgave - id mangler.</BodyShort>
                    )}
                </VStack>
            </DefaultPage>
        );
    }

    const renderOppgavebekreftelsePage = (children: React.ReactNode) => {
        const tekster = getOppgaveBekreftelseTekster(oppgave, intl);
        const oppsummering = getOppgaveOppsummering(oppgave);
        return (
            <DefaultPage documentTitle={`${tekster.oppgavetittel} - Din ungdomsprogramytelse`}>
                <Oppgavebekreftelse
                    tekster={tekster}
                    oppsummering={oppsummering}
                    oppgave={oppgave}
                    deltakerNavn={søker.fornavn}>
                    {children}
                </Oppgavebekreftelse>
            </DefaultPage>
        );
    };

    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return renderOppgavebekreftelsePage(
                <KorrigertInntektOppgave oppgave={oppgave} deltakelseId={deltakelsePeriode.id} />,
            );

        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return renderOppgavebekreftelsePage(
                <EndretStartdatoOppgaveInfo
                    endretDato={oppgave.oppgavetypeData.nyStartdato}
                    svarfrist={oppgave.svarfrist}
                />,
            );

        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return renderOppgavebekreftelsePage(
                <EndretSluttdatoOppgaveInfo
                    endretDato={oppgave.oppgavetypeData.nySluttdato}
                    svarfrist={oppgave.svarfrist}
                />,
            );

        case Oppgavetype.RAPPORTER_INNTEKT:
            return (
                <DefaultPage
                    documentTitle={`Inntekt ${dateFormatter.MonthFullYear(oppgave.oppgavetypeData.fraOgMed)} - Din ungdomsprogramytelse`}>
                    <RapporterInntektOppgave oppgave={oppgave} deltakerNavn={søker.fornavn} />
                </DefaultPage>
            );

        case Oppgavetype.SØK_YTELSE:
            return (
                <DefaultPage documentTitle="Send søknad">
                    <SendSøknadOppgave oppgave={oppgave} />
                </DefaultPage>
            );

        default:
            return <DefaultPage documentTitle="Ukjent oppgavetype">Ukjent type</DefaultPage>;
    }
};

export default OppgavePage;
