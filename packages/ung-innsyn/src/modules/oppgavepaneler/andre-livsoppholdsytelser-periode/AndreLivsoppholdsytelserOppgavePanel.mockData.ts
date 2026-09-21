import {
    AndreLivsoppholdsytelserAvklaringKildeType,
    AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { AndreLivsoppholdsytelserOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateFormatter, dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

const andreLivsoppholdsytelserOppgaveTekster = {
    MOTTAR_ARBEIDSAVKLARINGSPENGER:
        'Vi har fått opplysninger om at du i perioden {periode} mottar arbeidsavklaringspenger. Du kan ikke få ungdomsprogramytelse samtidig som du mottar arbeidsavklaringspenger.',
    MOTTAR_TILTAKSPENGER:
        'Vi har fått opplysninger om at du i perioden {periode} mottar tiltakspenger. Du kan ikke få ungdomsprogramytelse samtidig som du mottar tiltakspenger.',
    MOTTAR_KVALIFISERINGSSTØNAD:
        'Vi har fått opplysninger om at du i perioden {periode} mottar kvalifiseringsstønad. Du kan ikke få ungdomsprogramytelse samtidig som du mottar kvalifiseringsstønad.',
    MOTTAR_DAGPENGER:
        'Vi har fått opplysninger om at du i perioden {periode} mottar dagpenger. Du kan ikke få ungdomsprogramytelse samtidig som du mottar dagpenger.',
    MOTTAR_FORELDREPENGER:
        'Vi har fått opplysninger om at du i perioden {periode} mottar foreldrepenger. Du kan ikke få ungdomsprogramytelse samtidig som du mottar foreldrepenger.',
    MOTTAR_SVANGERSKAPSPENGER:
        'Vi har fått opplysninger om at du i perioden {periode} mottar svangerskapspenger. Du kan ikke få ungdomsprogramytelse samtidig som du mottar svangerskapspenger.',
    MOTTAR_UFØRETRYGD:
        'Vi har fått opplysninger om at du i perioden {periode} mottar uføretrygd. Du kan ikke få ungdomsprogramytelse samtidig som du mottar uføretrygd.',
    MOTTAR_INTRODUKSJONSSTØNAD:
        'Vi har fått opplysninger om at du i perioden {periode} mottar introduksjonsstønad. Du kan ikke få ungdomsprogramytelse samtidig som du mottar introduksjonsstønad.',
    MOTTAR_BARNEPENSJON:
        'Vi har fått opplysninger om at du i perioden {periode} mottar barnepensjon. Du kan ikke få ungdomsprogramytelse samtidig som du mottar barnepensjon.',
    MOTTAR_ANNEN_YTELSE:
        'Vi har fått opplysninger om at du i perioden {periode} mottar en annen livsoppholdsytelse. Du kan ikke få ungdomsprogramytelse samtidig som du mottar denne ytelsen.',
    UDEFINERT:
        'Vi har fått opplysninger om at du i perioden {periode} mottar en livsoppholdsytelse. Du kan ikke få ungdomsprogramytelse samtidig som du mottar denne ytelsen.',
} satisfies Record<AndreLivsoppholdsytelserIkkeOppfyltÅrsak, string>;

/**
 * Utledet fra tekstoppslaget over, som er `satisfies`-sjekket mot enumet.
 * Garanterer at scenario-listen alltid dekker alle årsaker uten manuell synkronisering.
 */
export const ANDRE_LIVSOPPHOLDSYTELSER_ÅRSAK_SCENARIO_OPTIONS = Object.keys(
    andreLivsoppholdsytelserOppgaveTekster,
) as AndreLivsoppholdsytelserIkkeOppfyltÅrsak[];

/** Alle kildeverdier skal alltid være med i scenario-listen. */
export const ANDRE_LIVSOPPHOLDSYTELSER_KILDE_SCENARIO_OPTIONS = Object.values(AndreLivsoppholdsytelserAvklaringKildeType);


const getVarselTekst = (
    periode: { from: ISODate; to: ISODate },
    årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
): string => {
    const formatertFom = dateFormatter.compact(periode.from);
    const formatertTom = dateFormatter.compact(periode.to);
    const periodeTekst = `${formatertFom} - ${formatertTom}`;
    const tekst = andreLivsoppholdsytelserOppgaveTekster[årsak];
    return tekst.replace('{periode}', periodeTekst);
};

export const lagOppgaveMedÅrsak = (
    base: AndreLivsoppholdsytelserOppgave,
    årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
    kilde: AndreLivsoppholdsytelserAvklaringKildeType,
): AndreLivsoppholdsytelserOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        kilde,
        varseltekst: getVarselTekst(base.oppgavetypeData.periode, årsak),
        kildeFritekst:
            kilde === AndreLivsoppholdsytelserAvklaringKildeType.ANNET
                ? 'Vi har fått informasjon fra din XXX som sier at du nå mottar YYY.\n\nInformasjonen kom via et brev vi mottok.'
                : undefined,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockAndreLivsoppholdsytelserAKT: AndreLivsoppholdsytelserOppgave = {
    oppgaveReferanse: '6b1f7c3d-9e2a-4d5c-8f0e-1a2b3c4d5e6f',
    oppgavetype: OppgaveType.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ARBEIDSAVKLARINGSPENGER,
        ikkeOppfyltÅrsakFritekstbeskrivelse: undefined,
        kilde: AndreLivsoppholdsytelserAvklaringKildeType.NAV,
        periode: {
            from: dateToISODate(dayjs().subtract(1, 'month')),
            to: dateToISODate(dayjs().add(1, 'month')),
        },
        varseltekst: getVarselTekst(
            {
                from: dateToISODate(dayjs().subtract(1, 'month')),
                to: dateToISODate(dayjs().add(1, 'month')),
            },
            AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ARBEIDSAVKLARINGSPENGER,
        ),
    },
};

export const mockAndreLivsoppholdsytelserBesvartAKT: AndreLivsoppholdsytelserOppgave = {
    ...mockAndreLivsoppholdsytelserAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
