import './infoList.css';

import { Heading, VStack } from '@navikt/ds-react';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
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
        <ol {...rest} className={`infolist ${rest.className ? rest.className : ''}`} />
    </VStack>
);
