import { Heading, HGrid, Show } from '@navikt/ds-react';
import HandsIll from './hands';

const HuskelappInntekt = () => (
    <HGrid
        align="center"
        columns={{ md: 'auto 1fr' }}
        gap="8"
        className="inline-block rounded-xl p-8"
        style={{ backgroundColor: '#CCE9F2', color: '#002060' }}>
        <Heading as="div" level="2" size="medium" style={{ fontWeight: '300' }}>
            Husk å melde fra mellom 1. - 6. hver måned hvis du starter å jobbe og får utbetalt lønn mens du er i
            ungdomsprogrammet.
        </Heading>
        <Show above="md">
            <div>
                <HandsIll />
            </div>
        </Show>
    </HGrid>
);

export default HuskelappInntekt;
