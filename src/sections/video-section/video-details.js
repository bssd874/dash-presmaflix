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
  Select,
  MenuItem
  // TextareaAutosize,
} from "@mui/material";
// import Textarea from "@mui/joy/Textarea";
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "src/config/firestore";


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



export const AccountProfileDetails = ({ data, setData, getData, setAddingIs }) => {



  const contentsCollectionRef = collection(db, "contents");
  const videosCollectionRef = collection(db, "videos");

  const [contentId, setContentId] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [Konten, setContents] = useState([]);
  const [errors,setError] = useState({});

  const [contentIdError, setContentIdError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [thumbnailUrlError, setThumbnailUrlError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [videoUrlError, setVideoUrlError] = useState('');

  const handleChange = (e) => {
    /* const id = e.target.id;
    const value = e.target.value;  

    setData({ ...data, [id]: value }); */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      "contentId": contentId,
      "createdAt": serverTimestamp(),
      "description": description,
      "duration": duration,
      "thumbnailUrl": thumbnailUrl,
      "title": title,
      "type": type,
      "videoUrl": videoUrl
    }

    

    if (!newData.contentId || !newData.contentId.length) {
      setContentIdError("Content field is required")
      return false
    } else{
      setContentIdError("")
    }
    if (!newData.description || !newData.description.length) {
      setDescriptionError("Description is required")
      return false
    } else{
      setDescriptionError("")
    }
    if (!newData.duration || !newData.duration.length) {
      setDurationError("Duration is required")
      return false
    } else{
      setDurationError("")
    }
    if (!newData.thumbnailUrl == "https://" || !newData.thumbnailUrl.length) {
      setThumbnailUrlError("Thumbnail Url must have https://")
      return  false
    } else{
      setThumbnailUrlError("")
    }
    if (!newData.title || !newData.title.length) {
      setTitleError("Title is required")
      return  false
    } else{
      setTitleError("")
    }
    if (!newData.type == "full-length" || !newData.type.length) {
      setTypeError("Type must be filled by full-length")
      return  false
    } else{
      setTypeError("")
    }
    if (!newData.videoUrl == "https://" || !newData.videoUrl.length) {
      setVideoUrlError("Video Url must have https://")
      return  false
    }else{
      setVideoUrlError("")
    }

    try {
      await addDoc(videosCollectionRef, {
        ...newData,  
      });
    } catch (err) {
      console.log(err);
    }

    setContentId('');
    setDescription('');
    setDuration('');
    setThumbnailUrl('');
    setTitle('');
    setType('');
    setVideoUrl('');

  };

  useEffect(() => {
    const getContents = async () => {
      const data = await getDocs(contentsCollectionRef);
      setContents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getContents();
  }, [])

  return (
    <form autoComplete="off"
      noValidate
      onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited"
          title="Video Details" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container
              spacing={3}>
              <Grid xs={12}
                md={6}>
                <TextField
                  fullWidth
                  label="Pilih Konten"
                  name="contentId"
                  onChange={e => setContentId(e.target.value)}
                  value={contentId}
                  error = {contentIdError && contentIdError.length ? true:false}
                  helperText= {contentIdError}
                  required = {true}
                  select
                  SelectProps={{ native: false }}
                  helperText="Pastikan nama konten telah tersedia"
                >
                  {Konten.map((content, index) => (
                    <option key={index}
                      value={content.id}>
                      {content.title}
                    </MenuItem>
                  ))}
                </TextField>
                {/* <select>
                  {Konten
                    ? Konten.map((content) => (
                    <option key={content.id}
                      value={content.id}>
                      {content.title}
                    </option>
                  )) : null}
                </select> */}

              </Grid>
              <Grid xs={12}
                md={6}>
                <TextField
                  id="title"
                  fullWidth
                  label="Judul"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  error = { titleError && titleError.length ? true : false}
                  helperText = { titleError}
                  required = {true}
                />
              </Grid>
              <Grid xs={12}
                md={6}>
                <TextField
                  id="type"
                  fullWidth
                  label="Tipe"
                  name="typeVide"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  error = { typeError && typeError.length ? true : false}
                  helperText={ typeError}
                  required = {true}
                />
              </Grid>
              <Grid xs={12}
                md={6}>
                <TextField
                  id="thumbnailUrl"
                  fullWidth
                  label="Thumbnail"
                  name="videoThumbnail"
                  value={thumbnailUrl}
                  onChange={e => setThumbnailUrl(e.target.value)}
                  error = {thumbnailUrlError && thumbnailUrlError.length ? true : false}
                  helperText= { thumbnailUrlError}
                  required={true}
                />
              </Grid>
              <Grid xs={12}
                md={6}>
                <TextField
                  id="videoUrl"
                  fullWidth
                  label="Video"
                  name="videoUrl"
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  error = { videoUrlError && videoUrlError.length ? true : false}
                  helperText={ videoUrlError}
                  required={true}
                />
              </Grid>

              <Grid xs={12}
                md={6}>
                <TextField
                  id="duration"
                  fullWidth
                  label="Durasi"
                  name="duration"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  error = { durationError && durationError.length ? true : false}
                  helperText = { durationError}
                  required={true}
                />
              </Grid>
              <Grid xs={12}
                md={6}>
                {/* <Textarea 
                  minRows={2} 
                  size="lg" 
                  variant="outlined"
                  id="description"
                  fullWidth
                  label="Deskripsi"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.targer.value)}
                  required
                    
                /> */}
                <TextField
                  id="description"
                  fullWidth
                  multiline
                  label="Deskripsi"
                  name="description"
                  value={description}
                  rows={5}
                  maxRows={10}
                  onChange={e => setDescription(e.target.value)}
                  error = {descriptionError && descriptionError.length ? true : false}
                  helperText ={ descriptionError}
                  required={true}
                  type="textarea"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained"
            type="submit" >Save</Button>
        </CardActions>
      </Card>
    </form>
  );
};
