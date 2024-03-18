import { BodyShort, HStack } from '@navikt/ds-react';
import PageHeader from '../page-header/PageHeader';

interface Props {
    tittel?: string;
    saksnr: string;
    navn: string;
    titleTag?: React.ReactNode;
}

const SakPageHeader: React.FunctionComponent<Props> = ({ tittel = 'Din pleiepengesak', titleTag, saksnr, navn }) => {
    return (
        <PageHeader
            title={tittel}
            titleTag={titleTag}
            byline={
                <BodyShort as="div">
                    <HStack gap="2">
                        <span className="uppercase">Saksnr {saksnr}</span>
                        <span role="presentation">|</span>
                        <span className="text-text-subtle">{navn}</span>
                    </HStack>
                </BodyShort>
            }
        />
    );
};

export default SakPageHeader;
