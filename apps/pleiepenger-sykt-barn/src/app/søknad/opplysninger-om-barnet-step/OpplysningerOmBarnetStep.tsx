import React from 'react';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import { SøkerdataContext } from '../../context/SøkerdataContext';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { Søkerdata } from '../../types/Søkerdata';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import SøknadFormStep from '../SøknadFormStep';
import AnnetBarnPart from './AnnetBarnPart';
import RegistrertBarnPart from './RegistrertBarnPart';
import { Alert, BodyShort, Box, Heading, Link, VStack } from '@navikt/ds-react';

const harRegistrerteBarn = ({ barn }: Søkerdata) => {
    return barn && barn.length > 0;
};

const OpplysningerOmBarnetStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();

    const { søknadenGjelderEtAnnetBarn } = values;
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
                    <VStack gap="6">
                        <Alert variant="info">
                            <Heading level="3" size="xsmall" spacing={true} className="mt-1">
                                Nye retningslinjer hvis du pleier flere barn
                            </Heading>
                            <BodyShort spacing>
                                Hvis du pleier flere barn samtidig, er det nå nye retningslinjer for hvordan du søker.
                            </BodyShort>
                            <Link href="https://www.nav.no/pleiepenger-barn#flere-barn" target="_blank">
                                Les mer om hvordan du søker her
                            </Link>
                            .
                        </Alert>
                        <Box marginBlock="2 0">
                            {harRegistrerteBarn(søkerdata) && <RegistrertBarnPart søkersBarn={søkerdata.barn} />}
                            {(søknadenGjelderEtAnnetBarn || !harRegistrerteBarn(søkerdata)) && (
                                <AnnetBarnPart
                                    formValues={values}
                                    søkersFødselsnummer={søkerdata.søker.fødselsnummer}
                                    fødselsattester={fødselsattester}
                                    harRegistrerteBarn={harRegistrerteBarn(søkerdata)}
                                />
                            )}
                        </Box>
                    </VStack>
                </div>
            )}
        </SøknadFormStep>
    );
};

export default OpplysningerOmBarnetStep;
