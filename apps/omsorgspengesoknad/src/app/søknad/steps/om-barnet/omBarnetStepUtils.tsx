import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { Søknadsdata, OmBarnetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnetFormValues } from './OmBarnetStep';
import { FormattedMessage } from 'react-intl';
import { dateFormatter } from '@navikt/sif-common-utils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { SøknadContextState } from '../../../types/SøknadContextState';
import dayjs from 'dayjs';

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
        sammeAdresse: undefined,
        kroniskEllerFunksjonshemming: YesOrNo.UNANSWERED,
        høyereRisikoForFravær: YesOrNo.UNANSWERED,
        høyereRisikoForFraværBeskrivelse: undefined,
    };

    const { omBarnet } = søknadsdata;
    if (omBarnet) {
        const kroniskEllerFunksjonshemming = getYesOrNoFromBoolean(omBarnet.kroniskEllerFunksjonshemming);
        const høyereRisikoForFravær = getYesOrNoFromBoolean(omBarnet.høyereRisikoForFravær);

        switch (omBarnet.type) {
            case 'registrertBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: false,
                    barnetSøknadenGjelder: omBarnet.registrertBarn.aktørId,
                    sammeAdresse: omBarnet.sammeAdresse,
                    kroniskEllerFunksjonshemming,
                    høyereRisikoForFravær,
                    høyereRisikoForFraværBeskrivelse: omBarnet.høyereRisikoForFraværBeskrivelse,
                };
            case 'annetBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsFødselsnummer: omBarnet.barnetsFødselsnummer,
                    barnetsNavn: omBarnet.barnetsNavn,
                    barnetsFødselsdato: omBarnet.barnetsFødselsdato,
                    søkersRelasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
                    sammeAdresse: omBarnet.sammeAdresse,
                    kroniskEllerFunksjonshemming,
                    høyereRisikoForFravær,
                    høyereRisikoForFraværBeskrivelse: omBarnet.høyereRisikoForFraværBeskrivelse,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnetSøknadsdataFromFormValues = (
    values: OmBarnetFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>,
): OmBarnetSøknadsdata | undefined => {
    const kroniskEllerFunksjonshemming = values.kroniskEllerFunksjonshemming === YesOrNo.YES;
    const høyereRisikoForFravær = kroniskEllerFunksjonshemming
        ? values.høyereRisikoForFravær === YesOrNo.YES
        : undefined;

    if (values.søknadenGjelderEtAnnetBarn || registrerteBarn.length === 0) {
        if (values.søkersRelasjonTilBarnet === undefined || values.sammeAdresse === undefined) {
            return undefined;
        }
        return {
            type: 'annetBarn',
            søknadenGjelderEtAnnetBarn: true,
            barnetsFødselsnummer: values.barnetsFødselsnummer,
            barnetsFødselsdato: values.barnetsFødselsdato,
            barnetsNavn: values.barnetsNavn,
            søkersRelasjonTilBarnet: values.søkersRelasjonTilBarnet,
            sammeAdresse: values.sammeAdresse,
            kroniskEllerFunksjonshemming,
            høyereRisikoForFravær,
            høyereRisikoForFraværBeskrivelse: høyereRisikoForFravær
                ? values.høyereRisikoForFraværBeskrivelse
                : undefined,
        };
    }
    const barn = values.barnetSøknadenGjelder
        ? registrerteBarn.find((b) => b.aktørId === values.barnetSøknadenGjelder)
        : undefined;

    if (!barn) {
        return undefined;
    }

    if (!values.sammeAdresse) {
        return undefined;
    }

    return {
        type: 'registrertBarn',
        registrertBarn: barn,
        sammeAdresse: values.sammeAdresse,
        kroniskEllerFunksjonshemming,
        høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse: høyereRisikoForFravær ? values.høyereRisikoForFraværBeskrivelse : undefined,
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
                    <FormattedMessage
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
