import { Accordion, Heading, Ingress, Tag } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import {
    dateFormatter,
    dateRangeToISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils/lib';
import React, { useState } from 'react';
import { ArbeidstidAktivitetEndring, ArbeidstidAktivitetEndringMap } from '../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet, Arbeidsuke } from '../../types/Sak';
import ArbeidstidUkeTabell, { ArbeidstidUkeTabellItem } from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';
import EndreArbeidstidModal from '../endre-arbeidstid-modal/EndreArbeidstidModal';
import ArbeidAktivitetHeader from './ArbeidAktivitetHeader';
import { arbeidsaktivitetUtils } from './arbeidsaktivitetUtils';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidAktivitetEndringMap | undefined;
    onArbeidstidAktivitetChange: (arbeidstidPeriodeEndring: ArbeidstidAktivitetEndring[]) => void;
}

const Arbeidsaktivitet = ({ arbeidAktivitet, endringer, onArbeidstidAktivitetChange }: Props) => {
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
    const [resetUkerTabellCounter, setResetUkerTabellCounter] = useState(0);

    const perioder = arbeidAktivitet.perioderMedArbeidstid;

    return (
        <div data-testid={`aktivitet_${arbeidAktivitet.id}`}>
            <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} />
            <Block margin="xl">
                <Heading level="3" size="small" spacing={true}>
                    Perioder med pleiepenger
                </Heading>
            </Block>

            {perioder.length === 1 && (
                <ArbeidstidUkeTabell
                    listItems={arbeidsaktivitetUtils.getArbeidstidUkeTabellItemFromArbeidsuker(
                        perioder[0].arbeidsuker,
                        endringer
                    )}
                    triggerResetValg={resetUkerTabellCounter}
                    onEndreUker={(uker: ArbeidstidUkeTabellItem[]) => {
                        setArbeidsukerForEndring(uker.map((uke) => perioder[0].arbeidsuker[uke.isoDateRange]));
                    }}
                />
            )}

            {perioder.length !== 1 && (
                <div style={{ borderTop: '2px solid var(--ac-accordion-header-border, var(--a-border-strong)' }}>
                    <Accordion style={{ width: '100%' }}>
                        {perioder.map((periode, index) => {
                            const listItems = arbeidsaktivitetUtils.getArbeidstidUkeTabellItemFromArbeidsuker(
                                periode.arbeidsuker,
                                endringer
                            );
                            const harEndringer =
                                endringer !== undefined &&
                                Object.keys(endringer)
                                    .map(ISODateRangeToDateRange)
                                    .some((dr) => isDateInDateRange(dr.from, periode.periode));
                            return (
                                <Accordion.Item
                                    key={dateRangeToISODateRange(periode.periode)}
                                    data-testid={`periode_${index}`}>
                                    <Accordion.Header data-testid={`periode_${index}_header`}>
                                        <Ingress as="span" className="periodeHeader">
                                            <span style={{ textTransform: 'capitalize' }}>
                                                {dateFormatter.dayCompactDate(periode.periode.from)}
                                            </span>{' '}
                                            - {dateFormatter.dayCompactDate(periode.periode.to)}
                                            {harEndringer && (
                                                <span
                                                    style={{
                                                        paddingLeft: '1rem',
                                                        position: 'relative',
                                                        top: '-.1rem',
                                                    }}>
                                                    <Tag variant="info" size="small">
                                                        Endret
                                                    </Tag>
                                                </span>
                                            )}
                                        </Ingress>
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <ArbeidstidUkeTabell
                                            listItems={listItems}
                                            triggerResetValg={resetUkerTabellCounter}
                                            onEndreUker={(uker: ArbeidstidUkeTabellItem[]) => {
                                                setArbeidsukerForEndring(
                                                    uker.map((uke) => periode.arbeidsuker[uke.isoDateRange])
                                                );
                                            }}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                </div>
            )}

            <EndreArbeidstidModal
                arbeidAktivitet={arbeidAktivitet}
                isVisible={arbeidsukerForEndring !== undefined}
                arbeidsuker={arbeidsukerForEndring || []}
                onClose={() => setArbeidsukerForEndring(undefined)}
                onSubmit={(data) => {
                    setArbeidsukerForEndring(undefined);
                    onArbeidstidAktivitetChange(
                        data.map((endring) => ({ arbeidAktivitetId: arbeidAktivitet.id, ...endring }))
                    );
                    setResetUkerTabellCounter(resetUkerTabellCounter + 1);
                }}
            />
        </div>
    );
};

export default Arbeidsaktivitet;
