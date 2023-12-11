import { BodyShort, Box, Heading, Hide, HStack, LinkPanel, LinkPanelProps } from '@navikt/ds-react';
import React from 'react';
import { EditFilled } from '@navikt/ds-icons';

interface Props extends LinkPanelProps {
    title: string;
    description: React.ReactNode;
}

const MellomlagringLinkPanel: React.FunctionComponent<Props> = ({ title, description, ...rest }) => {
    const icon = <EditFilled role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />;
    return (
        <LinkPanel
            {...rest}
            border={false}
            className="
                group
                rounded-lg
                bg-transparent
                text-white
                hover:bg-deepblue-700
                hover:outline-none
                hover:border-transparent
                focus-within:shadow-focus
                focus-within:bg-deepblue-700
                focus-within:shadow-border-on-inverted">
            <HStack gap="4" align={'center'} wrap={false}>
                <Hide below="sm">
                    {icon ? (
                        <Box className="rounded-md bg-blue-600 group-hover:bg-blue-500 p-4">{icon}</Box>
                    ) : undefined}
                </Hide>
                <Box>
                    <Heading level="3" size="small" className="mb-1">
                        {title}
                    </Heading>
                    <BodyShort as="div" size="small" className="text-deepblue-100">
                        {description}
                    </BodyShort>
                </Box>
            </HStack>
        </LinkPanel>
    );
};

export default MellomlagringLinkPanel;
