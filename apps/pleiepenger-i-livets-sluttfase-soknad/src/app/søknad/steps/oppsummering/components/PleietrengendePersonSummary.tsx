import { BodyLong } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { FødselsnummerSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils/lib';
import { FlereSokereApiData, PleietrengendeApi } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    pleierDuDenSykeHjemme: boolean;
    pleietrengende: PleietrengendeApi;
    pleietrengendeId: Attachment[];
    flereSøkere: FlereSokereApiData;
}

const PleietrengendePersonSummary = ({
    pleietrengende,
    pleietrengendeId,
    pleierDuDenSykeHjemme,
    flereSøkere,
}: Props) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.pleietrengende.header')}>
            <SummaryBlock header={pleietrengende.navn}>
                {pleietrengende.fødselsdato ? (
                    <BodyLong size="large">
                        <FormattedMessage
                            id="steg.oppsummering.pleietrengende.fødselsdato"
                            values={{
                                dato: prettifyDate(ISODateToDate(pleietrengende.fødselsdato)),
                            }}
                        />
                    </BodyLong>
                ) : null}
                {pleietrengende.norskIdentitetsnummer && !pleietrengende.årsakManglerIdentitetsnummer && (
                    <>
                        <FormattedMessage id="fødselsnummer" />{' '}
                        <FødselsnummerSvar fødselsnummer={pleietrengende.norskIdentitetsnummer} />
                    </>
                )}
                {pleietrengende.årsakManglerIdentitetsnummer && !pleietrengende.norskIdentitetsnummer && (
                    <>
                        <Block margin="l">
                            <BodyLong size="large">
                                <FormattedMessage
                                    id="steg.oppsummering.pleietrengende.harIkkeFnr"
                                    values={{
                                        årsak: intlHelper(
                                            intl,
                                            `steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.${pleietrengende.årsakManglerIdentitetsnummer}`,
                                        ),
                                    }}
                                />
                            </BodyLong>
                        </Block>
                        <Block margin="m">
                            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.pleietrengende.id')}>
                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length > 0 && (
                                    <AttachmentList attachments={pleietrengendeId} />
                                )}

                                {pleietrengendeId.filter(({ pending, uploaded }) => uploaded || pending).length ===
                                    0 && <FormattedMessage id="step.oppsummering.pleietrengende.id.ingenId" />}
                            </SummaryBlock>
                        </Block>
                    </>
                )}
            </SummaryBlock>
            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.pleierDuDenSykeHjemme.header')}>
                <FormattedMessage id={pleierDuDenSykeHjemme ? 'Ja' : 'Nei'} />
            </SummaryBlock>
            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.flereSokere.header')}>
                <FormattedMessage id={`steg.oppsummering.${flereSøkere}`} />
            </SummaryBlock>
        </SummarySection>
    );
};

export default PleietrengendePersonSummary;
