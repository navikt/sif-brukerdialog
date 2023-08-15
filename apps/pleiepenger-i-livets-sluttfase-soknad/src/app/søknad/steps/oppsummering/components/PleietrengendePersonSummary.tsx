import { FormattedMessage, useIntl } from 'react-intl';
import { PleietrengendeApi } from '../../../../types/søknadApiData/SøknadApiData';
import { FødselsnummerSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import { Ingress } from '@navikt/ds-react';

interface Props {
    pleietrengende: PleietrengendeApi;
    pleietrengendeId: Attachment[];
}

const PleietrengendePersonSummary = ({ pleietrengende, pleietrengendeId }: Props) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.pleietrengende.header')}>
            <SummaryBlock header={pleietrengende.navn}>
                {pleietrengende.fødselsdato ? (
                    <Ingress>
                        <FormattedMessage
                            id="steg.oppsummering.pleietrengende.fødselsdato"
                            values={{
                                dato: prettifyDate(ISODateToDate(pleietrengende.fødselsdato)),
                            }}
                        />
                    </Ingress>
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
                            <Ingress>
                                <FormattedMessage
                                    id="steg.oppsummering.pleietrengende.harIkkeFnr"
                                    values={{
                                        årsak: intlHelper(
                                            intl,
                                            `steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.${pleietrengende.årsakManglerIdentitetsnummer}`,
                                        ),
                                    }}
                                />
                            </Ingress>
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
        </SummarySection>
    );
};

export default PleietrengendePersonSummary;
