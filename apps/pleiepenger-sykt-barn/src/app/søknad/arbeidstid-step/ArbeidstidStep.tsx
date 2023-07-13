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
import { useFormikContext } from 'formik';
import { SøknadFormValues } from '../../types/SøknadFormValues';
import { getAnsattArbeidsforholdISøknadsperiode } from './utils/arbeidstidUtils';
import { søkerNoeFremtid } from '../../utils/søknadsperiodeUtils';
import ArbeidstidFrilansarbeid from './components/ArbeidstidFrilansarbeid';
import { erFrilanserSomMisterInntekt } from '../../types/søknadsdata/arbeidFrilansSøknadsdata';
import ArbeidstidHonorararbeid from './components/ArbeidstidHonorararbeid';
import ArbeidstidSelvstendig from './components/ArbeidstidSelvstendig';

export enum ArbeidsaktivitetType {
    'ANSATT' = 'ANSATT',
    'SELVSTENDING' = 'SELVSTENDIG',
    'HONORARARBEID' = 'HONORARARBEID',
    'FRILANSARBEID' = 'FRILANSARBEID',
}

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

    const søkerFremITid = søkerNoeFremtid(søknadsperiode);
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
                                arbeidIPeriode={values.ansatt_arbeidsforhold[index].arbeidIPeriode}
                                arbeidsgiver={values.ansatt_arbeidsforhold[index].arbeidsgiver}
                                normalarbeidstid={arbeidsforhold.normalarbeidstid.timerPerUkeISnitt}
                                søkerFremITid={søkerFremITid}
                            />
                        );
                    })}
                </FormBlock>
            )}

            {erFrilanserSomMisterInntekt(frilanser) && frilanser.arbeidsforholdFrilanserarbeid && (
                <FormBlock>
                    <ArbeidstidFrilansarbeid
                        periode={frilanser.periodeinfo.aktivPeriode}
                        arbeidIPeriode={values.frilans.arbeidsforholdFrilansarbeid?.arbeidIPeriode}
                        normalarbeidstid={frilanser.arbeidsforholdFrilanserarbeid.normalarbeidstid.timerPerUkeISnitt}
                        søkerFremITid={søkerFremITid}
                    />
                </FormBlock>
            )}

            {erFrilanserSomMisterInntekt(frilanser) &&
                frilanser.arbeidsforholdHonorararbeid &&
                frilanser.arbeidsforholdHonorararbeid.misterHonorar && (
                    <FormBlock>
                        <ArbeidstidHonorararbeid
                            periode={frilanser.periodeinfo.aktivPeriode}
                            arbeidIPeriode={values.frilans.arbeidsforholdHonorararbeid?.arbeidIPeriode}
                            normalarbeidstid={frilanser.arbeidsforholdHonorararbeid.normalarbeidstid.timerPerUkeISnitt}
                            søkerFremITid={søkerFremITid}
                        />
                    </FormBlock>
                )}

            {selvstendig?.erSN &&
                selvstendig.erSelvstendigISøknadsperiode &&
                selvstendig.periodeSomSelvstendigISøknadsperiode && (
                    <FormBlock>
                        <ArbeidstidSelvstendig
                            periode={selvstendig.periodeSomSelvstendigISøknadsperiode}
                            arbeidIPeriode={values.selvstendig.arbeidsforhold?.arbeidIPeriode}
                            normalarbeidstid={selvstendig.arbeidsforhold.normalarbeidstid.timerPerUkeISnitt}
                            søkerFremITid={søkerFremITid}
                        />
                    </FormBlock>
                )}
        </SøknadFormStep>
    );
};

export default ArbeidstidStep;
