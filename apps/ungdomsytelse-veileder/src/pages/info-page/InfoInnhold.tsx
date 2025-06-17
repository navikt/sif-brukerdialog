import { Box, Heading, HGrid, Link } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ArticleContentFromUrl from './components/ArticleContentFromUrl';

// Dynamisk import av alle markdown-filer i articles-mappen
const articles = import.meta.glob('../../articles/*.md', { eager: true, as: 'raw' });

export interface MarkdownArticle {
    id: string;
    title: string;
    content: string;
}

export const articleList = Object.keys(articles).map((path): MarkdownArticle => {
    const fileName = path.split('/').pop() || '';
    const id = fileName.replace('.md', '');
    const content = articles[path] as string;

    // Finn første ikke-tomme linje (tittel)
    const lines = content.split('\n');
    const firstLineIndex = lines.findIndex((line) => line.trim().length > 0);
    const title = lines[firstLineIndex]?.replace(/^#+\s*/, '') || '';

    // Fjern tittellinjen fra innholdet
    const contentWithoutTitle = [...lines.slice(0, firstLineIndex), ...lines.slice(firstLineIndex + 1)].join('\n');

    return { id, title, content: contentWithoutTitle };
});

const InfoInnhold = () => {
    const navigate = useNavigate();

    return (
        <HGrid columns="1fr 4fr" gap="10">
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
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                        navigate(`/informasjon/${article.id}`);
                                    }}>
                                    <HGrid columns="1fr auto" gap="2" width="100%">
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
