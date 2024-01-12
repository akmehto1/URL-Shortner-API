const mongoose = require('mongoose');

const UrlModel = require('../models/URL');  // Use a different name for the imported module
const shortid = require('shortid');






const homepageHandler = async (req, resp) => {
  const incomingUrl = req.body.url; 
  console.log(req.ip);
  console.log(req.connection.remoteAddress);

//   const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
//   console.log('Visitor IP Address:', ip); // Rename the variable to avoid conflict

  if (!incomingUrl) {
    return resp.status(400).json({ err: 'URL not found' });
  }

  const shortids = shortid.generate();
  
  console.log(incomingUrl);

  try {
    const data = await UrlModel.create({
      shortId: shortids,
      redirectURL: incomingUrl,  // Use the renamed variable here
      visitedHistory: [],
    });
    
    // return resp.render('index.ejs');
    return resp.status(200).json({ message: 'Working properly', data });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error: 'Internal Server Error' });
  }
};



const gotoURL=async(req,resp)=> {
       const shortURLId=req.params.shortURL;
       console.log(shortURLId);
       const entry=await UrlModel.findOneAndUpdate({
        shortId:shortURLId
       },{
        $push:{
            visitedHistory:{
                timestamp:Date.now()
            }
        }
       })
       console.log(entry);
       resp.redirect(entry.redirectURL);
       

      
}



const analytics=async(req,resp)=>{

    const shortId=req.params.shortId;

    try{
       
        const details=await UrlModel.findOne({shortId});
        
        resp.status(200).json({TotalClicks:details.visitedHistory.length,analytics:details.visitedHistory});  
        

    }catch(error){
             

        resp.send(error);
    }

    


resp.status(200)

}

module.exports = { homepageHandler ,gotoURL,analytics};
