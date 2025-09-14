import './stepFooter.scss';

import { FloppydiskIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button } from '@navikt/ds-react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import React from 'react';

import AvbrytSoknadDialog from '../../../components/avbrytSøknadDialog/AvbrytSøknadDialog';
import FortsettSøknadSenereDialog from '../../../components/fortsettSøknadSenereDialog/FortsettSøknadSenereDialog';
import { useSoknadIntl } from '../../../hooks/useSoknadIntl';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props) {
    const { text } = useSoknadIntl();
    const [visAvbrytDialog, setVisAvbrytDialog] = React.useState<boolean>(false);
    const [visFortsettSenereDialog, setVisFortsettSenereDialog] = React.useState<boolean>(false);

    const bem = bemUtils('stepFooter');
    return (
        <>
            <div className={bem.block}>
                <div className={bem.element('horizontalDivider')} />
                <div className={bem.element('actions')}>
                    {onAvbrytOgFortsettSenere && (
                        <Box asChild marginBlock={{ xs: '4 0', sm: '0' }}>
                            <Button
                                type="button"
                                variant="tertiary"
                                icon={<FloppydiskIcon aria-hidden={true} />}
                                onClick={() => setVisFortsettSenereDialog(true)}>
                                {text('@soknad.stepFooter.fortsettSenere')}
                            </Button>
                        </Box>
                    )}
                    {onAvbrytOgSlett && (
                        <Button
                            type="button"
                            variant="tertiary"
                            onClick={() => setVisAvbrytDialog(true)}
                            icon={<TrashIcon aria-hidden={true} />}>
                            {text('@soknad.stepFooter.avbryt')}
                        </Button>
                    )}
                </div>
            </div>
            {onAvbrytOgFortsettSenere && (
                <FortsettSøknadSenereDialog
                    synlig={visFortsettSenereDialog}
                    onFortsettSøknadSenere={onAvbrytOgFortsettSenere}
                    onFortsettSøknad={() => setVisFortsettSenereDialog(false)}
                />
            )}
            {onAvbrytOgSlett && (
                <AvbrytSoknadDialog
                    synlig={visAvbrytDialog}
                    onAvbrytSøknad={onAvbrytOgSlett}
                    onFortsettSøknad={() => setVisAvbrytDialog(false)}
                />
            )}
        </>
    );
}

export default StepFooter;
