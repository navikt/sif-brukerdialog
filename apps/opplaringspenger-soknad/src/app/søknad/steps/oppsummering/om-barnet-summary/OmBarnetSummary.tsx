import { FormSummary } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { VedleggSummaryList } from '@navikt/sif-common-core-ds/src';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import {
    AnnetBarnApiData,
    isAnnetBarnApiData,
    isRegistrertBarnApiData,
    OmBarnetApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import { RelasjonTilBarnet, ÅrsakBarnetManglerIdentitetsnummer } from '../../om-barnet/om-barnet-form/types';
import { OmBarnetFormSøknadsdata } from '../../om-barnet/om-barnet-form/types/OmBarnetFormSøknadsdata';

interface Props {
    søknadsdata: OmBarnetFormSøknadsdata;
    apiData: OmBarnetApiData;
    onEdit?: () => void;
}

const RegistrertBarn = ({ barn }: { barn: RegistrertBarn }) => (
    <>
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="steg.oppsummering.barnet.navn" />
            </FormSummary.Label>
            <FormSummary.Value>{formatName(barn.fornavn, barn.etternavn, barn.mellomnavn)}</FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="steg.oppsummering.barnet.fødselsdato" />
            </FormSummary.Label>
            <FormSummary.Value>{dateFormatter.full(barn.fødselsdato)}</FormSummary.Value>
        </FormSummary.Answer>
    </>
);

const AnnetBarnSummary = ({ apiData, fødselsattester }: { apiData: AnnetBarnApiData; fødselsattester: Vedlegg[] }) => (
    <>
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="steg.oppsummering.barnet.fødselsdato" />
            </FormSummary.Label>
            <FormSummary.Value>{dateFormatter.full(ISODateToDate(apiData.fødselsdato))}</FormSummary.Value>
        </FormSummary.Answer>

        {apiData._harFødselsnummer ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.fnr" />
                </FormSummary.Label>
                <FormSummary.Value>{apiData.norskIdentifikator}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {apiData.navn ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.navn" />
                </FormSummary.Label>
                <FormSummary.Value>{apiData.navn}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {!apiData._harFødselsnummer && apiData.årsakManglerIdentitetsnummer && (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.barnetHarIkkeFnr" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <AppText
                        id={`steg.oppsummering.barnet.årsakManglerIdentitetsnummer.${apiData.årsakManglerIdentitetsnummer}`}
                    />
                </FormSummary.Value>
            </FormSummary.Answer>
        )}
        {!apiData._harFødselsnummer &&
            apiData.årsakManglerIdentitetsnummer === ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.omBarn.fødselsattest.tittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {fødselsattester.length === 0 ? (
                            <AppText id="step.oppsummering.omBarn.ingenFødselsattest" />
                        ) : (
                            <div data-testid="oppsummering-omBarn-fødselsattest">
                                <VedleggSummaryList vedlegg={fødselsattester} />
                            </div>
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
    </>
);

const RelasjonTilBarnetSummary = ({ apiValues: apiData }: { apiValues: AnnetBarnApiData }) => (
    <FormSummary.Answer>
        <FormSummary.Label>
            <AppText id="steg.oppsummering.relasjonTilBarnet.header" />
        </FormSummary.Label>
        <FormSummary.Value>
            {apiData.relasjonTilBarnet && apiData.relasjonTilBarnet !== RelasjonTilBarnet.ANNET && (
                <AppText id={`omBarnetForm.relasjonTilBarnet.${apiData.relasjonTilBarnet}`} />
            )}
            {apiData.relasjonTilBarnet === RelasjonTilBarnet.ANNET && (
                <>
                    <AppText id="steg.oppsummering.relasjonTilBarnetBeskrivelse" />
                    <Sitat>
                        <TextareaSvar text={apiData.relasjonTilBarnetBeskrivelse} />
                    </Sitat>
                </>
            )}
        </FormSummary.Value>
    </FormSummary.Answer>
);

const OmBarnetSummary = ({ søknadsdata, apiData, onEdit }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="steg.oppsummering.barnet.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {isRegistrertBarnApiData(apiData) && søknadsdata.type === 'registrerteBarn' && (
                    <RegistrertBarn barn={søknadsdata.registrertBarn} />
                )}
                {isAnnetBarnApiData(apiData) && (
                    <>
                        <AnnetBarnSummary
                            apiData={apiData}
                            fødselsattester={søknadsdata.type === 'annetBarnUtenFnr' ? søknadsdata.fødselsattest : []}
                        />
                        <RelasjonTilBarnetSummary apiValues={apiData} />
                    </>
                )}
            </FormSummary.Answers>
            {onEdit && (
                <FormSummary.Footer>
                    <EditStepLink onEdit={onEdit} />
                </FormSummary.Footer>
            )}
        </FormSummary>
    );
};

export default OmBarnetSummary;
