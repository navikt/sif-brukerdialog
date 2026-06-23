import { BodyLong, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { Deltaker } from '../../types/Deltaker';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../types/Deltakelse';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { useSlettSluttdato } from '../../hooks/useSlettSluttdato';
import ConfirmDialog from '../../components/confirm-dialog/ConfirmDialog';
import BorderBox from '../../atoms/BorderBox';

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
    const [bekreftSlett, setBekreftSlett] = useState<boolean>(false);

    const intl = useIntl();

    const doSlettSluttdato = async () => {
        mutate({ deltakelseId: deltakelse.id }, { onSuccess: onSluttdatoSlettet });
    };

    return (
        <>
            <FormikWrapper
                initialValues={{}}
                onSubmit={() => {
                    setBekreftSlett(true);
                }}
                renderForm={() => {
                    return (
                        <Form
                            onValidSubmit={() => null}
                            includeButtons={false}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'slettSluttdato.validation')}>
                            <VStack gap="space-16">
                                <VStack gap="space-16">
                                    <BorderBox className="p-6 items-center w-full">
                                        <Heading level="2" size="small" spacing>
                                            Deltakelse
                                        </Heading>
                                        <Box marginBlock="space-0 space-16">
                                            <dl className="ungDefinitionList">
                                                <dt>Navn:</dt>
                                                <dd>{formatName(deltaker.navn)}</dd>
                                                <dt>Registrert sluttdato:</dt>
                                                <dd>
                                                    {deltakelse.tilOgMed
                                                        ? dateFormatter.compact(deltakelse.tilOgMed)
                                                        : '-'}
                                                </dd>
                                            </dl>
                                        </Box>
                                    </BorderBox>
                                    <ConfirmationCheckbox
                                        name={FieldNames.bekreftSletting}
                                        label={
                                            <>
                                                Jeg bekrefter at sluttdato for {formatName(deltaker.navn)} skal slettes.
                                            </>
                                        }
                                        validate={getCheckedValidator()}
                                    />
                                    <HStack gap="space-16">
                                        <Button type="submit" variant="primary" loading={isPending}>
                                            Slett sluttdato
                                        </Button>
                                        <Button type="button" variant="secondary" onClick={onCancel}>
                                            Avbryt
                                        </Button>
                                    </HStack>
                                    {error ? <ApiErrorAlert error={error} /> : null}
                                </VStack>
                            </VStack>
                        </Form>
                    );
                }}
            />
            {bekreftSlett && (
                <ConfirmDialog
                    open={true}
                    title="Bekreft sletting av sluttdato"
                    content={
                        <BodyLong>
                            Er du helt sikker på at du ønsker å slette sluttdato for {formatName(deltaker.navn)}? Dette
                            kan ikke angres.
                        </BodyLong>
                    }
                    confirmButtonText="Ja, slett sluttdato"
                    cancelButtonText="Nei, avbryt"
                    onCancel={() => setBekreftSlett(false)}
                    onConfirm={doSlettSluttdato}
                />
            )}
        </>
    );
};

export default SlettSluttdatoForm;
