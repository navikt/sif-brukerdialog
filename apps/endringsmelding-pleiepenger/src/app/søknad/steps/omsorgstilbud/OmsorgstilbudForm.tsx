import { VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { DateDurationMap, DateRange } from '@navikt/sif-common-utils';
import { SakTilsynsordningPeriode } from '@types';
import { useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

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

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'omsorgstilbudForm')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <VStack gap="space-48">
                {søknadsperioder.map((periode) => {
                    return (
                        <OmsorgstilbudPeriode
                            key={periode.from.toDateString()}
                            opprinneligTilsynsdager={opprinneligTilsynsdager}
                            endredeTilsynsdager={omsorgsdager}
                            søknadsperiode={periode}
                            onEnkeltdagChange={handleOnEnkeltdagChange}
                        />
                    );
                })}
            </VStack>
        </Form>
    );
};

export default OmsorgstilbudForm;
