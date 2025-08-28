import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../../../i18n';
import ResetMellomagringButton from '../../../../components/reset-mellomlagring-button/ResetMellomlagringButton';

const ApiDataErrorPage = () => {
    const { text } = useAppIntl();
    return (
        <ErrorPage
            contentRenderer={() => {
                return (
                    <>
                        <p>
                            <AppText id="apiDataValidation.undefined" />
                        </p>
                        <p>
                            <AppText id="resetMellomlagring.text.1" />
                        </p>
                        <ResetMellomagringButton label={text('resetMellomlagring.startPåNytt')} />
                    </>
                );
            }}
        />
    );
};

export default ApiDataErrorPage;
