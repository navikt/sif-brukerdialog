import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import FormSection from '../../../components/form-section/FormSection';
import usePersistSoknad from '../../../hooks/usePersistSoknad';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import GeneralErrorPage from '../../../pages/general-error-page/GeneralErrorPage';
import { FrilansFormField } from '../../../types/FrilansFormData';
import { SelvstendigFormField } from '../../../types/SelvstendigFormData';
import { StepID } from '../../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../../types/SøknadFormValues';
import { getPeriodeSomSelvstendigInnenforPeriode } from '../../../utils/selvstendigUtils';
import SøknadFormStep from '../../SøknadFormStep';
import { useSøknadsdataContext } from '../../SøknadsdataContext';
import { StepCommonProps } from '../../../types/StepCommonProps';
import ArbeidIPeriodeSpørsmål from './ArbeidIPeriodeSpørsmål';
import { BodyLong } from '@navikt/ds-react';

interface Props extends StepCommonProps {
    periode: DateRange;
}

const ArbeidstidStep = ({ onValidSubmit, periode }: Props) => {
    const intl = useIntl();
    const formikProps = useFormikContext<SøknadFormValues>();
    const { persistSoknad } = usePersistSoknad();
    const {
        søknadsdata: { arbeid, søknadsperiode },
    } = useSøknadsdataContext();

    if (!arbeid || !søknadsperiode) {
        return <GeneralErrorPage />;
    }

    const {
        values: { ansatt_arbeidsforhold, frilans, selvstendig },
    } = formikProps;

    const periodeSomSelvstendigISøknadsperiode =
        selvstendig.harHattInntektSomSN === YesOrNo.YES && selvstendig.virksomhet !== undefined
            ? getPeriodeSomSelvstendigInnenforPeriode(periode, selvstendig.virksomhet)
            : undefined;

    const handleArbeidstidChanged = () => {
        persistSoknad({ stepID: StepID.ARBEIDSTID });
    };

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

            {ansatt_arbeidsforhold.length > 0 && (
                <FormBlock>
                    {ansatt_arbeidsforhold.map((arbeidsforhold, index) => {
                        const arbeidsgiver = arbeid.arbeidsgivere?.get(arbeidsforhold.arbeidsgiver.id);

                        /** Må loope gjennom alle arbeidsforhold for å få riktig index inn til formik */
                        if (!arbeidsgiver || arbeidsgiver.erAnsattISøknadsperiode === false) {
                            return null;
                        }

                        return (
                            <FormSection title={arbeidsforhold.arbeidsgiver.navn} key={arbeidsforhold.arbeidsgiver.id}>
                                <div data-testid="arbeidIPerioden_ansatt">
                                    <ArbeidIPeriodeSpørsmål
                                        aktivitetType="arbeidstaker"
                                        normalarbeidstid={arbeidsgiver.arbeidsforhold.normalarbeidstid}
                                        arbeidsstedNavn={arbeidsforhold.arbeidsgiver.navn}
                                        arbeidsforholdType={ArbeidsforholdType.ANSATT}
                                        arbeidsforhold={arbeidsforhold}
                                        arbeidsperiode={periode}
                                        søknadsperiode={søknadsperiode}
                                        parentFieldName={`${SøknadFormField.ansatt_arbeidsforhold}.${index}`}
                                        onArbeidstidVariertChange={handleArbeidstidChanged}
                                    />
                                </div>
                            </FormSection>
                        );
                    })}
                </FormBlock>
            )}

            {frilans.arbeidsforhold &&
                arbeid.frilans?.erFrilanser === true &&
                arbeid.frilans?.frilansType.length > 0 &&
                arbeid.frilans?.type !== 'pågåendeKunStyreverv' && (
                    <FormBlock>
                        <FormSection title={intlHelper(intl, 'arbeidIPeriode.FrilansLabel')}>
                            <>
                                <div data-testid="arbeidIPerioden_frilanser">
                                    <ArbeidIPeriodeSpørsmål
                                        aktivitetType="frilans"
                                        normalarbeidstid={arbeid.frilans.arbeidsforhold.normalarbeidstid}
                                        arbeidsstedNavn="Frilansoppdrag"
                                        arbeidsforholdType={ArbeidsforholdType.FRILANSER}
                                        arbeidsforhold={frilans.arbeidsforhold}
                                        arbeidsperiode={arbeid.frilans.aktivPeriode}
                                        søknadsperiode={søknadsperiode}
                                        parentFieldName={FrilansFormField.arbeidsforhold}
                                        frilansType={arbeid.frilans.frilansType}
                                        misterHonorarer={arbeid.frilans.misterHonorar}
                                        onArbeidstidVariertChange={handleArbeidstidChanged}
                                    />
                                </div>
                            </>
                        </FormSection>
                    </FormBlock>
                )}

            {selvstendig.harHattInntektSomSN === YesOrNo.YES &&
                selvstendig.arbeidsforhold &&
                periodeSomSelvstendigISøknadsperiode &&
                arbeid.selvstendig?.type === 'erSN' && (
                    <FormBlock>
                        <FormSection title={intlHelper(intl, 'arbeidIPeriode.SNLabel')}>
                            <div data-testid="arbeidIPerioden_selvstendig">
                                <ArbeidIPeriodeSpørsmål
                                    aktivitetType="sn"
                                    normalarbeidstid={arbeid.selvstendig.arbeidsforhold.normalarbeidstid}
                                    arbeidsstedNavn="Selvstendig næringsdrivende"
                                    arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG}
                                    arbeidsforhold={selvstendig.arbeidsforhold}
                                    arbeidsperiode={periodeSomSelvstendigISøknadsperiode}
                                    søknadsperiode={søknadsperiode}
                                    parentFieldName={SelvstendigFormField.arbeidsforhold}
                                    onArbeidstidVariertChange={handleArbeidstidChanged}
                                />
                            </div>
                        </FormSection>
                    </FormBlock>
                )}
        </SøknadFormStep>
    );
};

export default ArbeidstidStep;
