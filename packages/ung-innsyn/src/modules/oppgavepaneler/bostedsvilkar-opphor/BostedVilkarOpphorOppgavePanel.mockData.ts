import {
    BostedsavklaringKildeType,
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateFormatter, dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

/** Tekster som nå kommer fra backend */
const bostedVilkårOpphørOppgaveTekster = {
    IKKE_BOSATTADRESSE_I_TRONDHEIM:
        'Vi har fått opplysninger om at du fra {fom} ikke lenger bor i Trondheim kommune. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM:
        'Vi har fått opplysninger om at du fra {fom} ikke lenger bor i Trondheim kommune, og at du heller ikke er folkeregistrert der. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM:
        'Vi har fått opplysninger om at du fra {fom} har studie- eller arbeidssted utenfor Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
    ANNET: 'Vi har fått opplysninger om at du fra {fom} ikke lenger bor i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
    UDEFINERT:
        'Vi har fått opplysninger om at du fra {fom} ikke lenger bor i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
} satisfies Record<BostedsvilkårIkkeOppfyltÅrsak, string>;

/**
 * Utledet fra tekstoppslaget over, som er `satisfies`-sjekket mot enumet.
 * Garanterer at scenario-listen alltid dekker alle årsaker uten manuell synkronisering.
 */
export const BOSTED_OPPHØR_ÅRSAK_SCENARIO_OPTIONS = Object.keys(
    bostedVilkårOpphørOppgaveTekster,
) as BostedsvilkårIkkeOppfyltÅrsak[];

/** Alle kildeverdier skal alltid være med i scenario-listen. */
export const BOSTED_OPPHØR_KILDE_SCENARIO_OPTIONS = Object.values(BostedsavklaringKildeType);

const getVarselTekst = (fom: ISODate, årsak: BostedsvilkårIkkeOppfyltÅrsak): string => {
    const formatertFom = dateFormatter.compact(fom);
    const tekst = bostedVilkårOpphørOppgaveTekster[årsak];
    return tekst.replace('{fom}', formatertFom);
};

export const lagOpphørOppgaveMedÅrsak = (
    base: BostedVilkårOpphørOppgave,
    årsak: BostedsvilkårIkkeOppfyltÅrsak,
    kilde: BostedsavklaringKildeType,
): BostedVilkårOpphørOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        kilde,
        varseltekst: getVarselTekst(base.oppgavetypeData.fom, årsak),
        kildeFritekst:
            kilde === BostedsavklaringKildeType.ANNET
                ? 'Vi har fått informasjon fra din XXX som sier at du nå har flyttet tilbake til YYY.\n\nInformasjonen kom via et brev vi mottok.'
                : undefined,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === BostedsvilkårIkkeOppfyltÅrsak.ANNET
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockBostedVilkårOpphørAKT: BostedVilkårOpphørOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.ANNET,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        erBosattITrondheim: false,
        kilde: BostedsavklaringKildeType.ANNET,
        kildeFritekst:
            'Vi har fått informasjon fra din XXX som sier at du nå har flyttet tilbake til YYY.\n\nInformasjonen kom via et brev vi mottok.',
        fom: dateToISODate(dayjs().subtract(1, 'month')),
        varseltekst: getVarselTekst(dateToISODate(dayjs().subtract(1, 'month')), BostedsvilkårIkkeOppfyltÅrsak.ANNET),
    },
};

export const mockBostedVilkårOpphørBesvartAKT: BostedVilkårOpphørOppgave = {
    ...mockBostedVilkårOpphørAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
