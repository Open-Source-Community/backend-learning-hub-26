import {Request, Response} from 'express';
import fleet from '../data/Microbus';

const getfleet=(req:Request,res:Response)=>{
    res.status(200).json(fleet);
}

const getfleetbyid=(req:Request,res:Response)=>{
    const id = Number(req.params.id);
    const microbus=fleet.find(m=>m.id==id);
    if(!microbus){
        return res.status(404).json({message:"Am Ashraf doesn't run that one"});
    }

    res.status(200).json(microbus);
}

const addnew=(req:Request,res:Response)=>{
    const{driverName, route, farePerSeat, seatsAvailable}=req.body;
    if(!driverName || !route || !farePerSeat || !seatsAvailable){
        return res.status(400).json({message:"required field is missing"})
    }
    const newmicro={
        id:fleet.length+1,
        driverName,
        route,
        farePerSeat,
        seatsAvailable
    }
    fleet.push(newmicro);
    res.status(201).json(newmicro);
}

const updatemicrobus=(req:Request,res:Response)=>{
    const id = Number(req.params.id);
    const microbus=fleet.find(m=>m.id==id);
    if(!microbus){
        return res.status(404).json({message:"Am Ashraf doesn't run that one"});
    }
    const {driverName, route, farePerSeat, seatsAvailable}=req.body;
    if(driverName) microbus.driverName=driverName;
    if(route) microbus.route=route;
    if(farePerSeat) microbus.farePerSeat=farePerSeat;
    if(seatsAvailable) microbus.seatsAvailable=seatsAvailable;

    res.status(200).json(microbus);
}

const deletemicrobus=(req:Request,res:Response)=>{
    const id = Number(req.params.id);
    const index=fleet.findIndex(m=>m.id===id);
    if(index === -1){
        return res.status(404).json({message:"Am Ashraf doesn't run that one"});
    }
    fleet.splice(index, 1);
    res.status(200).json({message:"Microbus deleted successfully"});
}

const filter=(req:Request,res:Response)=>{
    const maxFareValue = Number(req.query.maxFare);
    if (!maxFareValue) {
        return res.status(400).json({message:"Query parameter maxFare is required"});
    }
    const filteredfleet=fleet.filter(m=>m.farePerSeat<=maxFareValue);
    if(filteredfleet.length===0){
      return res.status(200).json({message:"there is no fare less than this"});
    }
    res.status(200).json(filteredfleet);
}

const ratemicrobus=(req:Request,res:Response)=>{
    const id = Number(req.params.id);
    const rater = req.query.rater;
    if (!rater) {
        return res.status(400).json({message:"Query parameter rater is required"});
    }
    const microbus=fleet.find(m=>m.id===id);
    if(!microbus){
        return res.status(404).json({message:"Am Ashraf doesn't run that one"});
    }
    const rating = microbus.ratings?.find(r => r.name === String(rater));
    if (!rating) {
        return res.status(200).json({message:`${String(rater)} has not rated this microbus`});
    }
    res.status(200).json({message:`${rating.name} rated this microbus ${rating.rating}`});
}

export {getfleet,getfleetbyid,addnew,updatemicrobus,deletemicrobus,filter,ratemicrobus};
