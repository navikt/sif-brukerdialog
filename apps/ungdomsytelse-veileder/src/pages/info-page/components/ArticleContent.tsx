import { BodyLong, Heading } from '@navikt/ds-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Støtte for tabeller, sjekklister, gjennomstreking
import { useParams } from 'react-router-dom';

const ArticleContent = ({ articleList }: { articleList: any }) => {
    const { articleId } = useParams();
    const paramsArticle = articleList.find((a) => a.id === articleId);
    const article = paramsArticle || articleList[0];

    if (!article) {
        return <div>Artikkel ikke funnet</div>;
    }

    return (
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
                {article.content}
            </ReactMarkdown>
        </div>
    );
};

export default ArticleContent;
