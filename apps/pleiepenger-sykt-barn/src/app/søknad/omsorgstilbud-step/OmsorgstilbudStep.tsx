import { useEffect, useState } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { useFormikContext } from 'formik';
import usePersistSoknad from '../../hooks/usePersistSoknad';
import { SøknadFormValues } from '../../types/SøknadFormValues';
import { søkerKunHelgedager } from '../../utils/formDataUtils';
import SøknadFormStep from '../SøknadFormStep';
import { StepConfigProps, StepID } from '../søknadStepsConfig';
import omsorgstilbudInfo from './info/OmsorgstilbudInfo';
import OmsorgstilbudSpørsmål from './OmsorgstilbudSpørsmål';
import { cleanupOmsorgstilbudStep } from './omsorgstilbudStepUtils';

interface Props {
    søknadsperiode: DateRange;
}

const OmsorgstilbudStep = ({ onValidSubmit, søknadsperiode }: StepConfigProps & Props) => {
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
        <SøknadFormStep
            id={StepID.OMSORGSTILBUD}
            onStepCleanup={(values) => cleanupOmsorgstilbudStep(values, søknadsperiode)}
            onValidFormSubmit={onValidSubmit}>
            <Block padBottom="xl">{omsorgstilbudInfo.stepIntro}</Block>

            <OmsorgstilbudSpørsmål
                periode={søknadsperiode}
                omsorgstilbud={omsorgstilbud}
                onOmsorgstilbudChanged={() => setOmsorgstilbudChanged(true)}
            />

            {søkerKunHelgedager(values.periodeFra, values.periodeTil) && (
                <Block margin="xl">{omsorgstilbudInfo.advarselSøkerKunHelgedager}</Block>
            )}
        </SøknadFormStep>
    );
};

export default OmsorgstilbudStep;
