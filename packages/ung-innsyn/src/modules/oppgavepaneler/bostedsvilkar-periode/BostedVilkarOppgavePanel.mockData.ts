import {
    BostedsavklaringKildeType,
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { BostedVilkårPeriodeOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateFormatter, dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

export const BOSTED_ÅRSAK_SCENARIO_OPTIONS: BostedsvilkårIkkeOppfyltÅrsak[] = [
    BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM,
    BostedsvilkårIkkeOppfyltÅrsak.ANNET,
];

export const BOSTED_KILDE_SCENARIO_OPTIONS: BostedsavklaringKildeType[] = [
    BostedsavklaringKildeType.FOLKEREGISTER,
    BostedsavklaringKildeType.BRUKER,
    BostedsavklaringKildeType.ANNET,
];

const bostedVilkårPeriodeOppgaveTekster = {
    IKKE_BOSATTADRESSE_I_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune, og at du heller ikke er folkeregistrert der. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke har studie- eller arbeidssted i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
    ANNET: 'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
};

const getVarselTekst = (periode: { from: ISODate; to: ISODate }, årsak: BostedsvilkårIkkeOppfyltÅrsak): string => {
    const formatertFom = dateFormatter.compact(periode.from);
    const formatertTom = dateFormatter.compact(periode.to);
    const periodeTekst = `${formatertFom} - ${formatertTom}`;
    const tekst = bostedVilkårPeriodeOppgaveTekster[årsak];
    return tekst.replace('{periode}', periodeTekst);
};

export const lagOppgaveMedÅrsak = (
    base: BostedVilkårPeriodeOppgave,
    årsak: BostedsvilkårIkkeOppfyltÅrsak,
    kilde: BostedsavklaringKildeType,
): BostedVilkårPeriodeOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        ikkeOppfyltÅrsak: årsak,
        kilde,
        varseltekst: getVarselTekst(base.oppgavetypeData.periode, årsak),
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

export const mockBostedVilkårAKT: BostedVilkårPeriodeOppgave = {
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
        erBosattITrondheim: false,
        kilde: BostedsavklaringKildeType.FOLKEREGISTER,
        periode: {
            from: dateToISODate(dayjs().subtract(1, 'month')),
            to: dateToISODate(dayjs().add(1, 'month')),
        },
        varseltekst: getVarselTekst(
            {
                from: dateToISODate(dayjs().subtract(1, 'month')),
                to: dateToISODate(dayjs().add(1, 'month')),
            },
            BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        ),
    },
};

export const mockBostedVilkårBesvartAKT: BostedVilkårPeriodeOppgave = {
    ...mockBostedVilkårAKT,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
