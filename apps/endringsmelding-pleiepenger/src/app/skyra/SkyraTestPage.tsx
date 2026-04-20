import { BodyShort, Heading } from '@navikt/ds-react';

import Skyra, { Slug } from './Skyra';
import { SkyraHandler } from './SkyraHandler';

const SkyraTestPage = () => {
    return (
        <>
            <SkyraHandler />
            <Heading size="medium" level="2">
                Skyra testside
            </Heading>
            <BodyShort>Slug: {Slug.kvittering_inline}</BodyShort>
            <Skyra slug={Slug.kvittering_inline} />
        </>
    );
};

export default SkyraTestPage;
