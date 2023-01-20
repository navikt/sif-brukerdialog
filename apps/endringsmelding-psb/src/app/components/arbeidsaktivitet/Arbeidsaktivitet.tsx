import React, { useState } from 'react';
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
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
    const [clearValgteUkerCounter, setClearValgteUkerCounter] = useState(0);
    const arbeidsukerMap = arbeidAktivitet.arbeidsuker;
    const ukerSøktFor = arbeidsaktivitetUtils.getArbeidstidUkeListItemFromArbeidsuker(arbeidsukerMap, endringer);
    const periodeIkkeSøktFor = arbeidsaktivitetUtils.finnPeriodeIkkeSøktFor(ukerSøktFor);

    const arbeidstidUkeListItems = arbeidsaktivitetUtils.sorterListeItems([...ukerSøktFor, ...periodeIkkeSøktFor]);

    return (
        <>
            <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} />

            <ArbeidstidUkeListe
                listItems={arbeidstidUkeListItems}
                triggerClearValgteUker={clearValgteUkerCounter}
                onEndreUker={(uker: ArbeidstidUkeListeItem[]) => {
                    setArbeidsukerForEndring(uker.map((uke) => arbeidAktivitet.arbeidsuker[uke.isoDateRange]));
                }}
            />

            <EndreArbeidstidModal
                arbeidAktivitet={arbeidAktivitet}
                isVisible={arbeidsukerForEndring !== undefined}
                arbeidsuker={arbeidsukerForEndring || []}
                onClose={() => setArbeidsukerForEndring(undefined)}
                onSubmit={(data) => {
                    setArbeidsukerForEndring(undefined);
                    onArbeidstidAktivitetChange({ arbeidAktivitetId: arbeidAktivitet.id, ...data });
                    setClearValgteUkerCounter(clearValgteUkerCounter + 1);
                }}
            />
        </>
    );
};

export default Arbeidsaktivitet;
