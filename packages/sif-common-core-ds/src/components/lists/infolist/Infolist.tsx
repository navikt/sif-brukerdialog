import { Heading, VStack } from '@navikt/ds-react';
import './infolist.scss';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    heading?: string;
    headingLevel?: '2' | '3';
}

const Infolist = ({ heading, headingLevel = '2', ...rest }: Props) => (
    <VStack gap="4">
        {heading && (
            <Heading size="medium" level={headingLevel}>
                {heading}
            </Heading>
        )}
        <ol {...rest} className={`infolist ${rest.className ? rest.className : ''}`} />
    </VStack>
);

export default Infolist;
