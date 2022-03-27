export default () => {
  const headers = {
    "content-type": "application/json",
  };

  const examples = [
    {
      "title": "Ultra website",
      "blurb": "The website you are on right this second.",
      "source":
        "https://github.com/exhibitionist-digital/ultra-examples/tree/ultra-website",
    },
    {
      "title": "exhibitionist.digital",
      "blurb": "Our company website.",
      "url": "https://exhibitionist.digital",
    },
    {
      "title": "React 18 suspense SSR",
      "blurb": "Streaming SSR with Suspense. Taken from the React 18 SSR demo.",
      "url": "https://react18.ultrajs.dev",
      "source":
        "https://github.com/exhibitionist-digital/ultra-examples/tree/react-18",
    },
    {
      "title": "React three fiber",
      "blurb": "Enter the 3rd dimension.",
      "url": "https://threejs.ultrajs.dev",
      "source":
        "https://github.com/exhibitionist-digital/ultra-examples/tree/three-js",
    },
  ];

  const body = JSON.stringify({ examples });

  return new Response(body, { headers });
};
