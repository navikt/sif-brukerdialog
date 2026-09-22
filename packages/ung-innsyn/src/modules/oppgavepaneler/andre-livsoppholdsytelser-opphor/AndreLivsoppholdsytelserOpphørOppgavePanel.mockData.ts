import {
    AndreLivsoppholdsytelserAvklaringKildeType,
    AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { AndreLivsoppholdsytelserOpphørOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateFormatter, dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

/** Tekster som nå kommer fra backend */
const andreLivsoppholdsytelserOpphørOppgaveTekster = {
    MOTTAR_ARBEIDSAVKLARINGSPENGER:
        'Vi har fått opplysninger om at du fra {fom} mottar arbeidsavklaringspenger. Du kan ikke få aktivitetspenger samtidig som du mottar arbeidsavklaringspenger.',
    MOTTAR_TILTAKSPENGER:
        'Vi har fått opplysninger om at du fra {fom} mottar tiltakspenger. Du kan ikke få aktivitetspenger samtidig som du mottar tiltakspenger.',
    MOTTAR_KVALIFISERINGSSTØNAD:
        'Vi har fått opplysninger om at du fra {fom} mottar kvalifiseringsstønad. Du kan ikke få aktivitetspenger samtidig som du mottar kvalifiseringsstønad.',
    MOTTAR_DAGPENGER:
        'Vi har fått opplysninger om at du fra {fom} mottar dagpenger. Du kan ikke få aktivitetspenger samtidig som du mottar dagpenger.',
    MOTTAR_FORELDREPENGER:
        'Vi har fått opplysninger om at du fra {fom} mottar foreldrepenger. Du kan ikke få aktivitetspenger samtidig som du mottar foreldrepenger.',
    MOTTAR_SVANGERSKAPSPENGER:
        'Vi har fått opplysninger om at du fra {fom} mottar svangerskapspenger. Du kan ikke få aktivitetspenger samtidig som du mottar svangerskapspenger.',
    MOTTAR_UFØRETRYGD:
        'Vi har fått opplysninger om at du fra {fom} mottar uføretrygd. Du kan ikke få aktivitetspenger samtidig som du mottar uføretrygd.',
    MOTTAR_INTRODUKSJONSSTØNAD:
        'Vi har fått opplysninger om at du fra {fom} mottar introduksjonsstønad. Du kan ikke få aktivitetspenger samtidig som du mottar introduksjonsstønad.',
    MOTTAR_BARNEPENSJON:
        'Vi har fått opplysninger om at du fra {fom} mottar barnepensjon. Du kan ikke få aktivitetspenger samtidig som du mottar barnepensjon.',
    MOTTAR_ANNEN_YTELSE:
        'Vi har fått opplysninger om at du fra {fom} mottar en annen livsoppholdsytelse. Du kan ikke få aktivitetspenger samtidig som du mottar denne ytelsen.',
    UDEFINERT:
        'Vi har fått opplysninger om at du fra {fom} mottar en livsoppholdsytelse. Du kan ikke få aktivitetspenger samtidig som du mottar denne ytelsen.',
} satisfies Record<AndreLivsoppholdsytelserIkkeOppfyltÅrsak, string>;

/**
 * Utledet fra tekstoppslaget over, som er `satisfies`-sjekket mot enumet.
 * Garanterer at scenario-listen alltid dekker alle årsaker uten manuell synkronisering.
 */
export const ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR_ÅRSAK_SCENARIO_OPTIONS = Object.keys(
    andreLivsoppholdsytelserOpphørOppgaveTekster,
) as AndreLivsoppholdsytelserIkkeOppfyltÅrsak[];

/** Alle kildeverdier skal alltid være med i scenario-listen. */
export const ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR_KILDE_SCENARIO_OPTIONS = Object.values(
    AndreLivsoppholdsytelserAvklaringKildeType,
);

const getVarselTekst = (fom: ISODate, årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak): string => {
    const formatertFom = dateFormatter.compact(fom);
    const tekst = andreLivsoppholdsytelserOpphørOppgaveTekster[årsak];
    return tekst.replace('{fom}', formatertFom);
};

export const lagOpphørOppgaveMedÅrsak = (
    base: AndreLivsoppholdsytelserOpphørOppgave,
    årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
    kilde: AndreLivsoppholdsytelserAvklaringKildeType,
): AndreLivsoppholdsytelserOpphørOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        kilde,
        varseltekst: getVarselTekst(base.oppgavetypeData.fom, årsak),
        kildeFritekst:
            kilde === AndreLivsoppholdsytelserAvklaringKildeType.ANNET
                ? 'Vi har fått informasjon fra din XXX som sier at du nå mottar YYY.\n\nInformasjonen kom via et brev vi mottok.'
                : undefined,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockAndreLivsoppholdsytelserOpphørAKT: AndreLivsoppholdsytelserOpphørOppgave = {
    oppgaveReferanse: '6b1f7c3d-9e2a-4d5c-8f0e-1a2b3c4d5e6f',
    oppgavetype: OppgaveType.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        kilde: AndreLivsoppholdsytelserAvklaringKildeType.ANNET,
        kildeFritekst:
            'Vi har fått informasjon fra din XXX som sier at du nå mottar YYY.\n\nInformasjonen kom via et brev vi mottok.',
        fom: dateToISODate(dayjs().subtract(1, 'month')),
        varseltekst: getVarselTekst(
            dateToISODate(dayjs().subtract(1, 'month')),
            AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE,
        ),
    },
};

export const mockAndreLivsoppholdsytelserOpphørBesvartAKT: AndreLivsoppholdsytelserOpphørOppgave = {
    ...mockAndreLivsoppholdsytelserOpphørAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
