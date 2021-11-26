import mongoose from 'mongoose';
const { Schema } = mongoose;

const userStorySchema = new Schema({
    // UserStoryID: String,
    id: String,
    UserStory: String,
    Description: String,
    Difficulty: String,
    Time: String,
    Priority: String,
    ProjectID: String
    
    // SprintID: String
});
const userstory = mongoose.model('userstory', userStorySchema);

export default userstory