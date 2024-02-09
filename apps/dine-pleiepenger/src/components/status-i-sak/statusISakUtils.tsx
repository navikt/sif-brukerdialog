import { Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { WarningColored } from '@navikt/ds-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Aksjonspunkt } from '../../server/api-models/AksjonspunktSchema';
import { Behandling } from '../../server/api-models/BehandlingSchema';
import { BehandlingStatus } from '../../server/api-models/BehandlingStatus';
import { InnsendtSøknadstype } from '../../types/Søknad';
import { Venteårsak } from '../../types/Venteårsak';
import { formatInnsendtSøknadOpprettetDato } from '../../utils/innsendtSøknadUtils';
import CompleteIcon from '../process/checks/Complete';
import ProcessStep from '../process/ProcessStep';

export const getStepsInBehandling = (behandling: Behandling, saksbehandlingsFrist?: Date): React.ReactNode[] => {
    const { søknader, aksjonspunkter, avsluttetDato, status } = behandling;
    const steps: React.ReactNode[] = [];

    let key = 0;
    søknader.forEach((søknad) => {
        steps.push(
            <ProcessStep key={key++} completed={true} icon={<CompleteIcon />}>
                <Heading size="small" level="3">
                    {søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN
                        ? 'Vi mottok søknad om pleiepenger for sykt barn'
                        : 'Vi mottok søknad om endring av pleiepenger for sykt barn'}
                </Heading>
                <p>{formatInnsendtSøknadOpprettetDato(søknad.k9FormatSøknad.mottattDato)}</p>
            </ProcessStep>,
        );
    });

    if (aksjonspunkter.length > 0) {
        steps.push(
            <ProcessStep
                key={key++}
                variant="WARNING"
                useCircle={false}
                icon={<WarningColored />}
                completed={false}
                className="whoa">
                <Heading size="small" level="3" spacing={true}>
                    {getAksjonspunkterTekst(aksjonspunkter)}
                </Heading>
                <Link variant="action" href="#">
                    Se alle brev i Dokumentarkivet
                </Link>
            </ProcessStep>,
        );
    }
    if (status === BehandlingStatus.AVSLUTTET) {
        steps.push(
            <ProcessStep key={key++} completed={true} icon={<CompleteIcon />}>
                <Heading size="small" level="3">
                    Søknad er ferdig behandlet
                </Heading>
                {avsluttetDato ? <p>{dateFormatter.dayDateMonthYear(avsluttetDato)} </p> : null}
            </ProcessStep>,
        );
    } else {
        steps.push(
            <ProcessStep key={key++} completed={false}>
                <Heading size="small" level="3">
                    Søknaden er ferdig behandlet
                </Heading>
                {saksbehandlingsFrist ? (
                    <p>
                        Du kan forvente svar innen {` `}
                        <span className="font-bold first-letter:uppercase">
                            {dateFormatter.dayDateMonthYear(saksbehandlingsFrist)}
                        </span>
                    </p>
                ) : (
                    <p>Du kan forvente svar innen:</p>
                )}
            </ProcessStep>,
        );
    }

    return steps;
};

export const getAksjonspunkterTekst = (aksjonspunkter: Aksjonspunkt[]): string => {
    const årsaker = aksjonspunkter.map((a) => a.venteårsak).flat();
    if (årsaker.includes(Venteårsak.MEDISINSK_DOKUMENTASJON)) {
        return 'Vi har sendt deg brev fordi vi mangler legeerklæring.';
    }
    if (årsaker.includes(Venteårsak.INNTEKTSMELDING)) {
        return 'Vi har sendt deg brev fordi vi mangler inntektsmelding.';
    }
    return `Vi har sendt deg brev fordi vi mangler noe informasjon.`;
};
