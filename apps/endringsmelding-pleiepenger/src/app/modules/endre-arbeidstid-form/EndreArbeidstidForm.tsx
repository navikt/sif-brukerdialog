import { AppIntlShape, AppText, useAppIntl } from '@app/i18n';
import { ArbeidstidEndring, Arbeidsuke, LovbestemtFerieSøknadsdata } from '@app/types';
import {
    arbeidsukerHarLikNormaltidPerDag,
    erKortArbeidsuke,
    getArbeidsukeUkenummer,
    getDagerTekst,
    getFeriedagerIUke,
    getFeriedagerIUkeTekst,
} from '@app/utils';
import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import {
    getIntlFormErrorHandler,
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { FormLayout, getDurationString } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { getNumberValidator } from '@sif/validation';
import dayjs from 'dayjs';

import UkeTags from '../arbeidstid-uker/components/UkeTags';
import { getArbeidstidSpørsmålDescription, getArbeidsukerPerÅr } from './endreArbeidstidFormUtils';
import { getEndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';

type EndreArbeidstidData = {
    perioder: DateRange[];
    endring: ArbeidstidEndring;
};

export interface EndreArbeidstidFormProps {
    arbeidsuker: Arbeidsuke[];
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    endring?: ArbeidstidEndring;
    onSubmit: (data: EndreArbeidstidData) => void;
    onCancel: () => void;
}

export enum EndreArbeidstidFormField {
    antallTimer = 'antallTimer',
}

export interface EndreArbeidstidFormValues {
    [EndreArbeidstidFormField.antallTimer]?: string;
}

const { FormikWrapper, Form, NumberInput } = getTypedFormComponents<
    EndreArbeidstidFormField,
    EndreArbeidstidFormValues,
    ValidationError
>();

const EndreArbeidstidForm = ({
    arbeidsuker,
    lovbestemtFerie,
    endring,
    onCancel,
    onSubmit,
}: EndreArbeidstidFormProps) => {
    const appIntl = useAppIntl();
    const { text, intl } = appIntl;

    const onFormSubmit = (values: EndreArbeidstidFormValues) => {
        const antallTimer = getNumberFromNumberInputValue(values.antallTimer);
        if (antallTimer !== undefined) {
            onSubmit({
                perioder: arbeidsuker.map((uke) => uke.periode),
                endring: { timer: antallTimer },
            });
        }
    };

    if (arbeidsuker.length === 0) {
        return null;
    }

    const dagerMedFjernetFerie = lovbestemtFerie
        ? getFeriedagerIUke(lovbestemtFerie.feriedagerMeta.datoerFjernet, arbeidsuker[0].periode, true)
        : [];

    const gjelderKortUke = arbeidsuker.length === 1 && erKortArbeidsuke(arbeidsuker[0].periode);

    const getMaksTimer = () => {
        const antallDager = arbeidsuker.length === 1 ? arbeidsuker[0].antallDagerMedArbeidstid : 7;
        return 24 * antallDager;
    };

    return (
        <FormikWrapper
            initialValues={{ antallTimer: endring ? `${endring.timer}` : undefined }}
            onSubmit={onFormSubmit}
            renderForm={() => {
                return (
                    <VStack gap="space-32">
                        <div>
                            <Heading size="large" level="2" spacing={true}>
                                {arbeidsuker.length === 1
                                    ? text('endreArbeidstidForm.heading.endreForEnUke', {
                                          ukenummer: getArbeidsukeUkenummer(arbeidsuker[0], true),
                                      })
                                    : text('endreArbeidstidForm.heading.endreForFlereUker')}
                            </Heading>
                            <BodyShort size="large" as="div">
                                {getUkerOgÅrBeskrivelse(arbeidsuker, appIntl, lovbestemtFerie)}
                            </BodyShort>
                        </div>
                        {dagerMedFjernetFerie && dagerMedFjernetFerie.length > 0 && (
                            <Alert variant="warning">
                                <AppText
                                    id="endreArbeidstidForm.dagerMedFerieFjernet.melding"
                                    values={{ feriedagerTekst: getFeriedagerIUkeTekst(dagerMedFjernetFerie) }}
                                />
                            </Alert>
                        )}
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endreArbeidstidForm')}
                            includeValidationSummary={true}
                            submitButtonLabel="Ok"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <FormLayout.Questions>
                                {gjelderKortUke && (
                                    <Alert variant="info" inline={false}>
                                        <AppText
                                            id="endreArbeidstidForm.kortUke.info"
                                            values={{ dager: getDagerTekst(arbeidsuker[0].periode) }}
                                        />
                                    </Alert>
                                )}

                                <NumberInput
                                    name={EndreArbeidstidFormField.antallTimer}
                                    label={
                                        arbeidsuker.length === 1
                                            ? text(
                                                  'endreArbeidstidForm.timerAvNormalt.spm',
                                                  getEndreArbeidstidIntlValues(arbeidsuker[0]),
                                              )
                                            : text('endreArbeidstidForm.timerAvNormalt.flereUker.spm')
                                    }
                                    data-testid="timer-verdi"
                                    width="xs"
                                    description={getNormalarbeidstidDescription(appIntl, arbeidsuker)}
                                    maxLength={5}
                                    validate={(value) => {
                                        const max = getMaksTimer();
                                        const error = getNumberValidator({
                                            required: true,
                                            min: 0,
                                            max,
                                        })(value);
                                        return error ? { key: error, values: { maksTimer: max } } : undefined;
                                    }}
                                />
                            </FormLayout.Questions>
                        </Form>
                    </VStack>
                );
            }}
        />
    );
};

export default EndreArbeidstidForm;

const getUkerOgÅrBeskrivelse = (
    arbeidsuker: Arbeidsuke[],
    { text, intl }: AppIntlShape,
    lovbestemtFerie?: LovbestemtFerieSøknadsdata,
) => {
    if (arbeidsuker.length === 1) {
        const dagerMedFerie = lovbestemtFerie
            ? getFeriedagerIUke(lovbestemtFerie.feriedagerMeta.datoerMedFerie, arbeidsuker[0].periode, true)
            : [];
        return (
            <VStack gap="space-8">
                <BodyShort as="div" className="capsFirstLetter">
                    {getArbeidstidSpørsmålDescription(arbeidsuker[0], intl.locale)}
                </BodyShort>
                {dagerMedFerie.length > 0 && <UkeTags visDagNavn={true} dagerMedFerie={dagerMedFerie} />}
            </VStack>
        );
    }
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);
    const getUker = (uker: Arbeidsuke[]) => {
        if (!uker) {
            return text('endreArbeidstidForm.ukerOgÅr.ingenUkerValgt');
        }
        return uker ? uker.map((uke) => dayjs(uke.periode.from).isoWeek()).join(', ') : [];
    };

    const årKeys = Object.keys(ukerPerÅr);
    return (
        <ExpandableInfo
            title={text('endreArbeidstidForm.ukerOgÅr.visValgteUker.tittel', {
                antallUker: arbeidsuker.length,
            })}>
            {årKeys.map((år) => {
                return (
                    <div key={år}>
                        <AppText
                            id="endreArbeidstidForm.ukerOgÅr.årOgUke"
                            values={{ år, uker: getUker(ukerPerÅr[år]) }}
                        />
                    </div>
                );
            })}
        </ExpandableInfo>
    );
};

const getNormalarbeidstidDescription = ({ text, intl }: AppIntlShape, arbeidsuker: Arbeidsuke[]) => {
    if (arbeidsuker.length === 1) {
        const uke = arbeidsuker[0];
        const gjelderKortUke = erKortArbeidsuke(uke.periode);
        const periodeTekst = gjelderKortUke ? ` ${getDagerTekst(uke.periode)}` : ' denne uken';
        return text('endreArbeidstidForm.normalarbeidstid.enUke', {
            periodeTekst,
            varighet: getDurationString(intl, { duration: uke.normalt.uke }),
        });
    }
    if (arbeidsukerHarLikNormaltidPerDag(arbeidsuker)) {
        const uke = arbeidsuker[0];
        return text('endreArbeidstidForm.normalarbeidstid.likHverUke', {
            varighet: getDurationString(intl, {
                duration: uke.normalt.uke,
            }),
        });
    }
    return text('endreArbeidstidForm.normalarbeidstid.ulikMellomUker');
};
