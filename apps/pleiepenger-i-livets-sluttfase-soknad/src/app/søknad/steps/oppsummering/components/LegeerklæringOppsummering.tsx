import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { getAttachmentsInLocationArray } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';

interface Props {
    apiData: SøknadApiData;
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
    onEdit?: () => void;
}

const LegeerklæringOppsummering: React.FC<Props> = ({ apiData, legeerklæringSøknadsdata, onEdit }) => {
    const legeerklæringer = getAttachmentsInLocationArray({
        locations: apiData.vedleggUrls,
        attachments: legeerklæringSøknadsdata?.vedlegg,
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
                        <AppText id="step.oppsummering.legeerklæring.label" />
                    </FormSummary.Label>{' '}
                    <FormSummary.Value>
                        {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                            <AppText id="step.oppsummering.legeerklæring.ingenVedlegg" />
                        ) : (
                            <div data-testid="legeerklæring-liste">
                                <AttachmentList attachments={legeerklæringer} />
                            </div>
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default LegeerklæringOppsummering;
