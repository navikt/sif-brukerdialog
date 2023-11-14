import { Heading } from '@navikt/ds-react';
import Image from 'next/image';
const PageHeader = () => {
    return (
        <header className="bg-[--a-deepblue-50]">
            <div className="text-left">
                <Heading size="large" level="1" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Image alt="abc" src="/dine-pleiepenger/pleiepenger.svg" width={72} height={72} />
                    <span className="text-deepblue-800">Dine Pleiepenger</span>
                </Heading>
            </div>
        </header>
    );
};

export default PageHeader;
