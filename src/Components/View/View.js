import React, { useEffect, useContext, useState } from 'react';
import Slider from "react-slick"; // Import react-slick for the slider

import './View.css';
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState('');
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const { userId } = postDetails;
    console.log(postDetails.url);
    

    firebase.firestore().collection('users').where('id', '==', userId).get()
      .then((res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
  }, [firebase, postDetails]);

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false
  };

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <Slider {...settings}>
          {postDetails?.url?.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>₹ {postDetails?.price} </p>
          <p>{postDetails?.name}</p>
          <p>{postDetails?.category}</p>
          <p>{postDetails?.createdAt}</p>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails?.username}</p>
            <p>{userDetails?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
