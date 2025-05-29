import { useNavigate, useParams } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnet';
import Oppgavebekreftelse from '../components/oppgavebekreftelse/Oppgavebekreftelse';
import { getOppgaveBekreftelseTekster } from '../utils/textUtils';
import { useAppIntl } from '../i18n';
import { EndretProgramperiodeEndringType, Oppgavetype } from '@navikt/ung-common';
import EndretStartdatoOppgaveInfo from '../components/oppgaver/parts/EndretStartdatoOppgaveInfo';
import EndretSluttdatoOppgaveInfo from '../components/oppgaver/parts/EndretSluttdatoOppgaveInfo';
import KorrigertInntektOppgave from '../components/oppgaver/KorrigertInntektOppgave';
import { BodyShort } from '@navikt/ds-react';

type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { deltakelsePeriode, søker } = useDeltakerContext();
    const oppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);
    const navigate = useNavigate();
    const intl = useAppIntl();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ungdomsprogramytelse', url: '/', handleInApp: true },
            { title: 'Oppgave', url: `/oppgave`, handleInApp: true },
        ]);
    });

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    if (!oppgave) {
        return <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />;
    }

    const renderOppgavebekreftelsePage = (children: React.ReactNode) => {
        const tekster = getOppgaveBekreftelseTekster(oppgave, intl);
        return (
            <Page title={`${tekster.tittel} - Din ungdomsytelse`}>
                <Oppgavebekreftelse tekster={tekster} oppgave={oppgave} deltakerNavn={søker.fornavn}>
                    {children}
                </Oppgavebekreftelse>
            </Page>
        );
    };

    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return renderOppgavebekreftelsePage(
                <KorrigertInntektOppgave oppgave={oppgave} deltakelseId={deltakelsePeriode.id} />,
            );

        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return renderOppgavebekreftelsePage(
                oppgave.oppgavetypeData.endringType === EndretProgramperiodeEndringType.ENDRET_STARTDATO ? (
                    <EndretStartdatoOppgaveInfo endretDato={oppgave.oppgavetypeData.programperiode.fraOgMed} />
                ) : (
                    <EndretSluttdatoOppgaveInfo endretDato={oppgave.oppgavetypeData.programperiode.tilOgMed} />
                ),
            );

        case Oppgavetype.RAPPORTER_INNTEKT:
            return (
                <Page title="Rapporter inntekt - Din ungdomsytelse">
                    <BodyShort spacing>Rapporter inntekst oppgave</BodyShort>
                </Page>
            );
    }
};

export default OppgavePage;
