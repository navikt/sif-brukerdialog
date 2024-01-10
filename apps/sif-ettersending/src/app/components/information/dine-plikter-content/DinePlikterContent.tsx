import { Heading, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import getLenker from '../../../lenker';
import { Søknadstype } from '../../../types/Søknadstype';

const getText = (part: string) => <FormattedMessage id={`modal.minePlikter.${part}`} />;

interface Props {
    søknadstype: Søknadstype;
}

const DinePlikterContent = ({ søknadstype }: Props) => {
    const intl = useIntl();
    const søknadstypeText = intlHelper(intl, `søknadstype.${søknadstype}`);
    return (
        <>
            <Heading level="1" size="large">
                {getText('tittel')}
            </Heading>
            <ul>
                <li>
                    <FormattedMessage id="modal.minePlikter.part1" values={{ søknadstype: søknadstypeText }} />
                    <ul style={{ marginTop: '.5rem' }}>
                        <li>{getText('part1a')}</li>
                        <li style={{ marginTop: '.5rem' }}>{getText('part1b')}</li>
                    </ul>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                    <span>
                        {getText('part2a')}{' '}
                        <Link href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                            {getText('part2b')}
                        </Link>
                        .
                    </span>
                </li>
            </ul>
        </>
    );
};

export default DinePlikterContent;
