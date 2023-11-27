import { Heading } from '@navikt/ds-react';
import { Mellomlagringer } from '../../types/Mellomlagring';
import MellomlagringInfo from './MellomlagringInfo';

interface Props {
    mellomlagringer: Mellomlagringer;
}
const DineMellomlagringer: React.FunctionComponent<Props> = ({ mellomlagringer: { endring, søknad } }) => {
    return (
        <div>
            <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                Vil du fortsette der du slapp?
            </Heading>

            <MellomlagringInfo søknad={søknad} endring={endring} />
        </div>
    );
};

export default DineMellomlagringer;
