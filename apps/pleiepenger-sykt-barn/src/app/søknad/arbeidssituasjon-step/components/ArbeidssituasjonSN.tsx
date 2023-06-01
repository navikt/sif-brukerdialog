import { Alert, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/VirksomhetInfoAndDialog';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { SelvstendigFormData, SelvstendigFormField } from '../../../types/SelvstendigFormData';
import { getSelvstendigIPeriodeValidator } from '../validation/selvstendigIPeriodeValidator';
import NormalarbeidstidSpørsmål from './normalarbeidstid-spørsmål/NormalarbeidstidSpørsmål';

const ArbSNFormComponents = getTypedFormComponents<SelvstendigFormField, SelvstendigFormData, ValidationError>();

interface Props {
    formValues: SelvstendigFormData;
    urlSkatteetatenSN: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonSN = ({ formValues, urlSkatteetatenSN, søknadsperiode }: Props) => {
    const intl = useIntl();
    const { harHattInntektSomSN, virksomhet, harFlereVirksomheter, arbeidsforhold } = formValues;
    const søkerHarFlereVirksomheter = harFlereVirksomheter === YesOrNo.YES;

    return (
        <div data-testid="arbeidssituasjonSelvstendig">
            <Block margin="l">
                <ArbSNFormComponents.YesOrNoQuestion
                    name={SelvstendigFormField.harHattInntektSomSN}
                    legend={intlHelper(intl, 'selvstendig.harDuHattInntekt.spm')}
                    data-testid="er-selvstendig"
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'selvstendig.harDuHattInntekt.hjelpetekst.tittel')}>
                            <>
                                {intlHelper(intl, 'selvstendig.harDuHattInntekt.hjelpetekst')}{' '}
                                <Link href={urlSkatteetatenSN} target="_blank">
                                    <FormattedMessage id="selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke" />
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
                                    <FormattedMessage id="selvstendig.veileder.flereAktiveVirksomheter" />
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
                            <NormalarbeidstidSpørsmål
                                arbeidsforholdFieldName={SelvstendigFormField.arbeidsforhold}
                                arbeidsforhold={arbeidsforhold || {}}
                                arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG}
                                erAktivtArbeidsforhold={true}
                                brukKunSnittPerUke={true}
                            />
                        )}
                    </ResponsivePanel>
                </FormBlock>
            )}
        </div>
    );
};

export default ArbeidssituasjonSN;
