import { useAppIntl } from '@i18n/index';
import { Heading } from '@navikt/ds-react';
import { FormikFileUpload, getVedleggIder, getVedleggValidator, useManglendeVedlegg } from '@navikt/sif-common-core-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import { useState } from 'react';

import usePersistOnChange from '../../hooks/usePersistOnChange';
import usePersistSoknad from '../../hooks/usePersistSoknad';
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
    const { persistSoknad } = usePersistSoknad();

    const onVedleggChange = (changedVedlegg: Vedlegg[]) => {
        const valuesToPersist: SøknadFormValues = { ...values, fødselsattest: changedVedlegg };
        persistSoknad({ formValues: valuesToPersist, stepID: StepID.OPPLYSNINGER_OM_BARNET });
    };

    // Sjekker bare vedleggene som fantes da steget ble åpnet
    const [initielleVedleggIder] = useState(() => getVedleggIder(fødselsattester));
    const { manglendeVedleggIder } = useManglendeVedlegg(initielleVedleggIder);

    usePersistOnChange(values[SøknadFormField.fødselsattest], true, StepID.OPPLYSNINGER_OM_BARNET);

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
