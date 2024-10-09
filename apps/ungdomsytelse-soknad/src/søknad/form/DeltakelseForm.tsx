import { Alert, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import {
    DateRange,
    FormikConfirmationCheckbox,
    TypedFormikForm,
    TypedFormikWrapper,
} from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateRangeFormatter, dateToISODate } from '@navikt/sif-common-utils';
import ShadowBox from '@navikt/sif-common/src/api/dev-info-components/ShadowBox';
import { Deltakelse, SøknadApiData } from '../../api/types';
import { useAppIntl } from '../../i18n';
import { useSendSøknad } from '../hooks/useSendSøknad';
import { Søker } from '@navikt/sif-common';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';

export interface FormValues {
    fom: string;
    tom: string;
    harBekreftetOpplysninger: boolean;
}

interface Props {
    søker: Søker;
    deltakelse: Deltakelse;
    onSøknadSendt: () => void;
}

const initialValues: Partial<FormValues> = {};

const DeltakelseForm = ({ deltakelse, søker, onSøknadSendt }: Props) => {
    const { intl } = useAppIntl();
    const periode: DateRange = {
        from: deltakelse.fraOgMed,
        to: deltakelse.tilOgMed,
    };
    const { isSubmitting, sendSøknad, sendSøknadError, søknadSendt } = useSendSøknad();
    const periodeTekst = dateRangeFormatter.getDateRangeText(periode, 'nb');

    return søknadSendt ? (
        <Kvittering tittel="Søknad sendt">
            <VStack gap="8">
                <BodyShort>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat eum assumenda tempore pariatur
                    quaerat aut nihil maiores recusandae similique. Et quisquam similique doloremque optio odit impedit
                    temporibus ullam hic officiis.
                </BodyShort>
            </VStack>
        </Kvittering>
    ) : (
        <TypedFormikWrapper
            initialValues={initialValues}
            onSubmit={async (values) => {
                const data: SøknadApiData = {
                    søknadId: deltakelse.id,
                    fraOgMed: dateToISODate(deltakelse.fraOgMed),
                    tilOgMed: dateToISODate(deltakelse.tilOgMed),
                    harBekreftetOpplysninger: values.harBekreftetOpplysninger,
                    harForståttRettigheterOgPlikter: true,
                    språk: 'nb',
                    søkerNorskIdent: søker.fødselsnummer,
                };
                // setApiData(data);
                await sendSøknad(data);
                onSøknadSendt();
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
                                        Delta i perioden {periodeTekst}
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
                                        validate={getRequiredFieldValidator()}>
                                        Du må bekrefte at du ønsker å være med i programmet for perioden {periodeTekst}.
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
