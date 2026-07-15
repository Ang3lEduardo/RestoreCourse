import { createSlice } from "@reduxjs/toolkit"
import type { ProductParams } from "../../app/models/productParams"

const initialState: ProductParams = {
     pageNumber:1,
     pageSize:8,
     types:[],
     brands:[],
     orderBy:'name',
     searchTerm:''
}

export const catalogSlice = createSlice({
     name:'catalogSlice',
     initialState,
     reducers:{
          setPageNumber:(state,action) =>{
               state.pageNumber = action.payload;
          },
          setPageSize:(state,action) =>{
               state.pageSize = action.payload;
          },
          setSearchTerm:(state,action) =>{
               state.pageNumber = 1;
               state.searchTerm = action.payload;
          },
          setOrderBy:(state,action) =>{
               state.pageNumber = 1;
               state.orderBy = action.payload;
          },
          setTypes:(state,action) =>{
               state.pageNumber = 1;
               state.types = action.payload;
          },
          setBrands:(state,action) =>{
               state.pageNumber = 1;
               state.brands = action.payload;
          },
          resetParams(){
               return initialState;
          }
     }
})

export const {setPageNumber,setPageSize,setSearchTerm,setOrderBy,setTypes,setBrands,resetParams} = catalogSlice.actions;