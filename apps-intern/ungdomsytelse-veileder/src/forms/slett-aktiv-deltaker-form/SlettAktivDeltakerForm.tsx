import { Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { useSlettDeltaker } from '../../hooks/useSlettDeltaker';
import { Deltaker } from '../../types/Deltaker';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import BorderBox from '../../atoms/BorderBox';
import Fødselsnummer from '../../atoms/Fødselsnummer';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../types/Deltakelse';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator, getRequiredFieldValidator, getStringValidator } from '@navikt/sif-validation';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import BekreftSlettAktivDeltakerDialog from '../../components/bekreft-slett-aktiv-deltaker-dialog/BekreftSlettAktivDeltakerDialog';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
    onDeltakerSlettet: () => void;
}

enum FormField {
    årsak = 'årsak',
    bekreftFødselsnummer = 'bekreftFødselsnummer',
    bekreftSletting = 'bekreftSletting',
}

type FormValues = {
    [FormField.årsak]: string;
    [FormField.bekreftFødselsnummer]: string;
    [FormField.bekreftSletting]: boolean;
};

const { Form, FormikWrapper, Select, TextField, ConfirmationCheckbox } = getTypedFormComponents<
    FormField,
    FormValues,
    ValidationError
>();

const SlettAktivDeltakerForm = ({ deltaker, deltakelse, onCancel, onDeltakerSlettet }: Props) => {
    const { error, isPending, mutate } = useSlettDeltaker(deltaker.id);
    const [visBekreftModal, setVisBekreftModal] = useState(false);

    const intl = useIntl();

    const handleOnSubmit = async () => {
        mutate({ deltakerId: deltaker.id }, { onSuccess: onDeltakerSlettet });
    };

    const siste5SifferFødselsnummer = deltaker.deltakerIdent.slice(-5);
    return (
        <>
            <FormikWrapper
                initialValues={{}}
                onSubmit={() => null}
                renderForm={() => {
                    return (
                        <Form
                            onValidSubmit={() => {
                                setVisBekreftModal(true);
                            }}
                            includeButtons={false}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'slettAktivDeltaker.validation')}>
                            <VStack gap="4">
                                <VStack gap="4">
                                    <BorderBox className="p-6 items-center w-full">
                                        <VStack gap="4">
                                            <Heading level="2" size="small">
                                                Deltaker som skal slettes
                                            </Heading>

                                            <Box marginBlock="0 4">
                                                <dl className="ungDefinitionList">
                                                    <dt>Navn:</dt>
                                                    <dd>{formatName(deltaker.navn)}</dd>
                                                    <dt>Fødselsdato:</dt>
                                                    <dd>{dateFormatter.compact(deltaker.fødselsdato)}</dd>
                                                    <dt>Fødselsnummer:</dt>
                                                    <dd>
                                                        <Fødselsnummer
                                                            fnr={deltaker.deltakerIdent}
                                                            copyEnabled={false}
                                                        />
                                                    </dd>
                                                    <dt>Startdato:</dt>
                                                    <dd>{dateFormatter.compact(deltakelse.fraOgMed)}</dd>
                                                    <dt>Sluttdato:</dt>
                                                    <dd>
                                                        {deltakelse.tilOgMed
                                                            ? dateFormatter.compact(deltakelse.tilOgMed)
                                                            : '-'}
                                                    </dd>
                                                </dl>
                                            </Box>

                                            <Select
                                                name={FormField.årsak}
                                                label="Velg årsak for sletting"
                                                validate={getRequiredFieldValidator()}>
                                                <option></option>
                                                <option value="1">Årsak 1</option>
                                                <option value="2">Årsak 2</option>
                                                <option value="3">Årsak 3</option>
                                                <option value="annet">Annet</option>
                                            </Select>

                                            <TextField
                                                name={FormField.bekreftFødselsnummer}
                                                label="Skriv inn 5 siste siffer i deltakers fødselsnummer for å verifisere deltaker som skal slettes"
                                                autoComplete="off"
                                                size="medium"
                                                maxLength={5}
                                                htmlSize={10}
                                                validate={(value) => {
                                                    const stringError = getStringValidator({
                                                        required: true,
                                                        minLength: 5,
                                                        maxLength: 5,
                                                    })(value);
                                                    if (stringError === undefined) {
                                                        if (value !== siste5SifferFødselsnummer) {
                                                            return 'stringDoesNotMatch';
                                                        }
                                                    }
                                                    return stringError;
                                                }}
                                            />

                                            <ConfirmationCheckbox
                                                name={FormField.bekreftSletting}
                                                label={
                                                    <>
                                                        Jeg bekrefter at {formatName(deltaker.navn)} skal slettes som
                                                        deltaker
                                                    </>
                                                }
                                                validate={getCheckedValidator()}></ConfirmationCheckbox>

                                            <HStack gap="4">
                                                <Button type="submit" variant="primary" loading={isPending}>
                                                    Slett deltaker
                                                </Button>
                                                <Button type="button" variant="secondary" onClick={onCancel}>
                                                    Avbryt
                                                </Button>
                                            </HStack>
                                            {error ? <ApiErrorAlert error={error} /> : null}
                                        </VStack>
                                    </BorderBox>
                                </VStack>
                            </VStack>
                        </Form>
                    );
                }}
            />
            <BekreftSlettAktivDeltakerDialog
                deltakerNavn={formatName(deltaker.navn)}
                onAvbryt={() => setVisBekreftModal(false)}
                onBekreft={handleOnSubmit}
                open={visBekreftModal}
            />
        </>
    );
};

export default SlettAktivDeltakerForm;
