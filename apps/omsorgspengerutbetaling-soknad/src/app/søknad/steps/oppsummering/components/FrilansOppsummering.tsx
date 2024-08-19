import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { DatoSvar, JaNeiSvar } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { FrilansApiData } from '../../../../types/søknadApiData/FrilansApiData';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';

interface Props {
    frilans?: FrilansApiData;
    onEdit?: () => void;
}

const FrilansOppsummering: React.FC<Props> = ({ frilans, onEdit }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="frilanser.summary.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="frilanser.summary.harDuHattInntekt.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={frilans !== undefined} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {frilans && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="frilanser.summary.nårStartet.header" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <DatoSvar isoDato={frilans.startdato} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="frilanser.summary.jobberFortsatt.header" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <JaNeiSvar harSvartJa={frilans.jobberFortsattSomFrilans} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        {frilans.jobberFortsattSomFrilans === false && frilans.sluttdato && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="frilanser.summary.nårSluttet.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <DatoSvar isoDato={frilans.sluttdato} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default FrilansOppsummering;
