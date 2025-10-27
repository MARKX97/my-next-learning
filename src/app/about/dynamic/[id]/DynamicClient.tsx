'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DynamicChildren from './children';

type Artist = {
  id: number | string;
  name: string;
  img1v1Url: string;
};

type SearchResponse = {
  result?: {
    songs?: Array<{
      artists?: Artist[];
    }>;
  };
};

const DynamicClient = ({ id }: { id: string }) => {
  const router = useRouter();
  const [result, setResult] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://neteasecloudmusicapi.vercel.app/search?keywords=${encodeURIComponent(
          '周杰伦'
        )}`
      );
      const data = (await response.json()) as SearchResponse;
      const artists =
        data.result?.songs?.flatMap(song => song.artists ?? []) ?? [];
      setResult(artists);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>This is Dynamic {id} Page.</p>
      <button type='button' onClick={() => router.replace('/about')}>
        Back to About
      </button>
      <DynamicChildren />
      <div
        style={{
          marginTop: 50,
        }}
      >
        {loading ? (
          'Loading...'
        ) : result.length > 0 ? (
          <ul>
            {result.map(item => (
              <li key={item.id}>
                <Image
                  src={item.img1v1Url}
                  alt={item.name ?? ''}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                  width={16}
                  height={16}
                  unoptimized
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          '暂无数据'
        )}
      </div>
    </div>
  );
};

export default DynamicClient;
