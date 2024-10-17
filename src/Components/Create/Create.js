import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContex} from '../../store/Context'
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [category, setcategory] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])
  const date = new Date()

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContex)

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Please select an image to upload.");
      return;
    }

    const uploadPromises = images.map((image) => {
      const storageRef = firebase.storage().ref(`/image/${image.name}`);
      return storageRef.put(image)
        .then(()=> {
          return storageRef.getDownloadURL();
        })
    })

    try {
      const imageUrls = await Promise.all(uploadPromises);
      console.log(imageUrls);
      
      await firebase.firestore().collection('products').add({
        name,
        category,
        price,
        url : imageUrls,
        userId: user.uid,
        createdAt: date.toDateString()

      })
      
      navigate('/')
    } catch(error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files:', error)
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length > 3) {
      alert('You can only upload up to 3 images.');
      return;
    }

    setImages(selectedFiles);
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="name"
              name="Name"
              />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setcategory(e.target.value)}
              id="category"
              name="category"
              />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="price" 
            name="Price" 
            />
            <br />
            <br />

            {images.length > 0 && (
              <div className="image-preview">
                {images.map((image, index) => (
                  <img
                    key={index}
                    width="100px"
                    height="100px"
                    src={URL.createObjectURL(image)}
                  />
                ))}
              </div>
            )}


            <br />
            <input 
            onChange={handleFileChange}
            type="file" 
            accept="image/*"
            multiple
            />
            <br />
            <button 
              onClick={handleSubmit}
              className="uploadBtn">upload and Submit
            </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
