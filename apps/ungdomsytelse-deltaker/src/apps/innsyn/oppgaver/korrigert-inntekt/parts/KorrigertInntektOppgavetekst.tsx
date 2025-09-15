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

    const {
        registerinntekt: { ytelseInntekter, arbeidOgFrilansInntekter },
    } = oppgave.oppgavetypeData;
    return (
        <VStack gap="6" width="100%">
            <BodyLong>
                Vi har sjekket hva du fikk utbetalt som lønn i {dateFormatter.month(oppgave.oppgavetypeData.fraOgMed)}:
            </BodyLong>

            <InntektTabell
                inntekt={mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter)}
                header="Arbeidsgiver/frilans"
            />
            <InntektTabell inntekt={mapYtelseInntektToInntektTabellRad(ytelseInntekter)} header="Ytelse" />

            <BodyLong as="div">
                <p>
                    Vi bruker lønnen fra arbeidsgiver/frilans når vi vurderer hvor mye penger du får utbetalt i{' '}
                    {dateFormatter.monthFullYear(utbetalingsmåned)}.
                </p>
                <p>
                    Hvis du mener at lønnen fra arbeidsgiveren din ikke stemmer, kan du sende oss en tilbakemeding om
                    det. Skriv et svar til oss i feltet under.{' '}
                </p>
                <p>
                    Ingen tilbakemelding? Kryss av på “Nei” med én gang og send inn svaret ditt. Jo fortere du svarer,
                    jo fortere får vi behandlet saken din.
                </p>
                <p>
                    Hvis vi ikke hører fra deg innen svarfristen har gått ut, bruker vi lønnen som arbeidsgiver har
                    oppgitt, når vi går videre med søknaden din.
                </p>
                <BodyLong weight="semibold" spacing>
                    Fristen for å svare er {formatertFrist}.
                </BodyLong>
            </BodyLong>
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
