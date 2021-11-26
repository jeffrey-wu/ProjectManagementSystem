import mongoose from 'mongoose';
import User from '../Schema/User.js'
import userstory from './UserStory.js';
// import Sprint from '../Schema/Sprint.js'

const { Schema } = mongoose;

const projectSchema = new Schema({
    //never do this --> _id (causes finding items using id invalid and finds null)
    id: String,
    ProjectName: String,
    // Sprints: [Sprint],
    ProjectStart: Date,
    ProjectEnd: Date,
    ProjectUserStories: [],
    Members: []
});
const Project = mongoose.model('Project', projectSchema);
export default Project