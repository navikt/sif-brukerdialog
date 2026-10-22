import { useAppIntl } from '@i18n/index';
import {
    FormikFileUpload,
    getVedleggIder,
    getVedleggValidator,
    useManglendeVedlegg,
    useVedleggHelper,
} from '@navikt/sif-common-core-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { FormLayout } from '@navikt/sif-common-ui';
import { useFormikContext } from 'formik';
import { useState } from 'react';

import usePersistOnChange from '../../hooks/usePersistOnChange';
import usePersistSoknad from '../../hooks/usePersistSoknad';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import SøknadFormStep from '../SøknadFormStep';

const LegeerklæringStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { intl, text } = useAppIntl();

    const vedlegg = values[SøknadFormField.legeerklæring] || [];
    const andreVedlegg: Vedlegg[] = values[SøknadFormField.fødselsattest] || [];
    const { persistSoknad } = usePersistSoknad();

    const onVedleggChange = (changedVedlegg: Vedlegg[]) => {
        const valuesToPersist: SøknadFormValues = { ...values, legeerklæring: changedVedlegg };
        persistSoknad({ formValues: valuesToPersist, stepID: StepID.LEGEERKLÆRING });
    };

    const { hasPendingUploads } = useVedleggHelper(vedlegg, andreVedlegg);

    // Sjekker bare vedleggene som fantes da steget ble åpnet
    const [initielleVedleggIder] = useState(() => getVedleggIder(vedlegg));
    const { manglendeVedleggIder } = useManglendeVedlegg(initielleVedleggIder);

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
            <FormLayout.Guide>
                <p>
                    <AppText id="steg.legeerklaering.counsellorpanel.1" />
                </p>
                <p>
                    <AppText id="steg.legeerklaering.counsellorpanel.2" />{' '}
                </p>
            </FormLayout.Guide>

            <FormikFileUpload
                label={text('steg.lege.vedlegg')}
                fieldName={SøknadFormField.legeerklæring}
                initialFiles={vedlegg}
                validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                otherFiles={andreVedlegg}
                showPictureScanningGuide={true}
                manglendeVedleggIder={manglendeVedleggIder}
                onVedleggEndret={onVedleggChange}
            />
        </SøknadFormStep>
    );
};

export default LegeerklæringStep;
