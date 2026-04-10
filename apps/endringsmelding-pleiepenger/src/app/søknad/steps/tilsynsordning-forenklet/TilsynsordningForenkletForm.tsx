import DateRangeExpansionCards from '@app/components/date-range-expansion-cards/DateRangeExpansionCards';
import EndretTag from '@app/components/tags/EndretTag';
import TagsContainer from '@app/components/tags/tags-container/TagsContainer';
import { Heading, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

import TilsynsordningForenkletSøknadsperiode from './TilsynsordningForenkletSøknadsperiode';
import { TilsynsordningEndring } from './types';

export const tilsynsordningForenkletFormComponents = getTypedFormComponents<
    TilsynsordningForenkletFormFields,
    TilsynsordningForenkletFormValues,
    ValidationError
>();

const { Form } = tilsynsordningForenkletFormComponents;

export interface TilsynsordningForenkletFormValues {
    endringer: TilsynsordningEndring[];
}

export enum TilsynsordningForenkletFormFields {
    endringer = 'endringer',
}

interface Props {
    søknadsperioder: DateRange[];
    isSubmitting?: boolean;
    goBack?: () => void;
    onChange: (endringer: TilsynsordningEndring[]) => void;
}

const TilsynsordningForenkletForm = ({ goBack, søknadsperioder, isSubmitting, onChange }: Props) => {
    const intl = useIntl();
    const { values, setFieldValue } = useFormikContext<TilsynsordningForenkletFormValues>();
    const { endringer } = values;

    const handleOnPeriodeChange = (e: TilsynsordningEndring[]): void => {
        // const newValues = { ...tilsynsdager, ...dagerMedTid };
        setFieldValue(TilsynsordningForenkletFormFields.endringer, e);

        onChange(e);
    };

    const renderAccordionHeader = (periode: DateRange) => {
        return (
            <div className="arbeidsaktivitetContentHeader">
                <div className="arbeidsaktivitetContentHeader__title">
                    {dateFormatter.full(periode.from)} - {dateFormatter.full(periode.to)}
                </div>{' '}
                <TagsContainer>{endringer.length > 0 && <EndretTag>Endret</EndretTag>}</TagsContainer>
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
                            <TilsynsordningForenkletSøknadsperiode
                                key={periode.from.toDateString()}
                                søknadsperiode={periode}
                                endringer={endringer}
                                onChange={handleOnPeriodeChange}
                            />
                        );
                    }}
                    renderHeader={(periode) => renderAccordionHeader(periode)}
                />
            </VStack>
        </Form>
    );
};

export default TilsynsordningForenkletForm;
