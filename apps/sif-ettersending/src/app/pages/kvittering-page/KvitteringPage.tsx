import { Link } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { DokumentType } from '../../types/DokumentType';
import { Søknadstype } from '../../types/Søknadstype';
import { Infolist } from '@navikt/sif-common-core-ds/src';

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
            <Kvittering
                tittel={text(
                    erLegeerklæringPSB
                        ? 'page.confirmation.psb.legeerklæring.tittel'
                        : 'page.confirmation.generell.tittel',
                )}>
                <Infolist>
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
                </Infolist>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
