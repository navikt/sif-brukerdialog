import { Heading } from '@navikt/ds-react';
import PleiepengerSVG from '../../../svg/pleiepenger';

const PageHeader = () => {
    return (
        <div className="bg-[--a-deepblue-50]">
            <div className="text-left">
                <Heading size="large" level="1" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <PleiepengerSVG />
                    <span className="text-deepblue-800">Dine Pleiepenger</span>
                </Heading>
            </div>
        </div>
    );
};

export default PageHeader;
