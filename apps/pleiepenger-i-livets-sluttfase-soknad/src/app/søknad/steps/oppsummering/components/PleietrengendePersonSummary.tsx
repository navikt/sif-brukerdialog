import { BodyLong } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { FødselsnummerSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';
import { FlereSokereApiData, PleietrengendeApi } from '../../../../types/søknadApiData/SøknadApiData';
import { AppText, useAppIntl } from '../../../../i18n';

interface Props {
    pleietrengende: PleietrengendeApi;
    pleietrengendeId: Attachment[];
    flereSøkere: FlereSokereApiData;
}

const PleietrengendePersonSummary = ({ pleietrengende, pleietrengendeId, flereSøkere }: Props) => {
    const { text } = useAppIntl();
    return (
        <SummarySection header={text('step.oppsummering.pleietrengende.header')}>
            <SummaryBlock header={pleietrengende.navn}>
                {pleietrengende.fødselsdato ? (
                    <BodyLong>
                        <AppText
                            id="steg.oppsummering.pleietrengende.fødselsdato"
                            values={{
                                dato: prettifyDate(ISODateToDate(pleietrengende.fødselsdato)),
                            }}
                        />
                    </BodyLong>
                ) : null}
                {pleietrengende.norskIdentitetsnummer && !pleietrengende.årsakManglerIdentitetsnummer && (
                    <>
                        <AppText id="fødselsnummer" />{' '}
                        <FødselsnummerSvar fødselsnummer={pleietrengende.norskIdentitetsnummer} />
                    </>
                )}
                {pleietrengende.årsakManglerIdentitetsnummer && !pleietrengende.norskIdentitetsnummer && (
                    <>
                        <Block margin="l">
                            <BodyLong>
                                <AppText
                                    id="steg.oppsummering.pleietrengende.harIkkeFnr"
                                    values={{
                                        årsak: text(
                                            `steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.${pleietrengende.årsakManglerIdentitetsnummer}`,
                                        ),
                                    }}
                                />
                            </BodyLong>
                        </Block>
                        <Block margin="m">
                            <SummaryBlock header={text('steg.oppsummering.pleietrengende.id')}>
                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length > 0 && (
                                    <AttachmentList attachments={pleietrengendeId} />
                                )}

                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length ===
                                    0 && <AppText id="step.oppsummering.pleietrengende.id.ingenId" />}
                            </SummaryBlock>
                        </Block>
                    </>
                )}
            </SummaryBlock>
            <SummaryBlock header={text('steg.oppsummering.flereSokere.header')}>
                <AppText id={`steg.oppsummering.${flereSøkere}`} />
            </SummaryBlock>
        </SummarySection>
    );
};

export default PleietrengendePersonSummary;
