
const employeeSchema = require("../schemas/employeeShema")

import { ErrorRequestHandler, Request, Response } from "express";


const getallemps = async (req: Request, res: Response): Promise<void> => {

    const epmsdata = await employeeSchema.find();
    res.status(200).json(epmsdata);
};

const postemps = async (req: Request, res: Response)=> {
    const isUnique   = await employeeSchema.findOne({
        firstName: req.body.firstName,
    });

    if (isUnique) {
        return res.status(401).json({ error: "firstName must be unique" });
    }

    try {
        const data  = await employeeSchema.create({
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            salary: req.body.salary,
        });
        res.json(data);
    } catch (error) { 
        return res.status(400).json({ message: error });
    }
};

const patchemps = async (req: Request, res: Response) => {
    const _id: string | undefined = req?.body?._id;

    if (!_id) {
        return res.status(400).json({ error: "no id provided" });
    }

    const patch = { ...req.body };
    delete patch._id;

    const wantedEmployee   = await employeeSchema.findByIdAndUpdate(
        _id,
        {
            $set: patch,
        },
        { new: true }
    );

    res.json(wantedEmployee);
};

const deleteemps = async (req: Request, res: Response) => {
    const _id: string | undefined = req?.body?._id;

    if (!_id) {
        return res.status(400).json({ error: "no id provided" });
    }

    const result: Document | null = await employeeSchema.findByIdAndDelete(_id);

    res.json(result);
};

const getspecificemp = async (req: Request, res: Response)=> {
    const _id: string | undefined = req?.params?.id;

    if (!_id) {
        return res.status(400).json({ error: "no id provided" });
    }

    const wantedEmployee   = await employeeSchema.findById(_id);

    res.json(wantedEmployee);
};
module.exports ={
    getallemps,
    getspecificemp,deleteemps,patchemps,postemps
} 
