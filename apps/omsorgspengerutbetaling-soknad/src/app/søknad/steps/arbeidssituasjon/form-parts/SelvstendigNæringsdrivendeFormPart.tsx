import { Link } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import VirksomhetInfoAndDialog from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetInfoAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';

import { AppText, useAppIntl } from '../../../../i18n';
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

const SelvstendigNæringsdrivendeFormPart = ({ values }: Props) => {
    const { intl, text } = useAppIntl();
    const { selvstendig_erSelvstendigNæringsdrivende, selvstendig_virksomhet, selvstendig_harFlereVirksomheter } =
        values;
    const erSelvstendigNæringsdrivende = selvstendig_erSelvstendigNæringsdrivende === YesOrNo.YES;
    const harFlereVirksomheter = erSelvstendigNæringsdrivende && selvstendig_harFlereVirksomheter === YesOrNo.YES;

    return (
        <>
            <YesOrNoQuestion
                name={ArbeidssituasjonFormFields.selvstendig_erSelvstendigNæringsdrivende}
                legend={text('selvstendig.erDuSelvstendigNæringsdrivende.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo title={text('step.arbeidssituasjon.selvstendig.hjelpetekst.tittel')}>
                        <>
                            {text('step.arbeidssituasjon.selvstendig.hjelpetekst')}{' '}
                            <Link
                                href={getLenker(intl.locale).skatt_SNInntekt}
                                target="_blank"
                                rel="noopener noreferrer">
                                <AppText id="step.arbeidssituasjon.selvstendig.hjelpetekst.snSkatteetatenLenke" />
                            </Link>
                        </>
                    </ExpandableInfo>
                }
                data-testid="selvstendig_erSelvstendigNæringsdrivende"
            />
            {erSelvstendigNæringsdrivende && (
                <FormLayout.Panel bleedTop={true}>
                    <FormLayout.Questions>
                        <YesOrNoQuestion
                            name={ArbeidssituasjonFormFields.selvstendig_harFlereVirksomheter}
                            legend={text('selvstendig.harFlereVirksomheter.spm')}
                            validate={getYesOrNoValidator()}
                            data-testid="selvstendig_harFlereVirksomheter"
                        />

                        {harFlereVirksomheter && (
                            <SifGuidePanel>
                                <AppText id="selvstendig.veileder.flereAktiveVirksomheter" />
                            </SifGuidePanel>
                        )}
                        {values.selvstendig_harFlereVirksomheter !== YesOrNo.UNANSWERED && (
                            <VirksomhetInfoAndDialog
                                name={ArbeidssituasjonFormFields.selvstendig_virksomhet}
                                harFlereVirksomheter={harFlereVirksomheter}
                                labels={{
                                    infoTitle: selvstendig_virksomhet
                                        ? text('selvstendig.infoDialog.infoTittel')
                                        : undefined,
                                    editLabel: text('selvstendig.infoDialog.endreKnapp'),
                                    deleteLabel: text('selvstendig.infoDialog.fjernKnapp'),
                                    addLabel: text('selvstendig.infoDialog.registrerKnapp'),
                                    modalTitle: harFlereVirksomheter
                                        ? text('selvstendig.infoDialog.tittel.flere')
                                        : text('selvstendig.infoDialog.tittel.en'),
                                }}
                                validate={getRequiredFieldValidator()}
                            />
                        )}
                    </FormLayout.Questions>
                </FormLayout.Panel>
            )}
        </>
    );
};

export default SelvstendigNæringsdrivendeFormPart;
