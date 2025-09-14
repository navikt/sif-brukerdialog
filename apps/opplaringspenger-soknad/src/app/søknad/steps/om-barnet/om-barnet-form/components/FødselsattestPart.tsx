import { Heading, VStack } from '@navikt/ds-react';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import actionsCreator from '../../../../context/action/actionCreator';
import { useSøknadContext } from '../../../../context/hooks/useSøknadContext';
import { OmBarnetFormText as Text, useOmBarnetFormIntl } from '../omBarnetFormMessages';
import { OmBarnetFormFields, OmBarnetFormValues } from '../types';

interface Props {
    fødselsattester: Vedlegg[];
    andreVedlegg: Vedlegg[];
    ettersendelseURL: string;
}

const FødselsattestPart = ({ fødselsattester, andreVedlegg, ettersendelseURL }: Props) => {
    const { text } = useOmBarnetFormIntl();
    const { setFieldValue } = useFormikContext<OmBarnetFormValues>();
    const { dispatch } = useSøknadContext();

    const onVedleggChange = (changedVedlegg: Vedlegg[]) => {
        setFieldValue(OmBarnetFormFields.fødselsattest, changedVedlegg);
        dispatch(actionsCreator.requestLagreSøknad());
    };

    useVedleggHelper(fødselsattester, andreVedlegg, onVedleggChange);

    return (
        <VStack gap="6">
            <div>
                <Heading level="2" size="medium" spacing={true}>
                    {text('omBarnetForm.fødselsattest.tittel')}
                </Heading>
                <Text id="omBarnetForm.fødselsattest.info" />
            </div>
            <FormikFileUpload
                fieldName={OmBarnetFormFields.fødselsattest}
                initialFiles={fødselsattester}
                label={text('omBarnetForm.fødselsattest.vedlegg')}
                validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={ettersendelseURL}
                otherFiles={andreVedlegg}
                showPictureScanningGuide={true}
            />
        </VStack>
    );
};

export default FødselsattestPart;
