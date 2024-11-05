import { Alert, BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react';
import { FormikConfirmationCheckbox, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateFormatter, dateRangeFormatter, dateToISODate } from '@navikt/sif-common-utils';
import { Deltakelse, SøknadApiData } from '../../api/types';
import { useAppIntl } from '../../i18n';
import { useSendSøknad } from '../hooks/useSendSøknad';
import { Søker } from '@navikt/sif-common-api';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import ShadowBox from '../../components/shadow-box/ShadowBox';
import dayjs from 'dayjs';

export interface FormValues {
    fom: string;
    tom: string;
    harBekreftetOpplysninger: boolean;
}

interface Props {
    søker: Søker;
    deltakelse: Deltakelse;
    onSøknadSendt: (deltakelse: Deltakelse) => void;
    onClose: (deltakelse: Deltakelse) => void;
}

const initialValues: Partial<FormValues> = {};

const DeltakelseForm = ({ deltakelse, søker, onClose, onSøknadSendt }: Props) => {
    const { intl } = useAppIntl();
    const { programPeriode } = deltakelse;
    const { isSubmitting, sendSøknad, sendSøknadError, søknadSendt } = useSendSøknad();

    return søknadSendt ? (
        <>
            <Alert variant="success">
                <Kvittering tittel="Søknad mottatt">
                    <VStack gap="6">
                        <BodyShort>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat eum assumenda tempore
                            pariatur quaerat aut nihil maiores recusandae similique. Et quisquam similique doloremque
                            optio odit impedit temporibus ullam hic officiis.
                        </BodyShort>
                        <HStack align="center" justify="center">
                            <Button onClick={() => onClose(deltakelse)}>Ok</Button>
                        </HStack>
                    </VStack>
                </Kvittering>
            </Alert>
        </>
    ) : (
        <TypedFormikWrapper
            initialValues={initialValues}
            onSubmit={async (values) => {
                const data: SøknadApiData = {
                    id: deltakelse.id,
                    fraOgMed: dateToISODate(deltakelse.programPeriode.from),
                    tilOgMed: dateToISODate(
                        deltakelse.programPeriode.to || dayjs(deltakelse.programPeriode.from).add(1, 'month').toDate(),
                    ),
                    harBekreftetOpplysninger: values.harBekreftetOpplysninger,
                    harForståttRettigheterOgPlikter: true,
                    språk: 'nb',
                    søkerNorskIdent: søker.fødselsnummer,
                };
                await sendSøknad(data);
                onSøknadSendt(deltakelse);
            }}
            renderForm={() => {
                return (
                    <>
                        <TypedFormikForm
                            submitButtonLabel="Send inn"
                            isFinalSubmit={true}
                            submitPending={isSubmitting}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'søknad')}
                            showSubmitButton={false}>
                            <ShadowBox>
                                <FormLayout.Questions>
                                    <FormLayout.SectionHeading>
                                        {programPeriode.to
                                            ? `Delta i perioden ${dateRangeFormatter.getDateRangeText({ from: programPeriode.from, to: programPeriode.to }, 'nb')}`
                                            : `Delta fra ${dateFormatter.compact(programPeriode.from)}`}
                                    </FormLayout.SectionHeading>

                                    <BodyShort>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet asperiores
                                        corrupti optio, aliquam praesentium harum reprehenderit. Cumque maxime quia
                                        tenetur esse placeat reprehenderit, soluta amet adipisci qui officia, nesciunt
                                        culpa.
                                    </BodyShort>

                                    <FormikConfirmationCheckbox
                                        name="harBekreftetOpplysninger"
                                        label="Jeg bekrefter at jeg vil være med"
                                        validate={getCheckedValidator()}>
                                        Du må bekrefte at du ønsker å være med i programmet i denne perioden
                                    </FormikConfirmationCheckbox>

                                    <Box>
                                        <Button type="submit">Send inn</Button>
                                    </Box>
                                </FormLayout.Questions>
                            </ShadowBox>
                        </TypedFormikForm>
                        {sendSøknadError && (
                            <Alert variant="error">
                                Det skjedde en feil ved sending av søknad:
                                <div>
                                    <code>{JSON.stringify(sendSøknadError.message)}</code>
                                </div>
                            </Alert>
                        )}
                    </>
                );
            }}
        />
    );
};

export default DeltakelseForm;
