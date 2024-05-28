import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppIntlShape, AppText, useAppIntl } from '../../../i18n';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { OmBarnetApiData } from '../../../types/søknadApiData/SøknadApiData';
import { getRelasjonTilBarnetIntlKey } from '../om-barnet/omBarnetStepUtils';

interface Props {
    apiData: OmBarnetApiData;
}

const OmBarnetOppsummering: React.FC<Props> = ({ apiData: apiData }) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    return (
        <SummarySection header={text('steg.oppsummering.barnet.header')}>
            <Block margin="l">
                {apiData.barn.aktørId ? getRegistrertBarnInfo(apiData) : getAnnetBarnInfo(apiData, appIntl)}
            </Block>
            <Block margin="l">
                <ContentWithHeader header={text('steg.oppsummering.barnet.sammeAdresse.header')}>
                    {apiData.sammeAdresse === BarnSammeAdresse.JA && text('steg.oppsummering.barnet.sammeAdresse.ja')}
                    {apiData.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED &&
                        text('steg.oppsummering.barnet.sammeAdresse.jaDeltBosted')}
                    {apiData.sammeAdresse === BarnSammeAdresse.NEI && text('steg.oppsummering.barnet.sammeAdresse.nei')}
                </ContentWithHeader>
            </Block>
            <Block margin="l">
                <ContentWithHeader header={text('steg.oppsummering.barnet.kroniskEllerFunksjonshemmende.header')}>
                    {apiData.kroniskEllerFunksjonshemming === true && text('Ja')}
                    {apiData.kroniskEllerFunksjonshemming === false && text('Nei')}
                </ContentWithHeader>
            </Block>
            {apiData.kroniskEllerFunksjonshemming === true && (
                <>
                    <Block margin="l">
                        <ContentWithHeader header={text('steg.oppsummering.barnet.høyereRisikoForFravær.header')}>
                            {apiData.høyereRisikoForFravær === true && text('Ja')}
                            {apiData.høyereRisikoForFravær === false && text('Nei')}
                        </ContentWithHeader>
                    </Block>
                    {apiData.høyereRisikoForFravær && (
                        <Block margin={'s'}>
                            <SummaryBlock
                                header={text('steg.oppsummering.barnet.høyereRisikoForFraværBeskrivelse.header')}>
                                <p>{apiData.høyereRisikoForFraværBeskrivelse}</p>
                            </SummaryBlock>
                        </Block>
                    )}
                </>
            )}
        </SummarySection>
    );
};

export default OmBarnetOppsummering;

const getRegistrertBarnInfo = (apiData: OmBarnetApiData) => {
    return (
        <>
            <div>
                <AppText
                    id="steg.oppsummering.barnet.navn"
                    values={{
                        navn: apiData.barn.navn,
                    }}
                />
            </div>
            {apiData.barn.fødselsdato && (
                <div>
                    <AppText
                        id="steg.oppsummering.barnet.fødselsdato"
                        values={{
                            dato: dateFormatter.full(ISODateToDate(apiData.barn.fødselsdato)),
                        }}
                    />
                </div>
            )}
        </>
    );
};
const getAnnetBarnInfo = (apiData: OmBarnetApiData, { text }: AppIntlShape) => {
    return (
        <>
            {apiData.barn.norskIdentifikator ? (
                <div>
                    <AppText
                        id="steg.oppsummering.barnet.fnr"
                        values={{
                            fnr: apiData.barn.norskIdentifikator,
                        }}
                    />
                </div>
            ) : null}
            {apiData.barn.navn ? (
                <div>
                    <AppText id="steg.oppsummering.barnet.navn" values={{ navn: apiData.barn.navn }} />
                </div>
            ) : null}
            {apiData.barn.fødselsdato && (
                <div>
                    <AppText
                        id="steg.oppsummering.barnet.fødselsdato"
                        values={{
                            dato: dateFormatter.full(ISODateToDate(apiData.barn.fødselsdato)),
                        }}
                    />
                </div>
            )}
            {apiData.relasjonTilBarnet && (
                <div>
                    <AppText
                        id="steg.oppsummering.barnet.søkersRelasjonTilBarnet"
                        values={{
                            relasjon: text(getRelasjonTilBarnetIntlKey(apiData.relasjonTilBarnet)),
                        }}
                    />
                </div>
            )}
        </>
    );
};
