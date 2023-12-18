import { Alert, Checkbox } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';

interface Props {
    visKorteUkerMelding?: boolean;
    ukerKanVelges: boolean;
    onUkerKanVelgesChange: (checked: boolean) => void;
}

const EndreUkerHeader: React.FunctionComponent<Props> = ({
    ukerKanVelges,
    onUkerKanVelgesChange: onUkerKanVelgesChange,
    visKorteUkerMelding,
}) => {
    return (
        <>
            <Checkbox
                checked={ukerKanVelges}
                data-testid="endre-flere-uker-cb"
                onChange={(evt) => {
                    onUkerKanVelgesChange(evt.target.checked);
                }}>
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
