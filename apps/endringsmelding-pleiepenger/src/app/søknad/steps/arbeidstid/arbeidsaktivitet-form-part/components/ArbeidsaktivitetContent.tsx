import { Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { FormikInputGroup } from '@navikt/sif-common-formik-ds';
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
import ArbeidstidUker from '../../../../../modules/arbeidstid-uker/ArbeidstidUker';
import { ArbeidstidUkerItem } from '../../../../../modules/arbeidstid-uker/types/ArbeidstidUkerItem';
import EndreArbeidstidForm from '../../../../../modules/endre-arbeidstid-form/EndreArbeidstidForm';
import EndreArbeidstidModal from '../../../../../modules/endre-arbeidstid-modal/EndreArbeidstidModal';
import { ArbeidsaktivitetFormValues } from '../../ArbeidstidForm';
import {
    cleanupArbeidsaktivitetEndringer,
    getUkjentArbeidsaktivitetArbeidstidValidator,
} from '../../arbeidstidStepUtils';
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

    const renderArbeidstidUker = (periode: PeriodeMedArbeidstid) => {
        return (
            <ArbeidstidUker
                listItems={arbeidsaktivitetUtils.getArbeidstidUkerItemFromArbeidsuker(
                    periode.arbeidsuker,
                    endringer,
                    lovbestemtFerie,
                )}
                visEndringSomOpprinnelig={erNyArbeidsgiver}
                triggerResetValgCounter={resetUkerTabellCounter}
                onEndreUker={(uker: ArbeidstidUkerItem[]) => {
                    setArbeidsukerForEndring(uker.map((uke) => periode.arbeidsuker[uke.isoDateRange]));
                }}
            />
        );
    };

    const renderAccordionHeader = (periode: PeriodeMedArbeidstid) => {
        const harEndringer =
            endringer !== undefined &&
            Object.keys(endringer)
                .map(ISODateRangeToDateRange)
                .some((dr) => isDateInDateRange(dr.from, periode));

        const harFjernetFerie =
            lovbestemtFerie !== undefined ? harFjernetFerieIPeriode(lovbestemtFerie, periode) : false;

        return (
            <div className="arbeidsaktivitetContentHeader">
                <div className="arbeidsaktivitetContentHeader__title">
                    {dateFormatter.full(periode.from)} - {dateFormatter.full(periode.to)}
                </div>
                <TagsContainer>
                    {harEndringer && <EndretTag>Arbeidstid endret</EndretTag>}
                    {harFjernetFerie && <FerieTag type="fjernet">Ferie fjernet</FerieTag>}
                </TagsContainer>
            </div>
        );
    };

    return (
        <>
            {erNyArbeidsgiver && (
                <Block>
                    <ArbeiderIPeriodenSpørsmål arbeidsaktivitet={arbeidsaktivitet} parentFieldName={parentFieldName} />
                </Block>
            )}
            {(erNyArbeidsgiver === false || arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert) && (
                <Block margin={erNyArbeidsgiver ? 'xl' : 'none'}>
                    {perioder.length > 0 ? (
                        <>
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
                                errorPropagation={false}
                                name={`arbeidsgiver_${arbeidsaktivitet.key}`}
                                validate={getUkjentArbeidsaktivitetArbeidstidValidator(
                                    arbeidsaktivitet,
                                    endringer,
                                    arbeiderIPerioden,
                                )}>
                                {perioder.length === 1 ? (
                                    renderArbeidstidUker(perioder[0])
                                ) : (
                                    <DateRangeAccordion
                                        dateRanges={perioder}
                                        renderContent={(periode) => renderArbeidstidUker(periode)}
                                        renderHeader={(periode) => renderAccordionHeader(periode)}
                                    />
                                )}
                            </FormikInputGroup>
                        </>
                    ) : (
                        <>
                            <Heading level="3" size="small" spacing={true}>
                                Ingen perioder tilgjengelig for endring
                            </Heading>
                            <ArbeidsaktivitetUtenforPeriodeInfo
                                arbeidsaktivitet={arbeidsaktivitet}
                                tillattEndringsperiode={getTillattEndringsperiode(getEndringsdato())}
                            />
                        </>
                    )}
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
                                arbeidsaktivitet,
                            ),
                        );
                        setResetUkerTabellCounter(resetUkerTabellCounter + 1);
                    }}
                />
            </EndreArbeidstidModal>
        </>
    );
};

export default ArbeidsaktivitetContent;
