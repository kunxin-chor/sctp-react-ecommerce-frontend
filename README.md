Here are the differences between branch `01-jsx` and branch `02-product-card-component` across all files:

### `src/App.jsx`:
1. **Line 2**:
   ```diff
   + import ProductCard from './ProductCard';
   ```
   - **Explanation**: Importing the `ProductCard` component.

2. **Line 40**:
   ```diff
   + <main className="container my-5">
   +   <h2 className="text-center mb-4">Featured Products</h2>
   +
   +   <div className="row">
   +     <div className="col-md-3 mb-4">
   +       <ProductCard
   +         imageUrl="https://picsum.photos/id/20/300/200"
   +         productName="Product 1"
   +         price="19.99"
   +       />
   +     </div>
   +
   +     <div className="col-md-3 mb-4">
   +       <ProductCard
   +         imageUrl="https://picsum.photos/id/1/300/200"
   +         productName="Product 2"
   +         price="29.99"
   +       />
   +     </div>
   +
   +     <div className="col-md-3 mb-4">
   +       <ProductCard
   +         imageUrl="https://picsum.photos/id/26/300/200"
   +         productName="Product 3"
   +         price="39.99"
   +       />
   +     </div>
   +
   +     <div className="col-md-3 mb-4">
   +       <ProductCard
   +         imageUrl="https://picsum.photos/id/96/300/200"
   +         productName="Product 4"
   +         price="49.99"
   +       />
   +     </div>
   +   </div>
   +
   + </main>
   ```

   - **Explanation**: Added a main section to display featured products using the `ProductCard` component.

### `src/ProductCard.jsx`:
1. **New File**:
   ```jsx
   import React from 'react';

   const ProductCard = (props) => {

     const handleAddToCart = () => {
       alert("Added to Cart!")
     }

     return (
       <div className="card">
         <img
           src={props.imageUrl}
           className="card-img-top"
           alt={props.productName}
         />
         <div className="card-body">
           <h5 className="card-title">{props.productName}</h5>
           <p className="card-text">${props.price}</p>
           <button className="btn btn-primary" onClick={handleAddToCart}>
             Add to Cart
           </button>
         </div>
       </div>
     );
   };

   export default ProductCard;
   ```
   - **Explanation**: Created a new `ProductCard` component to display individual product details and an "Add to Cart" button.
