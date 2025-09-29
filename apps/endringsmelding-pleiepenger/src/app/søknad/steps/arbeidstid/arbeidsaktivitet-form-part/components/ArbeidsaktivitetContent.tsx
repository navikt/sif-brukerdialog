import './arbeidsaktivitetContent.scss';

import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types';
import { FormikInputGroup, FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import {
    dateFormatter,
    dateRangeToISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils';
import {
    ArbeiderIPeriodenSvar,
    Arbeidsaktivitet,
    ArbeidsaktivitetType,
    ArbeidstidEndringMap,
    Arbeidsuke,
    LovbestemtFerieSøknadsdata,
    PeriodeMedArbeidstid,
} from '@types';
import { getEndringsdato, getTillattEndringsperiode, harFjernetFerieIPeriode } from '@utils';
import { useState } from 'react';

import DateRangeExpansionCards from '../../../../../components/date-range-expansion-cards/DateRangeExpansionCards';
import EndretTag from '../../../../../components/tags/EndretTag';
import FerieTag from '../../../../../components/tags/FerieTag';
import TagsContainer from '../../../../../components/tags/tags-container/TagsContainer';
import { AppText } from '../../../../../i18n';
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
import ArbeiderIPeriodenSpørsmål from './ArbeiderIPeriodenSpørsmål';
import ArbeidsaktivitetUtenforPeriodeInfo from './ArbeidsaktivitetUtenforPeriodeInfo';

interface Props {
    perioder: PeriodeMedArbeidstid[];
    endringer: ArbeidstidEndringMap | undefined;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    arbeidsaktivitet: Arbeidsaktivitet;
    parentFieldName: string;
    formValues: ArbeidsaktivitetFormValues;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const ArbeidsaktivitetContent = ({
    perioder,
    endringer,
    lovbestemtFerie,
    arbeidsaktivitet,
    formValues,
    parentFieldName,
    onArbeidstidAktivitetChange,
}: Props) => {
    const [arbeidsukerForEndring, setArbeidsukerForEndring] = useState<Arbeidsuke[] | undefined>();
    const [resetUkerTabellCounter, setResetUkerTabellCounter] = useState(0);

    const erNyArbeidsgiver =
        arbeidsaktivitet.type === ArbeidsaktivitetType.arbeidstaker && arbeidsaktivitet.erUkjentArbeidsforhold;
    const arbeiderIPerioden = formValues?.arbeiderIPerioden;
    const mottarOmsorgsstønad = formValues?.mottarOmsorgsstønad;

    const spørOmOmsorgsstønad = arbeidsaktivitet.type === ArbeidsaktivitetType.frilanser;

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
                    {harEndringer && (
                        <EndretTag>
                            <AppText id="arbeidsaktivitetContent.tags.endretArbeid" />
                        </EndretTag>
                    )}
                    {harFjernetFerie && (
                        <FerieTag type="fjernet">
                            <AppText id="arbeidsaktivitetContent.tags.ferieFjernet" />
                        </FerieTag>
                    )}
                </TagsContainer>
            </div>
        );
    };

    const visPerioder = spørOmOmsorgsstønad === false || (spørOmOmsorgsstønad && mottarOmsorgsstønad !== undefined);

    return (
        <VStack gap="8">
            {erNyArbeidsgiver && (
                <ArbeiderIPeriodenSpørsmål arbeidsaktivitet={arbeidsaktivitet} parentFieldName={parentFieldName} />
            )}
            {(erNyArbeidsgiver === false || arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert) && (
                <>
                    {spørOmOmsorgsstønad && (
                        <VStack gap="2">
                            <FormikYesOrNoQuestion
                                name={`${parentFieldName}.mottarOmsorgsstønad`}
                                legend="Mottar du omsorgsstønad i perioden du skal endre?"
                            />
                            {mottarOmsorgsstønad === YesOrNo.YES && (
                                <Alert variant="info">
                                    <BodyShort spacing={true}>
                                        <AppText id="arbeidsaktivitetContent.omsorgsstønad.1" />
                                    </BodyShort>
                                    <BodyShort>
                                        <AppText id="arbeidsaktivitetContent.omsorgsstønad.2" />
                                    </BodyShort>
                                </Alert>
                            )}
                        </VStack>
                    )}
                    {visPerioder && (
                        <div>
                            {perioder.length > 0 ? (
                                <>
                                    <Heading level="3" size="small" spacing={true}>
                                        <AppText
                                            id="arbeidsaktivitetContent.heading.perioder"
                                            values={{ antallPerioder: perioder.length }}
                                        />
                                    </Heading>
                                    <VStack gap="6">
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
                                                <DateRangeExpansionCards
                                                    dateRanges={perioder}
                                                    renderContent={(periode) => renderArbeidstidUker(periode)}
                                                    renderHeader={(periode) => renderAccordionHeader(periode)}
                                                />
                                            )}
                                        </FormikInputGroup>
                                    </VStack>
                                </>
                            ) : (
                                <>
                                    <Heading level="3" size="small" spacing={true}>
                                        <AppText id="arbeidsaktivitetContent.heading.ingenPerioder" />
                                    </Heading>
                                    <ArbeidsaktivitetUtenforPeriodeInfo
                                        arbeidsaktivitet={arbeidsaktivitet}
                                        tillattEndringsperiode={getTillattEndringsperiode(getEndringsdato())}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </>
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
                    onSubmit={(data) => {
                        setArbeidsukerForEndring(undefined);
                        const nyeEndringer: ArbeidstidEndringMap = {};
                        data.perioder.forEach((periode) => {
                            nyeEndringer[dateRangeToISODateRange(periode)] = data.endring;
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
        </VStack>
    );
};

export default ArbeidsaktivitetContent;
