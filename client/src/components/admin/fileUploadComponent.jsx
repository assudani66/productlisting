import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
export default function FileUpload() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ecom",
    },
  });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </Stack>
  );
}
