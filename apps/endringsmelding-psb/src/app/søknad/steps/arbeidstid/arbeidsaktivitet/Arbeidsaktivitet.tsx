import { BodyLong, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import ArbeidstidEnkeltukeModal from '../../../../components/arbeidstid-enkeltuke-modal/ArbeidstidEnkeltukeModal';
import { ArbeidsgiverType } from '../../../../types/Arbeidsgiver';
import {
    ArbeidstidAktivitetUkeEndring,
    ArbeidstidAktivitetUkeEndringMap,
} from '../../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../../../types/K9Sak';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../../types/Sak';
import { getArbeidAktivitetNavn } from '../../../../utils/arbeidAktivitetUtils';
import { arbeidsaktivitetUtils } from './arbeidsaktivitetUtils';
import ArbeidstidUkeListe, {
    ArbeidstidUkeListeItem,
} from '../../../../components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import ArbeidstidFlereUkerModal from '../../../../components/arbeidstid-flere-uker-modal/ArbeidstidFlereUkerModal';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetUkeEndringMap | undefined;
    onArbeidsukeChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetUkeEndring) => void;
}

const Arbeidsaktivitet = ({ arbeidAktivitet, endringer, onArbeidsukeChange }: Props) => {
    const [arbeidsukeForEndring, setArbeidsukeForEndring] = useState<Arbeidsuke | undefined>();
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
    const navn = getArbeidAktivitetNavn(arbeidAktivitet);

    const arbeidsukerMap = arbeidAktivitet.arbeidsuker;
    const ukerSøktFor = arbeidsaktivitetUtils.getArbeidstidUkeListItemFromArbeidsuker(arbeidsukerMap, endringer);
    const periodeIkkeSøktFor = arbeidsaktivitetUtils.finnPeriodeIkkeSøktFor(ukerSøktFor);
    const uker = arbeidsaktivitetUtils.sorterListeItems([...ukerSøktFor, ...periodeIkkeSøktFor]);

    const onVelgUke = (uke: ArbeidstidUkeListeItem) => {
        setArbeidsukeForEndring(arbeidsukerMap[uke.isoDateRange]);
    };

    const onVelgUker = (uker: ArbeidstidUkeListeItem[]) => {
        setArbeidsukerForEndring(uker.map((uke) => arbeidAktivitet.arbeidsuker[uke.isoDateRange]));
    };

    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                {navn}
            </Heading>

            <ArbeidAktivitetInfo arbeidAktivitet={arbeidAktivitet} />

            <Block padBottom="l">
                <ArbeidstidUkeListe
                    arbeidsuker={uker}
                    visNormaltid={false}
                    onVelgUke={onVelgUke}
                    onVelgUker={1 + 1 === 2 ? undefined : onVelgUker}
                />
            </Block>

            <ArbeidstidEnkeltukeModal
                arbeidAktivitet={arbeidAktivitet}
                isVisible={arbeidsukeForEndring !== undefined}
                arbeidsuke={arbeidsukeForEndring}
                onClose={() => setArbeidsukeForEndring(undefined)}
                onSubmit={(endring) => {
                    onArbeidsukeChange(endring);
                    setArbeidsukeForEndring(undefined);
                }}
            />
            <ArbeidstidFlereUkerModal
                arbeidAktivitet={arbeidAktivitet}
                isVisible={arbeidsukerForEndring !== undefined}
                arbeidsuker={arbeidsukerForEndring}
                onClose={() => setArbeidsukerForEndring(undefined)}
                onSubmit={() => {
                    setArbeidsukerForEndring(undefined);
                }}
            />
        </>
    );
};

export default Arbeidsaktivitet;

const ArbeidAktivitetInfo = ({ arbeidAktivitet }: { arbeidAktivitet: ArbeidAktivitet }) => {
    if (arbeidAktivitet.type !== ArbeidAktivitetType.arbeidstaker) {
        return null;
    }
    const { type, id, ansattFom, ansattTom } = arbeidAktivitet.arbeidsgiver;
    return (
        <BodyLong>
            {type === ArbeidsgiverType.ORGANISASJON ? `Organisasjonsnummer: ${id}` : 'Privatperson'}
            <br />
            {ansattFom && <>Ansatt: {dateFormatter.full(ansattFom)}.</>}
            {ansattTom && <> Sluttdato: {dateFormatter.full(ansattTom)}</>}
        </BodyLong>
    );
};
