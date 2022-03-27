import React, { Suspense } from "react";
import useSWR from "swr";
import { useLocation } from "wouter";

const Page = () => {
  return (
    <Suspense fallback={<strong>Loading</strong>}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  let [location] = useLocation();
  console.log({ location });
  if (location == "/") location = "/about";

  const { data, error } = useSWR(location, fetcher);

  console.log({ data, error });

  if (error || !data?.content) return <strong>404</strong>;

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: data?.content }}>
      </div>
    </main>
  );
};

export default Page;

export const fetcher = (slug: string) =>
  fetch(
    `https://ultrajs.dev/api/about`,
  ).then((data) => data.json());
