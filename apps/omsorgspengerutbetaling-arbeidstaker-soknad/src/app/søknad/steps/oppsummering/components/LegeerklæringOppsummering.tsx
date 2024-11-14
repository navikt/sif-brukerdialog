import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../../../i18n';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getVedleggInLocationArray } from '@navikt/sif-common-core-ds/src';
import VedleggList from '@navikt/sif-common-core-ds/src/components/vedlegg-list/VedleggList';

interface Props {
    vedlegg: string[];
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
    onEdit?: () => void;
}

const LegeerklæringOppsummering = ({ vedlegg, legeerklæringSøknadsdata, onEdit }: Props) => {
    const legeerklæringer = getVedleggInLocationArray({
        locations: vedlegg,
        vedlegg: legeerklæringSøknadsdata?.vedlegg,
    });

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.legeerklæring.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.legeerklæring.liste.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                            <AppText id="step.oppsummering.legeerklæring.ingenVedlegg" />
                        ) : (
                            <VedleggList vedlegg={legeerklæringer} />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default LegeerklæringOppsummering;
