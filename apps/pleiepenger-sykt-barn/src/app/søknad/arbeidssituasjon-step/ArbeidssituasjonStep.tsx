import { useAppIntl } from '@i18n/index';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';

import { useArbeidsgivereQuery } from '../../hooks/useArbeidsgivereQuery';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import SøknadFormStep from '../SøknadFormStep';
import ArbeidssituasjonArbeidsgivere from './components/ArbeidssituasjonArbeidsgivere';
import ArbeidssituasjonFrilans from './components/ArbeidssituasjonFrilans';
import ArbeidssituasjonOpptjeningUtland from './components/ArbeidssituasjonOpptjeningUtland';
import ArbeidssituasjonSN from './components/ArbeidssituasjonSN';
import ArbeidssituasjonStepVeileder from './components/ArbeidssituasjonStepVeileder';
import ArbeidssituasjonVerneplikt from './components/ArbeidssituasjonVerneplikt';
import { oppdaterSøknadMedArbeidsgivere } from './utils/arbeidsgivereUtils';
import { visVernepliktSpørsmål } from './utils/visVernepliktSpørsmål';

interface Props {
    søknadsdato: Date;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonStep = ({ onValidSubmit, søknadsdato, søknadsperiode }: StepCommonProps & Props) => {
    const formikProps = useFormikContext<SøknadFormValues>();
    const formikRef = useRef(formikProps);
    formikRef.current = formikProps;
    const { text } = useAppIntl();

    const { data: arbeidsgivere = [], isLoading, isSuccess, error } = useArbeidsgivereQuery(søknadsperiode);

    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        oppdaterSøknadMedArbeidsgivere(arbeidsgivere, formikRef.current);
    }, [arbeidsgivere, isSuccess]);

    const { values } = formikProps;

    if (isLoading || (!isSuccess && !error)) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    return (
        <SøknadFormStep stepId={StepID.ARBEIDSSITUASJON} onValidFormSubmit={onValidSubmit} buttonDisabled={isLoading}>
            {søknadsperiode && (
                <>
                    <FormLayout.Guide>
                        <ArbeidssituasjonStepVeileder />
                    </FormLayout.Guide>

                    <FormLayout.Sections>
                        <FormLayout.Section title={text('steg.arbeidssituasjon.tittel')}>
                            <ArbeidssituasjonArbeidsgivere
                                søknadsperiode={søknadsperiode}
                                hentArbeidsgivereFeilet={!!error}
                            />
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
