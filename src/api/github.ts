export default () => {
  const headers = {
    "content-type": "application/json",
  };

  const body = JSON.stringify({
    stargazers_count: "GitHub",
  });
  return new Response(body, { headers });
};
