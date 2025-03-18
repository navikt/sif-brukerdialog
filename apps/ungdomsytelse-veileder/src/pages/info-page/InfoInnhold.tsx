import { Box, Heading, HGrid, Link } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ArticleContent from './components/ArticleContent';

// Dynamisk import av alle markdown-filer i articles-mappen
const articles = import.meta.glob('../../articles/*.md', { eager: true, as: 'raw' });

const articleList = Object.keys(articles).map((path) => {
    const fileName = path.split('/').pop() || '';
    const id = fileName.replace('.md', '');
    const title = fileName
        .replace(/^\d+(\.\d+)*-/, '')
        .replace('.md', '')
        .replace(/_/g, ' ');
    return { id, title, content: articles[path] as string };
});

interface Props {}

const InfoInnhold = ({}: Props) => {
    const navigate = useNavigate();

    return (
        <HGrid columns={'1fr 4fr'} gap="10">
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
                                    <HGrid columns={'1fr auto'} gap="2" width={'100%'}>
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
                    <Route path="/*" element={<ArticleContent articleList={articleList} />} />
                </Routes>
            </Box>
        </HGrid>
    );
};

export default InfoInnhold;
