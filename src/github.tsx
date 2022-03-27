import React from "react";
import useSWR from "swr";

const href = "https://github.com/exhibitionist-digital/ultra";

const GitHub = () => {
  const { data, error } = useSWR("github", fetcher);
  if (error) return null;
  return (
    <a id="github" href={href} target="_blank">
      ★ <span>{data?.stargazers_count}</span>
    </a>
  );
};

export const fetcher = async () => {
  const res = await fetch("./api/github");
  const data = await res.json();
  return data;
};

export default GitHub;
