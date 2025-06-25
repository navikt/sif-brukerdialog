/* eslint-disable @typescript-eslint/no-use-before-define */
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import InntektTabell, { InntektTabellRad } from '../../../components/inntekt-tabell/InntektTabell';
import { KorrigertInntektOppgave } from '@navikt/ung-common';
import { ArbeidOgFrilansRegisterInntektDto, YtelseRegisterInntektDto } from '@navikt/ung-deltakelse-opplyser-api';

interface Props {
    oppgave: KorrigertInntektOppgave;
}

const KorrigertInntektOppgavetekst = ({ oppgave }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.frist)}</span>;
    const {
        registerinntekt: { ytelseInntekter, arbeidOgFrilansInntekter },
    } = oppgave.oppgavetypeData;
    return (
        <VStack gap="6" width="100%">
            <BodyLong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae possimus quasi quia pariatur
                doloremque quibusdam vel, odit odio dolores corrupti suscipit voluptates modi, quod molestias iusto
                repellat alias sit? Ab.
            </BodyLong>

            <VStack gap="1">
                {arbeidOgFrilansInntekter.length > 0 ? (
                    <InntektTabell
                        inntekt={mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter)}
                        header="Arbeidsgiver/frilans"
                    />
                ) : (
                    <>Ingen ytelser i perioden</>
                )}
            </VStack>

            {ytelseInntekter.length > 0 ? (
                <VStack gap="4">
                    <Heading level="3" size="xsmall">
                        Ytelser
                    </Heading>
                    <InntektTabell inntekt={mapYtelseInntektToInntektTabellRad(ytelseInntekter)} header="Ytelse" />
                </VStack>
            ) : null}
            <BodyLong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. veniam, nam repudiandae similique quasi unde
                dolorem sit repellendus!
            </BodyLong>
            <BodyLong weight="semibold" spacing>
                Fristen for å svare er {formatertFrist}.
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
