import { VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

import usePersistSoknad from '../../hooks/usePersistSoknad';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { søkerKunHelgedager } from '../../utils/formValuesUtils';
import SøknadFormStep from '../SøknadFormStep';
import omsorgstilbudInfo from './info/OmsorgstilbudInfo';
import OmsorgstilbudSpørsmål from './OmsorgstilbudSpørsmål';

interface Props {
    søknadsperiode: DateRange;
}

const OmsorgstilbudStep = ({ onValidSubmit, søknadsperiode }: StepCommonProps & Props) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { omsorgstilbud } = values;
    const { persistSoknad } = usePersistSoknad();

    const [omsorgstilbudChanged, setOmsorgstilbudChanged] = useState(false);
    useEffect(() => {
        if (omsorgstilbudChanged === true) {
            setOmsorgstilbudChanged(false);
            persistSoknad({ stepID: StepID.OMSORGSTILBUD });
        }
    }, [omsorgstilbudChanged, persistSoknad]);

    return (
        <SøknadFormStep stepId={StepID.OMSORGSTILBUD} onValidFormSubmit={onValidSubmit}>
            <FormLayout.Guide>{omsorgstilbudInfo.stepIntro}</FormLayout.Guide>
            <VStack gap="space-32">
                <OmsorgstilbudSpørsmål
                    periode={søknadsperiode}
                    omsorgstilbud={omsorgstilbud}
                    onOmsorgstilbudChanged={() => setOmsorgstilbudChanged(true)}
                />

                {søkerKunHelgedager(values.periodeFra, values.periodeTil) && (
                    <div>{omsorgstilbudInfo.advarselSøkerKunHelgedager}</div>
                )}
            </VStack>
        </SøknadFormStep>
    );
};

export default OmsorgstilbudStep;
