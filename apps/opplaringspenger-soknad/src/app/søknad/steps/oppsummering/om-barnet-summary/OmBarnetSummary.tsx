import { FormSummary } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';
import { OmBarnetFormSøknadsdata } from '../../om-barnet/om-barnet-form/types/OmBarnetFormSøknadsdata';
import { AppText } from '../../../../i18n';
import { OmBarnetApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { RelasjonTilBarnet, ÅrsakBarnetManglerIdentitetsnummer } from '../../om-barnet/om-barnet-form/types';

interface Props {
    søknadsdata: OmBarnetFormSøknadsdata;
    apiValues: OmBarnetApiData;
    onEdit?: () => void;
}

const registrertBarn = (apiBarn: RegistrertBarn) => (
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

const annetBarnSummary = (apiValues: OmBarnetApiData, fødselsattester: Attachment[]) => (
    <>
        {apiValues.fødselsdato ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.fødselsdato" />
                </FormSummary.Label>
                <FormSummary.Value>{prettifyDate(ISODateToDate(apiValues.fødselsdato))}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {!apiValues.fødselsdato ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.fnr" />
                </FormSummary.Label>
                <FormSummary.Value>{apiValues.fødselsnummer}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {apiValues.navn ? (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.navn" />
                </FormSummary.Label>
                <FormSummary.Value>{apiValues.navn}</FormSummary.Value>
            </FormSummary.Answer>
        ) : null}
        {apiValues.årsakManglerIdentitetsnummer && (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.barnet.barnetHarIkkeFnr" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <AppText
                        id={`steg.oppsummering.barnet.årsakManglerIdentitetsnummer.${apiValues.årsakManglerIdentitetsnummer}`}
                    />
                </FormSummary.Value>
            </FormSummary.Answer>
        )}
        {apiValues.årsakManglerIdentitetsnummer === ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET && (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.omBarn.fødselsattest.tittel" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <div data-testid={'oppsummering-omBarn-fødselsattest'}>
                        <AttachmentList attachments={fødselsattester} />
                    </div>
                    {(apiValues.fødselsattestVedleggUrls || []).length === 0 && (
                        <AppText id="step.oppsummering.omBarn.ingenFødselsattest" />
                    )}
                </FormSummary.Value>
            </FormSummary.Answer>
        )}
    </>
);

const relasjonTilBarnetSummary = (apiValues: OmBarnetApiData) => (
    <FormSummary.Answer>
        <FormSummary.Label>
            <AppText id="steg.oppsummering.relasjonTilBarnet.header" />
        </FormSummary.Label>
        <FormSummary.Value>
            {apiValues.relasjonTilBarnet && apiValues.relasjonTilBarnet !== RelasjonTilBarnet.ANNET && (
                <AppText id={`omBarnetForm.relasjonTilBarnet.${apiValues.relasjonTilBarnet}`} />
            )}
            {apiValues.relasjonTilBarnet === RelasjonTilBarnet.ANNET && (
                <>
                    <AppText id="steg.oppsummering.relasjonTilBarnetBeskrivelse" />
                    <Sitat>
                        <TextareaSvar text={apiValues.relasjonTilBarnetBeskrivelse} />
                    </Sitat>
                </>
            )}
        </FormSummary.Value>
    </FormSummary.Answer>
);

const OmBarnetOppsummering = ({ søknadsdata, apiValues, onEdit }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="steg.oppsummering.barnet.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                {søknadsdata.type === 'registrerteBarn' ? (
                    registrertBarn(søknadsdata.registrertBarn)
                ) : (
                    <>
                        {annetBarnSummary(
                            apiValues,
                            søknadsdata.type === 'annetBarnUtenFnr' ? søknadsdata.fødselsattest : [],
                        )}
                        {relasjonTilBarnetSummary(apiValues)}
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OmBarnetOppsummering;
