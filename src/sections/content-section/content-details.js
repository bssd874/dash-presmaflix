import { useState } from "react";
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
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc,serverTimestamp } from "firebase/firestore";
import { db } from "src/config/firestore";

const tipe = [
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

const isFeatured = [
  {
    value: "true",
    label: "True",
  },
  {
    value: "false",
    label: "False",
  },
  
];

export const AccountProfileDetails = () => {

  const contentsCollectionRef = collection(db, "contents");

  const [casts, setCast] = useState('');
  const [directors, setDirectors] = useState('');
  const [genre, setGenre] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [type, setType] = useState('');
  const [description,setDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  function convertStringToArray(str) {
    // Menghapus spasi ekstra dan memisahkan string berdasarkan koma
    const array = str.replace(/\s+/g, '').split(',');
  
    return array;
  }

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const arraySaveCast = convertStringToArray(casts);
    const arraySaveDirector = convertStringToArray(directors);
    const arraySaveGenre = convertStringToArray(genre)

    const newData = {
      "casts" : arraySaveCast ,
      "createdAt" : serverTimestamp(),
      "description" : description,
      "directors" : arraySaveDirector,
      "genre" : arraySaveGenre ,
      "isFeatured" : selectedValue === 'true',
      "posterUrl" : posterUrl,
      "thumbnailUrl" :thumbnailUrl,
      "title" : title,
      "type" : type
    }

    try {
      await addDoc(contentsCollectionRef, {
        ...newData,
      });
    } catch (err) {
      console.log(err);
    }


  };

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
                  onChange={e => setTitle(e.target.value)}
                  required />
              </Grid>
              <Grid xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Pilih Tipe"
                  name="type"
                  onChange={e => setType(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  {tipe.map((option) => (
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
                  onChange={e => setDirectors(e.target.value)}
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
                  label="Genre"
                  name="genre"
                  onChange={e => setGenre(e.target.value)}
                  required
                  placeholder="Horor, Action, Comedy"
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
                  onChange={e => setCast(e.target.value)}
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
                  onChange={e => setThumbnailUrl(e.target.value)}
                  required
                  helperText="Masukkan URL Gambar"
                />
              </Grid>
              <Grid
                xs={12}
                md={12}>
                <TextField
                  fullWidth
                  label="Poster"
                  name="posterUrl"
                  onChange={e => setPosterUrl(e.target.value)}
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
                  onChange={e=>setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12}
                md={12}>
                <TextField
                  fullWidth
                  label="Pilih Tipe"
                  name="type"
                  onChange={e => setSelectedValue(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  {isFeatured.map((opt) => (
                    <option key={opt.value}
                      value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">Save</Button>
        </CardActions>
      </Card>
    </form>
  );
};
