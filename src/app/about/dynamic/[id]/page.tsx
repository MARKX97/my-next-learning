"use client";
import { useRouter, useParams } from "next/navigation";
import DynamicChildren from "./children";
import { useEffect, useState } from "react";

const Dynamic = () => {
  const router = useRouter();
  const { id } = useParams();
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await fetch(
      `https://neteasecloudmusicapi.vercel.app/search?keywords=${encodeURIComponent(
        "周杰伦"
      )}`
    )
      .then(async (response: any) => {
        const data = await response.json();
        const albums: any[] = [];
        data.result.songs?.forEach((item: any) => {
          if (item?.artists?.[0]) {
            albums.push(item?.artists?.[0]);
          }
        });
        setResult(albums);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <p>
        This is Dynamic
        {id}
        Page.
      </p>
      <button type="button" onClick={() => router.replace("/about")}>
        Back to About
      </button>
      <DynamicChildren />
      <div
        style={{
          marginTop: 50,
        }}
      >
        {loading ? (
          "Loading..."
        ) : (
          <ul>
            {result.map((item: any) => (
              <li key={item.id}>
                <img
                  src={item.img1v1Url}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dynamic;
