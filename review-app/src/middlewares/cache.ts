import { NextFunction } from 'express';
const redis = require('redis');
import { Request, Response } from 'express';

const redis_client = redis.createClient();

export const createCache = (duration:number) => {
    return (req: Request, res: any, next: NextFunction) => {
    const { id } = req.params;
    redis_client.get(id, (err: any, data: any) => {
        if (err) {
            res.stauus(500).send(err);
        }
        if (!data) {
            //proceed to next middleware function
            res.sendResponse = res.send;
            res.send = (body: any) => {
                redis_client.set(id, JSON.stringify(body),'EX', duration);
                res.sendResponse(body);
            }, 
            next();
        }else {
            res.status(200).send(JSON.parse(data));
        }

    })
}

}
