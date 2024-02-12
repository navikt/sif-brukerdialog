import { Link } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetInfoAndDialog';
import { FormattedMessage, useIntl } from 'react-intl';
import getLenker from '../../../../lenker';
import { ArbeidssituasjonFormFields, ArbeidssituasjonFormValues } from '../ArbeidssituasjonStep';

const { YesOrNoQuestion } = getTypedFormComponents<
    ArbeidssituasjonFormFields,
    ArbeidssituasjonFormValues,
    ValidationError
>();

interface Props {
    values: Partial<ArbeidssituasjonFormValues>;
}

const SelvstendigNæringsdrivendeFormPart: React.FC<Props> = ({ values }) => {
    const intl = useIntl();
    const skipOrgNumValidation = getEnvironmentVariable('SKIP_ORGNUM_VALIDATION') === 'true';
    const { selvstendig_erSelvstendigNæringsdrivende, selvstendig_virksomhet, selvstendig_harFlereVirksomheter } =
        values;
    const erSelvstendigNæringsdrivende = selvstendig_erSelvstendigNæringsdrivende === YesOrNo.YES;
    const harFlereVirksomheter = erSelvstendigNæringsdrivende && selvstendig_harFlereVirksomheter === YesOrNo.YES;

    return (
        <>
            <YesOrNoQuestion
                name={ArbeidssituasjonFormFields.selvstendig_erSelvstendigNæringsdrivende}
                legend={intlHelper(intl, 'selvstendig.erDuSelvstendigNæringsdrivende.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'step.arbeidssituasjon.selvstendig.hjelpetekst.tittel')}>
                        <>
                            {intlHelper(intl, 'step.arbeidssituasjon.selvstendig.hjelpetekst')}{' '}
                            <Link href={getLenker(intl.locale).skatteetatenSN} target="_blank">
                                <FormattedMessage id="step.arbeidssituasjon.selvstendig.hjelpetekst.snSkatteetatenLenke" />
                            </Link>
                        </>
                    </ExpandableInfo>
                }
                data-testid="selvstendig_erSelvstendigNæringsdrivende"
            />

            {erSelvstendigNæringsdrivende && (
                <FormBlock>
                    <YesOrNoQuestion
                        name={ArbeidssituasjonFormFields.selvstendig_harFlereVirksomheter}
                        legend={intlHelper(intl, 'selvstendig.harFlereVirksomheter.spm')}
                        validate={getYesOrNoValidator()}
                        data-testid="selvstendig_harFlereVirksomheter"
                    />
                </FormBlock>
            )}

            {harFlereVirksomheter && (
                <FormBlock>
                    <SifGuidePanel>
                        <p>
                            <FormattedMessage id="selvstendig.veileder.flereAktiveVirksomheter" />
                        </p>
                    </SifGuidePanel>
                </FormBlock>
            )}

            {erSelvstendigNæringsdrivende && values.selvstendig_harFlereVirksomheter !== YesOrNo.UNANSWERED && (
                <FormBlock>
                    <VirksomhetInfoAndDialog
                        name={ArbeidssituasjonFormFields.selvstendig_virksomhet}
                        harFlereVirksomheter={harFlereVirksomheter}
                        labels={{
                            infoTitle: selvstendig_virksomhet
                                ? intlHelper(intl, 'selvstendig.infoDialog.infoTittel')
                                : undefined,
                            editLabel: intlHelper(intl, 'selvstendig.infoDialog.endreKnapp'),
                            deleteLabel: intlHelper(intl, 'selvstendig.infoDialog.fjernKnapp'),
                            addLabel: intlHelper(intl, 'selvstendig.infoDialog.registrerKnapp'),
                            modalTitle: harFlereVirksomheter
                                ? intlHelper(intl, 'selvstendig.infoDialog.tittel.flere')
                                : intlHelper(intl, 'selvstendig.infoDialog.tittel.en'),
                        }}
                        skipOrgNumValidation={skipOrgNumValidation}
                        validate={getRequiredFieldValidator()}
                    />
                </FormBlock>
            )}
        </>
    );
};

export default SelvstendigNæringsdrivendeFormPart;
