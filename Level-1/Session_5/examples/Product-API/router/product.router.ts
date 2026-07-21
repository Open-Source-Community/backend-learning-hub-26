import { Router } from "express"
import * as controllermethods  from "../controller/product.controller";
import  {validateProduct}  from "../middleware/products.middlware";

const route=Router()
route.get("/", controllermethods.getallProducts);

route.post("/add-product",validateProduct,controllermethods.addNewProduct);


export default route