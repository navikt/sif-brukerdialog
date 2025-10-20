import { VStack } from '@navikt/ds-react';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import { useFormikContext } from 'formik';
import React from 'react';

import { SøkerdataContext } from '../../context/SøkerdataContext';
import { Søkerdata } from '../../types/Søkerdata';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import SøknadFormStep from '../SøknadFormStep';
import AnnetBarnPart from './AnnetBarnPart';
import RegistrertBarnPart from './RegistrertBarnPart';

const harRegistrerteBarn = ({ barn }: Søkerdata) => {
    return barn && barn.length > 0;
};

const OpplysningerOmBarnetStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();

    const søknadenGjelderEtAnnetBarn = values[SøknadFormField.barnetSøknadenGjelder] === VelgBarn_AnnetBarnValue;
    const søkerdata = React.useContext(SøkerdataContext);

    const fødselsattester: Vedlegg[] = React.useMemo(() => {
        return values && values.fødselsattest ? values[SøknadFormField.fødselsattest] : [];
    }, [values]);
    const hasPendingUploads: boolean = fødselsattester.find((a) => a.pending === true) !== undefined;

    return (
        <SøknadFormStep
            stepId={StepID.OPPLYSNINGER_OM_BARNET}
            onValidFormSubmit={onValidSubmit}
            buttonDisabled={hasPendingUploads}>
            {søkerdata && (
                <div data-testid="opplysninger-om-barnet">
                    <VStack gap="8" marginBlock="2 0">
                        {harRegistrerteBarn(søkerdata) && <RegistrertBarnPart søkersBarn={søkerdata.barn} />}
                        {(søknadenGjelderEtAnnetBarn || !harRegistrerteBarn(søkerdata)) && (
                            <AnnetBarnPart
                                formValues={values}
                                søkersFødselsnummer={søkerdata.søker.fødselsnummer}
                                fødselsattester={fødselsattester}
                                harRegistrerteBarn={harRegistrerteBarn(søkerdata)}
                            />
                        )}
                    </VStack>
                </div>
            )}
        </SøknadFormStep>
    );
};

export default OpplysningerOmBarnetStep;
