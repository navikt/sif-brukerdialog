import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { Søknadsdata, OmBarnetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnetFormValues } from './OmBarnetStep';
import { FormattedMessage } from 'react-intl';
import { dateFormatter } from '@navikt/sif-common-utils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/lib/utils/yesOrNoUtils';
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
        søkersRelasjonTilBarnet: undefined,
        sammeAdresse: YesOrNo.UNANSWERED,
        kroniskEllerFunksjonshemming: YesOrNo.UNANSWERED,
    };

    const { omBarnet } = søknadsdata;
    if (omBarnet) {
        const sammeAdresse = getYesOrNoFromBoolean(omBarnet.sammeAdresse);
        const kroniskEllerFunksjonshemming = getYesOrNoFromBoolean(omBarnet.kroniskEllerFunksjonshemming);

        switch (omBarnet.type) {
            case 'registrertBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: false,
                    barnetSøknadenGjelder: omBarnet.registrertBarn.aktørId,
                    sammeAdresse,
                    kroniskEllerFunksjonshemming,
                };
            case 'annetBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsFødselsnummer: omBarnet.barnetsFødselsnummer,
                    barnetsNavn: omBarnet.barnetsNavn,
                    søkersRelasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
                    sammeAdresse,
                    kroniskEllerFunksjonshemming,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnetSøknadsdataFromFormValues = (
    values: OmBarnetFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>,
): OmBarnetSøknadsdata | undefined => {
    const sammeAdresse = values.sammeAdresse === YesOrNo.YES;
    const kroniskEllerFunksjonshemming = values.kroniskEllerFunksjonshemming === YesOrNo.YES;

    if (values.søknadenGjelderEtAnnetBarn || registrerteBarn.length === 0) {
        if (values.søkersRelasjonTilBarnet === undefined) {
            return undefined;
        }
        return {
            type: 'annetBarn',
            søknadenGjelderEtAnnetBarn: true,
            barnetsFødselsnummer: values.barnetsFødselsnummer,
            barnetsNavn: values.barnetsNavn,
            søkersRelasjonTilBarnet: values.søkersRelasjonTilBarnet,
            sammeAdresse,
            kroniskEllerFunksjonshemming,
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
        sammeAdresse,
        kroniskEllerFunksjonshemming,
    };
};

export const mapBarnTilRadioProps = (barn: RegistrertBarn, disabled?: boolean): FormikRadioProp => {
    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
    return {
        value: aktørId,
        'data-testid': `barn-${aktørId}`,
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
export const barnet18årOgKanFortsette = (
    dateToday: Date,
    registrertBarn: RegistrertBarn[],
    barnetSøknadenGjelder?: string,
): boolean => {
    if (!barnetSøknadenGjelder) {
        true;
    }
    const barn = registrertBarn.find((b) => b.aktørId === barnetSøknadenGjelder);

    if (!barn) {
        //feil
        return true;
    }
    const fødselsdato = dayjs(barn.fødselsdato);
    const dato18år = fødselsdato.add(18, 'year');
    const cutoffDate = dato18år.add(1, 'year').set('month', 3).set('date', 1);

    return dayjs(dateToday).isBefore(cutoffDate) || dayjs(dateToday).isSame(cutoffDate, 'day');
};
