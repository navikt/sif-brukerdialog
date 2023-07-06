import { BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import GeneralErrorPage from '../../pages/general-error-page/GeneralErrorPage';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import SøknadFormStep from '../SøknadFormStep';
import { useSøknadsdataContext } from '../SøknadsdataContext';
import ArbeidstidAnsatt from './components/ArbeidstidAnsatt';
import ArbeidstidFrilanser from './components/ArbeidstidFrilansarbeid';
import ArbeidstidSelvstendig from './components/ArbeidstidSelvstendig';
import { useFormikContext } from 'formik';
import { SøknadFormValues } from '../../types/SøknadFormValues';
import { getAnsattArbeidsforholdISøknadsperiode } from './utils/arbeidstidUtils';

const ArbeidstidStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();
    // const { persistSoknad } = usePersistSoknad();

    const {
        søknadsdata: { arbeid: arbeidSøknadsdata, søknadsperiode },
    } = useSøknadsdataContext();

    if (!arbeidSøknadsdata || !søknadsperiode) {
        return <GeneralErrorPage />;
    }

    const { selvstendig, frilanser, arbeidsgivere } = arbeidSøknadsdata;

    // const handleArbeidstidChanged = () => {
    //     persistSoknad({ stepID: StepID.ARBEIDSTID });
    // };

    const aktiveArbeidsforhold = arbeidsgivere ? getAnsattArbeidsforholdISøknadsperiode(arbeidsgivere) : [];

    return (
        <SøknadFormStep stepId={StepID.ARBEIDSTID} onValidFormSubmit={onValidSubmit}>
            <Block padBottom="m">
                <SifGuidePanel>
                    <BodyLong as="div">
                        <p>
                            <FormattedMessage id={'arbeidIPeriode.StepInfo.1'} />
                        </p>
                        <p>
                            <FormattedMessage id={'arbeidIPeriode.StepInfo.2'} />
                        </p>
                    </BodyLong>
                </SifGuidePanel>
            </Block>

            {/* Ansatt-arbeidsforhold */}
            {aktiveArbeidsforhold.length > 0 && (
                <FormBlock>
                    {aktiveArbeidsforhold.map(({ arbeidsforhold, index }) => {
                        return (
                            <ArbeidstidAnsatt
                                key={index}
                                index={index}
                                søknadsperiode={søknadsperiode}
                                arbeidsforhold={values.ansatt_arbeidsforhold[index]}
                                normalarbeidstid={arbeidsforhold.normalarbeidstid}
                            />
                        );
                    })}
                </FormBlock>
            )}

            {/* Frilanser */}
            {frilanser?.harInntektSomFrilanser === true && frilanser?.misterInntektSomFrilanserIPeriode && (
                <FormBlock>
                    <ArbeidstidFrilanser
                        frilanser={frilanser}
                        values={values.frilans}
                        søknadsperiode={søknadsperiode}
                    />
                </FormBlock>
            )}

            {/* Selvstendig */}
            {selvstendig?.erSN && selvstendig.erSelvstendigISøknadsperiode && (
                <FormBlock>
                    <ArbeidstidSelvstendig />
                </FormBlock>
            )}
        </SøknadFormStep>
    );
};

export default ArbeidstidStep;
