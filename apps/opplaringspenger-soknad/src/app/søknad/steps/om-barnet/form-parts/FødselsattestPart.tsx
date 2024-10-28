import { Heading } from '@navikt/ds-react';
import React from 'react';

import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { getAttachmentsValidator, useAttachmentsHelper } from '@navikt/sif-common-core-ds';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields, OmBarnetFormValues } from '../OmBarnetStep';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import getLenker from '../../../../lenker';
import actionsCreator from '../../../context/action/actionCreator';
import { useSøknadContext } from '../../../context/hooks/useSøknadContext';

interface Props {
    fødselsattester: Attachment[];
}

const FødselsattestPart: React.FC<Props> = ({ fødselsattester }) => {
    const { text, intl } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<OmBarnetFormValues>();
    const andreVedlegg: Attachment[] = values[OmBarnetFormFields.fødselsattest] || [];
    const { dispatch } = useSøknadContext();

    const { logUserLoggedOut } = useAmplitudeInstance();

    const userNotLoggedIn = async () => {
        await logUserLoggedOut('Opplasting av dokument');
        relocateToLoginPage();
    };

    const onAttachmentsChange = (changedAttachments: Attachment[]) => {
        setFieldValue(OmBarnetFormFields.fødselsattest, changedAttachments);
        dispatch(actionsCreator.requestLagreSøknad());
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
                fieldName={OmBarnetFormFields.fødselsattest}
                attachments={fødselsattester}
                labels={{
                    addLabel: text('steg.omBarnet.fødselsattest.vedlegg'),
                    noAttachmentsText: 'Ingen fødselsattest',
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
