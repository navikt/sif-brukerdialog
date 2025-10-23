import dayjs from 'dayjs';

import mockSøker from '../../../api-mock-server/mockdata/soker.json';
import { InnsynsdataContextProvider } from '../../context/InnsynsdataContextProvider';
import { Søker } from '../../server/api-models/SøkerSchema';

export const withInnsynsdata = (Story) => (
    <InnsynsdataContextProvider
        innsynsdata={{
            saker: [{ sak: { saksbehandlingsFrist: dayjs().add(5, 'weeks').toDate() } } as any],
            harSak: true,
            søker: mockSøker as any as Søker,
        }}>
        <Story />
    </InnsynsdataContextProvider>
);
