import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import sortBy from 'lodash.sortby';
import uniq from 'lodash.uniq';
import { Aksjonspunkt } from '../server/api-models/AksjonspunktSchema';
import { Behandling } from '../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../server/api-models/Behandlingsstatus';
import { Sak } from '../server/api-models/SakSchema';
import { Pleiepengesøknad, Søknad } from '../server/api-models/SøknadSchema';
import { Søknadstype } from '../server/api-models/Søknadstype';
import { BehandlingsstatusISak } from '../types/BehandlingsstatusISak';
import { Kildesystem } from '../types/Kildesystem';
import { Organisasjon } from '../types/Organisasjon';
import { Søknadshendelse, SøknadshendelseType } from '../types/Søknadshendelse';
import { Venteårsak } from '../types/Venteårsak';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

const getSisteBehandlingISak = (sak: Sak): Behandling => {
    return sortBy(sak.behandlinger, (b) => b.opprettetDato)[0];
};

export const sortBehandlinger = (behandlinger: Behandling[], doSortSøknader: boolean = true): Behandling[] => {
    const sortedBehandlinger = sortBy(behandlinger, (b) => b.opprettetDato).reverse();
    if (doSortSøknader) {
        return sortedBehandlinger.map((b): Behandling => {
            return {
                ...b,
                søknader: sortSøknader(b.søknader),
            };
        });
    }
    return sortedBehandlinger;
};

export const sortSøknader = (søknader: Søknad[]): Søknad[] => {
    return sortBy(søknader, ({ k9FormatSøknad }: Søknad) => k9FormatSøknad.mottattDato.getTime()).reverse();
};

export const sortSøknadshendelser = (hendelser: Søknadshendelse[]): Søknadshendelse[] => {
    return sortBy(hendelser, ({ dato }: Søknadshendelse) => dato?.getTime());
};

export const getBehandlingerISakSorted = (sak: Sak): Behandling[] => {
    return sortBehandlinger(sak.behandlinger);
};

export const getBehandlingsstatusISak = (sak: Sak): BehandlingsstatusISak => {
    const behandling = getSisteBehandlingISak(sak);
    return {
        status: behandling.status,
        venteårsak: behandling.aksjonspunkter?.length > 0 ? behandling.aksjonspunkter[0]?.venteårsak : undefined,
    };
};

const mapSøknadTilSøknadshendelse = (søknad: Søknad): Søknadshendelse => {
    switch (søknad.søknadstype) {
        case Søknadstype.UKJENT:
            return {
                type: SøknadshendelseType.UKJENT,
                dato: undefined,
            };

        case Søknadstype.ENDRINGSMELDING:
        case Søknadstype.SØKNAD:
            return {
                type: SøknadshendelseType.MOTTATT_SØKNAD,
                dato: søknad.k9FormatSøknad.mottattDato,
                søknad,
            };
    }
};

export const getHendelserIBehandling = (behandling: Behandling, saksbehandlingFrist?: Date): Søknadshendelse[] => {
    const { søknader, aksjonspunkter, avsluttetTidspunkt, status } = behandling;
    const hendelser: Søknadshendelse[] = [];

    søknader.forEach((søknad) => {
        hendelser.push(mapSøknadTilSøknadshendelse(søknad));
    });

    if (aksjonspunkter.length >= 1) {
        hendelser.push({
            type: SøknadshendelseType.AKSJONSPUNKT,
            venteårsak: getViktigsteVenteårsakForAksjonspunkter(aksjonspunkter),
        });
    }

    /** Avsluttet eller forventet svar på søknad */
    if (status === Behandlingsstatus.AVSLUTTET && avsluttetTidspunkt) {
        hendelser.push({
            type: SøknadshendelseType.FERDIG_BEHANDLET,
            dato: avsluttetTidspunkt,
        });
    } else {
        hendelser.push({
            type: SøknadshendelseType.FORVENTET_SVAR,
            dato: saksbehandlingFrist,
            søknadstyperIBehandling: getSøknadstyperIBehandling(søknader),
        });
    }

    return hendelser;
};

export const getSøknadstyperIBehandling = (søknader: Søknad[]): Array<Søknadstype> => {
    return uniq(søknader.map((s) => s.søknadstype));
};

export const getAlleHendelserISak = (sak: Sak): Søknadshendelse[] => {
    return sortSøknadshendelser(
        sak.behandlinger.map((b) => getHendelserIBehandling(b, sak.saksbehandlingsFrist)).flat(),
    );
};

export const getViktigsteVenteårsakForAksjonspunkter = (aksjonspunkter: Aksjonspunkt[]): Venteårsak => {
    const årsaker = aksjonspunkter.map((a) => a.venteårsak).flat();
    if (årsaker.includes(Venteårsak.MEDISINSK_DOKUMENTASJON)) {
        return Venteårsak.MEDISINSK_DOKUMENTASJON;
    }
    return årsaker[0];
};

export const formatSøknadshendelseTidspunkt = (date: Date) => {
    return dayjs(date).tz('Europe/Oslo').format('DD.MM.YYYY, [kl.] HH:mm');
};

const getArbeidsgivernavn = (organisasjonsnummer: string, arbeidsgivere: Organisasjon[]): string => {
    return arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer)?.navn || organisasjonsnummer;
};

export const getArbeidsgiverinfoFraSøknad = (søknad: Pleiepengesøknad): Organisasjon[] => {
    const arbeidsgivere = søknad.arbeidsgivere || [];
    return søknad.k9FormatSøknad.ytelse.arbeidstid.arbeidstakerList.map((a) => {
        const organisasjon: Organisasjon = {
            organisasjonsnummer: a.organisasjonsnummer,
            navn: getArbeidsgivernavn(a.organisasjonsnummer, arbeidsgivere),
        };
        return organisasjon;
    });
};

export const fjernPunsjOgUkjenteSøknaderFraBehandling = (behandling: Behandling): Behandling => {
    return {
        ...behandling,
        søknader: behandling.søknader.filter(
            (s) => !!s.k9FormatSøknad.kildesystem && s.k9FormatSøknad.kildesystem !== Kildesystem.punsj,
        ),
    };
};
