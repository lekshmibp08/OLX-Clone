import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import { SearchContext } from "../../store/SearchContext";
import { useNavigate } from "react-router-dom";

function Posts() {

  const navigate = useNavigate()

  const {setPostDetails} = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext);
  const { searchQuery } = useContext(SearchContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPost);
      });
  }, []);

  // Filter products based on the search query
  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <h2>Quick Menu</h2>
        </div>
        <div className="cards">
          {filteredProducts.map((product) => {
            return (
              <div className="card"
                onClick={() => {
                  setPostDetails(product)
                  navigate('/view')
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">₹ {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name} </p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className='loadMore'>
        <p>Load more</p>
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">₹ 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
