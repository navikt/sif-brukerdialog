import { Heading, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { DateDurationMap, dateFormatter, DateRange, isDateInDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { SakTilsynsordningPeriode } from '@types';
import { useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

import DateRangeExpansionCards from '../../../components/date-range-expansion-cards/DateRangeExpansionCards';
import EndretTag from '../../../components/tags/EndretTag';
import TagsContainer from '../../../components/tags/tags-container/TagsContainer';
import { TidEnkeltdagEndring } from '../../../local-sif-common-pleiepenger/components/tid-enkeltdag-dialog/TidEnkeltdagForm';
import OmsorgstilbudPeriode from './OmsorgstilbudPeriode';

export const omsorgstilbudFormComponents = getTypedFormComponents<
    OmsorgstilbudFormFields,
    OmsorgstilbudFormValues,
    ValidationError
>();

const { Form } = omsorgstilbudFormComponents;
export interface OmsorgstilbudFormValues {
    omsorgsdager: DateDurationMap;
}

export enum OmsorgstilbudFormFields {
    omsorgsdager = 'omsorgsdager',
}

interface Props {
    søknadsperioder: DateRange[];
    perioderMedTilsynsordning: SakTilsynsordningPeriode;
    opprinneligTilsynsdager: DateDurationMap;
    isSubmitting?: boolean;
    goBack?: () => void;
    onOmsorgstilbudChanged?: (omsorgstilbud: DateDurationMap) => void;
}

const OmsorgstilbudForm = ({
    goBack,
    søknadsperioder,
    opprinneligTilsynsdager,
    isSubmitting,
    onOmsorgstilbudChanged,
}: Props) => {
    const intl = useIntl();

    const { values, setFieldValue } = useFormikContext<OmsorgstilbudFormValues>();
    const { omsorgsdager } = values;

    const handleOnEnkeltdagChange = (endring: TidEnkeltdagEndring): void => {
        const newValues = { ...omsorgsdager, ...endring.dagerMedTid };
        setFieldValue(OmsorgstilbudFormFields.omsorgsdager, newValues);
        if (onOmsorgstilbudChanged) {
            onOmsorgstilbudChanged(newValues);
        }
    };

    const handleOnPeriodeChange = (dagerMedTid: DateDurationMap): void => {
        const newValues = { ...omsorgsdager, ...dagerMedTid };
        setFieldValue(OmsorgstilbudFormFields.omsorgsdager, newValues);
        if (onOmsorgstilbudChanged) {
            onOmsorgstilbudChanged(newValues);
        }
    };

    const renderAccordionHeader = (periode: DateRange) => {
        const harEndringer =
            omsorgsdager !== undefined &&
            Object.keys(omsorgsdager)
                .map(ISODateToDate)
                .some((date) => isDateInDateRange(date, periode));

        return (
            <div className="arbeidsaktivitetContentHeader">
                <div className="arbeidsaktivitetContentHeader__title">
                    {dateFormatter.full(periode.from)} - {dateFormatter.full(periode.to)}
                </div>
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
                <Heading level="3" size="small">
                    Dine perioder med pleiepenger
                </Heading>
                <DateRangeExpansionCards
                    dateRanges={søknadsperioder}
                    renderContent={(periode) => {
                        return (
                            <OmsorgstilbudPeriode
                                key={periode.from.toDateString()}
                                opprinneligTilsynsdager={opprinneligTilsynsdager}
                                endredeTilsynsdager={omsorgsdager}
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

export default OmsorgstilbudForm;
