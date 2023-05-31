import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { initialValues, SøknadFormValues } from '../types/SøknadFormValues';
import { getSøknadsdataFromFormValues } from '../utils/formValuesToSøknadsdata/getSøknadsdataFromFormValues';
import { navigateToErrorPage } from '../utils/navigationUtils';
import SøknadContent from './SøknadContent';
import SøknadEssentialsLoader from './SøknadEssentialsLoader';
import SøknadsdataWrapper from './SøknadsdataWrapper';

const Søknad = () => {
    const navigate = useNavigate();
    const { logHendelse } = useAmplitudeInstance();
    const [søknadSent, setSøknadSent] = useState<boolean>(false);
    const [søknadReset, setSøknadReset] = useState<boolean>(false);
    return (
        <SøknadEssentialsLoader
            onUgyldigMellomlagring={() => logHendelse(ApplikasjonHendelse.ugyldigMellomlagring)}
            onError={() => {
                navigateToErrorPage(navigate);
            }}
            contentLoadedRenderer={({ formValues, mellomlagringMetadata, søkerdata, forrigeSøknad }) => {
                if (!søkerdata) {
                    navigateToErrorPage(navigate);
                    return;
                }
                return (
                    <SøknadsdataWrapper initialSøknadsdata={getSøknadsdataFromFormValues(formValues)}>
                        <TypedFormikWrapper<SøknadFormValues>
                            initialValues={formValues}
                            onSubmit={() => {
                                null;
                            }}
                            renderForm={(formik) => {
                                if (søknadSent && søknadReset === false) {
                                    setTimeout(() => {
                                        setSøknadReset(true);
                                        formik.resetForm({ values: initialValues, submitCount: 0 });
                                    });
                                }
                                return (
                                    <SøknadContent
                                        mellomlagringMetadata={mellomlagringMetadata}
                                        forrigeSøknad={forrigeSøknad}
                                        søker={søkerdata.søker}
                                        onSøknadSent={() => {
                                            setSøknadSent(true);
                                        }}
                                        onSøknadStart={() => {
                                            setTimeout(() => {
                                                setSøknadSent(false);
                                                setSøknadReset(false);
                                            });
                                        }}
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
