import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Støtte for tabeller, sjekklister, gjennomstreking

// Dynamisk import av alle markdown-filer i articles-mappen
const articles = import.meta.glob('../../articles/*.md', { eager: true, as: 'raw' });

const articleList = Object.keys(articles).map((path) => {
    const fileName = path.split('/').pop() || '';
    return { title: fileName.replace('.md', ''), content: articles[path] as string };
});

export default function ArticleViewer() {
    const [content, setContent] = useState<string>('Velg en artikkel for å vise innholdet.');

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Artikler</h1>
            <ul className="mb-4">
                {articleList.map((article) => (
                    <li key={article.title}>
                        <button className="text-blue-500 hover:underline" onClick={() => setContent(article.content)}>
                            {article.title}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="border p-4 bg-gray-100 rounded-lg">
                <div className="prose">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-semibold mt-3 mb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-medium mt-2 mb-1">{children}</h3>,
                            p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
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
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
