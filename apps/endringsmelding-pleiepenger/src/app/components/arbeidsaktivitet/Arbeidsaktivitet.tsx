import { Accordion, Heading, Ingress, Tag } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import {
    dateFormatter,
    dateRangeToISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils/lib';
import React, { useState } from 'react';
import { SkrivTilOssLink } from '../../lenker';
import { cleanupArbeidAktivitetEndringer } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { ArbeidstidEndringMap } from '../../types/ArbeidstidEndring';
import { ArbeidAktivitet, Arbeidsuke } from '../../types/Sak';
import { getEndringsdato, getMaksEndringsperiode } from '../../utils/endringsperiode';
import ArbeidstidUkeTabell, { ArbeidstidUkeTabellItem } from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';
import EndreArbeidstidModal from '../endre-arbeidstid-modal/EndreArbeidstidModal';
import ArbeidAktivitetHeader from './ArbeidAktivitetHeader';
import { arbeidsaktivitetUtils } from './arbeidsaktivitetUtils';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidEndringMap | undefined;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
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
                    {perioder.length > 1 ? 'Perioder med pleiepenger' : 'Uker med pleiepenger'}
                </Heading>
                {renderInfoOmEndringUtenforEndringsperiode(arbeidAktivitet)}
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
                                            {dateFormatter.full(periode.periode.from)} -{' '}
                                            {dateFormatter.full(periode.periode.to)}
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
                onEndreArbeidstid={({ perioder, endring }) => {
                    setArbeidsukerForEndring(undefined);
                    const nyeEndringer: ArbeidstidEndringMap = {};
                    perioder.forEach((periode) => {
                        nyeEndringer[dateRangeToISODateRange(periode)] = endring;
                    });
                    onArbeidstidAktivitetChange(
                        cleanupArbeidAktivitetEndringer(
                            {
                                ...endringer,
                                ...nyeEndringer,
                            },
                            arbeidAktivitet
                        )
                    );
                    setResetUkerTabellCounter(resetUkerTabellCounter + 1);
                }}
            />
        </div>
    );
};

const renderInfoOmEndringUtenforEndringsperiode = ({
    harPerioderEtterEndringsperiode,
    harPerioderFørEndringsperiode,
}: ArbeidAktivitet) => {
    const endringsperiode = getMaksEndringsperiode(getEndringsdato());
    const førDato = dateFormatter.full(endringsperiode.from);
    const etterDato = dateFormatter.full(endringsperiode.to);
    if (harPerioderFørEndringsperiode && !harPerioderEtterEndringsperiode) {
        return (
            <Block padBottom="l">
                <p>
                    Dersom du ønsker å endre arbeidstid for uker som er før {førDato}, må du sende oss en melding via{' '}
                    <SkrivTilOssLink />.
                </p>
            </Block>
        );
    } else if (!harPerioderFørEndringsperiode && harPerioderEtterEndringsperiode) {
        return (
            <Block padBottom="l">
                <p>
                    Dersom du ønsker å endre arbeidstid for uker som er etter {etterDato}, må du sende oss en melding
                    via <SkrivTilOssLink />.
                </p>
            </Block>
        );
    } else if (harPerioderFørEndringsperiode && harPerioderEtterEndringsperiode) {
        return (
            <Block padBottom="l">
                <p>
                    Dersom du ønsker å endre arbeidstid for uker som er før {førDato} eller etter {etterDato}, må du
                    sende oss en melding via <SkrivTilOssLink />.
                </p>
            </Block>
        );
    }
    return null;
};

export default Arbeidsaktivitet;
