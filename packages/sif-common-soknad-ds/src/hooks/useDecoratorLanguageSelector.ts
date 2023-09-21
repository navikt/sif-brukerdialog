import { useEffectOnce } from '@navikt/sif-common-hooks';
import { setAvailableLanguages, onLanguageSelect, Locale } from '@navikt/nav-dekoratoren-moduler';

function useDecoratorLanguageSelector(languages: Locale[], onChangeLocale: (locale: Locale) => void) {
    useEffectOnce(() => {
        if (languages.length > 1) {
            setAvailableLanguages(
                languages.map((locale) => ({
                    locale,
                    handleInApp: true,
                })),
            );
        }
        onLanguageSelect((language) => {
            onChangeLocale(language.locale as Locale);
        });
    });
}

export default useDecoratorLanguageSelector;
