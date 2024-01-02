import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineMail } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import styles from "./Item.module.css";
import { useState } from "react";
function Item() {
    const [star,setstar]=useState(false);
    const [star2,setstar2]=useState(false);
    const [star3,setstar3]=useState(false);
    const [star4,setstar4]=useState(false);
    const [star5,setstar5]=useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.itemImg}>
          <img
            src="/shop1.jpeg"
            alt=""
            style={{ width: "50rem", borderRadius: "0.8rem" }}
          />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.itemName}>
            <h4>MACbook Laptop</h4>
            <span>macbook pro</span>
          </div>
          <div>
            <p
              style={{
                marginBottom: "1rem",
                marginTop: "1rem",
                fontSize: "1.5rem",
              }}
            >
              See more from <Link className={styles.link}>Apple</Link>
            </p>
            <p
              style={{
                marginBottom: "2rem",
                marginTop: "2rem",
                fontSize: "1.5rem",
              }}
            >
              macbook pro 10-inch
            </p>
            <span
              style={{
                marginBottom: "2rem",
                marginTop: "2rem",
                fontSize: "2.5rem",
              }}
            >
              2500$
            </span>
            <div
              style={{
                marginBottom: "2rem",
                marginTop: "2rem",
                fontSize: "1.5rem",
              }}
            >
              <span>Quantity</span>
              <div
                style={{
                  backgroundColor: "rgb(237, 237, 237)",
                  padding: "1rem",
                  borderRadius: "0.8rem",
                  marginTop: "1rem",
                }}
              >
                1
              </div>
            </div>
            <div className={styles.icons}>
              <FaFacebook color="blue" />
              <AiFillTwitterCircle color="rgb(92, 139, 249)" />
              <div
                style={{
                  backgroundColor: "yellow",
                  borderRadius: "50%",
                  padding: "0.2rem 0.5rem",
                  fontSize: "2.6rem",
                }}
              >
                <AiOutlineMail />
              </div>
              <IoLogoWhatsapp color="green" />
            </div>
            <button className={styles.cartbtn}>
              <GiShoppingBag />
              Add to Bag
            </button>
          </div>
        </div>
      </div>
      <div className={styles.secContainer}>
        <div className={styles.rating}>
          <h2>Rating</h2>
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "0.8rem",
              paddingLeft: "0.7rem",
              alignItems: "center",
            }}
          >
            <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gray" fontSize={"1.7rem"} />
            <span style={{ paddingLeft: "0.4rem", fontSize: "1rem" }}>
              based on 2 reviews
            </span>
          </div>
          <div className={styles.border}></div>
          <div>
            <div className={styles.ratingdiv}>
              <span>5 star</span>
              <div className={styles.bordertwo}></div>
              <span>50%</span>
            </div>
            <div className={styles.ratingdiv}>
              <span>4 star</span>
              <div className={styles.borderthree}></div>
              <span>50%</span>
            </div>
            <div className={styles.ratingdiv}>
              <span>3 star</span>
              <div className={styles.borderfour}></div>
              <span>0%</span>
            </div>
            <div className={styles.ratingdiv}>
              <span>2 star</span>
              <div className={styles.borderfour}></div>
              <span>0%</span>
            </div>
            <div className={styles.ratingdiv}>
              <span>1 star</span>
              <div className={styles.borderfour}></div>
              <span>0%</span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.review}>
            <span className={styles.name}>C</span>
            <div style={{display:'flex',alignItems:'center'}}>
                <div>
                <h4>Kul</h4>                
              <span>Thursday, Oct 12, 2023</span>
              <h4>Kul</h4>
                </div>
              <div style={{justifyContent:'flex-end',marginLeft:'20rem'}}>
              <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
            

                </div>
            </div>
          </div>
          <div className={styles.review}>
            <span className={styles.nametwo}>S</span>
            <div style={{display:'flex',alignItems:'center'}}>
                <div>
                <h4>The apple MACbook</h4>                
              <span>Tuesday, Aug 30, 2022</span>
              <h4>Good product</h4>
                </div>
              <div style={{justifyContent:'flex-end',marginLeft:'20rem'}}>
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  <FaStar color="gold" fontSize={"1.7rem"} />
                  
                </div>
            </div>
          </div>
          
          <div className={styles.addReview}>
            <h2>Add review</h2>
            <label>Title</label>
            <input type="text" placeholder="Enter review titel"/>
            <label>Comment</label>
            <input type="text" placeholder="Write Review"/>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <h2>Rating</h2>
            <div style={{justifyContent:'flex-end',marginLeft:'1rem',cursor:'pointer'}}>
                  
            <FaStar color={star ? 'gold' : 'gray'} fontSize={"1.7rem"} onClick={()=>setstar((prev)=>!prev)}/>
            <FaStar color={star2 ? 'gold' : 'gray'} fontSize={"1.7rem"} onClick={()=>setstar2((prev)=>!prev)}/>
            <FaStar color={star3 ? 'gold' : 'gray'} fontSize={"1.7rem"} onClick={()=>setstar3((prev)=>!prev)}/>
            <FaStar color={star4 ? 'gold' : 'gray'} fontSize={"1.7rem"} onClick={()=>setstar4((prev)=>!prev)}/>
            <FaStar color={star5 ? 'gold' : 'gray'} fontSize={"1.7rem"} onClick={()=>setstar5((prev)=>!prev)}/>
                </div>
            </div>
            <label>WIll you recomment this product?</label>
            <select>
                <option>Yes</option>
                <option>No</option>
            </select>
            <button style={{width:'50%'}}>Publish review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
