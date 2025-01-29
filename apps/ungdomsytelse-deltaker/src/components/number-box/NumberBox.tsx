import { HGrid, VStack } from '@navikt/ds-react';
import NumberCircle from '../number-circle/NumberCircle';

interface Props {
    number: string | number;
    children: React.ReactNode;
}

const NumberBox = ({ children, number }: Props) => (
    <HGrid columns={'2.5rem auto'}>
        <div style={{ marginTop: '-.1rem', paddingRight: '1rem' }} role="presentation" aria-hidden={true}>
            <NumberCircle number={number} />
        </div>
        <VStack>{children}</VStack>
    </HGrid>
);

export default NumberBox;
