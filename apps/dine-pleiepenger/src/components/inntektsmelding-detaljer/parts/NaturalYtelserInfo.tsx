import { InlineMessage, List } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../../types';
import { naturalytelseNavn } from '../i18n/naturalytelser';

type NaturalYtelser = Inntektsmelding['naturalYtelser'];

interface Props {
    naturalYtelser?: NaturalYtelser;
}

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
                    Fra {dateFormatter.compact(ytelse.fom)}{' '}
                    {ytelse.endring === 'mister' ? 'får du ikke lenger ' : 'får du '}
                    {naturalytelseNavn[ytelse.type]}, verdi{' '}
                    <FormattedNumber
                        value={ytelse.beløpPerMnd}
                        style="currency"
                        currency="NOK"
                        maximumFractionDigits={2}
                        trailingZeroDisplay="stripIfInteger"
                    />
                </List.Item>
            ))}
        </List>
    );
};

export default NaturalYtelserInfo;
