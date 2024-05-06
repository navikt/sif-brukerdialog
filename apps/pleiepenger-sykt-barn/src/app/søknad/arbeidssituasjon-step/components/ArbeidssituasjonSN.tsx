import { Alert, Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { DateRange, getTypedFormComponents } from '@navikt/sif-common-formik-ds/src';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetInfoAndDialog';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import getLenker from '../../../lenker';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { SelvstendigFormValues, SelvstendigFormField } from '../../../types/søknad-form-values/SelvstendigFormValues';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { getArbeidsforholdIntlValues } from '../utils/arbeidsforholdIntlValues';
import { getArbeiderNormaltTimerIUkenValidator } from '../validation/arbeiderNormaltTimerIUkenValidator';
import { getSelvstendigIPeriodeValidator } from '../validation/selvstendigIPeriodeValidator';
import { InfoArbeiderNormaltTimerSN } from './info/InfoArbeiderNormaltTimerIUken';
import { ArbeidsforholdFormField } from '../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { AppText } from '../../../i18n';

const ArbSNFormComponents = getTypedFormComponents<SelvstendigFormField, SelvstendigFormValues, ValidationError>();

interface Props {
    søknadsperiode: DateRange;
}

const ArbeidssituasjonSN = ({ søknadsperiode }: Props) => {
    const { intl } = useAppIntl();
    const { values } = useFormikContext<SøknadFormValues>();
    const { harHattInntektSomSN, virksomhet, harFlereVirksomheter, arbeidsforhold } = values.selvstendig;
    const søkerHarFlereVirksomheter = harFlereVirksomheter === YesOrNo.YES;
    const urlSkatteetatenSN = getLenker(intl.locale).skatteetatenSN;

    const intlValues = getArbeidsforholdIntlValues(intl, {
        arbeidsforhold: {
            type: ArbeidsforholdType.SELVSTENDIG,
        },
    });

    return (
        <div data-testid="arbeidssituasjonSelvstendig">
            <Block margin="l">
                <ArbSNFormComponents.YesOrNoQuestion
                    name={SelvstendigFormField.harHattInntektSomSN}
                    legend={intlHelper(intl, 'selvstendig.harDuHattInntekt.spm')}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'selvstendig.harDuHattInntekt.hjelpetekst.tittel')}>
                            <>
                                {intlHelper(intl, 'selvstendig.harDuHattInntekt.hjelpetekst')}{' '}
                                <Link href={urlSkatteetatenSN} target="_blank">
                                    <AppText id="selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke" />
                                </Link>
                            </>
                        </ExpandableInfo>
                    }
                />
            </Block>
            {harHattInntektSomSN === YesOrNo.YES && (
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
                        <ArbSNFormComponents.RadioGroup
                            name={SelvstendigFormField.harFlereVirksomheter}
                            data-testid="har-flere-virksomheter"
                            legend={intlHelper(intl, 'selvstendig.harFlereVirksomheter.spm')}
                            validate={getYesOrNoValidator()}
                            radios={[
                                {
                                    label: 'Ja',
                                    value: YesOrNo.YES,
                                    'data-testid': 'har-flere-virksomheter_yes',
                                },
                                {
                                    label: 'Nei',
                                    value: YesOrNo.NO,
                                    'data-testid': 'har-flere-virksomheter_no',
                                },
                            ]}
                            value={harFlereVirksomheter}
                        />

                        {søkerHarFlereVirksomheter && (
                            <FormBlock>
                                <Alert variant="info">
                                    <AppText id="selvstendig.veileder.flereAktiveVirksomheter" />
                                </Alert>
                            </FormBlock>
                        )}

                        {(harFlereVirksomheter === YesOrNo.YES || harFlereVirksomheter === YesOrNo.NO) && (
                            <FormBlock>
                                <div id={SelvstendigFormField.virksomhet} tabIndex={-1}>
                                    <VirksomhetInfoAndDialog
                                        name={SelvstendigFormField.virksomhet}
                                        harFlereVirksomheter={søkerHarFlereVirksomheter}
                                        labels={{
                                            infoTitle: virksomhet
                                                ? intlHelper(intl, 'selvstendig.infoDialog.infoTittel')
                                                : undefined,
                                            editLabel: intlHelper(intl, 'selvstendig.infoDialog.endreKnapp'),
                                            deleteLabel: intlHelper(intl, 'selvstendig.infoDialog.fjernKnapp'),
                                            addLabel: intlHelper(intl, 'selvstendig.infoDialog.registrerKnapp'),
                                            modalTitle: harFlereVirksomheter
                                                ? intlHelper(intl, 'selvstendig.infoDialog.tittel.flere')
                                                : intlHelper(intl, 'selvstendig.infoDialog.tittel.en'),
                                        }}
                                        validate={(value) => {
                                            if (getRequiredFieldValidator()(value) !== undefined) {
                                                return getRequiredFieldValidator()(value);
                                            }
                                            return getSelvstendigIPeriodeValidator(søknadsperiode, virksomhet);
                                        }}
                                    />
                                </div>
                            </FormBlock>
                        )}
                        {virksomhet !== undefined && (
                            <FormBlock>
                                <ArbSNFormComponents.NumberInput
                                    label={intlHelper(
                                        intl,
                                        `arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`,
                                        intlValues,
                                    )}
                                    name={
                                        `${SelvstendigFormField.arbeidsforhold}.${ArbeidsforholdFormField.normalarbeidstid_TimerPerUke}` as any
                                    }
                                    description={<InfoArbeiderNormaltTimerSN />}
                                    width="xs"
                                    validate={getArbeiderNormaltTimerIUkenValidator({
                                        ...intlValues,
                                    })}
                                    value={
                                        arbeidsforhold?.normalarbeidstid
                                            ? arbeidsforhold.normalarbeidstid.timerPerUke || ''
                                            : ''
                                    }
                                />
                            </FormBlock>
                        )}
                    </ResponsivePanel>
                </FormBlock>
            )}
        </div>
    );
};

export default ArbeidssituasjonSN;
