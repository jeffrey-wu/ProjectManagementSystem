import user from "../Schema/User.js"

//ROUTE NOT ENTERING THIS FUNCTION (MAYBE CAUSE ITS A POST WHICH URL CANNOT INVOKE i.e. make a form to invoke it)
function createUser(req, res) {
    // if(false){   //!res.body
    //     console.log("Content cannot be empty.")
    // }
    // else{
      try{
        const user_1 = new user({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone: req.body.phone
        })
      //   const user_1 = new user({
      //     first_name: "milk",
      //     last_name: "pizza",
      //     phone: "0987654321"
      // })
        user_1.save().then( data => {
          res.send(data)
          console.log("Data saved")
        }).catch( err => {
          console.log("Error in createUser in user.js. ")
          console.log("Error type: "+err)
        })
      }
      catch(err){
        console.log("Error caught in userController line: 26: "+err)
      }
    // }
}

//findUser function works
function getAllUsers(req, res) {
    try{
        user.find({}).then( data => {
          // res.send(data+"niggah")  //testing purposes
          // res.json(data)  //perfect json format
          res.send(data)
        }).catch(err => {
          console.log("Something happened in userController.js line: 35: "+err)
        })
      }
      catch(err){
        console.log("Error description: "+err)      
        
      }
}

function updateUser(req, res) {
//https://www.geeksforgeeks.org/mongoose-findbyidandupdate-function/  //somehow this bitch works
//having PROMISES fixed it >>{{  .then(data=> {}.catch(err=>{}))  }}<<
  try{
    // _id layout >> { "_id" : ObjectId("6013a1669ce3a817b0f286ec")} <<
    // const id = req.params.id
    const data = {first_name: req.body.first_name, last_name: req.body.last_name, phone: req.body.phone}

    // user.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
    user.findByIdAndUpdate(req.params.id, data, {useFindAndModify: false}).then( d => {
      console.log(d)
    }).catch(err => {
      console.log("error in try block of updateUser: "+err)
    })

    // user.updateOne({first_name: req.body.first_name},{last_name: req.body.last_name,phone: req.body.phone},{useFindAndModify: false})
    // user.updateOne({first_name: "ponds"},{last_name: req.body.last_name,phone: req.body.phone}, { upsert: true })
    // user.updateOne("ObjectId(\""+req.params.id+"\")", {first_name: req.body.first_name, last_name: req.body.last_name,phone: req.body.phone},{ upsert: true })
    // const d = "ObjectId(\""+req.params.id+"\")"
    // user.updateOne(JSON.stringify(req.params.id), {first_name: req.body.first_name, last_name: req.body.last_name,phone: req.body.phone},{ upsert: true })

    
    //user = User.findById(req.params.id)
    // user.first_name = req.body.first_name
    // user.last_name = req.body.last_name
    // user.phone = req.body.phone
    // user.save()
    
    //BELOW WORKS
//     var user_id = req.params.id;
// user.findByIdAndUpdate(user_id, { first_name: 'Gourav' },{useFindAndModify: false},
//                             function (err, docs) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Updated User : ", docs);
//     }
// });

    console.log("update success")
    console.log("1"+req.params)
    console.log("2"+JSON.stringify(req.params))
    console.log("ObjectId(\""+req.params.id+"\")")//working
    console.log("4"+JSON.stringify(req.body))
    console.log("5"+req.body.first_name)


  }
  catch(err){
    console.log("Error in Express update: "+err)
  }
}

function deleteUser(req, res) {
  //DONT MAKE THE SAME MISTAKES, REMEMBER TO ADD PROMISES WITHIN TRY BLOCKS
  //having PROMISES fixed it >>{{  .then(data=> {}.catch(err=>{}))  }}<<
  try{
    console.log("1 "+req) //[object Object]
    console.log("3 "+JSON.stringify(req.params))  //{"id": *********}
    console.log("4 "+JSON.stringify(req.params.id)) //showing id
    user.findByIdAndDelete(req.params.id, {useFindAndModify: false}).then( d => {
      // console.log("success: "+d)
      console.log("Item Id: "+d._id+"\nProcess: Delete\nLocation: Express\nSuccess: TRUE")
    }).catch(err => {
      console.log("error in try block of deleteUser: "+err)
    })

  }
  catch(err){
    console.log("Error in Express delete: "+err)
  }
}

export default { createUser, getAllUsers, updateUser, deleteUser}