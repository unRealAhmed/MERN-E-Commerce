import Price from '../../pages/components/Price';
import './Shop.css'
import img from '../../image/shop1.jpeg'
import { FaStar } from "react-icons/fa6";

const Shop = () => {

  return <div className='container'>

  <Price/>
  <div>
    <div className="bar ">
      <p>Showing: 1-10 products of 12 products</p>
      <div>
      <span style={{marginRight:'0.5rem'}}>Sort By</span>
      <select>
        <option>Newest First</option>
        <option>Price hight to low</option>
        <option>Price low to hight</option>
      </select>
      </div>
    </div>
    <div className='shopcontent'>
      <div className='card'>
        <img src={img} alt='' style={{width:'20rem'}}/>
        <div style={{padding:'1rem'}}>
          <h3>MACbook Laptop</h3>
          <p>By Apple</p>
          <span>macbook pro 10-inch</span>
          <div className='rating'>
            <p>2500$</p>
            <p>4.0<FaStar style={{color:'gold'}}/></p>
          </div>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt='' style={{width:'20rem'}}/>
        <div style={{padding:'1rem'}}>
          <h3>MACbook Laptop</h3>
          <p>By Apple</p>
          <span>macbook pro 10-inch</span>
          <div className='rating'>
            <p>2500$</p>
            <p>4.0<FaStar style={{color:'gold'}}/></p>
          </div>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt='' style={{width:'20rem'}}/>
        <div style={{padding:'1rem'}}>
          <h3>MACbook Laptop</h3>
          <p>By Apple</p>
          <span>macbook pro 10-inch</span>
          <div className='rating'>
            <p>2500$</p>
            <p>4.0<FaStar style={{color:'gold'}}/></p>
          </div>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt='' style={{width:'20rem'}}/>
        <div style={{padding:'1rem'}}>
          <h3>MACbook Laptop</h3>
          <p>By Apple</p>
          <span>macbook pro 10-inch</span>
          <div className='rating'>
            <p>2500$</p>
            <p>4.0<FaStar style={{color:'gold'}}/></p>
          </div>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt='' style={{width:'20rem'}}/>
        <div style={{padding:'1rem'}}>
          <h3>MACbook Laptop</h3>
          <p>By Apple</p>
          <span>macbook pro 10-inch</span>
          <div className='rating'>
            <p>2500$</p>
            <p>4.0<FaStar style={{color:'gold'}}/></p>
          </div>
        </div>
      </div>

  </div>
      
    </div>
  </div>;
};

export default Shop;
