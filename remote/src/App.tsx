import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

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

function App() {
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
              {user.name}
            </Typography>
          ))}
        </Box>
      )}
    </Card>
  );
}

export default App;
