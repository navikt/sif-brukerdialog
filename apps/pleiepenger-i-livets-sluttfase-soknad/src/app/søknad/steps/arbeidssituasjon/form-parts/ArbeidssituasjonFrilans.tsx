import { Heading, Link } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import {
    datepickerUtils,
    DateRange,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import { AppText, useAppIntl } from '../../../../i18n';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { getFrilanserSluttdatoValidator, getFrilanserStartdatoValidator } from '../../../../utils/frilansValidation';
import { getJobberNormaltTimerValidator } from '../../../../utils/jobberNormaltTimerValidator';
import { erFrilanserISøknadsperiode, harFrilansoppdrag } from './arbeidssituasjonFrilansUtils';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';
import InfoJobberNormaltTimerFrilanser from './info/InfoJobberNormaltTimerFrilanser';

export enum FrilansFormFields {
    harHattInntektSomFrilanser = 'frilans.harHattInntektSomFrilanser',
    startdato = 'frilans.startdato',
    sluttdato = 'frilans.sluttdato',
    jobberFortsattSomFrilans = 'frilans.jobberFortsattSomFrilans',
    jobberNormaltTimer = 'frilans.jobberNormaltTimer',
}

export interface FrilansFormData {
    harHattInntektSomFrilanser: YesOrNo;
    jobberFortsattSomFrilans?: YesOrNo;
    startdato?: ISODate;
    sluttdato?: ISODate;
    jobberNormaltTimer?: string;
}

const { YesOrNoQuestion, DatePicker, NumberInput } = getTypedFormComponents<
    FrilansFormFields,
    FrilansFormData,
    ValidationError
>();

interface Props {
    formValues: FrilansFormData;
    søknadsperiode: DateRange;
    søknadsdato: Date;
    frilansoppdrag: Arbeidsgiver[];
    urlSkatteetaten: string;
}

const ArbeidssituasjonFrilans = ({
    formValues,
    søknadsperiode,
    søknadsdato,
    frilansoppdrag,
    urlSkatteetaten,
}: Props) => {
    const { startdato, sluttdato, harHattInntektSomFrilanser, jobberFortsattSomFrilans, jobberNormaltTimer } =
        formValues;

    const { text } = useAppIntl();

    const søkerHarFrilansoppdrag = harFrilansoppdrag(frilansoppdrag);
    const erAktivFrilanserIPerioden = erFrilanserISøknadsperiode(søknadsperiode, formValues, frilansoppdrag);
    const harGyldigStartdato = startdato ? ISODateToDate(startdato) : undefined;
    const harGyldigSluttdato = sluttdato ? ISODateToDate(sluttdato) : undefined;
    const harBesvartSpørsmålOmFortsattFrilanser =
        jobberFortsattSomFrilans === YesOrNo.YES || jobberFortsattSomFrilans === YesOrNo.NO;

    const sluttetFørSøknadsperiode =
        jobberFortsattSomFrilans === YesOrNo.NO &&
        harGyldigSluttdato &&
        dayjs(sluttdato).isBefore(søknadsperiode.from, 'day');

    const visSpørsmålOmArbeidsforhold =
        harGyldigStartdato &&
        harBesvartSpørsmålOmFortsattFrilanser &&
        sluttetFørSøknadsperiode === false &&
        erAktivFrilanserIPerioden;

    const intlValues = {
        hvor: text('arbeidsforhold.part.som.FRILANSER'),
        jobber: text('arbeidsforhold.part.jobber'),
    };

    return (
        <FormLayout.Questions>
            {søkerHarFrilansoppdrag && <FrilansoppdragInfo frilansoppdrag={frilansoppdrag} />}
            {søkerHarFrilansoppdrag === false && (
                <YesOrNoQuestion
                    name={FrilansFormFields.harHattInntektSomFrilanser}
                    legend={text('frilanser.harDuHattInntekt.spm')}
                    validate={getYesOrNoValidator()}
                    description={
                        søkerHarFrilansoppdrag ? undefined : (
                            <ExpandableInfo title={text('frilanser.hjelpetekst.spm')}>
                                <>
                                    {text('frilanser.hjelpetekst')}{' '}
                                    <Link href={urlSkatteetaten} target="_blank">
                                        <AppText id="frilanser.hjelpetekst.skatteetatenLenke" />
                                    </Link>
                                </>
                            </ExpandableInfo>
                        )
                    }
                />
            )}
            {(harHattInntektSomFrilanser === YesOrNo.YES || søkerHarFrilansoppdrag) && (
                <>
                    {søkerHarFrilansoppdrag && (
                        <Heading level="2" size="small">
                            <AppText id="arbeidssituasjonFrilanser.frilanserPart.tittel" />
                        </Heading>
                    )}

                    <DatePicker
                        name={FrilansFormFields.startdato}
                        label={text('frilanser.nårStartet.spm')}
                        dropdownCaption={true}
                        minDate={dayjs().subtract(50, 'years').toDate()}
                        maxDate={søknadsdato}
                        validate={getFrilanserStartdatoValidator(formValues, søknadsperiode, søknadsdato)}
                    />

                    <YesOrNoQuestion
                        name={FrilansFormFields.jobberFortsattSomFrilans}
                        legend={text('frilanser.jobberFortsatt.spm')}
                        validate={getYesOrNoValidator()}
                    />

                    {jobberFortsattSomFrilans === YesOrNo.NO && (
                        <DatePicker
                            name={FrilansFormFields.sluttdato}
                            label={text('frilanser.nårSluttet.spm')}
                            dropdownCaption={true}
                            minDate={datepickerUtils.getDateFromDateString(startdato)}
                            maxDate={søknadsdato}
                            validate={getFrilanserSluttdatoValidator(
                                formValues,
                                søknadsperiode,
                                søknadsdato,
                                søkerHarFrilansoppdrag,
                            )}
                        />
                    )}
                    {visSpørsmålOmArbeidsforhold && (
                        <NumberInput
                            label={text(
                                jobberFortsattSomFrilans === YesOrNo.NO
                                    ? 'frilanser.jobberNormaltTimer.avsluttet.spm'
                                    : 'frilanser.jobberNormaltTimer.spm',
                            )}
                            name={FrilansFormFields.jobberNormaltTimer}
                            description={<InfoJobberNormaltTimerFrilanser />}
                            validate={getJobberNormaltTimerValidator(intlValues)}
                            maxLength={5}
                            value={jobberNormaltTimer ? jobberNormaltTimer || '' : ''}
                        />
                    )}
                </>
            )}
        </FormLayout.Questions>
    );
};

export default ArbeidssituasjonFrilans;
