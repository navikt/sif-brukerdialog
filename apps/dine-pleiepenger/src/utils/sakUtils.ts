import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import sortBy from 'lodash.sortby';
import { Aksjonspunkt } from '../server/api-models/AksjonspunktSchema';
import { Behandling } from '../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../server/api-models/Behandlingsstatus';
import { Innsendelse, Pleiepengesøknad } from '../server/api-models/InnsendelseSchema';
import { Innsendelsestype } from '../server/api-models/Innsendelsestype';
import { Sak } from '../server/api-models/SakSchema';
import { BehandlingsstatusISak } from '../types/BehandlingsstatusISak';
import { Organisasjon } from '../types/Organisasjon';
import { Sakshendelse, Sakshendelser } from '../types/Sakshendelse';
import { Venteårsak } from '../types/Venteårsak';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

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

export const sortSakshendelse = (h1: Sakshendelse, h2: Sakshendelse): number => {
    if (h1.type === Sakshendelser.FORVENTET_SVAR) {
        return 1;
    } else if (h2.type === Sakshendelser.FORVENTET_SVAR) {
        return -1;
    }
    return (h1.dato?.getTime() || 0) > (h2.dato?.getTime() || 0) ? 1 : -1;
};

export const getBehandlingsstatusISak = (sak: Sak): BehandlingsstatusISak | undefined => {
    return {
        status: sak.utledetStatus.status,
        venteårsak:
            sak.utledetStatus.aksjonspunkter?.length > 0 ? sak.utledetStatus.aksjonspunkter[0]?.venteårsak : undefined,
    };
};

const mapInnsendelseTilSakshendelse = (innsendelse: Innsendelse): Sakshendelse => {
    switch (innsendelse.innsendelsestype) {
        case Innsendelsestype.ETTERSENDELSE:
            return {
                type: Sakshendelser.ETTERSENDELSE,
                dato: innsendelse.k9FormatInnsendelse.mottattDato,
                innsendelse,
            };

        case Innsendelsestype.ENDRINGSMELDING:
        case Innsendelsestype.SØKNAD:
            return {
                type: Sakshendelser.MOTTATT_SØKNAD,
                dato: innsendelse.k9FormatInnsendelse.mottattDato,
                innsendelse: innsendelse,
            };
    }
};

export const harBehandlingSøknadEllerEndringsmelding = (behandling: Behandling): boolean =>
    behandling.innsendelser.some((i) =>
        [Innsendelsestype.SØKNAD, Innsendelsestype.ENDRINGSMELDING].includes(i.innsendelsestype),
    );

export const getHendelserIBehandling = (behandling: Behandling, saksbehandlingFrist?: Date): Sakshendelse[] => {
    const { innsendelser, aksjonspunkter, avsluttetTidspunkt, status } = behandling;
    const hendelser: Sakshendelse[] = [];

    innsendelser.forEach((søknad) => {
        hendelser.push(mapInnsendelseTilSakshendelse(søknad));
    });

    if (aksjonspunkter.length >= 1) {
        hendelser.push({
            type: Sakshendelser.AKSJONSPUNKT,
            venteårsak: getViktigsteVenteårsakForAksjonspunkter(aksjonspunkter),
        });
    }

    /** Melding om vedtak eller fremtidig vedtak skal kun vises hvis behandling inneholder endringsmelding eller søknad */
    if (harBehandlingSøknadEllerEndringsmelding(behandling)) {
        /** Avsluttet eller forventet svar på søknad */
        if (status === Behandlingsstatus.AVSLUTTET && avsluttetTidspunkt) {
            hendelser.push({
                type: Sakshendelser.FERDIG_BEHANDLET,
                dato: avsluttetTidspunkt,
            });
        } else {
            hendelser.push({
                type: Sakshendelser.FORVENTET_SVAR,
                dato: saksbehandlingFrist,
                søknadstyperIBehandling: getSøknadstyperIBehandling(innsendelser || []),
            });
        }
    }

    return hendelser;
};

export const getSøknadstyperIBehandling = (søknader: Innsendelse[]): Innsendelsestype[] => {
    return søknader.map((s) => s.innsendelsestype);
};

export const getAlleHendelserISak = (sak: Sak): Sakshendelse[] => {
    const sakshendelser: Sakshendelse[] = sak.behandlinger
        .map((b) => getHendelserIBehandling(b, sak.utledetStatus.saksbehandlingsFrist))
        .flat();
    return sakshendelser.sort(sortSakshendelse);
};

export const getViktigsteVenteårsakForAksjonspunkter = (aksjonspunkter: Aksjonspunkt[]): Venteårsak => {
    const årsaker = aksjonspunkter.map((a) => a.venteårsak).flat();
    if (årsaker.includes(Venteårsak.MEDISINSK_DOKUMENTASJON)) {
        return Venteårsak.MEDISINSK_DOKUMENTASJON;
    }
    return årsaker[0];
};

export const formatSakshendelseTidspunkt = (date: Date) => {
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

export const getOrganisasjonsnavnEllerOrgNummer = (organisasjon: Organisasjon): string => {
    if (organisasjon.navn === null) {
        return organisasjon.organisasjonsnummer;
    }
    return organisasjon.navn;
};

export const erSaksbehandlingsfristPassert = (frist: Date) => dayjs(frist).isBefore(dayjs(), 'day');
