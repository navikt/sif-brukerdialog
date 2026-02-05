import { ReadMore } from '@navikt/ds-react';

import { useAppIntl } from '../../../i18n';
import { Dokument } from '../../../types';
import Dokumenter from './Dokumenter';

interface Props {
    dokumenter: Dokument[];
}

const EttersendelseStatusContent = ({ dokumenter }: Props) => {
    const { text } = useAppIntl();
    return (
        <ReadMore header={text('statusISak.søknadStatusContent.ettersendelse.readMoreHeader')}>
            <Dokumenter dokumenter={dokumenter} />
        </ReadMore>
    );
};

export default EttersendelseStatusContent;
