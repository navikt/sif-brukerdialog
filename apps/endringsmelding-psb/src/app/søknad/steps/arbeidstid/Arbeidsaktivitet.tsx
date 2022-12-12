import { Accordion, Heading } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateToday } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import ArbeidstidUkeListe from '../../../components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../types/Sak';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
}

const Arbeidsaktivitet: React.FunctionComponent<Props> = ({ arbeidAktivitet }) => {
    const getHeading = (): string => {
        switch (arbeidAktivitet.type) {
            case ArbeidAktivitetType.arbeidstaker:
                return arbeidAktivitet.arbeidsgiver.navn;
            case ArbeidAktivitetType.frilanser:
                return 'Frilanser';
            case ArbeidAktivitetType.selvstendigNæringsdrivende:
                return 'Selvstendig næringsdrivende';
        }
    };

    const arbeidsstedNavn = getHeading();

    const arbeidsuker = Object.keys(arbeidAktivitet.perioder.arbeidsuker).map(
        (key) => arbeidAktivitet.perioder.arbeidsuker[key]
    );
    const startInneværendeUke = dayjs(dateToday).startOf('isoWeek').toDate();
    const ukerSomHarVært = arbeidsuker.filter((d) => dayjs(d.periode.to).isBefore(startInneværendeUke, 'day'));
    const ukerSomKommer = arbeidsuker.filter((d) => dayjs(d.periode.from).isSameOrAfter(startInneværendeUke, 'day'));

    return (
        <>
            <Heading level="3" size="medium" spacing={true}>
                {arbeidsstedNavn}
            </Heading>
            <FormBlock>
                {ukerSomHarVært.length > 0 && (
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Uker som har vært</Accordion.Header>
                            <Accordion.Content>
                                <ArbeidstidUkeListe arbeidsuker={ukerSomHarVært} />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                )}
                {ukerSomKommer.length > 0 && (
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Denne og kommende uker</Accordion.Header>
                            <Accordion.Content>
                                <ArbeidstidUkeListe arbeidsuker={ukerSomKommer} />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                )}
            </FormBlock>
        </>
    );
};

export default Arbeidsaktivitet;
