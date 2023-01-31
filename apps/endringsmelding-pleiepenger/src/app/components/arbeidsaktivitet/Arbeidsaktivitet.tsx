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
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import ArbeidstidUkeTabell, { ArbeidstidUkeTabellItem } from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';
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
    const perioder = arbeidAktivitet.perioderMedArbeidstid;

    return (
        <div data-testid={`aktivitet_${arbeidAktivitet.id}`}>
            <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} />
            <Block margin="xl">
                <Heading level="3" size="small" spacing={true}>
                    Perioder med pleiepenger:
                </Heading>
            </Block>

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
                                        triggerClearValgteUker={clearValgteUkerCounter}
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
            {/* 
            <ArbeidstidUkeTabell
                listItems={arbeidstidUkeItems}
                triggerClearValgteUker={clearValgteUkerCounter}
                onEndreUker={(uker: ArbeidstidUkeTabellItem[]) => {
                    setArbeidsukerForEndring(uker.map((uke) => arbeidAktivitet.arbeidsuker[uke.isoDateRange]));
                }}
            /> */}
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
        </div>
    );
};

export default Arbeidsaktivitet;
