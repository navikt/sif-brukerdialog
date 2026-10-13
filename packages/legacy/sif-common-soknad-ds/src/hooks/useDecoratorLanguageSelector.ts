import { DecoratorLocale, onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';

function useDecoratorLanguageSelector(languages: DecoratorLocale[], onChangeLocale: (locale: DecoratorLocale) => void) {
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
            onChangeLocale(language.locale as DecoratorLocale);
        });
    });
}

export default useDecoratorLanguageSelector;
