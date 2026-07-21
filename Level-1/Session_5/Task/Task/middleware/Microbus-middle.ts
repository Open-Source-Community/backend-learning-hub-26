import { Request, Response, NextFunction } from 'express';

const validateMicrobus = (req: Request, res: Response, next: NextFunction) => {
    const { driverName, route, farePerSeat, seatsAvailable } = req.body;

    if (farePerSeat < 0) {
        return res.status(400).json({
            error: "farePerSeat must be a non-negative number"
        });         
    }

    if (seatsAvailable < 0) {
        return res.status(400).json({
            error: "seatsAvailable must be a non-negative number"
        });
    }

    next();
};

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

export { validateMicrobus, loggingMiddleware };
