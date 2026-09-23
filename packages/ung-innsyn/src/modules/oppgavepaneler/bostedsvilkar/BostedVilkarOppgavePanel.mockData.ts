import {
    BostedsavklaringKildeType,
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateFormatter, dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

/**
 * Backend sender én oppgavetype for bosted, men med to varianter av varseltekst:
 * avslag i en periode og opphør fra en dato. Datoene er allerede innbakt i teksten fra backend,
 * så for frontend er variantene kun ulik tekst.
 */
export const BOSTED_VARIANT_SCENARIO_OPTIONS = ['Periode', 'Opphør'] as const;
export type BostedVarselVariant = (typeof BOSTED_VARIANT_SCENARIO_OPTIONS)[number];

/** Tekster som kommer fra backend */
const bostedVilkårPeriodeOppgaveTekster = {
    IKKE_BOSATTADRESSE_I_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune, og at du heller ikke er folkeregistrert der. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke har studie- eller arbeidssted i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
    ANNET: 'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
    UDEFINERT:
        'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
} satisfies Record<BostedsvilkårIkkeOppfyltÅrsak, string>;

/** Tekster som kommer fra backend */
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
export const BOSTED_ÅRSAK_SCENARIO_OPTIONS = Object.keys(
    bostedVilkårPeriodeOppgaveTekster,
) as BostedsvilkårIkkeOppfyltÅrsak[];

/** Alle kildeverdier skal alltid være med i scenario-listen. */
export const BOSTED_KILDE_SCENARIO_OPTIONS = Object.values(BostedsavklaringKildeType);

/** Datoene er ikke en del av oppgavedataene, men brukes til å bygge varselteksten. */
const mockPeriode: { from: ISODate; to: ISODate } = {
    from: dateToISODate(dayjs().subtract(1, 'month')),
    to: dateToISODate(dayjs().add(1, 'month')),
};

const getVarselTekst = (årsak: BostedsvilkårIkkeOppfyltÅrsak, variant: BostedVarselVariant): string => {
    const formatertFom = dateFormatter.compact(mockPeriode.from);
    if (variant === 'Opphør') {
        return bostedVilkårOpphørOppgaveTekster[årsak].replace('{fom}', formatertFom);
    }
    const periodeTekst = `${formatertFom} - ${dateFormatter.compact(mockPeriode.to)}`;
    return bostedVilkårPeriodeOppgaveTekster[årsak].replace('{periode}', periodeTekst);
};

export const lagOppgaveMedÅrsak = (
    base: BostedVilkårOppgave,
    årsak: BostedsvilkårIkkeOppfyltÅrsak,
    kilde: BostedsavklaringKildeType,
    variant: BostedVarselVariant = 'Periode',
): BostedVilkårOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        kilde,
        varseltekst: getVarselTekst(årsak, variant),
        kildeFritekst:
            kilde === BostedsavklaringKildeType.ANNET
                ? 'Vi har fått informasjon fra din XXX som sier at du nå har flyttet tilbake til YYY.\n\nInformasjonen kom via et brev vi mottok.'
                : undefined,
        ikkeOppfyltÅrsakFritekstbeskrivelse:
            årsak === BostedsvilkårIkkeOppfyltÅrsak.ANNET
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                : undefined,
    },
});

// ─── Mocks ───────────────────────────────────────────────────────────────────

export const mockBostedVilkårAKT: BostedVilkårOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        ikkeOppfyltÅrsakFritekstbeskrivelse: undefined,
        kilde: BostedsavklaringKildeType.FOLKEREGISTER,
        varseltekst: getVarselTekst(BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM, 'Periode'),
    },
};

export const mockBostedVilkårBesvartAKT: BostedVilkårOppgave = {
    ...mockBostedVilkårAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
