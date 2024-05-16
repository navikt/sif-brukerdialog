import { BodyLong, Heading, Link } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import getLenker from '../../../lenker';
import { Søknadstype } from '../../../types/Søknadstype';
import { AppText } from '../../../i18n';

interface Props {
    søknadstype: Søknadstype;
}

const BehandlingAvPersonopplysningerContent = ({ søknadstype }: Props) => {
    const intl = useIntl();
    return (
        <>
            <Heading level="1" size="large">
                <AppText id="modal.personopplysninger.1" />
            </Heading>
            <BodyLong as="div">
                <Block margin="xl">
                    <AppText id="modal.personopplysninger.2" />
                </Block>
                <Block margin="xl">
                    <Heading size="medium" level="2">
                        <AppText id="modal.personopplysninger.3" />
                    </Heading>
                    <p>
                        <AppText id="modal.personopplysninger.4" />
                    </p>

                    <ul>
                        {søknadstype === Søknadstype.pleiepengerLivetsSluttfase && (
                            <li>
                                <AppText id="modal.personopplysninger.4.1.pleiepengerLivetsSluttfase" />
                            </li>
                        )}
                        {søknadstype !== Søknadstype.pleiepengerLivetsSluttfase && (
                            <>
                                <li>
                                    <AppText id="modal.personopplysninger.4.1" />
                                </li>
                                <li>
                                    <AppText id="modal.personopplysninger.4.2" />
                                </li>
                            </>
                        )}

                        <li>
                            <AppText id="modal.personopplysninger.4.3" />
                        </li>
                        <li>
                            <AppText id="modal.personopplysninger.4.4" />
                        </li>
                        <li>
                            <AppText id="modal.personopplysninger.4.5" />
                        </li>
                        <li>
                            <AppText id="modal.personopplysninger.4.6" />
                        </li>
                    </ul>
                </Block>
                {søknadstype === Søknadstype.pleiepengerLivetsSluttfase && (
                    <Block margin="xl">
                        <p>
                            <AppText id="modal.personopplysninger.4.7" />
                        </p>
                    </Block>
                )}
                <Block margin="xl">
                    <p>
                        <AppText id="modal.personopplysninger.5.1" />
                        {` `}
                        <Link href={getLenker(intl.locale).personvern} target="_blank">
                            <AppText id="modal.personopplysninger.5.2" />
                        </Link>
                        <AppText id="modal.personopplysninger.5.3" />
                    </p>
                </Block>
            </BodyLong>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
