export default async () => {
  const headers = {
    "content-type": "application/json",
  };
  const data = await fetch(
    `https://api.github.com/repos/exhibitionist-digital/ultra`,
  );
  const github = await data.json();
  const body = JSON.stringify({
    stargazers_count: github?.stargazers_count || "GitHub",
  });
  return new Response(body, { headers });
};
