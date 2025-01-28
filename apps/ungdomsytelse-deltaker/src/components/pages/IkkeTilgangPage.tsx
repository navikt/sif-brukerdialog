import { IkkeTilgangÅrsak } from '../../types';
import FlereDeltakelserPage from './FlereDeltakelserPage';
import IngenDeltakelsePage from './IngenDeltakelsePage';

interface Props {
    årsak?: IkkeTilgangÅrsak;
}

const IkkeTilgangPage = ({ årsak }: Props) => {
    switch (årsak) {
        case IkkeTilgangÅrsak.FOR_MANGE_DELTAKELSER:
            return <FlereDeltakelserPage />;
        case IkkeTilgangÅrsak.INGEN_DELTAKELSE:
            return <IngenDeltakelsePage />;
        default:
            return <IngenDeltakelsePage />;
    }
};

export default IkkeTilgangPage;
