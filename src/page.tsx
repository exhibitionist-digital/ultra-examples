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
  if (location == "/") location = "/about";

  const { data, error } = useSWR(location, fetcher);

  if (error || !data?.content) return <strong>404</strong>;

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: data.content }}>
      </div>
    </main>
  );
};

export default Page;

export const fetcher = async (slug: string) => {
  const res = await fetch(
    `https://d1vbyel82rxsrf.cloudfront.net${slug}`,
  );

  const data = await res.json();
  return data || {};
};
