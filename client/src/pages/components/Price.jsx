import '../../UI/shop/shop.css'

function Price() {
  return (
    <div className="price">
        <h3 className="pricetag">Price</h3>
        <div className='pricebody'>
        <span>1$</span>  <input type="range"/> <span>5000$</span>  
        </div>
    </div>
  )
}

export default Price