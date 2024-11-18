import { useAppIntl } from '@i18n/index';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import { persist } from '../../api/api';
import usePersistOnChange from '../../hooks/usePersistOnChange';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import SøknadFormStep from '../SøknadFormStep';

const LegeerklæringStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();
    const { intl, text } = useAppIntl();

    const vedlegg = values[SøknadFormField.legeerklæring] || [];
    const andreVedlegg: Vedlegg[] = values[SøknadFormField.fødselsattest] || [];

    const onVedleggChange = (changedVedlegg: Vedlegg[]) => {
        const valuesToPersist: SøknadFormValues = { ...values, legeerklæring: changedVedlegg };
        setFieldValue(SøknadFormField.legeerklæring, changedVedlegg);
        persist({ formValues: valuesToPersist, lastStepID: StepID.LEGEERKLÆRING });
    };

    const { hasPendingUploads } = useVedleggHelper(vedlegg, andreVedlegg, onVedleggChange);

    usePersistOnChange(vedlegg, true, StepID.LEGEERKLÆRING);

    return (
        <SøknadFormStep
            stepId={StepID.LEGEERKLÆRING}
            onValidFormSubmit={() => {
                onValidSubmit();
            }}
            useValidationErrorSummary={false}
            skipValidation={true}
            buttonDisabled={hasPendingUploads}>
            <Block padBottom="xl">
                <SifGuidePanel compact={true}>
                    <p>
                        <AppText id={'steg.legeerklaering.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.legeerklaering.counsellorpanel.2'} />{' '}
                    </p>
                </SifGuidePanel>
            </Block>
            <FormikFileUpload
                label={text('steg.lege.vedlegg')}
                fieldName={SøknadFormField.legeerklæring}
                initialFiles={vedlegg}
                validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                otherFiles={andreVedlegg}
                showPictureScanningGuide={true}
            />
        </SøknadFormStep>
    );
};

export default LegeerklæringStep;
