import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import {
    ArbeidOgFrilansRegisterInntektDto,
    YtelseRegisterInntektDto,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

import { KorrigertInntektOppgave } from '../../../../../types/Oppgave';
import InntektTabell, { InntektTabellRad } from '../../../components/inntekt-tabell/InntektTabell';

interface Props {
    oppgave: KorrigertInntektOppgave;
}

const KorrigertInntektOppgavetekst = ({ oppgave }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.frist)}</span>;
    const utbetalingsmåned = dayjs(oppgave.oppgavetypeData.fraOgMed).add(1, 'month').toDate();
    const antallArbeidsgivere = oppgave.oppgavetypeData.registerinntekt.arbeidOgFrilansInntekter.length;

    const {
        registerinntekt: { ytelseInntekter, arbeidOgFrilansInntekter },
    } = oppgave.oppgavetypeData;
    return (
        <VStack gap="6" width="100%">
            <BodyLong>
                Vi har sjekket hva lønnen din var i {dateFormatter.month(oppgave.oppgavetypeData.fraOgMed)}:
            </BodyLong>

            <InntektTabell
                inntekt={mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter)}
                header="Arbeidsgiver/frilans"
                lønnHeader="Lønn (før skatt)"
                summert={oppgave.oppgavetypeData.registerinntekt.totalInntektArbeidOgFrilans}
            />

            {ytelseInntekter.length > 0 && (
                <InntektTabell
                    inntekt={mapYtelseInntektToInntektTabellRad(ytelseInntekter)}
                    header="Ytelse"
                    lønnHeader="Sum"
                    summert={oppgave.oppgavetypeData.registerinntekt.totalInntektYtelse}
                />
            )}

            <div>
                <BodyLong spacing>
                    Vi bruker lønnen fra arbeidsgiver/frilans når vi vurderer hvor mye penger du får utbetalt i{' '}
                    {dateFormatter.monthFullYear(utbetalingsmåned)}.
                </BodyLong>
                <BodyLong spacing>
                    Hvis du mener at lønnen fra {antallArbeidsgivere === 1 ? 'arbeidsgiveren' : 'arbeidsgiverne'} din
                    ikke stemmer, kan du sende oss en tilbakemeding om det. Skriv et svar til oss i feltet under.
                </BodyLong>
                <BodyLong spacing>
                    Ingen tilbakemelding? Kryss av på “Nei” med én gang og send inn svaret ditt. Jo fortere du svarer,
                    jo fortere får vi behandlet saken din.
                </BodyLong>
                <BodyLong weight="semibold" spacing>
                    Fristen for å svare er {formatertFrist}.
                </BodyLong>
                <BodyLong spacing>
                    Hvis vi ikke hører fra deg innen svarfristen har gått ut, bruker vi lønnen som{' '}
                    {antallArbeidsgivere === 1 ? 'arbeidsgiveren' : 'arbeidsgiverne'} har oppgitt, når vi går videre med
                    søknaden din.
                </BodyLong>
            </div>
        </VStack>
    );
};

const mapArbeidOgFrilansInntektToInntektTabellRad = (
    inntekt: ArbeidOgFrilansRegisterInntektDto[],
): InntektTabellRad[] => {
    if (inntekt.length === 0) {
        return [
            {
                beløp: 0,
                navn: 'Ingen arbeidsgiver eller frilans',
            },
        ];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: i.arbeidsgiverNavn || i.arbeidsgiver,
    }));
};

const mapYtelseInntektToInntektTabellRad = (inntekt: YtelseRegisterInntektDto[]): InntektTabellRad[] => {
    if (inntekt.length === 0) {
        return [
            {
                beløp: 0,
                navn: 'Ytelser',
            },
        ];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: i.ytelsetype,
    }));
};

export default KorrigertInntektOppgavetekst;
