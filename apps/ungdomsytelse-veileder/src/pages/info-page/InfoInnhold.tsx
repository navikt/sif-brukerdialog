import { BodyLong, Box, Heading, HGrid, Link } from '@navikt/ds-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import remarkGfm from 'remark-gfm'; // Støtte for tabeller, sjekklister, gjennomstreking

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
    const [selectedArticle, setSelectedArticle] = useState(articleList[0]);

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
                                    className={`w-full pt-2 p-2 ${selectedArticle.id === article.id ? 'bg-gray-100' : ''}`}
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                        setSelectedArticle(article);
                                        // setContent(article.content);
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
                <div className="prose">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <Heading level="1" size="large" spacing={true}>
                                    {children}
                                </Heading>
                            ),
                            h2: ({ children }) => (
                                <Heading level="2" size="medium" spacing={true}>
                                    {children}
                                </Heading>
                            ),
                            h3: ({ children }) => (
                                <Heading level="3" size="small" spacing={true}>
                                    {children}
                                </Heading>
                            ),
                            p: ({ children }) => (
                                <BodyLong as="p" spacing={true}>
                                    {children}
                                </BodyLong>
                            ),
                            ul: ({ children }) => <ul className="list-disc ml-6 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-6 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            table: ({ children }) => (
                                <table className="w-full border-collapse border border-gray-400 mb-4">{children}</table>
                            ),
                            thead: ({ children }) => <thead className="bg-gray-200">{children}</thead>,
                            tr: ({ children }) => <tr className="border border-gray-400">{children}</tr>,
                            th: ({ children }) => <th className="border border-gray-400 p-2 font-bold">{children}</th>,
                            td: ({ children }) => <td className="border border-gray-400 p-2">{children}</td>,
                        }}>
                        {selectedArticle.content}
                    </ReactMarkdown>
                </div>
            </Box>
        </HGrid>
    );
};

export default InfoInnhold;
