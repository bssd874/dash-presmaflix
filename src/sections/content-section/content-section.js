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
  MenuItem,
} from "@mui/material";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
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
    value: "false",
    label: "False",
  },
  {
    value: "true",
    label: "True",
  },
];

export const ContentSection = () => {

  const contentsCollectionRef = collection(db, "contents");

  const [casts, setCast] = useState('');
  const [directors, setDirectors] = useState('');
  const [genre, setGenre] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [castsError, setCastError] = useState('');
  const [directorsError, setDirectorsError] = useState('');
  const [genreError, setGenreError] = useState('');
  const [thumbnailUrlError, setThumbnailUrlError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [posterUrlError, setPosterUrlError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [selectedValueError, setSelectedValueError] = useState('');
  let hashError = false;

  /* function convertStringToArray(str) {
    Menghapus spasi ekstra dan memisahkan string berdasarkan koma
    const array = str.split(',');

    return array;
  } */

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const arraySaveCast = casts.trim()
    const arraySaveDirector = directors.trim()
    const arraySaveGenre = genre.trim()

    const arrayDataCast = arraySaveCast.split(',')
    const arrayDataDirector = arraySaveDirector.split(',')
    const arrayDataGenre = arraySaveGenre.split(',')
    

    const newData = {
      "casts": arrayDataCast,
      "createdAt": serverTimestamp(),
      "description": description,
      "directors": arrayDataDirector,
      "genre": arrayDataGenre,
      "isFeatured": selectedValue,
      "posterUrl": posterUrl,
      "thumbnailUrl": thumbnailUrl,
      "title": title,
      "type": type
    }

    if (!arraySaveCast || !arraySaveCast.length || !arrayDataCast || !arrayDataCast.length) {
      setCastError("Cast field is required")
      hashError = true
    }else{
      setCastError("")
    }
    if (!newData.description || !newData.description.length) {
      setDescriptionError("Description field is requied")
      hashError = true
    }else{
      setDescriptionError("")
    }
    if (!arraySaveDirector || !arraySaveDirector.length || !arrayDataDirector || !arrayDataDirector.length ) {
      setDirectorsError("Directors field is reqiured")
      hashError = true
    }else{
      setDirectorsError("")
    }
    if (!newData.isFeatured || !newData.isFeatured.length) {
      setSelectedValueError("Is Featured field is required ")
      hashError = true
    }else{
      setSelectedValueError("")
    }
    if (!newData.posterUrl || !newData.posterUrl.length || !newData.posterUrl == "https://") {
      setPosterUrlError("Poster Url field is required")
      hashError = true
    }else{
      setPosterUrlError("")
    }
    if (!newData.thumbnailUrl || !newData.thumbnailUrl.length || !newData.thumbnailUrl == "https://") {
      setThumbnailUrlError("Thumbnail Url field is required")
      hashError = true
    }else{
      setThumbnailUrlError("")
    }
    if (!newData.title || !newData.title.length) {
      setTitleError("Title field is requred")
      hashError = true
    }else{
      setTitleError("")
    }
    if (!newData.type || !newData.type.length) {
      setTypeError("Type field is required")
      hashError = true
    }else{
      setTypeError("")
    }
    if (!arraySaveGenre || !arraySaveGenre.length || !arrayDataGenre || !arrayDataGenre.length) {
      setGenreError("Genre field is required")
      hashError = true
    }else{
      setGenreError("")
    }

    if (hashError) {
      return false
    }

    try {
      await addDoc(contentsCollectionRef, {
        ...newData,
      });
    } catch (err) {
      console.log(err);
    }

    setCast('')
    setDirectors('')
    setGenre('')
    setThumbnailUrl('')
    setTitle('')
    setPosterUrl('')
    setType('')
    setDescription('')
    setSelectedValue('')

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
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  error = {titleError && titleError.length ? true:false}
                  helperText = {titleError}
                  required />
              </Grid>
              <Grid xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Pilih Tipe"
                  name="type"
                  onChange={e => setType(e.target.value)}
                  value={type}
                  error = {typeError && typeError.length ? true:false}
                  helperText = {typeError}
                  required
                  select
                  //SelectProps={{ native: true }}
                >
                  {tipe.map((option) => (
                    <MenuItem key={option.value}
                      value={option.value}>
                      {option.label}
                    </MenuItem>
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
                  value={directors}
                  onChange={e => setDirectors(e.target.value)}
                  error = {!!directorsError && directorsError.length ? true:false}
                  helperText="Tambahkan koma jika ingin menambahkan direksi lebih dari satu"
                  required
                  placeholder="Joko Anwar, Teddy Soeriaatmadja, Eddie Cahyono"
                />
                {directorsError && <p style = {{color:'red'}}>{directorsError}</p>}
              </Grid>

              <Grid
                xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Genre"
                  name="genre"
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  error = {genreError && genreError.length ? true:false}
                  helperText="Tambahkan koma jika ingin menambahkan direksi lebih dari satu"
                  required
                  placeholder="Horor, Action, Comedy"
                />
                {genreError && <p style = {{color:'red'}}>{genreError}</p>}
              </Grid>

              <Grid
                xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Pemeran"
                  name="cast"
                  value={casts}
                  onChange={e => setCast(e.target.value)}
                  error = {castsError && castsError.length ? true:false}
                  helperText="Tambahkan koma jika ingin menambahkan pemeran lebih dari satu"
                  required
                  placeholder="Tom Hanks, Reza Rahadian"
                />
                {castsError && <p style = {{color:'red'}}>{castsError}</p>}
              </Grid>
              <Grid
                xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Thumbnail"
                  name="thumnailUrl"
                  value={thumbnailUrl}
                  onChange={e => setThumbnailUrl(e.target.value)}
                  error = {thumbnailUrlError && thumbnailUrlError.length ? true:false}
                  helperText={"Masukkan URL Gambar" && thumbnailUrlError}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={12}>
                <TextField
                  fullWidth
                  label="Poster"
                  name="posterUrl"
                  value={posterUrl}
                  onChange={e => setPosterUrl(e.target.value)}
                  error = {posterUrlError && posterUrlError.length ? true:false}
                  helperText={"Masukkan URL Gambar" && posterUrlError}
                  required
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
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  error = {descriptionError && descriptionError.length ? true:false}
                  helperText {...descriptionError}
                  required
                />
              </Grid>
              <Grid xs={12}
                md={12}>
                <TextField
                  fullWidth
                  label="Is Featured"
                  name="type"
                  onChange={e => setSelectedValue(e.target.value)}
                  error = {selectedValueError && selectedValueError.length ? true:false}
                  helperText = {selectedValueError}
                  required
                  value={selectedValue}
                  select
                  //SelectProps={{ native: true }}
                >
                  {isFeatured.map((opt) => (
                    <MenuItem key={opt.label}
                      value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            type="submit"
          >Save</Button>
        </CardActions>
      </Card>
    </form>
  );
};
