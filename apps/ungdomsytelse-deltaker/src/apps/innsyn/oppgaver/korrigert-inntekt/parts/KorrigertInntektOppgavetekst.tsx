import { BodyLong, BodyShort, Link, List, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import {
    ArbeidOgFrilansRegisterInntektDto,
    YtelseRegisterInntektDto,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

import { AppIntlShape, useAppIntl } from '../../../../../i18n';
import { KorrigertInntektOppgave } from '../../../../../types/Oppgave';
import InntektTabell, { InntektTabellRad } from '../../../components/inntekt-tabell/InntektTabell';

interface Props {
    oppgave: KorrigertInntektOppgave;
}

export const getUtbetalingsmånedForKorrigertInntektOppgave = (oppgaveFraOgMed: Date): Date => {
    return dayjs(oppgaveFraOgMed).add(1, 'month').toDate();
};

const getInntektskildeHeader = (oppgave: KorrigertInntektOppgave) => {
    const harYtelser = oppgave.oppgavetypeData.registerinntekt.ytelseInntekter.length > 0;
    const harArbeidgiverInntekt = oppgave.oppgavetypeData.registerinntekt.arbeidOgFrilansInntekter.length > 0;

    if (harYtelser && harArbeidgiverInntekt) {
        return 'Arbeidsgiver/Nav-ytelse';
    } else if (harYtelser && !harArbeidgiverInntekt) {
        return 'Nav-ytelse';
    }
    return 'Arbeidsgiver';
};

const KorrigertInntektOppgavetekst = ({ oppgave }: Props) => {
    const intl = useAppIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.frist)}</span>;

    const rapporteringsmåned = dateFormatter.month(oppgave.oppgavetypeData.fraOgMed);
    const utbetalingsmåned = dateFormatter.month(
        getUtbetalingsmånedForKorrigertInntektOppgave(oppgave.oppgavetypeData.fraOgMed),
    );

    const {
        registerinntekt: { ytelseInntekter, arbeidOgFrilansInntekter },
    } = oppgave.oppgavetypeData;

    const inntekt = [
        ...mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter),
        ...mapYtelseInntektToInntektTabellRad(ytelseInntekter, intl),
    ];

    const harInntekt = inntekt.length > 0;
    const harKunYtelseInntekt = ytelseInntekter.length > 0 && arbeidOgFrilansInntekter.length === 0;
    const harFlereYtelseInntekter = ytelseInntekter.length > 1;

    return (
        <VStack gap="6" width="100%" paddingBlock="0 6">
            {harInntekt ? (
                <>
                    {harKunYtelseInntekt ? (
                        <BodyLong>Vi har fått disse opplysningene om ytelse fra Nav i {rapporteringsmåned}:</BodyLong>
                    ) : (
                        <BodyLong>Vi har fått disse opplysningene om lønnen din i {rapporteringsmåned}:</BodyLong>
                    )}

                    <InntektTabell
                        inntekt={inntekt}
                        header={getInntektskildeHeader(oppgave)}
                        lønnHeader="Lønn (før skatt)"
                        summert={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
                    />
                </>
            ) : (
                <BodyLong>
                    Du har gitt oss beskjed om at du hadde lønn i {rapporteringsmåned}, men vi har ikke fått inn
                    opplysninger fra arbeidsgiver om at du hadde lønn i {rapporteringsmåned}.
                </BodyLong>
            )}

            <div>
                {harKunYtelseInntekt ? (
                    <BodyLong spacing>
                        Før vi vurderer hvor mye penger du får utbetalt i {utbetalingsmåned}, kan du komme med en
                        tilbakemelding på summen du fikk i {harFlereYtelseInntekter ? 'ytelser' : 'ytelse'} for{' '}
                        {rapporteringsmåned}.
                    </BodyLong>
                ) : (
                    <BodyLong spacing>
                        Før vi vurderer hvor mye penger du får utbetalt i {utbetalingsmåned}, kan du komme med en
                        tilbakemelding på lønnen for {rapporteringsmåned}.
                    </BodyLong>
                )}

                <BodyLong spacing>Hvis du ikke har en tilbakemelding, krysser du av på “Nei”.</BodyLong>
                {harInntekt ? (
                    <BodyLong spacing>
                        Hvis du ser at lønnen er feil, sjekker du den med arbeidsgiveren din først. Hvis du fortsatt
                        mener at den er feil, krysser du av på “Ja” og sender en tilbakemelding til oss om det.
                    </BodyLong>
                ) : (
                    <BodyLong spacing>
                        Hvis du likevel mener at du hadde lønn i {rapporteringsmåned}, krysser du av på “Ja” og sender
                        en tilbakemelding til oss om det.
                    </BodyLong>
                )}
                <BodyLong weight="semibold" spacing>
                    Jo fortere du svarer, jo fortere får du pengene utbetalt.
                    <BodyShort as="div">Fristen for å svare er {formatertFrist}.</BodyShort>
                </BodyLong>
                <BodyLong spacing>
                    Hvis vi ikke hører fra deg innen svarfristen har gått ut, bruker vi lønnen som arbeidsgiver har
                    oppgitt.
                </BodyLong>
                <ReadMore header="Regelverk og innsyn">
                    <BodyLong>Se regelverket for ungdomsprogramytelsen:</BodyLong>
                    <VStack gap="6">
                        <List>
                            <List.Item>
                                <Link href="https://lovdata.no/dokument/NL/lov/2004-12-10-76">
                                    § 13 fjerde ledd i Arbeidsmarkedsloven (lovdata.no)
                                </Link>
                            </List.Item>
                            <List.Item>
                                <Link href="https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182">
                                    § 11 i Forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse (gjelder fra
                                    1. august 2025) (lovdata.no)
                                </Link>
                            </List.Item>
                        </List>
                        <BodyLong>
                            Du har rett til å se dokumentene i saken sin.{' '}
                            <Link href="https://www.nav.no/innsynskrav">Les mer om innsyn på nav.no</Link>.
                        </BodyLong>
                    </VStack>
                </ReadMore>
            </div>
        </VStack>
    );
};

const mapArbeidOgFrilansInntektToInntektTabellRad = (
    inntekt: ArbeidOgFrilansRegisterInntektDto[],
): InntektTabellRad[] => {
    if (inntekt.length === 0) {
        return [];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: i.arbeidsgiverNavn || i.arbeidsgiver,
    }));
};

const mapYtelseInntektToInntektTabellRad = (
    inntekt: YtelseRegisterInntektDto[],
    intl: AppIntlShape,
): InntektTabellRad[] => {
    if (inntekt.length === 0) {
        return [];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: intl.text(`ytelse.${i.ytelsetype}`),
    }));
};

export default KorrigertInntektOppgavetekst;
