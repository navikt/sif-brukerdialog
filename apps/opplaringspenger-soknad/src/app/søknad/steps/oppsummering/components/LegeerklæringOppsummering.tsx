import { FormSummary, List } from '@navikt/ds-react';
import React from 'react';
import { getVedleggInLocationArray, VedleggSummaryList } from '@navikt/sif-common-core-ds/src';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { JaNeiSvar } from '@navikt/sif-common-ui';

interface Props {
    apiData: SøknadApiData;
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
    onEdit?: () => void;
}

const LegeerklæringOppsummering: React.FC<Props> = ({ apiData, legeerklæringSøknadsdata, onEdit }) => {
    const legeerklæringer = getVedleggInLocationArray({
        locations: apiData.vedlegg,
        vedlegg: legeerklæringSøknadsdata?.vedlegg,
    });

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
                                <VedleggSummaryList vedlegg={legeerklæringer} />
                            </div>
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.legeerklæring.skalEttersende.label" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={apiData.ettersendingAvVedlegg.skalEttersendeVedlegg} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {apiData.ettersendingAvVedlegg.skalEttersendeVedlegg && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.legeerklæring.vedleggSomSkalEttersendes.title" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <List>
                                {apiData.ettersendingAvVedlegg.vedleggSomSkalEttersendes?.map((vedlegg, index) => (
                                    <List.Item key={index}>
                                        <AppText id={`vedleggType.${vedlegg}`} />
                                    </List.Item>
                                ))}
                            </List>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default LegeerklæringOppsummering;
