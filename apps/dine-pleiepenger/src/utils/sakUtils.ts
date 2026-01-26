import { Arbeidstaker } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import sortBy from 'lodash.sortby';

import {
    Aksjonspunkt,
    Behandling,
    BehandlingStatus,
    InnsendelseISak,
    Inntektsmelding,
    Organisasjon,
    Sak,
    SøknadISak,
    Venteårsak,
} from '../types';
import { BehandlingsstatusISak } from '../types/BehandlingsstatusISak';
import { Innsendelsestype } from '../types/Innsendelsestype';
import { Sakshendelse, Sakshendelser } from '../types/Sakshendelse';
import { sorterInntektsmeldingerPåInnsendingstidspunkt } from './inntektsmeldingUtils';

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

export const sortInnsendelser = (innsendelser: InnsendelseISak[]): InnsendelseISak[] => {
    return sortBy(innsendelser, ({ k9FormatInnsendelse }: InnsendelseISak) =>
        k9FormatInnsendelse.mottattDato.getTime(),
    ).reverse();
};

export const sortSakshendelse = (hendelse1: Sakshendelse, hendelse2: Sakshendelse): number => {
    if (hendelse1.type === Sakshendelser.FORVENTET_SVAR) {
        return 1;
    } else if (hendelse2.type === Sakshendelser.FORVENTET_SVAR) {
        return -1;
    }
    return (hendelse1.dato?.getTime() || 0) > (hendelse2.dato?.getTime() || 0) ? 1 : -1;
};

export const getBehandlingsstatusISak = (sak: Sak): BehandlingsstatusISak | undefined => {
    return {
        status: sak.utledetStatus.status,
        venteårsak:
            sak.utledetStatus.aksjonspunkter?.length > 0 ? sak.utledetStatus.aksjonspunkter[0]?.venteårsak : undefined,
    };
};

const mapInnsendelseTilSakshendelse = (innsendelse: InnsendelseISak): Sakshendelse => {
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
    const hendelserIBehandling: Sakshendelse[] = [];

    innsendelser.forEach((søknad) => {
        hendelserIBehandling.push(mapInnsendelseTilSakshendelse(søknad));
    });

    if (aksjonspunkter.length >= 1) {
        hendelserIBehandling.push({
            type: Sakshendelser.AKSJONSPUNKT,
            venteårsak: getViktigsteVenteårsakForAksjonspunkter(aksjonspunkter),
        });
    }

    /** Melding om vedtak eller fremtidig vedtak skal kun vises hvis behandling inneholder endringsmelding eller søknad */
    if (harBehandlingSøknadEllerEndringsmelding(behandling)) {
        /** Avsluttet eller forventet svar på søknad */
        if (status === BehandlingStatus.AVSLUTTET && avsluttetTidspunkt) {
            hendelserIBehandling.push({
                type: Sakshendelser.FERDIG_BEHANDLET,
                dato: avsluttetTidspunkt,
            });
        } else {
            hendelserIBehandling.push({
                type: Sakshendelser.FORVENTET_SVAR,
                dato: saksbehandlingFrist,
                innsendelsestyperIBehandling: (innsendelser || []).map((s) => s.innsendelsestype),
            });
        }
    }

    return hendelserIBehandling;
};

export const getAlleHendelserISak = (sak: Sak, inntektsmeldinger: Inntektsmelding[]): Sakshendelse[] => {
    const sakshendelser: Sakshendelse[] = sak.behandlinger
        .map((b) => getHendelserIBehandling(b, sak.utledetStatus.saksbehandlingsFrist))
        .flat();

    const inntektsmeldingHendelser: Sakshendelse[] = inntektsmeldinger
        .sort(sorterInntektsmeldingerPåInnsendingstidspunkt)
        .reverse()
        .map((im) => ({
            type: Sakshendelser.INNTEKTSMELDING,
            dato: im.mottattDato,
            inntektsmelding: im,
            erstatter: inntektsmeldinger.filter((i) => i.erstattetAv.includes(im.journalpostId)),
        }));
    sakshendelser.push(...inntektsmeldingHendelser);
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

const erOrganisasjonArbeidsgiver = (org: Organisasjon | Arbeidstaker): org is Organisasjon => {
    if (org.organisasjonsnummer) {
        return true;
    }
    return false;
};

export const getOrgArbeidsgivereFraSøknad = (søknad: SøknadISak): Organisasjon[] => {
    const arbeidsgivere = søknad.arbeidsgivere || [];
    const getOrgArbeidsgivere: Organisasjon[] = søknad.k9FormatInnsendelse.ytelse.arbeidstid.arbeidstakerList.filter(
        erOrganisasjonArbeidsgiver,
    ) as Organisasjon[];

    return getOrgArbeidsgivere.map((org: Organisasjon) => {
        const organisasjon: Organisasjon = {
            organisasjonsnummer: org.organisasjonsnummer,
            navn: getArbeidsgivernavn(org.organisasjonsnummer, arbeidsgivere),
        };
        return organisasjon;
    });
};

export const getOrganisasjonsnavnEllerOrgNummer = (organisasjon: Organisasjon): string => {
    if (organisasjon.navn === null || organisasjon.navn === undefined) {
        return organisasjon.organisasjonsnummer;
    }
    return organisasjon.navn;
};

export const erSaksbehandlingsfristPassert = (frist: Date) => dayjs(frist).isBefore(dayjs(), 'day');
