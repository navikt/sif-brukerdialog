import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from '@navikt/ds-react';
import { ISODate, ISODateToDate } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';
import InfoJobberNormaltTimerFrilanser from './info/InfoJobberNormaltTimerFrilanser';
import { DateRange, ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { Heading } from '@navikt/ds-react';
import { getFrilanserSluttdatoValidator, getFrilanserStartdatoValidator } from '../../../../utils/frilansValidation';
import { erFrilanserISøknadsperiode, harFrilansoppdrag } from './arbeidssituasjonFrilansUtils';
import { getJobberNormaltTimerValidator } from '../../../../utils/jobberNormaltTimerValidator';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';

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

    const intl = useIntl();

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
        hvor: intlHelper(intl, 'arbeidsforhold.part.som.FRILANSER'),
        jobber: intlHelper(intl, 'arbeidsforhold.part.jobber'),
    };

    return (
        <>
            <Heading level="2" size="large">
                <FormattedMessage id="steg.arbeidssituasjon.frilanser.tittel" />
            </Heading>
            {søkerHarFrilansoppdrag && <FrilansoppdragInfo frilansoppdrag={frilansoppdrag} />}
            {søkerHarFrilansoppdrag === false && (
                <Block margin="l">
                    <YesOrNoQuestion
                        name={FrilansFormFields.harHattInntektSomFrilanser}
                        legend={intlHelper(intl, 'frilanser.harDuHattInntekt.spm')}
                        validate={getYesOrNoValidator()}
                        description={
                            søkerHarFrilansoppdrag ? undefined : (
                                <ExpandableInfo title={intlHelper(intl, 'frilanser.hjelpetekst.spm')}>
                                    <>
                                        {intlHelper(intl, 'frilanser.hjelpetekst')}{' '}
                                        <Link href={urlSkatteetaten} target="_blank">
                                            <FormattedMessage id="frilanser.hjelpetekst.skatteetatenLenke" />
                                        </Link>
                                    </>
                                </ExpandableInfo>
                            )
                        }
                    />
                </Block>
            )}
            {(harHattInntektSomFrilanser === YesOrNo.YES || søkerHarFrilansoppdrag) && (
                <Block margin="l">
                    {søkerHarFrilansoppdrag && (
                        <Block padBottom="l">
                            <Heading level="2" size="small">
                                <FormattedMessage id="arbeidssituasjonFrilanser.frilanserPart.tittel" />
                            </Heading>
                        </Block>
                    )}

                    <DatePicker
                        name={FrilansFormFields.startdato}
                        label={intlHelper(intl, 'frilanser.nårStartet.spm')}
                        dropdownCaption={true}
                        minDate={dayjs().subtract(50, 'years').toDate()}
                        maxDate={søknadsdato}
                        validate={getFrilanserStartdatoValidator(formValues, søknadsperiode, søknadsdato)}
                    />
                    <FormBlock>
                        <YesOrNoQuestion
                            name={FrilansFormFields.jobberFortsattSomFrilans}
                            legend={intlHelper(intl, 'frilanser.jobberFortsatt.spm')}
                            validate={getYesOrNoValidator()}
                        />
                    </FormBlock>
                    {jobberFortsattSomFrilans === YesOrNo.NO && (
                        <FormBlock>
                            <DatePicker
                                name={FrilansFormFields.sluttdato}
                                label={intlHelper(intl, 'frilanser.nårSluttet.spm')}
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
                        </FormBlock>
                    )}
                    {visSpørsmålOmArbeidsforhold && (
                        <>
                            <FormBlock>
                                <NumberInput
                                    label={intlHelper(
                                        intl,
                                        jobberFortsattSomFrilans === YesOrNo.NO
                                            ? 'frilanser.jobberNormaltTimer.avsluttet.spm'
                                            : 'frilanser.jobberNormaltTimer.spm',
                                    )}
                                    name={FrilansFormFields.jobberNormaltTimer}
                                    description={<InfoJobberNormaltTimerFrilanser />}
                                    validate={getJobberNormaltTimerValidator(intlValues)}
                                    value={jobberNormaltTimer ? jobberNormaltTimer || '' : ''}
                                />
                            </FormBlock>
                        </>
                    )}
                </Block>
            )}
        </>
    );
};

export default ArbeidssituasjonFrilans;
