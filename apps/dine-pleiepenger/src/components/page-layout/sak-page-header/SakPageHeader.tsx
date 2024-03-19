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
                        <span className="uppercase">
                            <Msg id="sakPageHeader.saksnr" values={{ saksnr }} />
                        </span>
                        <span aria-hidden={true}>|</span>
                        <span className="text-text-subtle">{navn}</span>
                    </HStack>
                </BodyShort>
            }
        />
    );
};

export default SakPageHeader;
