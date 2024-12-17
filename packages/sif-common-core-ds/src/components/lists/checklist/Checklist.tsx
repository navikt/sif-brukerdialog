import { Heading, VStack } from '@navikt/ds-react';
import './checklist.scss';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    heading?: string;
    headingLevel?: '2' | '3';
}

const Checklist = ({ heading, headingLevel = '2', ...rest }: Props) => (
    <VStack gap="4">
        {heading && (
            <Heading size="medium" level={headingLevel}>
                {heading}
            </Heading>
        )}
        <ul {...rest} className={`checklist ${rest.className ? rest.className : ''}`} />
    </VStack>
);

export default Checklist;
