import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { ArbeidstidAktivitetEndring, ArbeidstidAktivitetEndringMap } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import ArbeidstidUkeListe, { ArbeidstidUkeListeItem } from '../arbeidstid-uke-liste/ArbeidstidUkeListe';
import EndreArbeidstidModal from '../endre-arbeidstid-modal/EndreArbeidstidModal';
import ArbeidAktivitetHeader from './ArbeidAktivitetHeader';
import { arbeidsaktivitetUtils } from './arbeidsaktivitetUtils';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetEndringMap | undefined;
    onArbeidstidAktivitetChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetEndring) => void;
}

const Arbeidsaktivitet = ({ arbeidAktivitet, endringer, onArbeidstidAktivitetChange }: Props) => {
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

            {arbeidsukeForEndring && (
                <EndreArbeidstidModal
                    arbeidAktivitet={arbeidAktivitet}
                    isVisible={arbeidsukeForEndring !== undefined}
                    arbeidsuker={[arbeidsukeForEndring]}
                    onClose={() => setArbeidsukeForEndring(undefined)}
                    onSubmit={(endring) => {
                        onArbeidstidAktivitetChange(endring);
                        setArbeidsukeForEndring(undefined);
                    }}
                />
            )}
            <EndreArbeidstidModal
                arbeidAktivitet={arbeidAktivitet}
                isVisible={arbeidsukerForEndring !== undefined}
                arbeidsuker={arbeidsukerForEndring || []}
                onClose={() => setArbeidsukerForEndring(undefined)}
                onSubmit={(endring) => {
                    onArbeidstidAktivitetChange(endring);
                    setArbeidsukerForEndring(undefined);
                }}
            />
        </>
    );
};

export default Arbeidsaktivitet;
