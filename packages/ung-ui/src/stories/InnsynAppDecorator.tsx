import '../ung-ui.css';

import { Theme } from '@navikt/ds-react';
import { useEffect } from 'react';

export const InnsynAppDecorator = (Story: React.ComponentType) => {
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, []);

    return (
        <Theme hasBackground={false}>
            <Story />
        </Theme>
    );
};
