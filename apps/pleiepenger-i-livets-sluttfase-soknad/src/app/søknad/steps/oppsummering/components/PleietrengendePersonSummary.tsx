import { FormSummary } from '@navikt/ds-react';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { FødselsnummerSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import { FlereSokereApiData, PleietrengendeApi } from '../../../../types/søknadApiData/SøknadApiData';
import AttachmentListV2 from '@navikt/sif-common-core-ds/src/components/attachment-list-v2/AttachmentListV2';

interface Props {
    pleietrengende: PleietrengendeApi;
    pleietrengendeId: Attachment[];
    flereSøkere: FlereSokereApiData;
    onEdit?: () => void;
}

const PleietrengendePersonSummary = ({ pleietrengende, pleietrengendeId, flereSøkere, onEdit }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.pleietrengende.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.pleietrengende.navn" />
                    </FormSummary.Label>
                    <FormSummary.Value>{pleietrengende.navn}</FormSummary.Value>
                </FormSummary.Answer>
                {pleietrengende.fødselsdato && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.pleietrengende.fødselsdato" />
                        </FormSummary.Label>
                        <FormSummary.Value>{prettifyDate(ISODateToDate(pleietrengende.fødselsdato))}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {pleietrengende.norskIdentitetsnummer && !pleietrengende.årsakManglerIdentitetsnummer && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.pleietrengende.fnr" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <FødselsnummerSvar fødselsnummer={pleietrengende.norskIdentitetsnummer} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {pleietrengende.årsakManglerIdentitetsnummer && !pleietrengende.norskIdentitetsnummer && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="step.oppsummeringpleietrengende.harIkkeFnr" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <AppText
                                    id={`step.oppsummeringpleietrengende.årsakManglerIdentitetsnummer.${pleietrengende.årsakManglerIdentitetsnummer}`}
                                />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="step.oppsummeringpleietrengende.id" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length > 0 && (
                                    <AttachmentListV2 attachments={pleietrengendeId} />
                                )}

                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length ===
                                    0 && <AppText id="step.oppsummering.pleietrengende.id.ingenId" />}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </>
                )}
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummeringflereSokere.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <AppText id={`step.oppsummering${flereSøkere}`} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default PleietrengendePersonSummary;
