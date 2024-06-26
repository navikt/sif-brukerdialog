import dayjs from 'dayjs';
import mockSøker from '../../../api-mock-server/mockdata/soker.json';
import mockSøknader from '../../../api-mock-server/mockdata/soknader.json';
import { InnsynsdataContextProvider } from '../../context/InnsynsdataContextProvider';
import { Søker } from '../../server/api-models/SøkerSchema';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';

export const withInnsynsdata = (Story) => (
    <InnsynsdataContextProvider
        innsynsdata={{
            saker: [{ sak: { saksbehandlingsFrist: dayjs().add(5, 'weeks').toDate() } } as any],
            harSak: true,
            søker: mockSøker as any as Søker,
            mellomlagring: {},
            brukerprofil: {} as any,
            innsendteSøknader: mockSøknader as any as InnsendtSøknad[],
        }}>
        <Story />
    </InnsynsdataContextProvider>
);
