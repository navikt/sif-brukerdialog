import { ReactElement } from 'react';
import { GuidePanel } from '@navikt/ds-react';

const ErrorFallback = (): ReactElement => {
    return (
        <div className="p-5 pb-10 md:p-10 md:pb-20">
            <GuidePanel>
                Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt med
                oss hvis det ikke har løst seg til i morgen.
            </GuidePanel>
        </div>
    );
};

export default ErrorFallback;
