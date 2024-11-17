import { FormSummary } from '@navikt/ds-react';
import { VedleggSummaryList } from '@navikt/sif-common-core-ds/src';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';
import Sitat from '../../../components/sitat/Sitat';
import { AppText } from '../../../i18n';
import { BarnRelasjon, RegistrerteBarn, ÅrsakManglerIdentitetsnummer } from '../../../types';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';

interface Props {
    barn: RegistrerteBarn[];
    formValues: SøknadFormValues;
    apiValues: SøknadApiData;
    onEdit?: () => void;
}

const apiBarnSummary = (apiBarn: RegistrerteBarn) => (
    <>
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="steg.oppsummering.barnet.navn" />
            </FormSummary.Label>
            <FormSummary.Value>{formatName(apiBarn.fornavn, apiBarn.etternavn, apiBarn.mellomnavn)}</FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="steg.oppsummering.barnet.fødselsdato" />
            </FormSummary.Label>
            <FormSummary.Value>{prettifyDate(apiBarn.fødselsdato)}</FormSummary.Value>
        </FormSummary.Answer>
    </>
);

const annetBarnSummary = (apiValues: SøknadApiData, fødselsattester: Vedlegg[]) => (
    <>
        {apiValues.barn.fødselsdato ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.fødselsdato" />
                </FormSummary.Label>
                <FormSummary.Value>{prettifyDate(ISODateToDate(apiValues.barn.fødselsdato))}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {!apiValues.barn.fødselsdato ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.fnr" />
                </FormSummary.Label>
                <FormSummary.Value>{apiValues.barn.fødselsnummer}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {apiValues.barn.navn ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.navn" />
                </FormSummary.Label>
                <FormSummary.Value>{apiValues.barn.navn}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {apiValues._barnetHarIkkeFnr && apiValues.barn.årsakManglerIdentitetsnummer && (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.barnetHarIkkeFnr" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <AppText
                        id={`steg.oppsummering.barnet.årsakManglerIdentitetsnummer.${apiValues.barn.årsakManglerIdentitetsnummer}`}
                    />
                </FormSummary.Value>
            </FormSummary.Answer>
        )}
        {apiValues._barnetHarIkkeFnr === true &&
            apiValues.barn.årsakManglerIdentitetsnummer === ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.omBarn.fødselsattest.tittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <div data-testid={'oppsummering-omBarn-fødselsattest'}>
                            <VedleggSummaryList vedlegg={fødselsattester} />
                        </div>
                        {apiValues.fødselsattestVedleggUrls.length === 0 && (
                            <AppText id="step.oppsummering.omBarn.ingenFødselsattest" />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
    </>
);

const relasjonTilBarnetSummary = (apiValues: SøknadApiData) => (
    <FormSummary.Answer>
        <FormSummary.Label>
            <AppText id="steg.oppsummering.relasjonTilBarnet.header" />
        </FormSummary.Label>
        <FormSummary.Value>
            {apiValues.barnRelasjon && apiValues.barnRelasjon !== BarnRelasjon.ANNET && (
                <AppText id={`steg.oppsummering.barnRelasjon.${apiValues.barnRelasjon}`} />
            )}
            {apiValues.barnRelasjon === BarnRelasjon.ANNET && (
                <>
                    <AppText id="steg.oppsummering.relasjonTilBarnetBeskrivelse" />
                    <Sitat>
                        <TextareaSvar text={apiValues.barnRelasjonBeskrivelse} />
                    </Sitat>
                </>
            )}
        </FormSummary.Value>
    </FormSummary.Answer>
);

const BarnSummary = ({ formValues, apiValues, barn, onEdit }: Props) => {
    const apiBarn = barn.find(({ aktørId }) => aktørId === formValues.barnetSøknadenGjelder);
    const useApiBarn = !formValues.søknadenGjelderEtAnnetBarn && barn && barn.length > 0;

    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummering.barnet.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
                    {useApiBarn && apiBarn && apiBarnSummary(apiBarn)}
                    {!useApiBarn && annetBarnSummary(apiValues, formValues.fødselsattest)}
                    {!useApiBarn && relasjonTilBarnetSummary(apiValues)}
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default BarnSummary;
