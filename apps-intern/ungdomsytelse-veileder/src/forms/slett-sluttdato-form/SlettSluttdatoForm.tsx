import { Alert, BodyLong, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { Deltaker } from '../../types/Deltaker';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import BorderBox from '../../atoms/BorderBox';
import Fødselsnummer from '../../atoms/Fødselsnummer';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../types/Deltakelse';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { useSlettSluttdato } from '../../hooks/useSlettSluttdato';
import BekreftSlettSluttdatoDialog from '../../components/bekreft-slett-sluttdato-dialog/BekreftSlettSluttdatoDialog';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
    onSluttdatoSlettet: () => void;
}

enum FieldNames {
    bekreftSletting = 'bekreftSletting',
}

type FormValues = {
    [FieldNames.bekreftSletting]: boolean;
};

const { Form, FormikWrapper, ConfirmationCheckbox } = getTypedFormComponents<FieldNames, FormValues, ValidationError>();

const SlettSluttdatoForm = ({ deltaker, deltakelse, onCancel, onSluttdatoSlettet }: Props) => {
    const { error, isPending, mutate } = useSlettSluttdato(deltaker.id, deltakelse.id);
    const [bekreftSlettInfo, setBekreftSlettSluttdato] = useState<boolean>(false);

    const intl = useIntl();

    const doSlettSluttdato = async () => {
        mutate({ deltakelseId: deltakelse.id }, { onSuccess: onSluttdatoSlettet });
    };

    return (
        <>
            <FormikWrapper
                initialValues={{}}
                onSubmit={() => {
                    setBekreftSlettSluttdato(true);
                }}
                renderForm={() => {
                    return (
                        <Form
                            onValidSubmit={() => null}
                            includeButtons={false}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'slettAktivDeltaker.validation')}>
                            <VStack gap="space-16">
                                <Alert variant="info">
                                    <Heading level="2" size="small" spacing>
                                        Slette sluttdato
                                    </Heading>
                                    <VStack gap="space-16">
                                        <BodyLong>info</BodyLong>
                                    </VStack>
                                </Alert>
                                <BorderBox className="p-6 items-center w-full">
                                    <VStack gap="space-16">
                                        <Heading level="2" size="small">
                                            Deltakelse
                                        </Heading>
                                        <Box marginBlock="space-0 space-16">
                                            <dl className="ungDefinitionList">
                                                <dt>Navn:</dt>
                                                <dd>{formatName(deltaker.navn)}</dd>
                                                <dt>Fødselsdato:</dt>
                                                <dd>{dateFormatter.compact(deltaker.fødselsdato)}</dd>
                                                <dt>Fødselsnummer:</dt>
                                                <dd>
                                                    <Fødselsnummer fnr={deltaker.deltakerIdent} copyEnabled={false} />
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

                                        <ConfirmationCheckbox
                                            name={FieldNames.bekreftSletting}
                                            label={
                                                <>
                                                    Jeg bekrefter at sluttdato for {formatName(deltaker.navn)} skal
                                                    slettes.
                                                </>
                                            }
                                            validate={getCheckedValidator()}></ConfirmationCheckbox>

                                        <HStack gap="space-16">
                                            <Button type="submit" variant="primary" loading={isPending}>
                                                Registrer sletting
                                            </Button>
                                            <Button type="button" variant="secondary" onClick={onCancel}>
                                                Avbryt
                                            </Button>
                                        </HStack>
                                        {error ? <ApiErrorAlert error={error} /> : null}
                                    </VStack>
                                </BorderBox>
                            </VStack>
                        </Form>
                    );
                }}
            />
            {bekreftSlettInfo && (
                <BekreftSlettSluttdatoDialog
                    deltakerNavn={formatName(deltaker.navn)}
                    onAvbryt={() => setBekreftSlettSluttdato(false)}
                    onBekreft={doSlettSluttdato}
                    open={true}
                />
            )}
        </>
    );
};

export default SlettSluttdatoForm;
