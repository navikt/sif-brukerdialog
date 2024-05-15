import { Alert, Checkbox } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { AppText } from '../../../i18n';

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
                <AppText id="endreUkerHeader.cb.endreFlereSamtidig.label" />
            </Checkbox>
            {visKorteUkerMelding && (
                <Block margin="m" padBottom="l">
                    <Alert variant="info">
                        <AppText id="endreUkerHeader.korteUker.melding" />
                    </Alert>
                </Block>
            )}
        </>
    );
};

export default EndreUkerHeader;
