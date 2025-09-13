import { Heading } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import { persist } from '../../api/api';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';

interface Props {
    fødselsattester: Vedlegg[];
}

const FødselsattestPart = ({ fødselsattester }: Props) => {
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
        <div>
            <Heading level="2" size="medium" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                {text('steg.omBarnet.fødselsattest.tittel')}
            </Heading>

            <p>
                <AppText id="steg.omBarnet.fødselsattest.info" />
            </p>

            <FormikFileUpload
                fieldName={SøknadFormField.fødselsattest}
                initialFiles={fødselsattester}
                label={text('steg.omBarnet.fødselsattest.vedlegg')}
                validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                otherFiles={andreVedlegg}
                showPictureScanningGuide={true}
            />
        </div>
    );
};

export default FødselsattestPart;
