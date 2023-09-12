import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { SummarySection } from '@navikt/sif-common-soknad-ds';
import { ISODateToDate, dateFormatter } from '@navikt/sif-common-utils';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { OmBarnetApiData } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    apiData: OmBarnetApiData;
    registrerteBarn: RegistrertBarn[];
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ apiData: apiData, registrerteBarn }) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.barnet.header')}>
            <Block margin="l">
                {apiData.barn.aktørId
                    ? getRegistrertBarnInfo(apiData, registrerteBarn)
                    : getAnnetBarnInfo(apiData, intl)}
            </Block>
            <Block margin="l">
                <ContentWithHeader
                    header={intlHelper(intl, 'steg.oppsummering.barnet.kroniskEllerFunksjonshemmende.header')}>
                    {apiData.kroniskEllerFunksjonshemming === true && intlHelper(intl, 'Ja')}
                    {apiData.kroniskEllerFunksjonshemming === false && intlHelper(intl, 'Nei')}
                </ContentWithHeader>
            </Block>
            <Block margin="l">
                <ContentWithHeader header={intlHelper(intl, 'steg.oppsummering.barnet.sammeAdresse.header')}>
                    {apiData.sammeAdresse === true && intlHelper(intl, 'Ja')}
                    {apiData.sammeAdresse === false && intlHelper(intl, 'Nei')}
                </ContentWithHeader>
            </Block>
        </SummarySection>
    );
};

export default OmBarnetOppsummering;

const getRegistrertBarnInfo = (apiData: OmBarnetApiData, registrerteBarn: RegistrertBarn[]) => {
    const barn = apiData.barn.aktørId ? registrerteBarn.find((b) => b.aktørId === apiData.barn.aktørId) : undefined;
    if (!barn) {
        throw 'Registrert barn ikke funnet ved oppsummering';
    }
    return (
        <>
            <div>
                <FormattedMessage
                    id="steg.oppsummering.barnet.navn"
                    values={{
                        navn: formatName(barn.fornavn, barn.etternavn, barn.mellomnavn),
                    }}
                />
            </div>
            <div>
                <FormattedMessage
                    id="steg.oppsummering.barnet.fødselsdato"
                    values={{
                        dato: dateFormatter.full(barn.fødselsdato),
                    }}
                />
            </div>
        </>
    );
};
const getAnnetBarnInfo = (apiData: OmBarnetApiData, intl: IntlShape) => {
    return (
        <>
            {apiData.barn.norskIdentifikator ? (
                <div>
                    <FormattedMessage
                        id="steg.oppsummering.barnet.fnr"
                        values={{
                            fnr: apiData.barn.norskIdentifikator,
                        }}
                    />
                </div>
            ) : null}
            {apiData.barn.navn ? (
                <div>
                    <FormattedMessage id="steg.oppsummering.barnet.navn" values={{ navn: apiData.barn.navn }} />
                </div>
            ) : null}
            {apiData.barn.fødselsdato && (
                <div>
                    <FormattedMessage
                        id="steg.oppsummering.barnet.fødselsdato"
                        values={{
                            dato: dateFormatter.full(ISODateToDate(apiData.barn.fødselsdato)),
                        }}
                    />
                </div>
            )}
            <div>
                <FormattedMessage
                    id="steg.oppsummering.barnet.søkersRelasjonTilBarnet"
                    values={{
                        relasjon: intlHelper(intl, `relasjonTilBarnet.${apiData.relasjonTilBarnet}`),
                    }}
                />
            </div>
        </>
    );
};
