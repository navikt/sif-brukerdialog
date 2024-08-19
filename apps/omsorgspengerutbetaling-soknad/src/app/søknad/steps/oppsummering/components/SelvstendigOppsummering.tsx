import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { VirksomhetApiData } from '@navikt/sif-common-forms-ds';
import VirksomhetSummary from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetSummary';
import { JaNeiSvar } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';

interface Props {
    virksomhet?: VirksomhetApiData;
    onEdit?: () => void;
}

const SelvstendigOppsummering: React.FC<Props> = ({ virksomhet, onEdit }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="summary.virksomhet.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="summary.virksomhet.harDuHattInntekt.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={virksomhet !== undefined} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {virksomhet && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="summary.virksomhet.harFlereVirksomheter.header" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <JaNeiSvar harSvartJa={virksomhet.harFlereAktiveVirksomheter} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="summary.virksomhet.virksomhetInfo.tittel" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <VirksomhetSummary virksomhet={virksomhet} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default SelvstendigOppsummering;
