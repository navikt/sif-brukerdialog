import { useNavigate, useParams } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Oppgavetype } from '@navikt/ung-common';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import Oppgavebekreftelse from '../components/oppgavebekreftelse/Oppgavebekreftelse';
import KorrigertInntektOppgave from '../components/oppgaver/KorrigertInntektOppgave';
import EndretSluttdatoOppgaveInfo from '../components/oppgaver/parts/EndretSluttdatoOppgaveInfo';
import EndretStartdatoOppgaveInfo from '../components/oppgaver/parts/EndretStartdatoOppgaveInfo';
import { getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../utils/textUtils';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnet';
import DefaultPage from '../components/page-layout/DefaultPage';
import { useMarkerOppgaveSomÅpnet } from '../hooks/api/useMarkerOppgaveSomÅpnet';
import { dateFormatter } from '@navikt/sif-common-utils';
import RapporterInntekt from '../components/rapporter-inntekt/RapporterInntekt';
import { useAppIntl } from '../../../i18n';
import SendSøknadOppgave from '../components/send-søknad-oppgave/SendSøknadOppgave';

type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { deltakelsePeriode, søker } = useDeltakerContext();
    const oppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);
    const navigate = useNavigate();
    const intl = useAppIntl();

    const { mutateAsync } = useMarkerOppgaveSomÅpnet();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Din ungdomsprogramytelse', url: '/', handleInApp: true },
            { title: 'Oppgave', url: `/oppgave`, handleInApp: true },
        ]);
    });

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    useEffectOnce(async () => {
        if (!oppgave) {
            return;
        }
        if (oppgave.åpnetDato === undefined) {
            await mutateAsync(oppgave.oppgaveReferanse);
        }
    });

    if (!oppgave) {
        return <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />;
    }

    const renderOppgavebekreftelsePage = (children: React.ReactNode) => {
        const tekster = getOppgaveBekreftelseTekster(oppgave, intl);
        const oppsummering = getOppgaveOppsummering(oppgave);
        return (
            <DefaultPage documentTitle={`${tekster.tittel} - Din ungdomsprogramytelse`}>
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
                    <RapporterInntekt oppgave={oppgave} deltakerNavn={søker.fornavn} />
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
