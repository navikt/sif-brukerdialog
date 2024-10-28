import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { AppMessageKeys, AppText } from '../../../i18n';
import { BarnRelasjon } from '../../../types/BarnRelasjon';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { OmBarnetSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ÅrsakManglerIdentitetsnummer } from '../../../types/ÅrsakManglerIdentitetsnummer';
import { OmBarnetFormValues } from './OmBarnetStep';

export const getOmBarnetStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmBarnetFormValues,
): OmBarnetFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmBarnetFormValues = {
        barnetSøknadenGjelder: undefined,
        søknadenGjelderEtAnnetBarn: undefined,
        barnetsFødselsnummer: '',
        barnetsNavn: '',
        barnetsFødselsdato: '',
        relasjonTilBarnet: undefined,
    };

    const { omBarnet } = søknadsdata;
    if (omBarnet) {
        switch (omBarnet.type) {
            case 'registrerteBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: false,
                    barnetSøknadenGjelder: omBarnet.aktørId,
                };
            case 'annetBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsFødselsnummer: omBarnet.barnetsFødselsnummer,
                    barnetsNavn: omBarnet.barnetsNavn,
                    relasjonTilBarnet: omBarnet.relasjonTilBarnet,
                    relasjonTilBarnetBeskrivelse: omBarnet.relasjonTilBarnetBeskrivelse,
                };
            case 'annetBarnUtenFnr':
                return {
                    ...defaultValues,
                    barnetHarIkkeFnr: true,
                    årsakManglerIdentitetsnummer: omBarnet.årsakManglerIdentitetsnummer,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsNavn: omBarnet.barnetsNavn,
                    barnetsFødselsdato: omBarnet.barnetsFødselsdato,
                    relasjonTilBarnet: omBarnet.relasjonTilBarnet,
                    fødselsattest: omBarnet.fødselsattest || [],
                    relasjonTilBarnetBeskrivelse: omBarnet.relasjonTilBarnetBeskrivelse,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnetSøknadsdataFromFormValues = (
    values: OmBarnetFormValues,
    registrerteBarn: RegistrertBarn[],
): OmBarnetSøknadsdata | undefined => {
    if (values.barnetSøknadenGjelder) {
        return {
            type: 'registrerteBarn',
            aktørId: values.barnetSøknadenGjelder,
            registrertBarn: registrerteBarn.find((barn) => barn.aktørId === values.barnetSøknadenGjelder)!,
        };
    }

    if (!values.barnetSøknadenGjelder) {
        if (values.barnetsFødselsnummer) {
            return {
                type: 'annetBarn',
                barnetsNavn: values.barnetsNavn,
                barnetsFødselsnummer: values.barnetsFødselsnummer,
                relasjonTilBarnet: values.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse:
                    values.relasjonTilBarnet === BarnRelasjon.ANNET ? values.relasjonTilBarnetBeskrivelse : undefined,
            };
        } else if (values.barnetsFødselsdato && values.årsakManglerIdentitetsnummer) {
            return {
                type: 'annetBarnUtenFnr',
                barnetsNavn: values.barnetsNavn,
                årsakManglerIdentitetsnummer: values.årsakManglerIdentitetsnummer,
                barnetsFødselsdato: values.barnetsFødselsdato,
                relasjonTilBarnet: values.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse:
                    values.relasjonTilBarnet === BarnRelasjon.ANNET ? values.relasjonTilBarnetBeskrivelse : undefined,
                fødselsattest:
                    values.årsakManglerIdentitetsnummer === ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET
                        ? values.fødselsattest || []
                        : [],
            };
        }
        return undefined;
    }

    return undefined;
};

export const mapBarnTilRadioProps = (barn: RegistrertBarn, disabled?: boolean): FormikRadioProp => {
    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
    return {
        value: aktørId,
        label: (
            <>
                <div>{barnetsNavn}</div>
                <div>
                    <AppText
                        id="steg.omBarnet.hvilketBarn.født"
                        values={{ dato: dateFormatter.compact(fødselsdato) }}
                    />
                </div>
            </>
        ),
        disabled,
    };
};

export const isBarnOver18år = (fødselsdato: Date | string): boolean => {
    const dato18år = dayjs(fødselsdato).add(18, 'year');

    // Siden det kan gis ekstra dager opp til 3 måneder tilbake i tid fra søknadsdato brukes det 1. april året etter det kalenderåret barnet fylte 18 år som frist.
    const frist = dato18år.add(1, 'year').set('month', 3).set('date', 1);

    return dayjs().isSame(frist) || dayjs().isAfter(frist);
};

export const getMinDatoForBarnetsFødselsdato = (): Date => {
    // April 1 dette år
    const today = dayjs();
    const frist = dayjs(today).set('month', 3).set('date', 1);

    return today.isBefore(frist)
        ? today.subtract(19, 'year').startOf('year').toDate()
        : today.subtract(18, 'year').startOf('year').toDate();
};

export const getRelasjonTilBarnetIntlKey = (relasjonTilBarnet: BarnRelasjon): AppMessageKeys => {
    switch (relasjonTilBarnet) {
        case BarnRelasjon.MOR:
            return 'steg.omBarnet.relasjonTilBarnet.MOR';
        case BarnRelasjon.FAR:
            return 'steg.omBarnet.relasjonTilBarnet.FAR';
        case BarnRelasjon.FOSTERFORELDER:
            return 'steg.omBarnet.relasjonTilBarnet.FOSTERFORELDER';
        case BarnRelasjon.MEDMOR:
            return 'steg.omBarnet.relasjonTilBarnet.MEDMOR';
        case BarnRelasjon.ANNET:
            return 'steg.omBarnet.relasjonTilBarnet.ANNET';
    }
};
