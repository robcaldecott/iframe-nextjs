import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type PropsMessage = {
  type: string;
  payload: Record<string, string>;
};

function App() {
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    const handler = (event: MessageEvent<unknown>) => {
      if (event.origin === "http://localhost:3000" && event.data) {
        try {
          const message = event.data as PropsMessage;
          if (message.type === "setProps") {
            setTitle(message.payload.title);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = (await res.json()) as Array<User>;
      return users;
    },
  });

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        containerType: "inline-size",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h6" sx={{ fontSize: { "@sm": "2rem" } }}>
        {title}
      </Typography>

      <Typography sx={{ display: { "@": "block", "@sm": "none" } }}>
        This only appears if the container is small
      </Typography>

      {query.isPending && (
        <Box
          component="ul"
          sx={{
            listStyleType: "none",
            margin: 0,
            marginBlock: 0,
            paddingInline: 0,
          }}
        >
          {[...Array(10).keys()].map((i) => (
            <Skeleton key={i} component="li" />
          ))}
        </Box>
      )}

      {query.isError && (
        <Typography color="error">Something went wrong!</Typography>
      )}

      {query.isSuccess && (
        <Box
          component="ul"
          sx={{
            listStyleType: "none",
            margin: 0,
            marginBlock: 0,
            paddingInline: 0,
          }}
        >
          {query.data.map((user) => (
            <Typography variant="body1" component="li" key={user.id}>
              <Link
                component="button"
                onClick={() => {
                  window.parent.postMessage(
                    { type: "click", payload: user },
                    "*"
                  );
                }}
              >
                {user.name}
              </Link>
            </Typography>
          ))}
        </Box>
      )}
    </Card>
  );
}

export default App;
