import { Box, Heading, HGrid, Link } from '@navikt/ds-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { MarkdownArticle } from '../../types/MarkdownArticle';
import ArticleContentFromUrl from './components/ArticleContentFromUrl';

// Dynamisk import av alle markdown-filer i articles-mappen (Vite v5: bruk query:'?raw', import:'default')
const articles = import.meta.glob('../../articles/*.md', { eager: true, query: '?raw', import: 'default' });

const rawArticleList: MarkdownArticle[] = Object.keys(articles).map((path): MarkdownArticle => {
    const fileName = path.split('/').pop() || '';
    const id = fileName.replace('.md', '');
    const raw = articles[path] as string;
    const lines = raw.split('\n');

    let title = '';
    let ingress: string | undefined = undefined;
    let content = '';

    // Finn tittel
    const tittelIndex = lines.findIndex((l) => l.trim().toLowerCase() === 'tittel');
    if (tittelIndex !== -1) {
        title = (lines[tittelIndex + 1] || '').trim();
    }

    // Finn ingress
    const ingressIndex = lines.findIndex((l) => l.trim().toLowerCase() === 'ingress');
    if (ingressIndex !== -1) {
        ingress = (lines[ingressIndex + 1] || '').trim();
    }

    // Content starter etter ingress-linjen eller tittel-linjen
    const getContentStartIndex = () => {
        if (ingressIndex !== -1) return ingressIndex + 2;
        if (tittelIndex !== -1) return tittelIndex + 2;
        return 0;
    };

    const contentStart = getContentStartIndex();
    content = lines.slice(contentStart).join('\n').trim();

    return { id, title, ingress, content };
});

const getOrder = (id: string) => {
    const prefix = id.split('-')[0];
    const n = parseInt(prefix, 10);
    return isNaN(n) ? Number.MAX_SAFE_INTEGER : n;
};

export const articleList = rawArticleList
    // Filtrer vekk duplikater/arbeidskopier
    .filter((a) => !a.id.toLowerCase().includes(' copy'))
    // Sorter på numerisk prefiks slik at rekkefølgen blir stabil
    .sort((a, b) => getOrder(a.id) - getOrder(b.id));

const InfoInnhold = () => {
    const navigate = useNavigate();

    return (
        <HGrid columns="1fr 4fr" gap="space-40">
            <Box>
                <nav>
                    <Heading level="2" size="small" className="mb-2">
                        Innhold
                    </Heading>
                    <ul className="mb-4">
                        {articleList.map((article) => (
                            <li key={article.id}>
                                <Link
                                    variant="neutral"
                                    href="#"
                                    className="w-full pt-2 p-2"
                                    role="button"
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                        navigate(`/informasjon/${article.id}`);
                                    }}>
                                    <HGrid columns="1fr auto" gap="space-8" width="100%">
                                        <span>{article.title}</span>
                                        <ChevronRightIcon width="1.2rem" height="1.2rem" />
                                    </HGrid>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Box>
            <Box>
                <Routes>
                    <Route index element={<ArticleContentFromUrl articleList={articleList} />} />
                    <Route path=":articleId" element={<ArticleContentFromUrl articleList={articleList} />} />
                </Routes>
            </Box>
        </HGrid>
    );
};

export default InfoInnhold;
