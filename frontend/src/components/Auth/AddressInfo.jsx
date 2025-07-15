import { setAddress } from '@/features/auth/authSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useGetUserAddressQuery, usePostDefaultAddressMutation, useUpdateDefaultAddressMutation } from '@/api/user';
import { usePostShippingAddressMutation } from '@/api/order';
const AddressInfo = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
const dispatch = useDispatch()
const navigate = useNavigate()
const {data: address} = useGetUserAddressQuery()
const {mutate: createShippingAddress} = usePostShippingAddressMutation()
const {mutate: createDefaultAddress} = useUpdateDefaultAddressMutation()
const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);

    if(data.saveAddress){
        console.log('db')
        createDefaultAddress(data, {
          onSuccess:{},
          onError: {}
        })
       
        dispatch(setAddress(data))
    }
    createShippingAddress(data, {
      onSuccess: (data) => {
        console.log('form subitted:', data);
        
      },
      onError: (error) => {
        console.log(error);
        
      }
    })   
    console.log('not db')
    dispatch(setAddress(data))
    navigate('/placeorder')
   
    
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
       

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="addressLine1">
            Address Line 1 <span className='text-red-500'>*</span>
          </label>
          <input
          value={address?.addressLine1}
            id="addressLine1"
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Street address, P.O. box"
            {...register("addressLine1", { 
              required: "Address is required" 
            })}
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="addressLine2">
            Address Line 2
          </label>
          <input
            value={address?.addressLine2}
            id="addressLine2"
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Apartment, suite, unit, building, floor, etc."
            {...register("addressLine2")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="city">
              City <span className='text-red-500'>*</span>
            </label>
            <input
            value={address?.city}
              id="city"
              type="text"
              className="w-full p-2 border rounded"
              {...register("city", { 
                required: "City is required" 
              })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="state">
              State/Province <span className='text-red-500'>*</span>
            </label>
            <input
            value={address?.state}
              id="state"
              type="text"
              className="w-full p-2 border rounded"
              {...register("state", { 
                required: "State is required" 
              })}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="zipCode">
              Zip/Postal Code <span className='text-red-500'>*</span>
            </label>
            <input
            value={address?.postalcode}
              id="zipCode"
              type="text"
              className="w-full p-2 border rounded"
              {...register("zipCode", { 
                required: "Zip code is required",
                pattern: {
                  value: /^\d{5}(-\d{4})?$/,
                  message: "Please enter a valid zip code"
                }
              })}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
            )}
          </div>
            <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="phone">
            Phone Number <span className='text-red-500'>*</span>
          </label>
          <input
          value={address?.phone}
            id="phone"
            type="tel"
            className="w-full p-2 border rounded"
            // placeholder="For delivery questions only"
            {...register("phone", { 
              required: "Phone number is required",
              pattern: {
                value: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: "Please enter a valid phone number"
              }
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
         
        </div>

        

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              {...register("saveAddress")}
            />
            <span className="text-gray-700">Save this address as default address</span>
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full btn-primary p-2"
        >
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};

export default AddressInfo