import { useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/atoms/loading-spinner/LoadingSpinner';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { getArbeidsgivereRemoteData } from '../../api/getArbeidsgivereRemoteData';
import FormSection from '../../components/form-section/FormSection';
import { SøkerdataContext } from '../../context/SøkerdataContext';
import useEffectOnce from '../../hooks/useEffectOnce';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import SøknadFormStep from '../SøknadFormStep';
import ArbeidssituasjonArbeidsgivere from './components/ArbeidssituasjonArbeidsgivere';
import ArbeidssituasjonFrilans from './components/ArbeidssituasjonFrilans';
import ArbeidssituasjonOpptjeningUtland from './components/ArbeidssituasjonOpptjeningUtland';
import ArbeidssituasjonSN from './components/ArbeidssituasjonSN';
import ArbeidssituasjonStepVeileder from './components/ArbeidssituasjonStepVeileder';
import ArbeidssituasjonVerneplikt from './components/ArbeidssituasjonVerneplikt';
import { oppdaterSøknadMedArbeidsgivere } from './utils/arbeidsgivereUtils';
import { visVernepliktSpørsmål } from './utils/visVernepliktSpørsmål';

interface LoadState {
    isLoading: boolean;
    isLoaded: boolean;
}

interface Props {
    søknadsdato: Date;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonStep = ({ onValidSubmit, søknadsdato, søknadsperiode }: StepCommonProps & Props) => {
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: false, isLoaded: false });
    const søkerdata = useContext(SøkerdataContext);
    const formikProps = useFormikContext<SøknadFormValues>();
    const intl = useIntl();

    const { values } = formikProps;
    const { isLoading, isLoaded } = loadState;

    useEffectOnce(() => {
        const fetchData = async () => {
            if (søkerdata && søknadsperiode) {
                const arbeidsgivere = await getArbeidsgivereRemoteData(søknadsperiode.from, søknadsperiode.to);
                oppdaterSøknadMedArbeidsgivere(arbeidsgivere, formikProps);
                setLoadState({ isLoading: false, isLoaded: true });
            }
        };
        if (søknadsperiode && !isLoaded && !isLoading) {
            setLoadState({ isLoading: true, isLoaded: false });
            fetchData();
        }
    });

    return (
        <SøknadFormStep stepId={StepID.ARBEIDSSITUASJON} onValidFormSubmit={onValidSubmit} buttonDisabled={isLoading}>
            {isLoading && <LoadingSpinner type="XS" title="Henter arbeidsforhold" />}
            {!isLoading && søknadsperiode && (
                <>
                    <Block padBottom="xl">
                        <ArbeidssituasjonStepVeileder />
                    </Block>

                    <FormSection title={intlHelper(intl, 'steg.arbeidssituasjon.tittel')}>
                        <ArbeidssituasjonArbeidsgivere søknadsperiode={søknadsperiode} />
                    </FormSection>

                    <FormSection title={intlHelper(intl, 'steg.arbeidssituasjon.frilanser.tittel')}>
                        <ArbeidssituasjonFrilans søknadsperiode={søknadsperiode} søknadsdato={søknadsdato} />
                    </FormSection>

                    <FormSection title={intlHelper(intl, 'steg.arbeidssituasjon.sn.tittel')}>
                        <ArbeidssituasjonSN søknadsperiode={søknadsperiode} />
                    </FormSection>

                    <FormSection title={intlHelper(intl, 'steg.arbeidssituasjon.opptjeningUtland.tittel')}>
                        <ArbeidssituasjonOpptjeningUtland />
                    </FormSection>

                    {visVernepliktSpørsmål(values) && (
                        <FormSection title={intlHelper(intl, 'steg.arbeidssituasjon.verneplikt.tittel')}>
                            <ArbeidssituasjonVerneplikt />
                        </FormSection>
                    )}
                </>
            )}
        </SøknadFormStep>
    );
};

export default ArbeidssituasjonStep;
