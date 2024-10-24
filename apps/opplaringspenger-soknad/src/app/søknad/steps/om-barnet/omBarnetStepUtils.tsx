import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { AppMessageKeys, AppText } from '../../../i18n';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { OmBarnetSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnetFormValues } from './OmBarnetStep';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';

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
        søkersRelasjonTilBarnet: undefined,
    };

    const { omBarnet } = søknadsdata;
    if (omBarnet) {
        switch (omBarnet.type) {
            case 'registrertBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: false,
                    barnetSøknadenGjelder: omBarnet.registrertBarn.aktørId,
                };
            case 'annetBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsFødselsnummer: omBarnet.barnetsFødselsnummer,
                    barnetsNavn: omBarnet.barnetsNavn,
                    barnetsFødselsdato: omBarnet.barnetsFødselsdato,
                    søkersRelasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnetSøknadsdataFromFormValues = (
    values: OmBarnetFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>,
): OmBarnetSøknadsdata | undefined => {
    if (values.søknadenGjelderEtAnnetBarn || registrerteBarn.length === 0) {
        if (values.søkersRelasjonTilBarnet === undefined) {
            return undefined;
        }
        return {
            type: 'annetBarn',
            søknadenGjelderEtAnnetBarn: true,
            barnetsFødselsnummer: values.barnetsFødselsnummer,
            barnetsFødselsdato: values.barnetsFødselsdato,
            barnetsNavn: values.barnetsNavn,
            søkersRelasjonTilBarnet: values.søkersRelasjonTilBarnet,
        };
    }
    const barn = values.barnetSøknadenGjelder
        ? registrerteBarn.find((b) => b.aktørId === values.barnetSøknadenGjelder)
        : undefined;

    if (!barn) {
        return undefined;
    }

    return {
        type: 'registrertBarn',
        registrertBarn: barn,
    };
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

export const getRelasjonTilBarnetIntlKey = (relasjonTilBarnet: SøkersRelasjonTilBarnet): AppMessageKeys => {
    switch (relasjonTilBarnet) {
        case SøkersRelasjonTilBarnet.MOR:
            return 'steg.omBarnet.relasjonTilBarnet.mor';
        case SøkersRelasjonTilBarnet.FAR:
            return 'steg.omBarnet.relasjonTilBarnet.far';
        case SøkersRelasjonTilBarnet.FOSTERFORELDER:
            return 'steg.omBarnet.relasjonTilBarnet.fosterforelder';
        case SøkersRelasjonTilBarnet.ADOPTIVFORELDER:
            return 'steg.omBarnet.relasjonTilBarnet.adoptivforelder';
    }
};
