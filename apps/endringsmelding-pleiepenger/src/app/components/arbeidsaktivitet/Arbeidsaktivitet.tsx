import { Heading, Tag } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import {
    dateFormatter,
    dateRangeToISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils/lib';
import { cleanupArbeidAktivitetEndringer } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { ArbeidstidEndringMap } from '../../types/ArbeidstidEndring';
import { ArbeidAktivitet, Arbeidsuke } from '../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import { getEndringsdato, getTillattEndringsperiode } from '../../utils/endringsperiode';
import ArbeidstidUkeTabell, { ArbeidstidUkeTabellItem } from '../arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import EndreArbeidstidForm from '../endre-arbeidstid-form/EndreArbeidstidForm';
import EndreArbeidstidModal from '../endre-arbeidstid-modal/EndreArbeidstidModal';
import PerioderAccordion from '../perioder-accordion/PerioderAccordion';
import { arbeidsaktivitetUtils, getEndringerForArbeidsukeForm } from './arbeidsaktivitetUtils';
import ArbeidAktivitetHeader from './components/ArbeidAktivitetHeader';
import ArbeidAktivitetUtenforPeriodeInfo from './components/ArbeidAktivitetUtenforPeriodeInfo';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    endringer: ArbeidstidEndringMap | undefined;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const Arbeidsaktivitet = ({ arbeidAktivitet, endringer, lovbestemtFerie, onArbeidstidAktivitetChange }: Props) => {
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
    const [resetUkerTabellCounter, setResetUkerTabellCounter] = useState(0);

    const perioder = arbeidAktivitet.perioderMedArbeidstid;

    return (
        <div data-testid={`aktivitet_${arbeidAktivitet.id}`}>
            <ArbeidAktivitetHeader arbeidAktivitet={arbeidAktivitet} />
            <Block margin="xl">
                <Heading level="3" size="small" spacing={true}>
                    {perioder.length > 1 ? 'Dine perioder med pleiepenger' : 'Uker med pleiepenger'}
                </Heading>
                <ArbeidAktivitetUtenforPeriodeInfo
                    arbeidAktivitet={arbeidAktivitet}
                    tillattEndringsperiode={getTillattEndringsperiode(getEndringsdato())}
                />
            </Block>

            {perioder.length === 1 && (
                <>
                    <ArbeidstidUkeTabell
                        listItems={arbeidsaktivitetUtils.getArbeidstidUkeTabellItemFromArbeidsuker(
                            perioder[0].arbeidsuker,
                            endringer,
                            lovbestemtFerie
                        )}
                        triggerResetValg={resetUkerTabellCounter}
                        onEndreUker={(uker: ArbeidstidUkeTabellItem[]) => {
                            setArbeidsukerForEndring(uker.map((uke) => perioder[0].arbeidsuker[uke.isoDateRange]));
                        }}
                    />
                </>
            )}

            {perioder.length !== 1 && (
                <div style={{ borderTop: '2px solid var(--ac-accordion-header-border, var(--a-border-strong)' }}>
                    <PerioderAccordion
                        defaultOpen="current"
                        perioder={perioder}
                        renderContent={(periode) => {
                            const listItems = arbeidsaktivitetUtils.getArbeidstidUkeTabellItemFromArbeidsuker(
                                periode.arbeidsuker,
                                endringer,
                                lovbestemtFerie
                            );
                            return (
                                <ArbeidstidUkeTabell
                                    listItems={listItems}
                                    triggerResetValg={resetUkerTabellCounter}
                                    onEndreUker={(uker: ArbeidstidUkeTabellItem[]) => {
                                        setArbeidsukerForEndring(
                                            uker.map((uke) => periode.arbeidsuker[uke.isoDateRange])
                                        );
                                    }}
                                />
                            );
                        }}
                        renderHeader={(periode) => {
                            const harEndringer =
                                endringer !== undefined &&
                                Object.keys(endringer)
                                    .map(ISODateRangeToDateRange)
                                    .some((dr) => isDateInDateRange(dr.from, periode));
                            return (
                                <>
                                    {dateFormatter.full(periode.from)} - {dateFormatter.full(periode.to)}
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
                                </>
                            );
                        }}
                    />
                </div>
            )}

            <EndreArbeidstidModal
                title={getArbeidAktivitetNavn(arbeidAktivitet)}
                isVisible={arbeidsukerForEndring !== undefined}
                onClose={() => setArbeidsukerForEndring(undefined)}>
                <EndreArbeidstidForm
                    arbeidsuker={arbeidsukerForEndring || []}
                    lovbestemtFerie={lovbestemtFerie}
                    endring={
                        arbeidsukerForEndring && endringer
                            ? getEndringerForArbeidsukeForm(arbeidsukerForEndring, endringer)
                            : undefined
                    }
                    onCancel={() => setArbeidsukerForEndring(undefined)}
                    onSubmit={({ perioder, endring }) => {
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
            </EndreArbeidstidModal>
        </div>
    );
};

export default Arbeidsaktivitet;
