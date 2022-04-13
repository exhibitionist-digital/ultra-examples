import React, { Suspense } from "react";
import useSWR from "swr";
import { useLocation } from "wouter";

const Examples = () => {
  return (
    <Suspense fallback={<strong>Loading</strong>}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const [location] = useLocation();

  const { data, error } = useSWR(location, fetcher);

  if (error || !data?.examples) return <strong>404</strong>;
  const { examples } = data;
  return (
    <div>
      {examples.map(
        (
          ex: { title: string; blurb: string; source: string; url: string },
          i: number,
        ) => {
          return (
            <div className="example">
              <h3
                style={{
                  paddingTop: i == 0 ? "0px" : "auto",
                }}
              >
                {ex.title}
              </h3>
              <p>{ex.blurb}</p>
              {ex.url && <a href={ex.url} target="_blank">Open</a>}
              {ex.source && <a href={ex.source} target="_blank">Source</a>}
            </div>
          );
        },
      )}
    </div>
  );
};

export default Examples;

export const fetcher = (slug: string) =>
  fetch(
    `http://localhost:8000/api/examples`,
  ).then((data) => data.json());
