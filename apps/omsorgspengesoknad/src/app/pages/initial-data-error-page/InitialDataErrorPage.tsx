import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import ResetMellomagringButton from '../../components/reset-mellomlagring-button/ResetMellomlagringButton';

const InitialDataErrorPage = () => {
    const { text } = useAppIntl();
    return (
        <ErrorPage
            pageTitle={text('initialLoadError.pageTitle')}
            contentRenderer={() => (
                <>
                    <p>
                        <AppText id="initialLoadError.text.1" />
                    </p>
                    <p>
                        <AppText id="resetMellomlagring.text.1" />
                    </p>
                    <ResetMellomagringButton label={text('resetMellomlagring.startPåNytt')} />
                </>
            )}
        />
    );
};

export default InitialDataErrorPage;
