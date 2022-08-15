import { Heading, Link } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import getLenker from '../../../lenker';

const DinePlikterContent: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <>
            <Heading size="medium" level="2">
                <FormattedMessage id="modal.dinePlikter.tittel" />
            </Heading>
            <ul>
                <li>
                    <FormattedMessage id="modal.dinePlikter.part1" />
                    <ul>
                        <li>
                            <FormattedMessage id="modal.dinePlikter.part1a" />
                        </li>
                        <li>
                            <FormattedMessage id="modal.dinePlikter.part1b" />
                        </li>
                    </ul>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                    <span>
                        <FormattedMessage id="modal.dinePlikter.part2a" />{' '}
                        <Link href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                            <FormattedMessage id="modal.dinePlikter.part2b" />
                        </Link>
                    </span>
                </li>
            </ul>
        </>
    );
};

export default DinePlikterContent;
