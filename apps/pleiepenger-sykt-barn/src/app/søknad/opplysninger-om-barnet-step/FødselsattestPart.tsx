import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { useFormikContext } from 'formik';
import { persist } from '../../api/api';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';

interface Props {
    fødselsattester: Vedlegg[];
}

const FødselsattestPart: React.FC<Props> = ({ fødselsattester }) => {
    const { text, intl } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();
    const andreVedlegg: Vedlegg[] = values[SøknadFormField.legeerklæring] || [];

    const onVedleggChange = (changedVedlegg: Vedlegg[]) => {
        const valuesToPersist: SøknadFormValues = { ...values, fødselsattest: changedVedlegg };
        setFieldValue(SøknadFormField.fødselsattest, changedVedlegg);
        persist({ formValues: valuesToPersist, lastStepID: StepID.LEGEERKLÆRING });
    };

    useVedleggHelper(fødselsattester, andreVedlegg, onVedleggChange);

    return (
        <>
            <Heading level="2" size="medium" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                {text('steg.omBarnet.fødselsattest.tittel')}
            </Heading>
            <Block margin="m">
                <AppText id="steg.omBarnet.fødselsattest.info" />
            </Block>
            <FormikFileUpload
                fieldName={SøknadFormField.fødselsattest}
                initialFiles={fødselsattester}
                label={text('steg.omBarnet.fødselsattest.vedlegg')}
                validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                otherFiles={andreVedlegg}
                showPictureScanningGuide={true}
            />
        </>
    );
};

export default FødselsattestPart;
