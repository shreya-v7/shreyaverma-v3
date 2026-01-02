import { getTweet } from 'react-tweet/api';
import { useEffect, useState } from 'react';
import {
  TweetSkeleton,
  EmbeddedTweet,
  TweetNotFound,
  type TweetProps,
} from 'react-tweet';
import '../../styles/tweet.css';

const TweetContent = ({ id, components, onError }: TweetProps) => {
  const [tweet, setTweet] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getTweet(id)
      .then((data) => {
        setTweet(data);
        setLoading(false);
      })
      .catch((err) => {
        if (onError) {
          setError(onError(err));
        } else {
          console.error(err);
          setError(err);
        }
        setLoading(false);
      });
  }, [id, onError]);

  if (loading) {
    return <TweetSkeleton />;
  }

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={error} />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props: TweetProps) => {
  return <TweetContent {...props} />;
};

export function TweetComponent({ id }: { id: string }) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <ReactTweet id={id} />
      </div>
    </div>
  );
}