import { InputTime, YesOrNo } from '@navikt/sif-common-formik-ds';

export enum FormFields {
    'jaNeiSpørsmål' = 'jaNeiSpørsmål',
    'tall' = 'tall',
    'tekst' = 'tekst',
    'fødselsnummer' = 'fødselsnummer',
    'dato' = 'dato',
    'tidsperiode_fra' = 'tidsperiode_fra',
    'tidsperiode_til' = 'tidsperiode_til',
    'orgnummer' = 'orgnummer',
    'liste' = 'liste',
    'radio' = 'radio',
    'select' = 'select',
    'checked' = 'checked',
    'time' = 'time',
}

export interface FormValues {
    [FormFields.jaNeiSpørsmål]?: YesOrNo;
    [FormFields.tall]?: string;
    [FormFields.tekst]?: string;
    [FormFields.fødselsnummer]?: string;
    [FormFields.dato]?: string;
    [FormFields.tidsperiode_fra]?: string;
    [FormFields.tidsperiode_til]?: string;
    [FormFields.orgnummer]?: string;
    [FormFields.liste]?: string[];
    [FormFields.select]?: string;
    [FormFields.radio]?: string;
    [FormFields.checked]?: boolean;
    [FormFields.time]?: Partial<InputTime>;
}

export const initialValues = {};
