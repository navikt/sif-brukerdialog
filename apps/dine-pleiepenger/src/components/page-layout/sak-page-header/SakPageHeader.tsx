import { BodyShort, HStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../i18n';
import { Pleietrengende } from '../../../server/api-models/PleietrengendeSchema';
import { personaliaUtils } from '../../../utils/personaliaUtils';
import PageHeader from '../page-header/PageHeader';

interface Props {
    saksnr: string;
    pleietrengende: Pleietrengende;
    tittel?: string;
    titleTag?: React.ReactNode;
}

const SakPageHeader = ({ tittel, titleTag, saksnr, pleietrengende }: Props) => {
    const { text } = useAppIntl();
    return (
        <PageHeader
            documentTitle={tittel || text('sakPageHeader.defaultTittel')}
            title={tittel || text('sakPageHeader.defaultTittel')}
            titleTag={titleTag}
            byline={
                <BodyShort as="div">
                    <HStack gap="2">
                        <span>
                            <AppText id="sakPageHeader.saksnr" values={{ saksnr }} />
                        </span>
                        <span aria-hidden={true} className="sakPageHeaderPipe">
                            |
                        </span>
                        {pleietrengende.anonymisert ? (
                            <AppText
                                id="sakPageHeader.pleietrengende.anonymisert"
                                values={{
                                    dato: dateFormatter.compact(pleietrengende.fødselsdato),
                                }}
                            />
                        ) : (
                            <AppText
                                id="sakPageHeader.pleietrengende"
                                values={{
                                    navn: personaliaUtils.navn(pleietrengende, text),
                                }}
                            />
                        )}
                    </HStack>
                </BodyShort>
            }
        />
    );
};

export default SakPageHeader;
