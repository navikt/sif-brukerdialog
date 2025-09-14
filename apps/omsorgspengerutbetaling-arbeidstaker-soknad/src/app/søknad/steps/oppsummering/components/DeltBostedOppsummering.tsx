import { FormSummary } from '@navikt/ds-react';
import { getVedleggInLocationArray } from '@navikt/sif-common-core-ds/src';
import VedleggSummaryList from '@navikt/sif-common-core-ds/src/components/vedlegg-summary-list/VedleggSummaryList';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';

import { AppText } from '../../../../i18n';
import { DeltBostedSøknadsdata } from '../../../../types/søknadsdata/DeltBostedSøknadsdata';

interface Props {
    vedlegg: string[];
    deltBostedSøknadsdata?: DeltBostedSøknadsdata;
    onEdit?: () => void;
}

const DeltBostedOppsummering = ({ vedlegg, deltBostedSøknadsdata, onEdit }: Props) => {
    const delteBosteder = getVedleggInLocationArray({
        locations: vedlegg,
        vedlegg: deltBostedSøknadsdata?.vedlegg,
    });

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.deltBosted.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.deltBosted.dokumenter" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {deltBostedSøknadsdata?.vedlegg.length === 0 ? (
                            <AppText id="step.oppsummering.deltBosted.ingenVedlegg" />
                        ) : (
                            <VedleggSummaryList vedlegg={delteBosteder} />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            {onEdit && (
                <FormSummary.Footer>
                    <EditStepLink onEdit={onEdit} />
                </FormSummary.Footer>
            )}
        </FormSummary>
    );
};

export default DeltBostedOppsummering;
