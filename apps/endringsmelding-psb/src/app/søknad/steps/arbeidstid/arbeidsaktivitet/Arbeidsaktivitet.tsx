import { BodyLong, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import ArbeidstidUkeListe, {
    ArbeidstidUkeListeItem,
} from '../../../../components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import { ArbeidsgiverType } from '../../../../types/Arbeidsgiver';
import {
    ArbeidstidAktivitetUkeEndring,
    ArbeidstidAktivitetUkeEndringMap,
    ArbeidstidEndring,
} from '../../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke, ArbeidsukeMap } from '../../../../types/K9Sak';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../../types/Sak';
import { TimerEllerProsent } from '../../../../types/TimerEllerProsent';
import { getArbeidAktivitetNavn } from '../../../../utils/arbeidAktivitetUtils';
import { beregnEndretArbeidstid } from '../../../../utils/beregnUtils';
import ArbeidstidEnkeltukeModal from '../../../../components/arbeidstid-enkeltuke-modal/ArbeidstidEnkeltukeModal';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetUkeEndringMap | undefined;
    onArbeidsukeChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetUkeEndring) => void;
}

const Arbeidsaktivitet: React.FunctionComponent<Props> = ({ arbeidAktivitet, endringer, onArbeidsukeChange }) => {
    const [arbeidsukeForEndring, setArbeidsukeForEndring] = useState<Arbeidsuke | undefined>();
    const navn = getArbeidAktivitetNavn(arbeidAktivitet);

    const arbeidsukerMap = arbeidAktivitet.arbeidsuker;
    const uker = getArbeidstidUkeListItemFromArbeidsuker(arbeidsukerMap, endringer);

    const onVelgUke = (uke: ArbeidstidUkeListeItem) => {
        setArbeidsukeForEndring(arbeidsukerMap[uke.isoDateRange]);
    };

    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                {navn}
            </Heading>
            <ArbeidAktivitetInfo arbeidAktivitet={arbeidAktivitet} />

            <Block padBottom="l">
                <ArbeidstidUkeListe arbeidsuker={uker} visNormaltid={false} onVelgUke={onVelgUke} />
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

const arbeidsukeToArbeidstidUkeListItem = (
    arbeidsuke: Arbeidsuke,
    endring?: ArbeidstidEndring
): ArbeidstidUkeListeItem => {
    return {
        ...arbeidsuke,
        antallDager: Object.keys(arbeidsuke.dagerMap).length,
        opprinnelig: {
            faktisk: arbeidsuke.faktisk,
            normalt: arbeidsuke.normalt,
        },
        endret: endring
            ? {
                  faktisk: beregnEndretArbeidstid(endring, arbeidsuke.normalt),
                  endretProsent: endring.type === TimerEllerProsent.PROSENT ? endring.prosent : undefined,
              }
            : undefined,
    };
};

const getArbeidstidUkeListItemFromArbeidsuker = (
    arbeidsuker: ArbeidsukeMap,
    endringer: ArbeidstidAktivitetUkeEndringMap = {}
): ArbeidstidUkeListeItem[] => {
    const items: ArbeidstidUkeListeItem[] = [];

    Object.keys(arbeidsuker).map((key) => {
        const arbeidsuke = arbeidsuker[key];
        const endring = endringer[key];
        items.push(arbeidsukeToArbeidstidUkeListItem(arbeidsuke, endring?.endring));
    });
    return items;
};
