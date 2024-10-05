import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { getAttachmentURLBackend } from '@navikt/sif-common';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
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
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.vedleggUrls.includes(getAttachmentURLBackend(v.url)),
          )
        : [];

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="steg.oppsummering.legeerklæring.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.legeerklæring.label" />
                    </FormSummary.Label>{' '}
                    <FormSummary.Value>
                        {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                            <AppText id="steg.oppsummering.legeerklæring.ingenVedlegg" />
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
