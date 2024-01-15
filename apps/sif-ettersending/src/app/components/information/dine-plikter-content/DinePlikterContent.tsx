import { Heading, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import getLenker from '../../../lenker';
import { Søknadstype } from '../../../types/Søknadstype';

interface Props {
    søknadstype: Søknadstype;
}

const DinePlikterContent = ({ søknadstype }: Props) => {
    const intl = useIntl();
    const søknadstypeText = intlHelper(intl, `søknadstype.${søknadstype}`);
    return (
        <>
            <Heading level="1" size="large">
                <FormattedMessage id="modal.minePlikter.tittel" />
            </Heading>
            <ul>
                <li>
                    <FormattedMessage id="modal.minePlikter.part1" values={{ søknadstype: søknadstypeText }} />
                    <ul style={{ marginTop: '.5rem' }}>
                        <li>
                            <FormattedMessage id="modal.minePlikter.part1a" />
                        </li>
                        <li style={{ marginTop: '.5rem' }}>
                            <FormattedMessage id="modal.minePlikter.part1b" />
                        </li>
                    </ul>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                    <span>
                        <FormattedMessage id="modal.minePlikter.part2a" />{' '}
                        <Link href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                            <FormattedMessage id="modal.minePlikter.part2b" />
                        </Link>
                        .
                    </span>
                </li>
            </ul>
        </>
    );
};

export default DinePlikterContent;
