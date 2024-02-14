import { InnsynsdataContextProvider } from '../../context/InnsynsdataContextProvider';
import mockSøknader from '../../../api-mock-server/mockdata/soknader.json';
import mockSøker from '../../../api-mock-server/mockdata/soknader.json';
import { Søker } from '../../server/api-models/SøkerSchema';
import { InnsendtSøknad } from '../../types/Søknad';
import dayjs from 'dayjs';
import { defaultAppStatus } from '../../pages/api/appStatus.api';

export const withInnsynsdata = (Story) => (
    <InnsynsdataContextProvider
        innsynsdata={{
            saker: [{ saksbehandlingsFrist: dayjs().add(5, 'weeks').toDate() } as any],
            appStatus: defaultAppStatus,
            harSak: true,
            søker: mockSøker as any as Søker,
            mellomlagring: {},
            innsendteSøknader: mockSøknader as any as InnsendtSøknad[],
        }}>
        <Story />
    </InnsynsdataContextProvider>
);
