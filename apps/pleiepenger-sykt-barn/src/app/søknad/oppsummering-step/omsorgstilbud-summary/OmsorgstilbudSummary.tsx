import React from 'react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import { SummaryBlock, SummarySection, TextareaSvar } from '@navikt/sif-common-ui';
import { DateRange, prettifyDateExtended } from '@navikt/sif-common-utils';
import Sitat from '../../../components/sitat/Sitat';
import { AppText } from '../../../i18n';
import TidEnkeltdager from '../../../local-sif-common-pleiepenger/components/dager-med-tid/TidEnkeltdager';
import TidFasteDager from '../../../local-sif-common-pleiepenger/components/dager-med-tid/TidFasteDager';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { søkerFortidOgFremtid, søkerKunFortid, søkerKunFremtid } from '../../../utils/søknadsperiodeUtils';

interface Props {
    søknadsperiode: DateRange;
    apiValues: SøknadApiData;
}

const OmsorgstilbudSummary: React.FC<Props> = ({
    apiValues: { nattevåk, beredskap, omsorgstilbud },
    søknadsperiode,
}) => {
    const { text } = useAppIntl();

    return (
        <>
            <SummarySection
                header={text('steg.oppsummering.omsorgstilbud.header', {
                    fra: prettifyDateExtended(søknadsperiode.from),
                    til: prettifyDateExtended(søknadsperiode.to),
                })}>
                {omsorgstilbud === undefined && (
                    <>
                        {(søkerKunFortid(søknadsperiode) || søkerFortidOgFremtid(søknadsperiode)) && (
                            <SummaryBlock header={text('steg.oppsummering.omsorgstilbud.fortid.spm')}>
                                <div data-testid="oppsummering-omsorgstilbud-svarFortid">
                                    <AppText id={`steg.oppsummering.omsorgstilbud.fortid.svar.NEI`} />
                                </div>
                            </SummaryBlock>
                        )}
                        {(søkerKunFremtid(søknadsperiode) || søkerFortidOgFremtid(søknadsperiode)) && (
                            <SummaryBlock
                                header={text(
                                    søkerFortidOgFremtid(søknadsperiode)
                                        ? 'steg.oppsummering.omsorgstilbud.fremtid.spm'
                                        : 'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid',
                                )}>
                                <div data-testid="oppsummering-omsorgstilbud-svarFremtid">
                                    <AppText id={`steg.oppsummering.omsorgstilbud.fremtid.svar.NEI`} />
                                </div>
                            </SummaryBlock>
                        )}
                    </>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.svarFortid && (
                    <SummaryBlock header={text('steg.oppsummering.omsorgstilbud.fortid.spm')}>
                        <div data-testid="oppsummering-omsorgstilbud-svarFortid">
                            <AppText id={`steg.oppsummering.omsorgstilbud.fortid.svar.${omsorgstilbud.svarFortid}`} />
                        </div>
                    </SummaryBlock>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.svarFremtid && (
                    <SummaryBlock
                        header={text(
                            søkerFortidOgFremtid(søknadsperiode)
                                ? 'steg.oppsummering.omsorgstilbud.fremtid.spm'
                                : 'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid',
                        )}>
                        <div data-testid="oppsummering-omsorgstilbud-svarFremtid">
                            <AppText id={`steg.oppsummering.omsorgstilbud.fremtid.svar.${omsorgstilbud.svarFremtid}`} />
                        </div>
                    </SummaryBlock>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.ukedager && (
                    <SummaryBlock
                        header={text(
                            søkerKunFortid(søknadsperiode)
                                ? 'steg.oppsummering.omsorgstilbud.fast.header.fortid'
                                : 'steg.oppsummering.omsorgstilbud.fast.header',
                        )}>
                        <TidFasteDager fasteDager={omsorgstilbud.ukedager} />
                    </SummaryBlock>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.enkeltdager && (
                    <SummaryBlock header={text('steg.oppsummering.omsorgstilbud.enkeltdager.header')}>
                        <TidEnkeltdager dager={omsorgstilbud.enkeltdager} />
                    </SummaryBlock>
                )}
            </SummarySection>
            {(nattevåk || beredskap) && (
                <SummarySection header={text('steg.oppsummering.nattevåkBeredskap.header')}>
                    {nattevåk && (
                        <Block margin="xl">
                            <ContentWithHeader header={text('steg.nattevåkOgBeredskap.nattevåk.spm')}>
                                <div data-testid="oppsummering-nattevåk">
                                    <AppText id={nattevåk.harNattevåk === true ? 'Ja' : 'Nei'} />
                                </div>

                                {nattevåk.harNattevåk === true && nattevåk.tilleggsinformasjon && (
                                    <Sitat>
                                        <div data-testid="oppsummering-nattevåk-tilleggsinformasjon">
                                            <TextareaSvar text={nattevåk.tilleggsinformasjon} />
                                        </div>
                                    </Sitat>
                                )}
                            </ContentWithHeader>
                        </Block>
                    )}
                    {beredskap && (
                        <Block margin="xl">
                            <ContentWithHeader header={text('steg.nattevåkOgBeredskap.beredskap.spm')}>
                                <div data-testid="oppsummering-beredskap">
                                    <AppText id={beredskap.beredskap === true ? 'Ja' : 'Nei'} />
                                </div>
                                {beredskap.tilleggsinformasjon && (
                                    <Sitat>
                                        <div data-testid="oppsummering-beredskap-tilleggsinformasjon">
                                            <TextareaSvar text={beredskap.tilleggsinformasjon} />
                                        </div>
                                    </Sitat>
                                )}
                            </ContentWithHeader>
                        </Block>
                    )}
                </SummarySection>
            )}
        </>
    );
};

export default OmsorgstilbudSummary;
