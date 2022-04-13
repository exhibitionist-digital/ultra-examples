import React, { Suspense } from "react";
import useSWR from "swr";
import { useLocation } from "wouter";
import * as runtime from "https://esm.sh/react@v18.0.0/jsx-runtime.js";
import { runSync } from "https://esm.sh/@mdx-js/mdx/lib/run.js?no-check";

const Page = () => {
  return (
    <Suspense fallback={<strong>Loading</strong>}>
      <PageContent />
    </Suspense>
  );
};

const PageContent = () => {
  const [location] = useLocation();
  const { data, error } = useSWR(location, fetcher);
  const { default: Content } = runSync(data?.content, runtime);
  if (error) return <strong>404</strong>;
  return <Content />;
};

export const fetcher = () => {
  return fetch(
    `http://localhost:8000/api/docs`,
  ).then((data) => data.json());
};

export default Page;
