import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { getAttachmentsValidator, useAttachmentsHelper } from '@navikt/sif-common-core-ds';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { useFormikContext } from 'formik';
import { persist } from '../../api/api';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { relocateToLoginPage } from '../../utils/navigationUtils';

interface Props {
    fødselsattester: Attachment[];
}

const FødselsattestPart: React.FC<Props> = ({ fødselsattester }) => {
    const { text, intl } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();
    const andreVedlegg: Attachment[] = values[SøknadFormField.legeerklæring] || [];

    const { logUserLoggedOut } = useAmplitudeInstance();

    const userNotLoggedIn = async () => {
        await logUserLoggedOut('Opplasting av dokument');
        relocateToLoginPage();
    };

    const onAttachmentsChange = (changedAttachments: Attachment[]) => {
        const valuesToPersist: SøknadFormValues = { ...values, fødselsattest: changedAttachments };
        setFieldValue(SøknadFormField.fødselsattest, changedAttachments);
        persist({ formValues: valuesToPersist, lastStepID: StepID.LEGEERKLÆRING });
    };

    useAttachmentsHelper(fødselsattester, andreVedlegg, onAttachmentsChange);

    return (
        <>
            <Heading level="2" size="medium" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                {text('steg.omBarnet.fødselsattest.tittel')}
            </Heading>
            <Block margin="m">
                <AppText id="steg.omBarnet.fødselsattest.info" />
            </Block>
            <FormikAttachmentForm
                fieldName={SøknadFormField.fødselsattest}
                attachments={fødselsattester}
                labels={{
                    addLabel: text('steg.omBarnet.fødselsattest.vedlegg'),
                    noAttachmentsText: text('step.oppsummering.omBarn.ingenFødselsattest'),
                }}
                validate={getAttachmentsValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                onUnauthorizedOrForbiddenUpload={userNotLoggedIn}
                otherAttachments={andreVedlegg}
            />
        </>
    );
};

export default FødselsattestPart;
