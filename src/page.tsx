import React, { Suspense } from "react";
import useSWR from "swr";
import { useLocation } from "wouter";
import * as runtime from "jsx-runtime";
import { runSync } from "mdx-js/run";

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
    `/api/docs`,
  ).then((data) => data.json());
};

export default Page;
