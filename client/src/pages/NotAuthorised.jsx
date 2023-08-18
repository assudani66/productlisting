import { Card, CardContent, Typography } from "@mui/material";

const NotAuthorised = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          You are not authorized to access this page.
        </Typography>
        <Typography>Please sign in or sign up to proceed.</Typography>
      </CardContent>
    </Card>
  );
};

export default NotAuthorised;
