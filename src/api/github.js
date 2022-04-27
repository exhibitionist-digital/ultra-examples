export default async () => {
  const headers = {
    "content-type": "application/json",
  };

  // get count and timestamp from cache
  let count = localStorage.getItem("count");
  const stamp = +localStorage.getItem("stamp");

  // if nothing in cache, this request will be a bit slower
  if (!count) count = await getCount();

  const body = JSON.stringify({
    stargazers_count: count || "GitHub",
  });

  // if timestamp is longer than 30 mins...
  // update the cache, but don't await response
  if (stamp && +new Date() > stamp + 1800000) {
    getCount();
  }
  return new Response(body, { headers });
};

const getCount = async () => {
  let data = await fetch(
    `https://api.github.com/repos/exhibitionist-digital/ultra`
  );
  data = await data.json();
  if (data?.stargazers_count) {
    localStorage.setItem("count", data?.stargazers_count);
    localStorage.setItem("stamp", +new Date());
  }
  return data?.stargazers_count;
};
