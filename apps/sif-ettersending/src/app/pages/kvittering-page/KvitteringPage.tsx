import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { DokumentType } from '../../types/DokumentType';
import { Søknadstype } from '../../types/Søknadstype';
import './kvitteringPage.css';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';

interface Props {
    søknadstype: Søknadstype;
    dokumenttype?: DokumentType;
}

const KvitteringPage = ({ søknadstype, dokumenttype }: Props) => {
    const { text } = useAppIntl();

    const erLegeerklæringPSB =
        søknadstype === Søknadstype.pleiepengerSyktBarn && dokumenttype === DokumentType.legeerklæring;

    return (
        <Page
            title={text(
                erLegeerklæringPSB
                    ? 'page.confirmation.psb.legeerklæring.sidetittel'
                    : 'page.confirmation.generell.sidetittel',
            )}>
            <VStack gap="8" align="center" justify="center" marginBlock="0 8" role="presentation" aria-hidden="true">
                <CheckmarkIcon />
                <Heading level="1" size="large" data-testid="søknad-mottatt">
                    <AppText
                        id={
                            erLegeerklæringPSB
                                ? 'page.confirmation.psb.legeerklæring.tittel'
                                : 'page.confirmation.generell.tittel'
                        }
                    />
                </Heading>
            </VStack>

            <BodyLong as="div">
                <Block margin="xl">
                    <ul className="checklist">
                        <li>
                            <AppText
                                id={
                                    erLegeerklæringPSB
                                        ? 'page.confirmation.psb.legeerklæring.info'
                                        : 'page.confirmation.generell.info'
                                }
                                values={{
                                    Lenke: (children) => (
                                        <Link href={getLenker().INNSYN_PP} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </li>
                    </ul>
                </Block>
            </BodyLong>
        </Page>
    );
};

export default KvitteringPage;
