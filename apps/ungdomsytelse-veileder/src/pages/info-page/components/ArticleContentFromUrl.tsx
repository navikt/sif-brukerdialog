import { useParams } from 'react-router-dom';
import Article from './Article';
import { MarkdownArticle } from '../InfoInnhold';

const ArticleContentFromUrl = ({ articleList }: { articleList: MarkdownArticle[] }) => {
    const { articleId } = useParams();
    const article = articleId === undefined ? articleList[0] : articleList.find((a) => a.id === articleId);

    if (!article) {
        return <div>Artikkel ikke funnet</div>;
    }

    return <Article article={article} />;
};

export default ArticleContentFromUrl;
