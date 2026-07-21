import {Request , Response} from "express"
import { products_data } from "../data/ProductData";

// GET /products/
const getallProducts=(req:Request,res:Response)=>{
    return res.status(200).send({
        status: 200 ,
        data: products_data
    })
}

// POST /products/add-product
const addNewProduct=(req:Request,res:Response)=>{
    const {name,description,price,category}=req.body;

    const newprod={
    id: products_data.length + 1,
    name,
    description,
    price,
    category,
    rates: []
    }
    products_data.push(newprod);
    return res.status(201).send({
    status: 201,
    data: newprod
  });
}


export {getallProducts, addNewProduct }

































