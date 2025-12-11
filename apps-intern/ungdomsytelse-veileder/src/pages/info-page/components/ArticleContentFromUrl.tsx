import { useParams } from 'react-router-dom';
import { MarkdownArticle } from '../../../types/MarkdownArticle';
import Article from './Article';

const ArticleContentFromUrl = ({ articleList }: { articleList: MarkdownArticle[] }) => {
    const { articleId } = useParams();
    const article = articleId === undefined ? articleList[0] : articleList.find((a) => a.id === articleId);

    if (!article) {
        return <div>Artikkel ikke funnet</div>;
    }

    return <Article article={article} />;
};

export default ArticleContentFromUrl;
