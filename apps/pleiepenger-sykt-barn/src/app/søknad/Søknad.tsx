import { Button } from '@navikt/ds-react';
import { ApplikasjonHendelse, useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { useNavigate } from 'react-router-dom';

import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { navigateToErrorPage } from '../utils/navigationUtils';
import SøknadContent from './SøknadContent';
import SøknadEssentialsLoader from './SøknadEssentialsLoader';
import SøknadsdataWrapper from './SøknadsdataWrapper';

const Søknad = () => {
    const navigate = useNavigate();
    const { logHendelse } = useAnalyticsInstance();
    return (
        <>
            <SøknadEssentialsLoader
                onUgyldigMellomlagring={() => logHendelse(ApplikasjonHendelse.ugyldigMellomlagring)}
                onError={() => {
                    navigateToErrorPage(navigate);
                }}
                contentLoadedRenderer={({ formValues, mellomlagringMetadata, søkerdata }) => {
                    if (!søkerdata) {
                        navigateToErrorPage(navigate);
                        return;
                    }
                    return (
                        <SøknadsdataWrapper initialValues={formValues}>
                            <TypedFormikWrapper<SøknadFormValues>
                                initialValues={formValues}
                                onSubmit={() => {}}
                                renderForm={() => {
                                    return (
                                        <SøknadContent
                                            mellomlagringMetadata={mellomlagringMetadata}
                                            søker={søkerdata.søker}
                                        />
                                    );
                                }}
                            />
                        </SøknadsdataWrapper>
                    );
                }}
            />
            {getMaybeEnv('APP_VERSION') === 'dev' && (
                <>
                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={() => {
                            throw new Error('Test Sentry error from VelkommenPage');
                        }}>
                        Test error
                    </Button>
                </>
            )}
        </>
    );
};
export default Søknad;
