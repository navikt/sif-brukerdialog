import { FormSummary } from '@navikt/ds-react';
import { JaNeiSvar, TextareaSvar } from '@navikt/sif-common-ui';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppIntlShape, AppText, useAppIntl } from '../../../i18n';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { OmBarnetApiData } from '../../../types/søknadApiData/SøknadApiData';
import { getRelasjonTilBarnetIntlKey } from '../om-barnet/omBarnetStepUtils';

interface Props {
    apiData: OmBarnetApiData;
}

const OmBarnetOppsummering = ({ apiData }: Props) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;

    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummering.barnet.header" />
                    </FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    {apiData.barn.aktørId ? getRegistrertBarnInfo(apiData) : getAnnetBarnInfo(apiData, appIntl)}
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.barnet.sammeAdresse.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {apiData.sammeAdresse === BarnSammeAdresse.JA &&
                                text('steg.oppsummering.barnet.sammeAdresse.ja')}
                            {apiData.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED &&
                                text('steg.oppsummering.barnet.sammeAdresse.jaDeltBosted')}
                            {apiData.sammeAdresse === BarnSammeAdresse.NEI &&
                                text('steg.oppsummering.barnet.sammeAdresse.nei')}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.barnet.kroniskEllerFunksjonshemmende.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={apiData.kroniskEllerFunksjonshemming} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {apiData.kroniskEllerFunksjonshemming === true ? (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="steg.oppsummering.barnet.høyereRisikoForFravær.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <JaNeiSvar harSvartJa={apiData.høyereRisikoForFravær} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            {apiData.høyereRisikoForFravær ? (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="steg.oppsummering.barnet.høyereRisikoForFraværBeskrivelse.header" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <TextareaSvar text={apiData.høyereRisikoForFraværBeskrivelse} />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            ) : null}
                        </>
                    ) : null}
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default OmBarnetOppsummering;

const getRegistrertBarnInfo = (apiData: OmBarnetApiData) => {
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>Navn</FormSummary.Label>
                <FormSummary.Value>{apiData.barn.navn}</FormSummary.Value>
            </FormSummary.Answer>
            {apiData.barn.fødselsdato ? (
                <FormSummary.Answer>
                    <FormSummary.Label>Fødselsdato</FormSummary.Label>
                    <FormSummary.Value>{dateFormatter.full(ISODateToDate(apiData.barn.fødselsdato))}</FormSummary.Value>
                </FormSummary.Answer>
            ) : null}
        </>
    );
};
const getAnnetBarnInfo = (apiData: OmBarnetApiData, { text }: AppIntlShape) => {
    return (
        <>
            {apiData.barn.norskIdentifikator ? (
                <FormSummary.Answer>
                    <FormSummary.Label>Fødselsnummer</FormSummary.Label>
                    <FormSummary.Value>{apiData.barn.norskIdentifikator}</FormSummary.Value>
                </FormSummary.Answer>
            ) : null}
            {apiData.barn.navn ? (
                <FormSummary.Answer>
                    <FormSummary.Label>Navn</FormSummary.Label>
                    <FormSummary.Value>{apiData.barn.navn}</FormSummary.Value>
                </FormSummary.Answer>
            ) : null}
            {apiData.barn.fødselsdato ? (
                <FormSummary.Answer>
                    <FormSummary.Label>Fødselsdato</FormSummary.Label>
                    <FormSummary.Value>{dateFormatter.full(ISODateToDate(apiData.barn.fødselsdato))}</FormSummary.Value>
                </FormSummary.Answer>
            ) : null}
            {apiData.relasjonTilBarnet && (
                <FormSummary.Answer>
                    <FormSummary.Label>Din relasjon til barnet</FormSummary.Label>
                    <FormSummary.Value>
                        {text(getRelasjonTilBarnetIntlKey(apiData.relasjonTilBarnet))}
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
        </>
    );
};
