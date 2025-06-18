import { BodyLong, Heading, List } from '@navikt/ds-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Støtte for tabeller, sjekklister, gjennomstreking
import { MarkdownArticle } from '../InfoInnhold';

interface Props {
    article: MarkdownArticle;
    size?: 'medium' | 'small';
}

const Article = ({ article, size = 'small' }: Props) => {
    const isSmall = size === 'small';
    return (
        <div className="prose mt-4">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <Heading level="1" size={isSmall ? 'medium' : 'large'} spacing={true}>
                            {children}
                        </Heading>
                    ),
                    h2: ({ children }) => (
                        <Heading level="2" size={isSmall ? 'small' : 'medium'} spacing={true}>
                            {children}
                        </Heading>
                    ),
                    h3: ({ children }) => (
                        <Heading level="3" size={isSmall ? 'xsmall' : 'small'} spacing={true}>
                            {children}
                        </Heading>
                    ),
                    h4: ({ children }) => (
                        <Heading level="4" size="xsmall" spacing={true}>
                            {children}
                        </Heading>
                    ),
                    h5: ({ children }) => (
                        <Heading level="5" size="xsmall" spacing={true}>
                            {children}
                        </Heading>
                    ),
                    p: ({ children }) => (
                        <BodyLong as="p" spacing={true}>
                            {children}
                        </BodyLong>
                    ),
                    ul: ({ children }) => <List>{children}</List>,
                    ol: ({ children }) => <ol className="list-decimal ml-6 mb-2">{children}</ol>,
                    li: ({ children }) => <List.Item>{children}</List.Item>,
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

export default Article;
