import { Edit } from '@navikt/ds-icons';
import { Alert, Button } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import React from 'react';
import { AppText } from '../../../i18n';

interface Props {
    visVelgUkerMelding: boolean;
    antallValgteUker: number;
    onEndreUker: () => void;
}

const EndreUkerFooter: React.FunctionComponent<Props> = ({ visVelgUkerMelding, onEndreUker }) => {
    return (
        <div className="arbeidstidUkeFooter">
            <FormBlock margin="m" paddingBottom="m">
                <div aria-relevant="additions removals" aria-live="polite">
                    {visVelgUkerMelding && (
                        <Block padBottom="l">
                            <Alert variant="info">
                                <AppText id="endreUkerFooter.velgUkerFørst.melding" />
                            </Alert>
                        </Block>
                    )}
                </div>
                <Button
                    icon={<Edit role="presentation" aria-hidden={true} />}
                    variant="primary"
                    type="button"
                    data-testid="endre-flere-uker-button"
                    onClick={onEndreUker}>
                    <AppText id="endreUkerFooter.endreButton.label" />
                </Button>
            </FormBlock>
        </div>
    );
};

export default EndreUkerFooter;
