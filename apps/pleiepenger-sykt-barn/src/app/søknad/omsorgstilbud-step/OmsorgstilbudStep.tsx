/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { useFormikContext } from 'formik';
import usePersistSoknad from '../../hooks/usePersistSoknad';
import { StepID } from '../../types/StepID';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { søkerKunHelgedager } from '../../utils/formValuesUtils';
import SøknadFormStep from '../SøknadFormStep';
import { StepCommonProps } from '../../types/StepCommonProps';
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
