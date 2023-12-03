import { InnsynsdataContextProvider } from '../../context/InnsynsdataContextProvider';
import mockSøknader from '../../../api-mock-server/mockdata/soknader.json';
import mockSøker from '../../../api-mock-server/mockdata/soknader.json';
import { Søker } from '../../server/api-models/SøkerSchema';
import { Søknad } from '../../types/Søknad';
import dayjs from 'dayjs';

export const withInnsynsdata = (Story) => (
    <InnsynsdataContextProvider
        innsynsdata={{
            svarfrist: dayjs().add(5, 'weeks').toDate(),
            søker: mockSøker as any as Søker,
            mellomlagring: {},
            søknader: mockSøknader as any as Søknad[],
        }}>
        <Story />
    </InnsynsdataContextProvider>
);
