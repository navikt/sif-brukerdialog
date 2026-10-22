import { useAppIntl } from '@i18n/index';
import { Heading } from '@navikt/ds-react';
import { FormikFileUpload, getVedleggIder, getVedleggValidator, useManglendeVedlegg } from '@navikt/sif-common-core-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import { useState } from 'react';

import { persist } from '../../api/api';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { StepID } from '../../types/StepID';

interface Props {
    fødselsattester: Vedlegg[];
}

const FødselsattestPart = ({ fødselsattester }: Props) => {
    const { text, intl } = useAppIntl();
    const { values } = useFormikContext<SøknadFormValues>();
    const andreVedlegg: Vedlegg[] = values[SøknadFormField.legeerklæring] || [];
    const getVedleggKey = (vedlegg: Vedlegg[]) => getVedleggIder(vedlegg).sort().join(',');

    const onVedleggChange = (changedVedlegg: Vedlegg[]) => {
        if (getVedleggKey(changedVedlegg) === getVedleggKey(fødselsattester)) {
            return;
        }
        const valuesToPersist: SøknadFormValues = { ...values, fødselsattest: changedVedlegg };
        persist({ formValues: valuesToPersist, lastStepID: StepID.LEGEERKLÆRING });
    };

    // Sjekker bare vedleggene som fantes da steget ble åpnet
    const [initielleVedleggIder] = useState(() => getVedleggIder(fødselsattester));
    const { manglendeVedleggIder } = useManglendeVedlegg(initielleVedleggIder);

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
                manglendeVedleggIder={manglendeVedleggIder}
                onVedleggEndret={onVedleggChange}
            />
        </div>
    );
};

export default FødselsattestPart;
