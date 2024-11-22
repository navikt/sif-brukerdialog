import { Heading, List } from '@navikt/ds-react';
import { Deltakelse } from '../../../api/types';
import DeltakelseTable from '../../../components/deltakelse-table/DeltakelseTable';

interface Props {
    deltakerFnr: string;
    deltakelser: Deltakelse[];
}

const EndreDeltakelseperiode = ({ deltakelser }: Props) => (
    <>
        <Heading level="3" size="small" spacing={true}>
            Params
        </Heading>
        <List>
            <List.Item>
                <code>deltakelseId</code>
            </List.Item>
            <List.Item>
                <code>periodeId</code>
            </List.Item>
            <List.Item>
                <code>startdato?</code>
            </List.Item>
            <List.Item>
                <code>sluttdato?</code>
            </List.Item>
        </List>
        <DeltakelseTable deltakelser={deltakelser} editable={true} />
    </>
);

export default EndreDeltakelseperiode;
