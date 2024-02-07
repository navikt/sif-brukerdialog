import { BodyShort, HStack } from '@navikt/ds-react';
import PageHeader from '../page-header/PageHeader';

interface Props {
    title?: string;
    saksnr: string;
    navn: string;
}

const SakPageHeader: React.FunctionComponent<Props> = ({ title = 'Din pleiepengesak', saksnr, navn }) => {
    return (
        <PageHeader
            title={title}
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
