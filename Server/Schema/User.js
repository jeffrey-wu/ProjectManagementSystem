import mongoose from 'mongoose';
import Project from '../Schema/Project.js'
const { Schema } = mongoose;

const userSchema = new Schema({
    // UserID: String,
    id: String,
    first_name: String,
    last_name: String,
    phone: String,
    // Workspace: {
    //     ProjectID: String,
    //     ProjectName: String,
    //     // Sprints: [Sprint],
    //     ProjectStart: Date,
    //     ProjectEnd: Date,
    
    //     Members: [{ firstName: String, lastName: String, phone: String }]
    // }
});
const User = mongoose.model('User', userSchema);
export default User