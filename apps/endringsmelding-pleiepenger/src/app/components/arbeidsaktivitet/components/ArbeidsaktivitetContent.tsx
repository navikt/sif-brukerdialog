import { Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import {
    dateFormatter,
    DateRange,
    dateRangeToISODateRange,
    dateRangeUtils,
    isDateInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils/lib';
import { cleanupArbeidAktivitetEndringer } from '../../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
import { ArbeidAktivitet, Arbeidsuke, PeriodeMedArbeidstid } from '../../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { getEndringsdato, getTillattEndringsperiode } from '../../../utils/endringsperiode';
import ArbeidstidUkeTabell, { ArbeidstidUkeTabellItem } from '../../arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import EndreArbeidstidForm from '../../endre-arbeidstid-form/EndreArbeidstidForm';
import EndreArbeidstidModal from '../../endre-arbeidstid-modal/EndreArbeidstidModal';
import PerioderAccordion from '../../perioder-accordion/PerioderAccordion';
import EndretTag from '../../tags/EndretTag';
import FerieTag from '../../tags/FerieTag';
import TagsContainer from '../../tags/TagsContainer';
import { arbeidsaktivitetUtils, getEndringerForArbeidsukeForm } from '../arbeidsaktivitetUtils';
import ArbeidAktivitetUtenforPeriodeInfo from './ArbeidAktivitetUtenforPeriodeInfo';

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
                        periode={perioder[0]}
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
                                    periode={periode}
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
                                    <TagsContainer>
                                        {harEndringer && <EndretTag>Arbeidstid endret</EndretTag>}
                                        {harFjernetFerie && <FerieTag type="fjernet">Ferie fjernet</FerieTag>}
                                    </TagsContainer>
                                </div>
                            );
                        }}
                    />
                </div>
            )}

            <EndreArbeidstidModal
                title={arbeidAktivitet.navn}
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
