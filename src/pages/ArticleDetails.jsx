import { useParams } from "react-router-dom";

const ArticleDetails = () => {
  let { id } = useParams();
  return <>article {id}</>;
};
export default ArticleDetails;
