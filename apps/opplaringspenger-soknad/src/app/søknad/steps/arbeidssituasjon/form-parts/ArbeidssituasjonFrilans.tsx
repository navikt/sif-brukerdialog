import { BodyShort, Heading, Link, VStack } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { DateRange, getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { AppText, useAppIntl } from '../../../../i18n';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { getFrilanserSluttdatoValidator, getFrilanserStartdatoValidator } from '../../../../utils/frilansValidation';
import { getJobberNormaltTimerValidator } from '../../../../utils/jobberNormaltTimerValidator';
import { erFrilanserISøknadsperiode, harFrilansoppdrag } from './arbeidssituasjonFrilansUtils';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';
import InfoJobberNormaltTimerFrilanser from './info/InfoJobberNormaltTimerFrilanser';
import { FormLayout } from '@navikt/sif-common-ui';

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
        <>
            <Heading level="2" size="medium">
                <AppText id="steg.arbeidssituasjon.frilanser.tittel" />
            </Heading>

            <VStack gap="3">
                {søkerHarFrilansoppdrag && <FrilansoppdragInfo frilansoppdrag={frilansoppdrag} />}
                {søkerHarFrilansoppdrag === false && (
                    <Block margin="l">
                        <YesOrNoQuestion
                            name={FrilansFormFields.harHattInntektSomFrilanser}
                            legend={text('frilanser.harDuHattInntekt.spm')}
                            validate={getYesOrNoValidator()}
                            description={
                                søkerHarFrilansoppdrag ? undefined : (
                                    <ExpandableInfo title={text('frilanser.hjelpetekst.spm')}>
                                        <VStack gap="6">
                                            <BodyShort>
                                                {text('frilanser.hjelpetekst')}{' '}
                                                <Link href={urlSkatteetaten} target="_blank">
                                                    <AppText id="frilanser.hjelpetekst.skatteetatenLenke" />
                                                </Link>
                                                .
                                            </BodyShort>
                                            <VStack gap="2">
                                                <Heading level="3" size="xsmall">
                                                    <AppText id="frilanser.hjelpetekst.2.heading" />
                                                </Heading>
                                                <BodyShort>
                                                    <AppText id="frilanser.hjelpetekst.2" />
                                                </BodyShort>
                                            </VStack>
                                        </VStack>
                                    </ExpandableInfo>
                                )
                            }
                        />
                    </Block>
                )}
                {(harHattInntektSomFrilanser === YesOrNo.YES || søkerHarFrilansoppdrag) && (
                    <FormLayout.Panel>
                        {søkerHarFrilansoppdrag && (
                            <Heading level="2" size="small">
                                <AppText id="arbeidssituasjonFrilanser.frilanserPart.tittel" />
                            </Heading>
                        )}

                        <FormLayout.Questions>
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
                        </FormLayout.Questions>
                    </FormLayout.Panel>
                )}
            </VStack>
        </>
    );
};

export default ArbeidssituasjonFrilans;
