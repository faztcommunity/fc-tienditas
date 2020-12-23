// Dependences 
import { Router } from "express";
import { 
    getProducts, 
    getProduct, 
    postProduct,
    putProduct,
    deleteProduct 
} from "../controllers/product.controller";

// Intances
const router: Router = Router();

// Product's Routes
router.route("/product")
    .get(getProducts)
    .post(postProduct)
    .put(putProduct);
    

router.route("/product/:id")
    .get(getProduct)
    .delete(deleteProduct);

    
// Export routes
export default router;