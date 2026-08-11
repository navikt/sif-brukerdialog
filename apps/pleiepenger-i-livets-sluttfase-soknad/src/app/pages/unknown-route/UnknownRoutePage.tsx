import { useEffectOnce } from '@navikt/sif-common-hooks';
import { appLogger, ErrorPage, SoknadErrorMessages } from '@navikt/sif-common-soknad-ds';

interface Props {
    pathName: string;
    onReset?: () => void;
}

const UnknownRoutePage = ({ pathName, onReset }: Props) => {
    useEffectOnce(() => {
        appLogger.logError('UnknownRoute', pathName);
    });
    return (
        <ErrorPage
            pageTitle="Det oppstod en feil"
            bannerTitle="Det oppstod en feil"
            contentRenderer={() => {
                return <SoknadErrorMessages.UnknownRoute onReset={onReset} />;
            }}
        />
    );
};

export default UnknownRoutePage;
