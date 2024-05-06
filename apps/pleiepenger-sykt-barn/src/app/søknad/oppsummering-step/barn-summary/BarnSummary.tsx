import { IntlShape } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { SummaryBlock, SummarySection, TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';
import UploadedDocumentsList from '../../../components/fødselsattest-file-list/UploadedDocumentsList';
import Sitat from '../../../components/sitat/Sitat';
import { AppText, useAppIntl } from '../../../i18n';
import { BarnRelasjon, RegistrerteBarn, ÅrsakManglerIdentitetsnummer } from '../../../types';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';

interface Props {
    barn: RegistrerteBarn[];
    formValues: SøknadFormValues;
    apiValues: SøknadApiData;
}

const apiBarnSummary = (apiBarn: RegistrerteBarn) => (
    <>
        <div data-testid="oppsummering-barnets-navn-registert">
            <AppText
                id="steg.oppsummering.barnet.navn"
                values={{
                    navn: formatName(apiBarn.fornavn, apiBarn.etternavn, apiBarn.mellomnavn),
                }}
            />
        </div>

        <div data-testid="oppsummering-barnets-fødselsdato-registrert">
            <AppText
                id="steg.oppsummering.barnet.fødselsdato"
                values={{
                    dato: prettifyDate(apiBarn.fødselsdato),
                }}
            />
        </div>
    </>
);

const annetBarnSummary = (intl: IntlShape, apiValues: SøknadApiData) => (
    <>
        {apiValues.barn.fødselsdato ? (
            <div data-testid="oppsummering-barnets-fødselsdato">
                <AppText
                    id="steg.oppsummering.barnet.fødselsdato"
                    values={{
                        dato: prettifyDate(ISODateToDate(apiValues.barn.fødselsdato)),
                    }}
                />
            </div>
        ) : null}
        {!apiValues.barn.fødselsdato ? (
            <div data-testid="oppsummering-barnets-fødselsnummer">
                <AppText id="steg.oppsummering.barnet.fnr" values={{ fnr: apiValues.barn.fødselsnummer }} />
            </div>
        ) : null}
        {apiValues.barn.navn ? (
            <div data-testid="oppsummering-barnets-navn">
                <AppText id="steg.oppsummering.barnet.navn" values={{ navn: apiValues.barn.navn }} />
            </div>
        ) : null}
        {apiValues._barnetHarIkkeFnr && apiValues.barn.årsakManglerIdentitetsnummer && (
            <Block margin="l">
                <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.barnet.barnetHarIkkeFnr')}>
                    <div data-testid="oppsummering-årsakManglerIdentitetsnummer">
                        <AppText
                            id={`steg.oppsummering.barnet.årsakManglerIdentitetsnummer.${apiValues.barn.årsakManglerIdentitetsnummer}`}
                        />
                    </div>
                </SummaryBlock>
            </Block>
        )}
        {apiValues._barnetHarIkkeFnr === true &&
            apiValues.barn.årsakManglerIdentitetsnummer === ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET && (
                <Block margin="m">
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.omBarn.fødselsattest.tittel')}>
                        <div data-testid={'oppsummering-omBarn-fødselsattest'}>
                            <UploadedDocumentsList includeDeletionFunctionality={false} />
                        </div>
                        {apiValues.fødselsattestVedleggUrls.length === 0 && (
                            <AppText id="step.oppsummering.omBarn.ingenFødselsattest" />
                        )}
                    </SummaryBlock>
                </Block>
            )}
    </>
);

const RelasjonTilBarnet = (intl: IntlShape, apiValues: SøknadApiData) => (
    <SummarySection header={intlHelper(intl, 'steg.oppsummering.relasjonTilBarnet.header')}>
        <Block margin="m">
            {apiValues.barnRelasjon && apiValues.barnRelasjon !== BarnRelasjon.ANNET && (
                <div data-testid="oppsummering-barn-relasjon">
                    <AppText id={`steg.oppsummering.barnRelasjon.${apiValues.barnRelasjon}`} />
                </div>
            )}
            {apiValues.barnRelasjon === BarnRelasjon.ANNET && (
                <>
                    <AppText id="steg.oppsummering.relasjonTilBarnetBeskrivelse" />
                    <Sitat>
                        <div data-testid="oppsummering-barn-relasjon-annet-beskrivelse">
                            <TextareaSvar text={apiValues.barnRelasjonBeskrivelse} />
                        </div>
                    </Sitat>
                </>
            )}
        </Block>
    </SummarySection>
);

const BarnSummary = ({ formValues, apiValues, barn }: Props) => {
    const { intl } = useAppIntl();
    const apiBarn = barn.find(({ aktørId }) => aktørId === formValues.barnetSøknadenGjelder);
    const useApiBarn = !formValues.søknadenGjelderEtAnnetBarn && barn && barn.length > 0;

    return (
        <>
            <SummarySection header={intlHelper(intl, 'steg.oppsummering.barnet.header')}>
                <Block margin="m">
                    {useApiBarn && apiBarn && apiBarnSummary(apiBarn)}
                    {!useApiBarn && annetBarnSummary(intl, apiValues)}
                </Block>
            </SummarySection>
            {!useApiBarn && RelasjonTilBarnet(intl, apiValues)}
        </>
    );
};

export default BarnSummary;
