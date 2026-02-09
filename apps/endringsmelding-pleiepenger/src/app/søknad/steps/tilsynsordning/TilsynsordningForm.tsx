import { Heading, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { DateDurationMap, dateFormatter, DateRange, isDateInDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

import DateRangeExpansionCards from '../../../components/date-range-expansion-cards/DateRangeExpansionCards';
import EndretTag from '../../../components/tags/EndretTag';
import TagsContainer from '../../../components/tags/tags-container/TagsContainer';
import { TidEnkeltdagEndring } from '../../../local-sif-common-pleiepenger/components/tid-enkeltdag-dialog/TidEnkeltdagForm';
import TilsynsordningSøknadsperiode from './TilsynsordningSøknadsperiode';

export const tilsynsordningFormComponents = getTypedFormComponents<
    TilsynsordningFormFields,
    TilsynsordningFormValues,
    ValidationError
>();

const { Form } = tilsynsordningFormComponents;

export interface TilsynsordningFormValues {
    tilsynsdager: DateDurationMap;
}

export enum TilsynsordningFormFields {
    tilsynsdager = 'tilsynsdager',
}

interface Props {
    søknadsperioder: DateRange[];
    opprinneligTilsynsdager: DateDurationMap;
    isSubmitting?: boolean;
    goBack?: () => void;
    onTilsynsordningChanged?: (tilsynsdager: DateDurationMap) => void;
}

const TilsynsordningForm = ({
    goBack,
    søknadsperioder,
    opprinneligTilsynsdager,
    isSubmitting,
    onTilsynsordningChanged,
}: Props) => {
    const intl = useIntl();
    const { values, setFieldValue } = useFormikContext<TilsynsordningFormValues>();
    const { tilsynsdager } = values;

    const handleOnEnkeltdagChange = (endring: TidEnkeltdagEndring): void => {
        const newValues = { ...tilsynsdager, ...endring.dagerMedTid };
        setFieldValue(TilsynsordningFormFields.tilsynsdager, newValues);
        if (onTilsynsordningChanged) {
            onTilsynsordningChanged(newValues);
        }
    };

    const handleOnPeriodeChange = (dagerMedTid: DateDurationMap): void => {
        const newValues = { ...tilsynsdager, ...dagerMedTid };
        setFieldValue(TilsynsordningFormFields.tilsynsdager, newValues);
        if (onTilsynsordningChanged) {
            onTilsynsordningChanged(newValues);
        }
    };

    const renderAccordionHeader = (periode: DateRange) => {
        const harEndringer =
            tilsynsdager !== undefined &&
            Object.keys(tilsynsdager)
                .map(ISODateToDate)
                .some((date) => isDateInDateRange(date, periode));

        return (
            <div className="arbeidsaktivitetContentHeader">
                <div className="arbeidsaktivitetContentHeader__title">
                    {dateFormatter.full(periode.from)} - {dateFormatter.full(periode.to)}
                </div>{' '}
                <TagsContainer>{harEndringer && <EndretTag>Endret</EndretTag>}</TagsContainer>
            </div>
        );
    };

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'omsorgstilbudForm')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <VStack gap="space-16">
                <Heading level="2" size="small">
                    Dine perioder med pleiepenger
                </Heading>
                <DateRangeExpansionCards
                    dateRanges={søknadsperioder}
                    renderContent={(periode) => {
                        return (
                            <TilsynsordningSøknadsperiode
                                key={periode.from.toDateString()}
                                opprinneligTilsynsdager={opprinneligTilsynsdager}
                                endredeTilsynsdager={tilsynsdager}
                                søknadsperiode={periode}
                                onEnkeltdagChange={handleOnEnkeltdagChange}
                                onPeriodeChange={handleOnPeriodeChange}
                            />
                        );
                    }}
                    renderHeader={(periode) => renderAccordionHeader(periode)}
                />
            </VStack>
        </Form>
    );
};

export default TilsynsordningForm;
