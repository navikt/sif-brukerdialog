import DateRangeExpansionCards from '@app/components/date-range-expansion-cards/DateRangeExpansionCards';
import EndretTag from '@app/components/tags/EndretTag';
import { Heading, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { dateFormatter, DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

import TilsynsordningForenkletSøknadsperiode from './TilsynsordningForenkletSøknadsperiode';
import { erTilsynsordningEndretIPeriode } from './tilsynsordningForenkletStepUtils';
import { SøknadsperiodeTilsynsordningEndringer, TilsynsordningPeriodeData } from './types';

export const tilsynsordningForenkletFormComponents = getTypedFormComponents<
    TilsynsordningForenkletFormFields,
    TilsynsordningForenkletFormValues,
    ValidationError
>();

const { Form } = tilsynsordningForenkletFormComponents;

export interface TilsynsordningForenkletFormValues {
    endringer: SøknadsperiodeTilsynsordningEndringer;
}

export enum TilsynsordningForenkletFormFields {
    endringer = 'endringer',
}

interface Props {
    søknadsperioder: DateRange[];
    isSubmitting?: boolean;
    goBack?: () => void;
    onChange: (endringer: SøknadsperiodeTilsynsordningEndringer) => void;
}

const TilsynsordningForenkletForm = ({ goBack, søknadsperioder, isSubmitting, onChange }: Props) => {
    const intl = useIntl();
    const { values, setFieldValue } = useFormikContext<TilsynsordningForenkletFormValues>();
    const { endringer } = values;

    /** Kalles med liste av endringer for én søknadsperioden */
    const handleOnChangeInSøknadsperiode = (
        søknadsperiode: DateRange,
        periodeEndringer: TilsynsordningPeriodeData[],
    ): void => {
        const key = dateRangeToISODateRange(søknadsperiode);
        const endring = { ...values.endringer, [key]: periodeEndringer };
        setFieldValue(TilsynsordningForenkletFormFields.endringer, endring);
        onChange(endring);
    };

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'omsorgstilbudForm')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <VStack gap="space-24">
                {søknadsperioder.length === 1 ? null : (
                    <Heading level="3" size="small">
                        Dine perioder med pleiepenger
                    </Heading>
                )}
                <DateRangeExpansionCards
                    dateRanges={søknadsperioder}
                    renderContent={(søknadsperiode) => {
                        const søknadsperiodeKey = dateRangeToISODateRange(søknadsperiode);
                        return (
                            <>
                                <Heading
                                    level={søknadsperioder.length === 1 ? '3' : '4'}
                                    size={søknadsperioder.length === 1 ? 'small' : 'xsmall'}
                                    spacing={true}>
                                    Registrerte endringer
                                </Heading>
                                <TilsynsordningForenkletSøknadsperiode
                                    key={søknadsperiode.from.toDateString()}
                                    søknadsperiode={søknadsperiode}
                                    endringer={endringer[søknadsperiodeKey]}
                                    onChange={(e) => handleOnChangeInSøknadsperiode(søknadsperiode, e)}
                                />
                            </>
                        );
                    }}
                    renderHeader={(søknadsperiode) => {
                        const søknadsperiodeKey = dateRangeToISODateRange(søknadsperiode);
                        return (
                            <>
                                <span style={{ display: 'inlineBlock' }}>
                                    {dateFormatter.full(søknadsperiode.from)} - {dateFormatter.full(søknadsperiode.to)}
                                </span>
                                {erTilsynsordningEndretIPeriode(søknadsperiode, endringer[søknadsperiodeKey]) && (
                                    <span
                                        style={{
                                            position: 'relative',
                                            marginLeft: '.5rem',
                                            top: '-.125rem',
                                        }}>
                                        {` `}
                                        <EndretTag>Endret</EndretTag>
                                    </span>
                                )}
                            </>
                        );
                    }}
                />
            </VStack>
        </Form>
    );
};

export default TilsynsordningForenkletForm;
