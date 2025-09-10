import { useContext, useState } from 'react';
import { useAppIntl } from '@i18n/index';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { getArbeidsgivereRemoteData } from '../../api/getArbeidsgivereRemoteData';
import { SøkerdataContext } from '../../context/SøkerdataContext';
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
    const { text } = useAppIntl();

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
                    <FormLayout.Guide>
                        <ArbeidssituasjonStepVeileder />
                    </FormLayout.Guide>

                    <FormLayout.Sections>
                        <FormLayout.Section title={text('steg.arbeidssituasjon.tittel')}>
                            <ArbeidssituasjonArbeidsgivere søknadsperiode={søknadsperiode} />
                        </FormLayout.Section>

                        <FormLayout.Section title={text('steg.arbeidssituasjon.frilanser.tittel')}>
                            <ArbeidssituasjonFrilans søknadsperiode={søknadsperiode} søknadsdato={søknadsdato} />
                        </FormLayout.Section>

                        <FormLayout.Section title={text('steg.arbeidssituasjon.sn.tittel')}>
                            <ArbeidssituasjonSN søknadsperiode={søknadsperiode} />
                        </FormLayout.Section>

                        <FormLayout.Section title={text('steg.arbeidssituasjon.opptjeningUtland.tittel')}>
                            <ArbeidssituasjonOpptjeningUtland />
                        </FormLayout.Section>

                        {visVernepliktSpørsmål(values) && (
                            <FormLayout.Section title={text('steg.arbeidssituasjon.verneplikt.tittel')}>
                                <ArbeidssituasjonVerneplikt />
                            </FormLayout.Section>
                        )}
                    </FormLayout.Sections>
                </>
            )}
        </SøknadFormStep>
    );
};

export default ArbeidssituasjonStep;
