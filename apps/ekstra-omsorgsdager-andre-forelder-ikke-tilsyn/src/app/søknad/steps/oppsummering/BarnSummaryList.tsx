import { List } from '@navikt/ds-react';
import { useAppIntl } from '../../../i18n';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    barn: ApiBarn[];
}

const BarnSummaryList = ({ barn }: Props) => {
    const { text } = useAppIntl();
    return (
        <List>
            {barn.map((b, idx) => (
                <List.Item key={idx}>
                    {b.navn}
                    {b.norskIdentifikator
                        ? text('step.oppsummering.omBarna.listItem', { identitetsnummer: b.norskIdentifikator })
                        : ''}
                </List.Item>
            ))}
        </List>
    );
};

export default BarnSummaryList;
