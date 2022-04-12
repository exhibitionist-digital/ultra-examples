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
    <div>
      <div dangerouslySetInnerHTML={{ __html: data?.content }}>
      </div>
    </div>
  );
};

export default Page;

export const fetcher = (slug: string) =>
  fetch(
    `https://d1vbyel82rxsrf.cloudfront.net${slug}`,
  ).then((data) => data.json());
