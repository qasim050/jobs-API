const Job = require("../models/Job");
const StatusCodes = require("http-status-codes");
const {   NotFoundError,
  BadRequestError,} = require("../errors");


const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}

const getJob = async (req,res) => {
    const job = await Job.findById(req.params.id)
    if(!job){
        throw new NotFoundError("job not found")
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})

}

const updateJob = async (req,res) => {
    const userId = req.user.userId
    const jobId = req.params.id
    const {company,position} = req.body

    if(!company || !position){
        throw new BadRequestError('company or position are not provid')
    }

    const updatedJob = await Job.findByIdAndUpdate({_id:jobId,createdBy:userId},
        req.body,
        {new:true,runValidators:true}
    )
    if(!updatedJob){
        throw new NotFoundError("job not found")
    }
    res.status(StatusCodes.OK).json({updatedJob})
}
const deleteJob = async (req,res) => {
    const userId = req.user.userId
    const jobId = req.params.id

    const deletedJob = await Job.findByIdAndDelete({_id:jobId,createdBy:userId},
    )
    if(!deletedJob){
        throw new NotFoundError("job not found")
    }
    res.status(StatusCodes.OK).json({deletedJob})
}

module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob}