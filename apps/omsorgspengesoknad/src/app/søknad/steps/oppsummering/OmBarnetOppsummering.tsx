import { FormSummary } from '@navikt/ds-react';
import { JaNeiSvar, Sitat, TextareaSvar } from '@navikt/sif-common-ui';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../i18n';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { BarnToSendToApi, OmBarnetApiData } from '../../../types/søknadApiData/SøknadApiData';
import { getRelasjonTilBarnetIntlKey } from '../om-barnet/omBarnetStepUtils';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';

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
                    {apiData.barn.aktørId ? (
                        <RegistrertBarnOppsummering barn={apiData.barn} />
                    ) : (
                        <AnnetBarnOppsummering barn={apiData.barn} relasjonTilBarnet={apiData.relasjonTilBarnet} />
                    )}
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
                                        <Sitat>
                                            <TextareaSvar text={apiData.høyereRisikoForFraværBeskrivelse} />
                                        </Sitat>
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

const RegistrertBarnOppsummering = ({ barn }: { barn: BarnToSendToApi }) => (
    <>
        <FormSummary.Answer>
            <AppText id="steg.oppsummering.barnet.navn" />
            <FormSummary.Value>{barn.navn}</FormSummary.Value>
        </FormSummary.Answer>
        {barn.fødselsdato ? (
            <FormSummary.Answer>
                <AppText id="steg.oppsummering.barnet.fødselsdato" />
                <FormSummary.Value>{dateFormatter.full(ISODateToDate(barn.fødselsdato))}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
    </>
);

const AnnetBarnOppsummering = ({
    barn,
    relasjonTilBarnet,
}: {
    barn: BarnToSendToApi;
    relasjonTilBarnet?: SøkersRelasjonTilBarnet;
}) => {
    const { text } = useAppIntl();
    return (
        <>
            {barn.norskIdentifikator ? (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.barnet.fnr" />
                    </FormSummary.Label>
                    <FormSummary.Value>{barn.norskIdentifikator}</FormSummary.Value>
                </FormSummary.Answer>
            ) : null}
            {barn.navn ? (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.barnet.navn" />
                    </FormSummary.Label>
                    <FormSummary.Value>{barn.navn}</FormSummary.Value>
                </FormSummary.Answer>
            ) : null}
            {barn.fødselsdato ? (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.barnet.fødselsdato" />
                    </FormSummary.Label>
                    <FormSummary.Value>{dateFormatter.full(ISODateToDate(barn.fødselsdato))}</FormSummary.Value>
                </FormSummary.Answer>
            ) : null}
            {relasjonTilBarnet && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.barnet.søkersRelasjonTilBarnet" />
                    </FormSummary.Label>
                    <FormSummary.Value>{text(getRelasjonTilBarnetIntlKey(relasjonTilBarnet))}</FormSummary.Value>
                </FormSummary.Answer>
            )}
        </>
    );
};
