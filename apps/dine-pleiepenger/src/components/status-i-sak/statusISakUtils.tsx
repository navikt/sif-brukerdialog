import React from 'react';
import ProcessStep from '../process/ProcessStep';
import { Heading } from '@navikt/ds-react';
import CompleteIcon from '../process/checks/Complete';
import { Behandling } from '../../server/api-models/BehandlingSchema';
import { formatInnsendtSøknadOpprettetDato } from '../../utils/innsendtSøknadUtils';
import { BehandlingStatus } from '../../types/BehandlingStatus';
import { WarningColored } from '@navikt/ds-icons';
import { InnsendtSøknadstype } from '../../types/Søknad';
import { Aksjonspunkt } from '../../server/api-models/AksjonspunktSchema';
import Link from 'next/link';
import { dateFormatter } from '@navikt/sif-common-utils';

export const getStepsInBehandling = (behandling: Behandling, saksbehandlingsFrist?: Date): React.ReactNode[] => {
    const { søknader, aksjonspunkter, status } = behandling;
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
                <Link href="#">Se alle brev i Dokumentarkivet</Link>
            </ProcessStep>,
        );
    }
    if (status === BehandlingStatus.AVSLUTTET) {
        steps.push(
            <ProcessStep key={key++} completed={true} icon={<CompleteIcon />}>
                <Heading size="small" level="3">
                    Søknad er ferdig behandlet
                </Heading>
                <p>[Todo: Tidspunkt mangler]</p>
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
    return `Vi har sendt deg brev fordi vi mangler ${aksjonspunkter.map((ap) => ap.venteårsak).join(', ')}`;
};
