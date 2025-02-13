import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { useFormikContext } from 'formik';
import GeneralErrorPage from '../../pages/general-error-page/GeneralErrorPage';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { ArbeidssituasjonAnsattType } from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { søkerNoeFremtid } from '../../utils/søknadsperiodeUtils';
import SøknadFormStep from '../SøknadFormStep';
import { useSøknadsdataContext } from '../SøknadsdataContext';
import ArbeidstidAnsatt from './components/ArbeidstidAnsatt';
import ArbeidstidFrilans from './components/ArbeidstidFrilans';
import ArbeidstidSelvstendig from './components/ArbeidstidSelvstendig';
import { AppText } from '../../i18n';

const ArbeidstidStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();

    const {
        søknadsdata: { arbeidssituasjon, søknadsperiode, stønadGodtgjørelse },
    } = useSøknadsdataContext();

    if (!arbeidssituasjon || !søknadsperiode) {
        return <GeneralErrorPage />;
    }

    const { frilans } = arbeidssituasjon;

    const søkerFremITid = søkerNoeFremtid(søknadsperiode);

    const arbeidsgivere = arbeidssituasjon ? Array.from(arbeidssituasjon.arbeidsgivere, (a) => a[1]) : [];

    const visInntektsmeldingInfo =
        arbeidsgivere.length > 0 &&
        arbeidsgivere.some(
            (ansatt) =>
                ansatt.type === ArbeidssituasjonAnsattType.pågående ||
                ansatt.type === ArbeidssituasjonAnsattType.sluttetISøknadsperiode,
        );

    return (
        <SøknadFormStep stepId={StepID.ARBEIDSTID} onValidFormSubmit={onValidSubmit}>
            <Block padBottom="m">
                <SifGuidePanel>
                    <p>
                        <AppText id={'arbeidIPeriode.StepInfo.1'} />
                    </p>
                    <p>
                        <AppText id={'arbeidIPeriode.StepInfo.2'} />
                    </p>

                    {visInntektsmeldingInfo && (
                        <p>
                            <AppText id={'arbeidIPeriode.StepInfo.3'} />
                        </p>
                    )}
                </SifGuidePanel>
            </Block>

            {arbeidsgivere.length > 0 && (
                <FormBlock>
                    {arbeidsgivere.map((ansatt) => {
                        if (ansatt.type === ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode) {
                            return null;
                        }
                        const { arbeidsgiver, normalarbeidstid, index } = ansatt;
                        return (
                            <ArbeidstidAnsatt
                                key={index}
                                index={index}
                                søknadsperiode={søknadsperiode}
                                arbeidIPeriode={values.ansatt_arbeidsforhold[index].arbeidIPeriode}
                                arbeidsgiver={arbeidsgiver}
                                normalarbeidstid={normalarbeidstid.timerPerUkeISnitt}
                                søkerFremITid={søkerFremITid}
                            />
                        );
                    })}
                </FormBlock>
            )}

            {frilans &&
                frilans.harInntektSomFrilanser &&
                frilans.misterInntektSomFrilanser &&
                frilans.normalarbeidstid && (
                    <FormBlock>
                        <ArbeidstidFrilans
                            frilanstype={frilans.type}
                            periode={frilans.periodeSomFrilanserISøknadsperiode}
                            arbeidIPeriode={values.frilans.arbeidsforhold?.arbeidIPeriode}
                            normalarbeidstid={frilans.normalarbeidstid.timerPerUkeISnitt}
                            søkerFremITid={søkerFremITid}
                            mottarOmsorgsstønad={stønadGodtgjørelse?.mottarStønadGodtgjørelse === YesOrNo.YES}
                        />
                    </FormBlock>
                )}

            {arbeidssituasjon.selvstendig &&
                arbeidssituasjon.selvstendig.erSN &&
                arbeidssituasjon.selvstendig.periodeSomSelvstendigISøknadsperiode && (
                    <FormBlock>
                        <ArbeidstidSelvstendig
                            periode={arbeidssituasjon.selvstendig.periodeSomSelvstendigISøknadsperiode}
                            arbeidIPeriode={values.selvstendig.arbeidsforhold?.arbeidIPeriode}
                            normalarbeidstid={arbeidssituasjon.selvstendig.normalarbeidstid.timerPerUkeISnitt}
                            søkerFremITid={søkerFremITid}
                        />
                    </FormBlock>
                )}
        </SøknadFormStep>
    );
};

export default ArbeidstidStep;
