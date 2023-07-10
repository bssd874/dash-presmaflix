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
import { useState,useEffect } from 'react';
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc,serverTimestamp} from "firebase/firestore";
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



export const AccountProfileDetails = ({data,setData,getData}) => {

  

  const contentsCollectionRef = collection(db,"contents");
  const videosCollectionRef = collection(db,"videos");
  
  const[contentId,setContentId] = useState('');
  const[description,setDescription] = useState('');
  const[duration,setDuration] = useState('');
  const[thumbnailUrl,setThumbnailUrl] = useState('');
  const[title,setTitle] = useState('');
  const[type,setType] = useState('');
  const[videoUrl,setVideoUrl] = useState('');
  const [Konten,setContents] = useState([]);

  const handleChange = (e) => {
    /* const id = e.target.id;
    const value = e.target.value;  

    setData({ ...data, [id]: value }); */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newData = {
      contentId,
      description,
      duration,
      thumbnailUrl,
      title,
      type,
      videoUrl
    }

    //data.push(newData);

    try {
      await addDoc(videosCollectionRef, {
        ...newData,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    

    //setData(data);
    //getData()

    /* e.preventDefault();
    try {
      await addDoc(videosCollectionRef, {
        ...data && {data:selected},
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    } */
  };

  useEffect(()=>{

    const getContents = async () => {
      const data = await getDocs(contentsCollectionRef);
      setContents(data.docs.map((doc) => ({...doc.data(),id: doc.id})));
    }
    getContents();

  },[])

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Video Details" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  id = {"contentId" && "title"}
                  fullWidth
                  label="Pilih Konten"
                  name="contentId && title"
                  //value={contentId && title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  select
                  helperText="Pastikan nama konten telah tersedia"
                  SelectProps={{ native: false  }}
                >
                  {Konten.map((content) => (
                    <option key={content.id} value={content.title}>
                      {content.title}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id = "type"
                  fullWidth
                  helperText='Setiap konten harus memiliki tipe "full-length"'
                  label="Tipe"
                  name="typeVide"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id = "thumbnailUrl"
                  fullWidth
                  label="Thumbnail"
                  name="videoThumbnail"
                  value={thumbnailUrl}
                  required
                  onChange={e => setThumbnailUrl(e.target.value)}
                  helperText="Masukkan URL gambar untuk thumbnail video"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id = "videoUrl"
                  fullWidth
                  label="Video"
                  name="videoUrl"
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  required
                  helperText="Masukkan URL video"
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  id = "duration"
                  fullWidth
                  multiline
                  label="Durasi"
                  name="duration"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  required
                />
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
