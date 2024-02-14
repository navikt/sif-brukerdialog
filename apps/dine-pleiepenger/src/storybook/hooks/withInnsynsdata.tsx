import dayjs from 'dayjs';
import mockSøker from '../../../api-mock-server/mockdata/soker.json';
import mockSøknader from '../../../api-mock-server/mockdata/soknader.json';
import { InnsynsdataContextProvider } from '../../context/InnsynsdataContextProvider';
import { Søker } from '../../server/api-models/SøkerSchema';
import { InnsendtSøknad } from '../../types/Søknad';

export const withInnsynsdata = (Story) => (
    <InnsynsdataContextProvider
        innsynsdata={{
            saker: [{ saksbehandlingsFrist: dayjs().add(5, 'weeks').toDate() } as any],

            harSak: true,
            søker: mockSøker as any as Søker,
            mellomlagring: {},
            innsendteSøknader: mockSøknader as any as InnsendtSøknad[],
        }}>
        <Story />
    </InnsynsdataContextProvider>
);
