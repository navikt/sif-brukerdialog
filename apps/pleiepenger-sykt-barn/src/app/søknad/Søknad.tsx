import { ApplikasjonHendelse, useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';

import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import SøknadContent from './SøknadContent';
import SøknadEssentialsLoader from './SøknadEssentialsLoader';
import SøknadsdataWrapper from './SøknadsdataWrapper';
import { SkyraSlug, SkyraTestPage } from '@sif/surveys';

const Søknad = () => {
    const { logHendelse } = useAnalyticsInstance();

    if (globalThis.location.pathname.includes('skyra/test')) {
        return <SkyraTestPage slugs={[SkyraSlug.pleiepenger_sykt_barn]} />;
    }

    return (
        <SøknadEssentialsLoader
            onUgyldigMellomlagring={() => logHendelse(ApplikasjonHendelse.ugyldigMellomlagring)}
            onError={() => {
                return <ErrorPage />;
            }}
            contentLoadedRenderer={({ formValues, mellomlagringMetadata, søkerdata }) => {
                if (!søkerdata) {
                    return <ErrorPage />;
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
    );
};
export default Søknad;
