import { BodyShort, HStack } from '@navikt/ds-react';
import PageHeader from '../page-header/PageHeader';
import { Msg, useMessages } from '../../../i18n';

interface Props {
    saksnr: string;
    navn: string;
    tittel?: string;
    titleTag?: React.ReactNode;
}

const SakPageHeader: React.FunctionComponent<Props> = ({ tittel, titleTag, saksnr, navn }) => {
    const { text } = useMessages();
    return (
        <PageHeader
            title={tittel || text('sakPageHeader.defaultTittel')}
            titleTag={titleTag}
            byline={
                <BodyShort as="div">
                    <HStack gap="2">
                        <span>
                            <Msg id="sakPageHeader.saksnr" values={{ saksnr }} />
                        </span>
                        <span aria-hidden={true} className="sakPageHeaderPipe">
                            |
                        </span>
                        <Msg id="sakPageHeader.pleietrengende" values={{ navn }} />
                    </HStack>
                </BodyShort>
            }
        />
    );
};

export default SakPageHeader;
