import { Heading, Panel } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../søknad/context/StepFormValuesContext';
import './stateInfo.scss';

const StateInfo = () => {
    const {
        state: {
            // eslint-disable-next-line no-unused-vars
            søknadsdata: { harBekreftetOpplysninger, harForståttRettigheterOgPlikter, ...rest },
        },
    } = useSøknadContext();
    const { stepFormValues } = useStepFormValuesContext();
    return (
        <FormBlock>
            <Panel className="stateInfo" border={true}>
                <div className="stateInfo__panel">
                    <Heading level="2" size="small">
                        Søknadsdata
                    </Heading>
                    <pre>{JSON.stringify(rest, null, 2)}</pre>
                </div>
                <div className="stateInfo__panel">
                    <Heading level="2" size="small">
                        FormValues
                    </Heading>
                    <pre>{JSON.stringify(stepFormValues, null, 2)}</pre>
                </div>
            </Panel>
        </FormBlock>
    );
};

export default StateInfo;
