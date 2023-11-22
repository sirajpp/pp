const whiteList = [
    "https://www.yoursite.com",
    "https://127.0.0.1:5500",
    "http://localhost:5173",
  ];
  const corsOptions = {
      origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
          callback(null, true);

        } else {
          callback(new Error("Not allowed CORS"));
        }
      },
      credentials: true,
    };
  