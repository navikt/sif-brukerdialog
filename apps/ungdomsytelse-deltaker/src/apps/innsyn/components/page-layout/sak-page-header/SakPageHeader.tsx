import { BodyShort, HStack } from '@navikt/ds-react';
import PageHeader from '../page-header/PageHeader';

interface Props {
    tittel: string;
    titleTag: React.ReactNode;
}

const SakPageHeader: React.FunctionComponent<Props> = ({ tittel, titleTag }) => {
    return (
        <PageHeader
            documentTitle={tittel}
            title={tittel}
            titleTag={titleTag}
            byline={
                <BodyShort as="div">
                    <HStack gap="2">sdf</HStack>
                </BodyShort>
            }
        />
    );
};

export default SakPageHeader;
