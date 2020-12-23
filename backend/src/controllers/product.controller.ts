// Dependences
import { Request, Response, RequestHandler } from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import moment from "moment";

// Product's Model
import Product from "../models/Product";

/**
 * Find all products in the DataBase
 * @param {Request} req 
 * @param {Response} res 
 */
export const getProducts: RequestHandler = async (req: Request, res: Response) => {
    // Find all products in the DB
    const allProducts: Product[] = await getRepository(Product).find();
    res.json(allProducts);
};

/**
 * Find one product in the DataBase with the Product's ID
 * @param {Request} req 
 * @param {Response} res
 */
export const getProduct: RequestHandler = async (req: Request, res: Response) => {
    // Get the Product's ID
    const id: string = req.params.id;

    //Find only one product with its id
    const oneProduct: Product | undefined = await getRepository(Product).findOne(id);

    // Send the simple responce to Client
    if (oneProduct)
        res.status(200).json(oneProduct);
    else
        res.status(404).json({ message: "User not found" });
};

/**
 * Create new product in the DataBase
 * @param {Request} req 
 * @param {Response} res 
 */
export const postProduct: RequestHandler = async (req: Request, res: Response) => {
    // Get the body request
    const { barCode, descrption, stock, active }: Product = req.body;

    // Create the new product and send it to Client
    const newProduct: Product = await getRepository(Product).save({ barCode, descrption, stock, active })
    res.json(newProduct);
};

/**
 * Update a product in the DataBase
 * @param {Request} req 
 * @param {Response} res 
 */
export const putProduct: RequestHandler = async (req: Request, res: Response) => {
    // Get the request body
    const requestBody: Product = req.body;

    // Search the old Product
    const oldProduct: Product | undefined = await getRepository(Product).findOne(requestBody.id);

    // If exist the product, we proceed to update the product
    if (oldProduct) {
        requestBody.update = moment().format();
        const putProduct: UpdateResult | undefined = await getRepository(Product).update(oldProduct, requestBody);
        res.status(200).json(putProduct);
    } else
        res.status(404).json({ message: "Product not found" });
};

/**
 * Delete a product in the DataBase
 * @param {Request} req 
 * @param {Response} res 
 */
export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    // Get the request body
    const id: string = req.params.id;

    // Search the Product in the database
    const product: Product | undefined = await getRepository(Product).findOne(id);

    if (product) {
        // Delete the product in the database
        const deleteProduct: DeleteResult = await getRepository(Product).delete(id);

        // Send the responce to client
        res.status(200).json(deleteProduct);
    } else
        res.status(404).json({ message: "Product not found" });
};