import { Project } from "../models/ProjectModel.js";
import { User } from "../models/UserModel.js"


const addProject = async (req, res) => {
    try{
        const { title, description, allocatedById, startDate, endDate, allocatedAmount, completionRate, lastUpdated } = req.body;
        const project = new Project({
            title,
            description,
            allocatedBy: allocatedById,
            startDate,
            endDate,
            allocatedAmount,
            completionRate,
            lastUpdated
        });
        await project.save();

        res.statu(201).json(project);
    }catch(error){
        console.error("Error adding project: ", error)
        res.status(400).json({error: error.message})
    }
};

const getAllProjects = async (req, res) => {
    try{
        const projects = await Project.find();
        res.status(200).json(projects)
    }catch(error){
        res.status(404).json({error: error.message})
    }
};

const getProjectsByName = async (req, res) => {
    try {
      const { allocatedBy } = req.params;
  
      // Check if the user exists
      const user = await User.findById(allocatedBy);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find projects allocated by this user
      const projects = await Project.find({ allocatedBy }).populate('allocatedBy', 'name');
      if (projects.length === 0) {
        return res.status(404).json({ message: "No projects found allocated by this user" });
      }
  
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error getting projects: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

const updateProject = async (req, res) => {
    try{
        const { id } = req.params;
        const project = await Project.findByIdAndUpdate(
            id,
            {...req.body},
            {new: true, runValidators: true},
        );

        if (!project)
            return res.status(404).json({error: "Project not found"});
        res.status(200).json(project)
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

const deleteProject = async (req, res) => {
    try {
      const { id } = req.params;
      await Project.findByIdAndDelete(id);
      res.status(201).json({ message: "Project is deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


export {
    addProject,
    getAllProjects,
    getProjectsByName,
    updateProject,
    deleteProject,
};