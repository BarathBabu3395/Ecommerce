import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios"
import { toast } from 'react-toastify';


const Add = ({url}) => {



  const [image,setImage]= useState(false);
  const [data,setData] =useState({
    name:"",
    description:"",
    price:"",
    category:"Salad",


  })
 

  const onChangeHandler =(event) =>{
    const name =event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price)); // Changed 'Price' to 'price'
    formData.append("category", data.category);
    formData.append("image", image);
  
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        // Reset form data after successful submission
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message)

      }
    } catch (error) {
      console.error(error);
      // Handle error here, e.g., show an error message to the user
    }
  };
  

  
  
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler} >
        {/* Image upload section */}
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt='Upload area' />
          </label>
          <input onChange={(e) =>setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>

        {/* Product name input */}
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
        </div>

        {/* Product description input */}
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder='Type here'></textarea>
        </div>

        {/* Product category selection */}
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select onChange={onChangeHandler} name='category'>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure veg'>Pure veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>

          {/* Product price input */}
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20' />
          </div>
        </div>

        {/* Submit button */}
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
