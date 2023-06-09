import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/VirksomhetInfoAndDialog';
import { ArbeidssituasjonFormFields, ArbeidssituasjonFormValues } from '../ArbeidssituasjonStep';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { Link } from '@navikt/ds-react';
import getLenker from '../../../../lenker';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';

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

    //TODO  useEffect(() => { (virksomhetChanged

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
            />

            {erSelvstendigNæringsdrivende && (
                <FormBlock>
                    <YesOrNoQuestion
                        name={ArbeidssituasjonFormFields.selvstendig_harFlereVirksomheter}
                        legend={intlHelper(intl, 'selvstendig.harFlereVirksomheter.spm')}
                        validate={getYesOrNoValidator()}
                    />
                </FormBlock>
            )}

            {harFlereVirksomheter && (
                <FormBlock>
                    <SifGuidePanel>
                        <FormattedMessage id="selvstendig.veileder.flereAktiveVirksomheter" />
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
                        // TODO
                        // onAfterChange={() => setVirksomhetChanged(true)}
                    />
                </FormBlock>
            )}
        </>
    );
};

export default SelvstendigNæringsdrivendeFormPart;
