import { BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
// import { useFormikContext } from 'formik';
import GeneralErrorPage from '../../pages/general-error-page/GeneralErrorPage';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
// import { SøknadFormValues } from '../../types/SøknadFormValues';
import SøknadFormStep from '../SøknadFormStep';
import { useSøknadsdataContext } from '../SøknadsdataContext';
// import { getAnsattArbeidsforholdIPerioden } from './utils/arbeidstidUtils';
import ArbeidstidAnsatt from './components/ArbeidstidAnsatt';
import ArbeidstidFrilanser from './components/ArbeidstidFrilanser';
import ArbeidstidSelvstendig from './components/ArbeidstidSelvstendig';

const ArbeidstidStep = ({ onValidSubmit }: StepCommonProps) => {
    // const {
    //     values: { ansatt_arbeidsforhold },
    // } = useFormikContext<SøknadFormValues>();
    // const { persistSoknad } = usePersistSoknad();

    const {
        søknadsdata: { arbeid: arbeidSøknadsdata, søknadsperiode },
    } = useSøknadsdataContext();

    if (!arbeidSøknadsdata || !søknadsperiode) {
        return <GeneralErrorPage />;
    }

    const { selvstendig, frilanser, arbeidsgivere } = arbeidSøknadsdata;

    // const periodeSomSelvstendigISøknadsperiode =

    // const handleArbeidstidChanged = () => {
    //     persistSoknad({ stepID: StepID.ARBEIDSTID });
    // };

    const ansattArbeidsforholdIPerioden = arbeidsgivere
        ? Array.from(arbeidsgivere, (item, index) => {
              return { index, arbeidAnsatt: item[1] };
          }).filter(({ arbeidAnsatt }) => {
              return arbeidAnsatt.erAnsattISøknadsperiode;
          })
        : [];

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
            {ansattArbeidsforholdIPerioden.length > 0 && (
                <FormBlock>
                    {ansattArbeidsforholdIPerioden.map(({ arbeidAnsatt, index }) => {
                        return <ArbeidstidAnsatt key={index} index={index} arbeidAnsattSøknadsdata={arbeidAnsatt} />;
                    })}
                </FormBlock>
            )}

            {/* Frilanser */}
            {frilanser?.harInntektSomFrilanser === true && frilanser?.misterInntektSomFrilanserIPeriode && (
                <FormBlock>
                    <ArbeidstidFrilanser frilanser={frilanser} />
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
