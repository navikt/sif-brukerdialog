import { Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { FormikInputGroup } from '@navikt/sif-common-formik-ds/lib';
import {
    dateFormatter,
    dateRangeToISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils';
import {
    Arbeidsaktivitet,
    ArbeidsaktivitetType,
    ArbeiderIPeriodenSvar,
    ArbeidstidEndringMap,
    Arbeidsuke,
    LovbestemtFerieSøknadsdata,
    PeriodeMedArbeidstid,
} from '@types';
import { getEndringsdato, getTillattEndringsperiode, harFjernetFerieIPeriode } from '@utils';
import DateRangeAccordion from '../../../../../components/date-range-accordion/DateRangeAccordion';
import EndretTag from '../../../../../components/tags/EndretTag';
import FerieTag from '../../../../../components/tags/FerieTag';
import TagsContainer from '../../../../../components/tags/tags-container/TagsContainer';
import ArbeidstidUkeTabell from '../../../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import { ArbeidstidUkeTabellItem } from '../../../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabellItem';
import EndreArbeidstidForm from '../../../../../modules/endre-arbeidstid-form/EndreArbeidstidForm';
import EndreArbeidstidModal from '../../../../../modules/endre-arbeidstid-modal/EndreArbeidstidModal';
import { ArbeidsaktivitetFormValues } from '../../ArbeidstidForm';
import { cleanupArbeidsaktivitetEndringer, validateUkjentArbeidsaktivitetArbeidstid } from '../../arbeidstidStepUtils';
import { arbeidsaktivitetUtils, getEndringerForArbeidsukeForm } from '../arbeidsaktivitetUtils';
import ArbeidsaktivitetUtenforPeriodeInfo from './ArbeidsaktivitetUtenforPeriodeInfo';
import ArbeiderIPeriodenSpørsmål from './ArbeiderIPeriodenSpørsmål';
import './arbeidsaktivitetContent.scss';

interface Props {
    perioder: PeriodeMedArbeidstid[];
    endringer: ArbeidstidEndringMap | undefined;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    arbeidsaktivitet: Arbeidsaktivitet;
    parentFieldName: string;
    formValues: ArbeidsaktivitetFormValues;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const ArbeidsaktivitetContent: React.FunctionComponent<Props> = ({
    perioder,
    endringer,
    lovbestemtFerie,
    arbeidsaktivitet,
    formValues,
    parentFieldName,
    onArbeidstidAktivitetChange,
}) => {
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
    const [resetUkerTabellCounter, setResetUkerTabellCounter] = useState(0);

    const erNyArbeidsgiver =
        arbeidsaktivitet.type === ArbeidsaktivitetType.arbeidstaker && arbeidsaktivitet.erUkjentArbeidsforhold;
    const arbeiderIPerioden = formValues?.arbeiderIPerioden;

    return (
        <>
            {erNyArbeidsgiver && (
                <Block>
                    <ArbeiderIPeriodenSpørsmål arbeidsaktivitet={arbeidsaktivitet} parentFieldName={parentFieldName} />
                </Block>
            )}
            {(erNyArbeidsgiver === false || arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert) && (
                <Block margin={erNyArbeidsgiver ? 'xl' : 'none'}>
                    <Heading level="3" size="small" spacing={true}>
                        {perioder.length > 1 ? 'Dine perioder med pleiepenger' : 'Uker med pleiepenger'}
                    </Heading>
                    <ArbeidsaktivitetUtenforPeriodeInfo
                        arbeidsaktivitet={arbeidsaktivitet}
                        tillattEndringsperiode={getTillattEndringsperiode(getEndringsdato())}
                    />
                    <FormikInputGroup
                        legend={arbeidsaktivitet.navn}
                        hideLegend={true}
                        name={`arbeidsgiver_${arbeidsaktivitet.key}`}
                        validate={() => {
                            if (
                                arbeidsaktivitet.type === ArbeidsaktivitetType.arbeidstaker &&
                                arbeidsaktivitet.erUkjentArbeidsforhold === true
                            ) {
                                return validateUkjentArbeidsaktivitetArbeidstid(
                                    arbeidsaktivitet,
                                    endringer,
                                    arbeiderIPerioden
                                );
                            }
                            return undefined;
                        }}>
                        {perioder.length === 1 && (
                            <>
                                <ArbeidstidUkeTabell
                                    arbeidsaktivitetKey={arbeidsaktivitet.key}
                                    listItems={arbeidsaktivitetUtils.getArbeidstidUkeTabellItemFromArbeidsuker(
                                        perioder[0].arbeidsuker,
                                        endringer,
                                        lovbestemtFerie
                                    )}
                                    periode={perioder[0]}
                                    visEndringSomOpprinnelig={erNyArbeidsgiver}
                                    triggerResetValg={resetUkerTabellCounter}
                                    onEndreUker={(uker: ArbeidstidUkeTabellItem[]) => {
                                        setArbeidsukerForEndring(
                                            uker.map((uke) => perioder[0].arbeidsuker[uke.isoDateRange])
                                        );
                                    }}
                                />
                            </>
                        )}
                        {perioder.length !== 1 && (
                            <div>
                                <DateRangeAccordion
                                    dateRanges={perioder}
                                    renderContent={(periode) => {
                                        const listItems =
                                            arbeidsaktivitetUtils.getArbeidstidUkeTabellItemFromArbeidsuker(
                                                periode.arbeidsuker,
                                                endringer,
                                                lovbestemtFerie
                                            );
                                        return (
                                            <ArbeidstidUkeTabell
                                                arbeidsaktivitetKey={arbeidsaktivitet.key}
                                                listItems={listItems}
                                                periode={periode}
                                                triggerResetValg={resetUkerTabellCounter}
                                                visEndringSomOpprinnelig={erNyArbeidsgiver}
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

                                        const harFjernetFerie =
                                            lovbestemtFerie !== undefined
                                                ? harFjernetFerieIPeriode(lovbestemtFerie, periode)
                                                : false;

                                        return (
                                            <div className="arbeidsaktivitetContentHeader">
                                                <div className="arbeidsaktivitetContentHeader__title">
                                                    {dateFormatter.full(periode.from)} -{' '}
                                                    {dateFormatter.full(periode.to)}
                                                </div>
                                                <TagsContainer>
                                                    {harEndringer && <EndretTag>Arbeidstid endret</EndretTag>}
                                                    {harFjernetFerie && (
                                                        <FerieTag type="fjernet">Ferie fjernet</FerieTag>
                                                    )}
                                                </TagsContainer>
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </FormikInputGroup>
                </Block>
            )}

            <EndreArbeidstidModal
                title={arbeidsaktivitet.navn}
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
                            cleanupArbeidsaktivitetEndringer(
                                {
                                    ...endringer,
                                    ...nyeEndringer,
                                },
                                arbeidsaktivitet
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
