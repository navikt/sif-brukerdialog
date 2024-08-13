import { Alert, Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange, getTypedFormComponents } from '@navikt/sif-common-formik-ds/src';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetInfoAndDialog';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { ArbeidsforholdFormField } from '../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { SelvstendigFormField, SelvstendigFormValues } from '../../../types/søknad-form-values/SelvstendigFormValues';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { getArbeidsforholdIntlValues } from '../utils/arbeidsforholdIntlValues';
import { getArbeiderNormaltTimerIUkenValidator } from '../validation/arbeiderNormaltTimerIUkenValidator';
import { getSelvstendigIPeriodeValidator } from '../validation/selvstendigIPeriodeValidator';
import { InfoArbeiderNormaltTimerSN } from './info/InfoArbeiderNormaltTimerIUken';

const ArbSNFormComponents = getTypedFormComponents<SelvstendigFormField, SelvstendigFormValues, ValidationError>();

interface Props {
    søknadsperiode: DateRange;
}

const ArbeidssituasjonSN = ({ søknadsperiode }: Props) => {
    const appIntl = useAppIntl();
    const { intl, text } = appIntl;
    const { values } = useFormikContext<SøknadFormValues>();
    const { harHattInntektSomSN, virksomhet, harFlereVirksomheter, arbeidsforhold } = values.selvstendig;
    const søkerHarFlereVirksomheter = harFlereVirksomheter === YesOrNo.YES;
    const urlSkatteetatenSN = getLenker(intl.locale).skatteetatenSN;

    const intlValues = getArbeidsforholdIntlValues(appIntl, {
        arbeidsforhold: {
            type: ArbeidsforholdType.SELVSTENDIG,
        },
    });

    return (
        <div data-testid="arbeidssituasjonSelvstendig">
            <Block margin="l">
                <ArbSNFormComponents.YesOrNoQuestion
                    name={SelvstendigFormField.harHattInntektSomSN}
                    legend={text('selvstendig.harDuHattInntekt.spm')}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={text('selvstendig.harDuHattInntekt.hjelpetekst.tittel')}>
                            <>
                                <AppText id="selvstendig.harDuHattInntekt.hjelpetekst" />{' '}
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
                        <ArbSNFormComponents.YesOrNoQuestion
                            name={SelvstendigFormField.harFlereVirksomheter}
                            data-testid="har-flere-virksomheter"
                            legend={text('selvstendig.harFlereVirksomheter.spm')}
                            validate={getYesOrNoValidator()}
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
                                                ? text('selvstendig.infoDialog.infoTittel')
                                                : undefined,
                                            editLabel: text('selvstendig.infoDialog.endreKnapp'),
                                            deleteLabel: text('selvstendig.infoDialog.fjernKnapp'),
                                            addLabel: text('selvstendig.infoDialog.registrerKnapp'),
                                            modalTitle: harFlereVirksomheter
                                                ? text('selvstendig.infoDialog.tittel.flere')
                                                : text('selvstendig.infoDialog.tittel.en'),
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
                                    label={text(`arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`, intlValues)}
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
