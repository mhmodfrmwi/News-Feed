import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Article = ({ image, title, describtion, author, publishedAt }) => {
  const date = new Date(publishedAt);
  return (
    <div className="article h-full mx-auto max-[768px]:w-4/5">
      <Card>
        {image && (
          <CardHeader>
            <img src={image} alt={title} className="w-full h-full" />
          </CardHeader>
        )}
        <CardContent>
          {title && (
            <h1 className="font-bold text-2xl max-[768px]:text-xl">{title}</h1>
          )}
          {describtion && <p>{describtion}</p>}
          {author && (
            <p>
              <span className="font-bold">Author:</span> {author}
            </p>
          )}
          {publishedAt && (
            <p>
              <span className="font-bold">Published At:</span>{" "}
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default Article;
