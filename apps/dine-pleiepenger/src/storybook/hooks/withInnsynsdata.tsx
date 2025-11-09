import type { Decorator } from '@storybook/react';

import mockSøker from '../../../api-mock-server/mockdata/soker.json';
import { InnsynsdataContextProvider } from '../../context/InnsynsdataContextProvider';
import { Søker } from '../../server/api-models/SøkerSchema';

export const withInnsynsdata: Decorator = (Story) => (
    <InnsynsdataContextProvider
        innsynsdata={{
            saker: [],
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
