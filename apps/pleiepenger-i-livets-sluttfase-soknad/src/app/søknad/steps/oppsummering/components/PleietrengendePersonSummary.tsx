import { FormSummary } from '@navikt/ds-react';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import { FlereSokereApiData, PleietrengendeApi } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    pleietrengende: PleietrengendeApi;
    pleietrengendeId: Attachment[];
    flereSøkere: FlereSokereApiData;
}

const PleietrengendePersonSummary = ({ pleietrengende, pleietrengendeId, flereSøkere }: Props) => (
    <>
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.pleietrengende.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Navn</FormSummary.Label>
                    <FormSummary.Value>{pleietrengende.navn}</FormSummary.Value>
                </FormSummary.Answer>
                {pleietrengende.fødselsdato ? (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.pleietrengende.fødselsdato" />
                        </FormSummary.Label>
                        <FormSummary.Value>{prettifyDate(ISODateToDate(pleietrengende.fødselsdato))}</FormSummary.Value>
                    </FormSummary.Answer>
                ) : null}
                {pleietrengende.norskIdentitetsnummer && !pleietrengende.årsakManglerIdentitetsnummer ? (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="fødselsnummer" />
                        </FormSummary.Label>
                        <FormSummary.Value>{pleietrengende.norskIdentitetsnummer}</FormSummary.Value>
                    </FormSummary.Answer>
                ) : null}
                {pleietrengende.årsakManglerIdentitetsnummer && !pleietrengende.norskIdentitetsnummer && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="steg.oppsummering.pleietrengende.harIkkeFnr" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <AppText
                                    id={`steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.${pleietrengende.årsakManglerIdentitetsnummer}`}
                                />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="steg.oppsummering.pleietrengende.id" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length > 0 && (
                                    <AttachmentList attachments={pleietrengendeId} />
                                )}
                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length ===
                                    0 && <AppText id="step.oppsummering.pleietrengende.id.ingenId" />}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </>
                )}
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.flereSokere.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <AppText id={`steg.oppsummering.${flereSøkere}`} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    </>
);

export default PleietrengendePersonSummary;
