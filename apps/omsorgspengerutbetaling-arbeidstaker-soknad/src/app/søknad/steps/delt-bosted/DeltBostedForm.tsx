import { Link } from '@navikt/ds-react';
import React from 'react';
import { FormikFileUpload, useVedleggHelper } from '@navikt/sif-common-core-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';

interface Props {
    values: Partial<DeltBostedFormValues>;
    goBack?: () => void;
    isSubmitting?: boolean;
    andreVedlegg?: Vedlegg[];
}

export enum DeltBostedFormFields {
    vedlegg = 'vedlegg',
}

export interface DeltBostedFormValues {
    [DeltBostedFormFields.vedlegg]: Vedlegg[];
}

const { Form } = getTypedFormComponents<DeltBostedFormFields, DeltBostedFormValues>();

const DeltBostedForm: React.FunctionComponent<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const { text, intl } = useAppIntl();
    const vedlegg = values.vedlegg ? values.vedlegg : [];
    const { hasPendingUploads } = useVedleggHelper(vedlegg, andreVedlegg);

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <Block padBottom="xl">
                <SifGuidePanel>
                    <p style={{ marginTop: 0 }}>
                        <AppText id={'step.deltBosted.info.1'} />
                    </p>
                    <p>
                        <AppText
                            id={'step.deltBosted.info.2'}
                            values={{
                                Lenke: (children) => (
                                    <Link target={'_blank'} href={getLenker(intl.locale).deltFastBosted}>
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </p>
                    <p>
                        <AppText id={'step.deltBosted.info.3'} />
                    </p>
                    <p>
                        <AppText id={'step.deltBosted.info.4'} />
                    </p>
                </SifGuidePanel>
            </Block>
            <FormikFileUpload
                label={text('step.deltBosted.vedleggsliste.tittel')}
                initialFiles={vedlegg}
                fieldName={DeltBostedFormFields.vedlegg}
                validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
            />
        </Form>
    );
};

export default DeltBostedForm;
