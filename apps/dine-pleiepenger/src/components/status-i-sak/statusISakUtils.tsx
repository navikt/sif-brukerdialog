import { Heading } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Aksjonspunkt } from '../../server/api-models/AksjonspunktSchema';
import { Behandling } from '../../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { InnsendtSøknadstype } from '../../types/Søknad';
import { Venteårsak } from '../../types/Venteårsak';
import { formatInnsendtSøknadOpprettetDato } from '../../utils/innsendtSøknadUtils';
import CompleteIcon from '../process/checks/Complete';
import ProcessStep from '../process/ProcessStep';
import { Kildesystem } from '../../server/api-models/K9FormatSøknadSchema';

export const getSøknadstypeStatusmelding = (søknadstype?: InnsendtSøknadstype, kildesystem?: Kildesystem): string => {
    if (kildesystem === Kildesystem.søknadsdialog || søknadstype === InnsendtSøknadstype.PP_SYKT_BARN) {
        return 'Vi mottok søknad om pleiepenger for sykt barn';
    }
    if (
        kildesystem === Kildesystem.endringsdialog ||
        søknadstype === InnsendtSøknadstype.PP_SYKT_BARN_ENDRINGSMELDING
    ) {
        return 'Vi mottok søknad om endring av pleiepenger for sykt barn';
    }
    if (søknadstype === InnsendtSøknadstype.PP_ETTERSENDELSE) {
        return 'Vi mottok ettersendelse av dokument';
    }
    return 'Vi mottok søknad/endringsmelding';
};
export const getStepsInBehandling = (behandling: Behandling, saksbehandlingsFrist?: Date): React.ReactNode[] => {
    const { søknader, aksjonspunkter, avsluttetDato, status } = behandling;
    const steps: React.ReactNode[] = [];

    let key = 0;
    søknader.forEach((søknad) => {
        steps.push(
            <ProcessStep key={key++} completed={true} icon={<CompleteIcon />}>
                <Heading size="small" level="3">
                    {getSøknadstypeStatusmelding(søknad.søknadstype, søknad.k9FormatSøknad.kildesystem)}
                </Heading>
                <p>{formatInnsendtSøknadOpprettetDato(søknad.k9FormatSøknad.mottattDato)}</p>
            </ProcessStep>,
        );
    });

    if (aksjonspunkter.length > 0) {
        steps.push(
            <ProcessStep key={key++} completed={false} variant="CURRENT">
                <Heading size="small" level="3" spacing={true}>
                    {getAksjonspunkterTekst(aksjonspunkter)}
                </Heading>
            </ProcessStep>,
        );
    }
    if (status === Behandlingsstatus.AVSLUTTET) {
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
        return 'Saken er satt på vent fordi vi mangler legeerklæring';
    }
    if (årsaker.includes(Venteårsak.INNTEKTSMELDING)) {
        return 'Saken er satt på vent fordi vi mangler inntektsmelding';
    }
    return `Saken er satt på vent fordi vi mangler informajson`;
};
