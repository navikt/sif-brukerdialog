import { BodyShort, Box, HStack, Heading, Hide, LinkPanel, LinkPanelProps } from '@navikt/ds-react';
import React from 'react';

interface Props extends LinkPanelProps {
    icon?: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const SnarveiLinkPanel: React.FunctionComponent<Props> = ({ icon, title, description, ...rest }) => {
    return (
        <LinkPanel border={false} {...rest} className={`rounded-lg shadow ${rest.className}`}>
            <HStack gap="4" align={'center'} wrap={false}>
                <Hide below="sm">{icon ? <Box className="rounded-full bg-bg-subtle p-4">{icon}</Box> : undefined}</Hide>
                <Box>
                    <Heading as="div" level="3" size="small" className="mb-1">
                        {title}
                    </Heading>
                    <BodyShort as="div" className="text-grayalpha-700">
                        {description}
                    </BodyShort>
                </Box>
            </HStack>
        </LinkPanel>
    );
};

export default SnarveiLinkPanel;
