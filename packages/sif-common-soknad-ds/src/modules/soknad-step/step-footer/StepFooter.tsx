import { BodyShort, Button } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import AvbrytSoknadDialog from '../../../components/avbrytSøknadDialog/AvbrytSøknadDialog';
import FortsettSøknadSenereDialog from '../../../components/fortsettSøknadSenereDialog/FortsettSøknadSenereDialog';
import './stepFooter.scss';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props) {
    const [visAvbrytDialog, setVisAvbrytDialog] = React.useState<boolean>(false);
    const [visFortsettSenereDialog, setVisFortsettSenereDialog] = React.useState<boolean>(false);

    const bem = bemUtils('stepFooter');
    return (
        <>
            <div className={bem.block}>
                <div className={bem.element('horizontalDivider')} />
                <div className={bem.element('actions')}>
                    {onAvbrytOgFortsettSenere && (
                        <Button
                            type="button"
                            variant="tertiary"
                            size="small"
                            onClick={() => setVisFortsettSenereDialog(true)}>
                            <BodyShort as="span">
                                <FormattedMessage id="steg.footer.fortsettSenere" />
                            </BodyShort>
                        </Button>
                    )}
                    {onAvbrytOgSlett && (
                        <Button type="button" variant="tertiary" size="small" onClick={() => setVisAvbrytDialog(true)}>
                            <BodyShort as="span">
                                <FormattedMessage id="steg.footer.avbryt" />
                            </BodyShort>
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
