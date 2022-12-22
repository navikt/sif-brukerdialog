import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import {
    ArbeidstidAktivitetUkeEndring,
    ArbeidstidAktivitetUkeEndringMap,
} from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import ArbeidstidEnkeltukeModal from '../arbeidstid-enkeltuke-modal/ArbeidstidEnkeltukeModal';
import ArbeidstidFlereUkerModal from '../arbeidstid-flere-uker-modal/ArbeidstidFlereUkerModal';
import ArbeidstidUkeListe, { ArbeidstidUkeListeItem } from '../arbeidstid-uke-liste/ArbeidstidUkeListe';
import ArbeidAktivitetHeader from './ArbeidAktivitetHeader';
import { arbeidsaktivitetUtils } from './arbeidsaktivitetUtils';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetUkeEndringMap | undefined;
    onArbeidsukeChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetUkeEndring) => void;
}

const Arbeidsaktivitet = ({ arbeidAktivitet, endringer, onArbeidsukeChange }: Props) => {
    const [arbeidsukeForEndring, setArbeidsukeForEndring] = useState<Arbeidsuke | undefined>();
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
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
            <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} />

            <Block padBottom="l">
                <ArbeidstidUkeListe arbeidsuker={uker} onVelgUke={onVelgUke} onVelgUker={onVelgUker} />
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
