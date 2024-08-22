import { useNavigate } from 'react-router-dom';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { navigateToErrorPage } from '../utils/navigationUtils';
import SøknadContent from './SøknadContent';
import SøknadEssentialsLoader from './SøknadEssentialsLoader';
import SøknadsdataWrapper from './SøknadsdataWrapper';

const Søknad = () => {
    const navigate = useNavigate();
    const { logHendelse } = useAmplitudeInstance();
    return (
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
    );
};
export default Søknad;
