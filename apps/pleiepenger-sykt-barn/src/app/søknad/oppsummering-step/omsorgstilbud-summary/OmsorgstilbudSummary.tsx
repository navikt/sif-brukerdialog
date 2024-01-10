import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import TextareaSummary from '@navikt/sif-common-soknad-ds/src/components/summary-answers/TextareaSvar';
import SummaryBlock from '@navikt/sif-common-soknad-ds/src/components/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/src/components/summary-section/SummarySection';
import { DateRange, prettifyDateExtended } from '@navikt/sif-common-utils';
import Sitat from '../../../components/sitat/Sitat';
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
    const intl = useIntl();

    return (
        <>
            <SummarySection
                header={intlHelper(intl, 'steg.oppsummering.omsorgstilbud.header', {
                    fra: prettifyDateExtended(søknadsperiode.from),
                    til: prettifyDateExtended(søknadsperiode.to),
                })}>
                {omsorgstilbud === undefined && (
                    <>
                        {(søkerKunFortid(søknadsperiode) || søkerFortidOgFremtid(søknadsperiode)) && (
                            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.omsorgstilbud.fortid.spm')}>
                                <FormattedMessage id={`steg.oppsummering.omsorgstilbud.fortid.svar.NEI`} />
                            </SummaryBlock>
                        )}
                        {(søkerKunFremtid(søknadsperiode) || søkerFortidOgFremtid(søknadsperiode)) && (
                            <SummaryBlock
                                header={intlHelper(
                                    intl,
                                    søkerFortidOgFremtid(søknadsperiode)
                                        ? 'steg.oppsummering.omsorgstilbud.fremtid.spm'
                                        : 'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid',
                                )}>
                                <FormattedMessage id={`steg.oppsummering.omsorgstilbud.fremtid.svar.NEI`} />
                            </SummaryBlock>
                        )}
                    </>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.svarFortid && (
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.omsorgstilbud.fortid.spm')}>
                        <FormattedMessage
                            id={`steg.oppsummering.omsorgstilbud.fortid.svar.${omsorgstilbud.svarFortid}`}
                        />
                    </SummaryBlock>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.svarFremtid && (
                    <SummaryBlock
                        header={intlHelper(
                            intl,
                            søkerFortidOgFremtid(søknadsperiode)
                                ? 'steg.oppsummering.omsorgstilbud.fremtid.spm'
                                : 'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid',
                        )}>
                        <FormattedMessage
                            id={`steg.oppsummering.omsorgstilbud.fremtid.svar.${omsorgstilbud.svarFremtid}`}
                        />
                    </SummaryBlock>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.ukedager && (
                    <SummaryBlock
                        header={intlHelper(
                            intl,
                            søkerKunFortid(søknadsperiode)
                                ? 'steg.oppsummering.omsorgstilbud.fast.header.fortid'
                                : 'steg.oppsummering.omsorgstilbud.fast.header',
                        )}>
                        <TidFasteDager fasteDager={omsorgstilbud.ukedager} />
                    </SummaryBlock>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.enkeltdager && (
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.omsorgstilbud.enkeltdager.header')}>
                        <TidEnkeltdager dager={omsorgstilbud.enkeltdager} />
                    </SummaryBlock>
                )}
            </SummarySection>
            {(nattevåk || beredskap) && (
                <SummarySection header={intlHelper(intl, 'steg.oppsummering.nattevåkBeredskap.header')}>
                    {nattevåk && (
                        <Block margin="xl">
                            <ContentWithHeader header={intlHelper(intl, 'steg.nattevåkOgBeredskap.nattevåk.spm')}>
                                <div>
                                    <FormattedMessage id={nattevåk.harNattevåk === true ? 'Ja' : 'Nei'} />
                                </div>

                                {nattevåk.harNattevåk === true && nattevåk.tilleggsinformasjon && (
                                    <Sitat>
                                        <TextareaSummary text={nattevåk.tilleggsinformasjon} />
                                    </Sitat>
                                )}
                            </ContentWithHeader>
                        </Block>
                    )}
                    {beredskap && (
                        <Block margin="xl">
                            <ContentWithHeader header={intlHelper(intl, 'steg.nattevåkOgBeredskap.beredskap.spm')}>
                                <div>
                                    <FormattedMessage id={beredskap.beredskap === true ? 'Ja' : 'Nei'} />
                                </div>
                                {beredskap.tilleggsinformasjon && (
                                    <Sitat>
                                        <TextareaSummary text={beredskap.tilleggsinformasjon} />
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
