import type { Decorator } from '@storybook/react';

import mockSøker from '../../../api-mock-server/mockdata/en-sak/soker.json';
import { InnsynsdataContextProvider } from '../../context/InnsynsdataContextProvider';
import { Søker } from '../../types';

export const withInnsynsdata: Decorator = (Story) => (
    <InnsynsdataContextProvider
        innsynsdata={{
            sakerMetadata: [
                {
                    saksnummer: '123',
                    pleietrengende: { fornavn: 'Test', etternavn: 'Person', fødselsdato: '2010-01-01', aktørId: '123' },
                } as any,
            ],
            harSak: true,
            søker: mockSøker as any as Søker,
        }}>
        <Story />
    </InnsynsdataContextProvider>
);
