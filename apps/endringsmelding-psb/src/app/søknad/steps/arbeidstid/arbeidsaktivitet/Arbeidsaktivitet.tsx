import { BodyLong, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import {
    dateFormatter,
    DateRange,
    dateRangeToISODateRange,
    getNumberOfDaysInDateRange,
} from '@navikt/sif-common-utils/lib';
import ArbeidstidUkeListe, {
    ArbeidstidUkeListeItem,
    PeriodeIkkeSøktForListeItem,
    PeriodeSøktForListeItem,
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
import dayjs from 'dayjs';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetUkeEndringMap | undefined;
    onArbeidsukeChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetUkeEndring) => void;
}

const sorterUke = (u1: PeriodeSøktForListeItem, u2: PeriodeSøktForListeItem): number => {
    return dayjs(u1.periode.from).isBefore(u2.periode.from) ? -1 : 1;
};

const finnPeriodeIkkeSøktFor = (uker: PeriodeSøktForListeItem[]): PeriodeIkkeSøktForListeItem[] => {
    const perioderIkkeSøktFor: PeriodeIkkeSøktForListeItem[] = [];
    uker.sort(sorterUke).forEach((uke, index) => {
        if (index === 0) {
            return;
        }
        const forrigeUke = uker[index - 1];
        const periode: DateRange = {
            from: dayjs(forrigeUke.periode.to).add(1, 'day').toDate(),
            to: dayjs(uke.periode.from).subtract(1, 'day').toDate(),
        };
        const uttaksdagerIPeriode = getNumberOfDaysInDateRange(periode, true);
        if (uttaksdagerIPeriode > 0) {
            perioderIkkeSøktFor.push({ isoDateRange: dateRangeToISODateRange(periode), periode, søktFor: false });
        }
    });

    return perioderIkkeSøktFor;
};

const Arbeidsaktivitet: React.FunctionComponent<Props> = ({ arbeidAktivitet, endringer, onArbeidsukeChange }) => {
    const [arbeidsukeForEndring, setArbeidsukeForEndring] = useState<Arbeidsuke | undefined>();
    const navn = getArbeidAktivitetNavn(arbeidAktivitet);

    const arbeidsukerMap = arbeidAktivitet.arbeidsuker;
    const ukerSøktFor = getArbeidstidUkeListItemFromArbeidsuker(arbeidsukerMap, endringer);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const periodeIkkeSøktFor = finnPeriodeIkkeSøktFor(ukerSøktFor);

    const uker = [...ukerSøktFor, ...periodeIkkeSøktFor].sort(sorterUke);

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
): PeriodeSøktForListeItem => {
    return {
        ...arbeidsuke,
        søktFor: true,
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
): PeriodeSøktForListeItem[] => {
    const items: PeriodeSøktForListeItem[] = [];

    Object.keys(arbeidsuker).map((key) => {
        const arbeidsuke = arbeidsuker[key];
        const endring = endringer[key];
        items.push(arbeidsukeToArbeidstidUkeListItem(arbeidsuke, endring?.endring));
    });
    return items;
};
