import { InlineMessage, List } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../../types';
import { naturalytelseNavn } from '../i18n/naturalytelser';

type NaturalYtelser = Inntektsmelding['naturalYtelser'];

interface Props {
    naturalYtelser?: NaturalYtelser;
}

const renderPeriodeString = (periode?: { fom: Date; tom?: Date }) => {
    if (!periode) {
        return 'I perioden';
    }
    if (!periode.tom) {
        return `Fra ${dateFormatter.compact(periode.fom)}`;
    }
    return `I perioden ${dateFormatter.compact(periode.fom)} - ${dateFormatter.compact(periode.tom)}`;
};

const NaturalYtelserInfo = ({ naturalYtelser }: Props) => {
    if (!naturalYtelser) {
        return <InlineMessage status="warning">Ikke rapportert</InlineMessage>;
    }
    if (naturalYtelser.length === 0) {
        return <>Nei, du beholder eventuelle naturalytelser du har.</>;
    }
    return (
        <List>
            {naturalYtelser.map((ytelse, index) => (
                <List.Item key={index}>
                    {renderPeriodeString(ytelse.periode)} får du ikke lenger {naturalytelseNavn[ytelse.type]}, verdi{' '}
                    <FormattedNumber
                        value={ytelse.beløpPerMnd}
                        style="currency"
                        currency="NOK"
                        maximumFractionDigits={0}
                    />
                </List.Item>
            ))}
        </List>
    );
};

export default NaturalYtelserInfo;
