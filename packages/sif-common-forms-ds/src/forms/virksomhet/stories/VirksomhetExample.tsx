import { Checkbox, Heading, Panel, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { flatten } from 'flat';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { mapVirksomhetToVirksomhetApiData } from '../mapVirksomhetToApiData';
import { isVirksomhet, Næringstype, Virksomhet } from '../types';
import { VirksomhetFormErrors } from '../VirksomhetForm';
import VirksomhetInfoAndDialog from '../VirksomhetInfoAndDialog';
import { useVirksomhetIntl, virksomhetMessages } from '../virksomhetMessages';
import VirksomhetSummary from '../VirksomhetSummary';

enum FormField {
    'virksomhet' = 'virksomhet',
}

export const mockVirksomhet: Virksomhet = {
    id: '024782550-1402-01448-04932-71872390929312',
    næringstype: Næringstype.FISKE,
    fiskerErPåBladB: YesOrNo.YES,
    navnPåVirksomheten: 'Virksomhet AS',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '123123123',
    fom: new Date('2007-02-01T00:00:00.000Z'),
    erPågående: true,
    næringsinntekt: 20000,
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: YesOrNo.YES,
    blittYrkesaktivDato: new Date(),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.YES,
    varigEndringINæringsinntekt_dato: new Date('2019-12-09T00:00:00.000Z'),
    varigEndringINæringsinntekt_inntektEtterEndring: 200000,
    varigEndringINæringsinntekt_forklaring: 'Jeg fikk flere barn',
    harRegnskapsfører: YesOrNo.YES,
    regnskapsfører_navn: 'Regnskapsefører Truls',
    regnskapsfører_telefon: '98219409',
};

interface FormValues {
    [FormField.virksomhet]?: Virksomhet;
}

const initialValues: FormValues = {};

const VirksomhetExample = () => {
    const intl = useIntl();
    const { text } = useVirksomhetIntl();
    const [formValues, setFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const [harFlereVirksomheter, setHarFlereVirksomheter] = useState<boolean>(false);

    const { virksomhet } = formValues || {};

    const apiVirksomhet =
        virksomhet && isVirksomhet(virksomhet) ? mapVirksomhetToVirksomhetApiData(intl.locale, virksomhet) : undefined;

    return (
        <Tabs defaultValue="list">
            <VStack gap="4">
                <Tabs.List>
                    <Tabs.Tab value="list" label="ListAndDialog" />
                    <Tabs.Tab value="form" label="Form" />
                    <Tabs.Tab value="messages" label="Tekster" />
                </Tabs.List>
                <Tabs.Panel value="list" style={{ maxWidth: '50rem' }}>
                    <TypedFormikWrapper<FormValues>
                        initialValues={initialValues}
                        onSubmit={setFormValues}
                        renderForm={() => {
                            return (
                                <TypedFormikForm<FormValues, ValidationError>
                                    includeButtons={true}
                                    submitButtonLabel="Valider skjema"
                                    formErrorHandler={getFormErrorHandler(intl)}>
                                    <VirksomhetInfoAndDialog<FormField>
                                        name={FormField.virksomhet}
                                        harFlereVirksomheter={harFlereVirksomheter}
                                        validate={getRequiredFieldValidator()}
                                        labels={{
                                            addLabel: harFlereVirksomheter ? 'Registrer virksomhet' : 'Legg til',
                                            deleteLabel: 'Fjern',
                                            editLabel: 'Endre',
                                            infoTitle: 'Virksomhet',
                                            modalTitle: text('@forms.virksomhet.form_title'),
                                        }}
                                    />
                                </TypedFormikForm>
                            );
                        }}
                    />
                    <Block margin="l">
                        <hr />
                        <Panel style={{ padding: '1rem' }}>
                            <Block padBottom="m">Varianter:</Block>
                            <Block margin="m">
                                <Checkbox
                                    checked={harFlereVirksomheter}
                                    onChange={(evt) => setHarFlereVirksomheter(evt.currentTarget.checked)}>
                                    Bruker har flere virksomheter
                                </Checkbox>
                            </Block>
                        </Panel>
                    </Block>
                    {apiVirksomhet && (
                        <>
                            <Block margin="xxl" padBottom="l">
                                <Heading level="2" size="medium">
                                    Oppsummering av api data
                                </Heading>
                            </Block>
                            <Panel border={true}>
                                <VirksomhetSummary
                                    virksomhet={apiVirksomhet}
                                    harFlereVirksomheter={harFlereVirksomheter}
                                />
                            </Panel>
                        </>
                    )}
                </Tabs.Panel>
                {/* <Tabs.Panel value="form" style={{ maxWidth: '30rem' }}> */}
                {/* <Box padding="4" borderWidth="1" borderRadius="small">
                        <VirksomhetForm
                            opptjening={initialValues.opptjeningUtland[0]}
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                        <SubmitPreview values={singleFormValues} />
                    </Box> */}
                {/* </Tabs.Panel> */}

                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(VirksomhetFormErrors)}
                            intlMessages={virksomhetMessages}
                        />
                        <MessagesPreview messages={virksomhetMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default VirksomhetExample;
