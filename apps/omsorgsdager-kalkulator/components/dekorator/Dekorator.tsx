import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const Dekorator = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  useEffect(() => {
    setAvailableLanguages([
      {
        locale: 'nb',
        handleInApp: true,
      },
      {
        locale: 'nn',
        handleInApp: true,
      },
    ]);
  }, []);

  onLanguageSelect((language) => {
    router.push({ pathname, query }, asPath, { locale: language.locale });
  });

  return <>{children}</>;
};
