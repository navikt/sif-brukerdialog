import { Heading, Tag } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Edit } from '@navikt/ds-icons';
import {
    dateFormatter,
    DateRange,
    dateRangeToISODateRange,
    dateRangeUtils,
    isDateInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils/lib';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
import { ArbeidAktivitet, Arbeidsuke, PeriodeMedArbeidstid } from '../../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { getEndringsdato, getTillattEndringsperiode } from '../../../utils/endringsperiode';
import ArbeidstidUkeTabell, { ArbeidstidUkeTabellItem } from '../../arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import PerioderAccordion from '../../perioder-accordion/PerioderAccordion';
import FerieTag from '../../tags/FerieTag';
import { arbeidsaktivitetUtils, getEndringerForArbeidsukeForm } from '../arbeidsaktivitetUtils';
import ArbeidAktivitetUtenforPeriodeInfo from './ArbeidAktivitetUtenforPeriodeInfo';
import EndreArbeidstidModal from '../../endre-arbeidstid-modal/EndreArbeidstidModal';
import EndreArbeidstidForm from '../../endre-arbeidstid-form/EndreArbeidstidForm';
import { getArbeidAktivitetNavn } from '../../../utils/arbeidAktivitetUtils';
import { cleanupArbeidAktivitetEndringer } from '../../../søknad/steps/arbeidstid/arbeidstidStepUtils';

interface Props {
    perioder: PeriodeMedArbeidstid[];
    endringer: ArbeidstidEndringMap | undefined;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    arbeidAktivitet: ArbeidAktivitet;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const ArbeidsaktivitetContent: React.FunctionComponent<Props> = ({
    perioder,
    endringer,
    lovbestemtFerie,
    arbeidAktivitet,
    onArbeidstidAktivitetChange,
}) => {
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
    const [resetUkerTabellCounter, setResetUkerTabellCounter] = useState(0);

    const harFjernetFerieIPeriode = (periode: DateRange): boolean => {
        if (lovbestemtFerie?.feriedagerMeta.perioderFjernet) {
            return dateRangeUtils.dateRangesCollide([periode, ...lovbestemtFerie?.feriedagerMeta.perioderFjernet]);
        }
        return false;
    };

    return (
        <>
            <Heading level="3" size="small" spacing={true}>
                {perioder.length > 1 ? 'Dine perioder med pleiepenger' : 'Uker med pleiepenger'}
            </Heading>
            <ArbeidAktivitetUtenforPeriodeInfo
                arbeidAktivitet={arbeidAktivitet}
                tillattEndringsperiode={getTillattEndringsperiode(getEndringsdato())}
            />

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
                            const harFjernetFerie = harFjernetFerieIPeriode(periode);

                            return (
                                <div className="arbeidsaktivitetHeader">
                                    <div className="arbeidsaktivitetHeader__title">
                                        {dateFormatter.full(periode.from)} - {dateFormatter.full(periode.to)}
                                    </div>
                                    <div className="arbeidsaktivitetHeader__tags">
                                        {harEndringer && (
                                            <span style={{ marginRight: '.25rem' }}>
                                                <Tag variant="info" size="small">
                                                    <Edit />
                                                    <span style={{ marginLeft: '.25rem' }}>Arbeid endret</span>
                                                </Tag>
                                            </span>
                                        )}
                                        {harFjernetFerie && (
                                            <span style={{ marginRight: '.25rem' }}>
                                                <FerieTag type="fjernet">Ferie fjernet</FerieTag>
                                            </span>
                                        )}
                                    </div>
                                </div>
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
        </>
    );
};

export default ArbeidsaktivitetContent;
