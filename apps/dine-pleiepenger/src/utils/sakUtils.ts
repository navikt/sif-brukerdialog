import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import sortBy from 'lodash.sortby';
import uniq from 'lodash.uniq';
import { Aksjonspunkt } from '../server/api-models/AksjonspunktSchema';
import { Behandling } from '../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../server/api-models/Behandlingsstatus';
import { Sak } from '../server/api-models/SakSchema';
import { Pleiepengesøknad, Innsendelse } from '../server/api-models/InnsendelseSchema';
import { Innsendelsestype } from '../server/api-models/Innsendelsestype';
import { BehandlingsstatusISak } from '../types/BehandlingsstatusISak';
import { Organisasjon } from '../types/Organisasjon';
import { Søknadshendelse, SøknadshendelseType } from '../types/Søknadshendelse';
import { Venteårsak } from '../types/Venteårsak';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

export const getSisteBehandlingISak = (sak: Sak): Behandling | undefined => {
    return sortBehandlingerNyesteFørst(sak.behandlinger)[0];
};

export const sortBehandlingerNyesteFørst = (
    behandlinger: Behandling[],
    doSortSøknader: boolean = true,
): Behandling[] => {
    const sortedBehandlinger = sortBy(behandlinger, (b: Behandling) => b.opprettetTidspunkt).reverse();
    if (doSortSøknader) {
        return sortedBehandlinger.map((b: Behandling): Behandling => {
            return {
                ...b,
                innsendelser: sortInnsendelser(b.innsendelser),
            };
        });
    }
    return sortedBehandlinger;
};

export const sortInnsendelser = (innsendelser: Innsendelse[]): Innsendelse[] => {
    return sortBy(innsendelser, ({ k9FormatInnsendelse }: Innsendelse) =>
        k9FormatInnsendelse.mottattDato.getTime(),
    ).reverse();
};

export const sortSøknadshendelse = (h1: Søknadshendelse, h2: Søknadshendelse): number => {
    if (h1.type === SøknadshendelseType.FORVENTET_SVAR) {
        return 1;
    } else if (h2.type === SøknadshendelseType.FORVENTET_SVAR) {
        return -1;
    }
    return (h1.dato?.getTime() || 0) > (h2.dato?.getTime() || 0) ? 1 : -1;
};

export const getBehandlingsstatusISak = (sak: Sak): BehandlingsstatusISak | undefined => {
    const behandling = getSisteBehandlingISak(sak);
    return behandling
        ? {
              status: behandling.status,
              venteårsak: behandling.aksjonspunkter?.length > 0 ? behandling.aksjonspunkter[0]?.venteårsak : undefined,
          }
        : undefined;
};

const mapSøknadTilSøknadshendelse = (innsendelse: Innsendelse): Søknadshendelse => {
    switch (innsendelse.innsendelsestype) {
        case Innsendelsestype.ETTERSENDELSE:
            return {
                type: SøknadshendelseType.ETTERSENDELSE,
                dato: innsendelse.k9FormatInnsendelse.mottattDato,
                innsendelse,
            };

        case Innsendelsestype.ENDRINGSMELDING:
        case Innsendelsestype.SØKNAD:
            return {
                type: SøknadshendelseType.MOTTATT_SØKNAD,
                dato: innsendelse.k9FormatInnsendelse.mottattDato,
                innsendelse: innsendelse,
            };
    }
};

export const getHendelserIBehandling = (behandling: Behandling, saksbehandlingFrist?: Date): Søknadshendelse[] => {
    const { innsendelser: søknader, aksjonspunkter, avsluttetTidspunkt, status } = behandling;
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

export const getSøknadstyperIBehandling = (søknader: Innsendelse[]): Array<Innsendelsestype> => {
    return uniq(søknader.map((s) => s.innsendelsestype));
};

export const getAlleHendelserISak = (sak: Sak): Søknadshendelse[] => {
    const søknadshendelser: Søknadshendelse[] = sak.behandlinger
        .map((b) => getHendelserIBehandling(b, sak.saksbehandlingsFrist))
        .flat();
    return søknadshendelser.sort(sortSøknadshendelse);
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
    return søknad.k9FormatInnsendelse.ytelse.arbeidstid.arbeidstakerList.map((a) => {
        const organisasjon: Organisasjon = {
            organisasjonsnummer: a.organisasjonsnummer,
            navn: getArbeidsgivernavn(a.organisasjonsnummer, arbeidsgivere),
        };
        return organisasjon;
    });
};

export const erSaksbehandlingsfristPassert = (frist: Date) => dayjs(frist).isBefore(dayjs(), 'day');
