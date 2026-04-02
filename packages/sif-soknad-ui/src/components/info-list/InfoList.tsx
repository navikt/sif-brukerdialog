import './infoList.css';

import { Heading, VStack } from '@navikt/ds-react';

interface Props extends React.HTMLAttributes<HTMLOListElement> {
    heading?: string;
    headingLevel?: '2' | '3';
}

export const InfoList = ({ heading, headingLevel = '2', ...rest }: Props) => (
    <VStack gap="space-16">
        {heading && (
            <Heading size="medium" level={headingLevel}>
                {heading}
            </Heading>
        )}
        <ol {...rest} className={`infoList ${rest.className ? rest.className : ''}`} />
    </VStack>
);
