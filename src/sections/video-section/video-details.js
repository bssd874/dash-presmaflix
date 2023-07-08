import { useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const type = [
  {
    value: "example1",
    label: "Example 1",
  },
  {
    value: "example2",
    label: "Example 2",
  },
  {
    value: "example3",
    label: "Example 3",
  },
];

export const AccountProfileDetails = () => {
  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Video Details" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pilih Konten"
                  name="type"
                  onChange={handleChange}
                  required
                  select
                  helperText="Pastikan nama konten telah tersedia"
                  SelectProps={{ native: true }}
                >
                  {type.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText='Setiap konten harus memiliki tipe "full-length"'
                  label="Tipe"
                  name="typeVide"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Thumbnail"
                  name="videoThumbnail"
                  required
                  onChange={handleChange}
                  helperText="Masukkan URL gambar untuk thumbnail video"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Video"
                  name="videoUrl"
                  onChange={handleChange}
                  required
                  helperText="Masukkan URL video"
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  multiline
                  label="Durasi"
                  name="duration"
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>
    </form>
  );
};
