import { Alert, Checkbox } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { DateRange, getDateRangeText } from '@navikt/sif-common-utils/lib';

interface Props {
    checked: boolean;
    periode?: DateRange;
    visKorteUkerMelding?: boolean;
    onChange: (checked: boolean) => void;
}

const EndreUkerHeader: React.FunctionComponent<Props> = ({
    checked: visVelgUke,
    onChange,
    periode,
    visKorteUkerMelding,
}) => {
    return (
        <>
            <Checkbox
                checked={visVelgUke}
                data-testid="endre-flere-uker-cb"
                onChange={(evt) => {
                    onChange(evt.target.checked);
                }}
                aria-label={`Jeg ønsker å endre flere uker samtidig ${
                    periode ? `i perioden ${getDateRangeText(periode)}` : ''
                }`}>
                Jeg ønsker å endre flere uker samtidig
            </Checkbox>
            {visKorteUkerMelding && (
                <Block margin="m" padBottom="l">
                    <Alert variant="info">
                        Korte uker, altså ikke hele uker, eller uker med ferie må endres hver for seg.
                    </Alert>
                </Block>
            )}
        </>
    );
};

export default EndreUkerHeader;
