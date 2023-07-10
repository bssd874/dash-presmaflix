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
    value: "movie",
    label: "Movie",
  },
  {
    value: "tv-global",
    label: "TV",
  },
  {
    value: "music-video",
    label: "Music Video",
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
    <form autoComplete="off"
      noValidate
      onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited"
          title="Content Details" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container
              spacing={3}>
              <Grid xs={12}
                md={6}>
                <TextField fullWidth
                  label="Judul"
                  name="title"
                  onChange={handleChange}
                  required />
              </Grid>
              <Grid xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Pilih Tipe"
                  name="type"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  {type.map((option) => (
                    <option key={option.value}
                      value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Direksi"
                  name="direksi"
                  onChange={handleChange}
                  required
                  placeholder="Joko Anwar, Teddy Soeriaatmadja, Eddie Cahyono"
                  helperText="Tambahkan koma jika ingin menambahkan direksi lebih dari satu"
                />
              </Grid>

              <Grid
                xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Pemeran"
                  name="cast"
                  required
                  onChange={handleChange}
                  placeholder="Tom Hanks, Reza Rahadian"
                  helperText="Tambahkan koma jika ingin menambahkan pemeran lebih dari satu"
                />
              </Grid>
              <Grid
                xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Thumbnail"
                  name="thumnailUrl"
                  onChange={handleChange}
                  required
                  helperText="Masukkan URL Gambar"
                />
              </Grid>
              <Grid
                xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Poster"
                  name="posterUrl"
                  onChange={handleChange}
                  required
                  helperText="Masukkan URL Gambar"
                />
              </Grid>
              <Grid
                xs={12}
                md={12}>
                <TextField
                  fullWidth
                  multiline
                  label="Deskripsi"
                  name="description"
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
