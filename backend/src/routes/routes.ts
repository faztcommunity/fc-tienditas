// Dependences 
import { Router, Request, Response, RequestHandler } from "express";

// Intances
const router: Router = Router();

/** Main Route */
router.get("/", (req: Request, res: Response): void => {
    res.json("Welcome to fc-tienditas API")
});

// Export routes
export default router;