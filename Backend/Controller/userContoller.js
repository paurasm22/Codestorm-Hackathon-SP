import { User } from "../Model/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBf7--nw90xSkhcAiXn6Hbj0HZtRHsbUng');
const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


export const register=(async(req,res)=>{
  const {email,password,age,caste,income,gender,states,highedu,occupation,empstatus,disability,marriage}=req.body
  try {
    let user = await User.findOne({email})
    if (user){
      res.json({message:"User already exists ! ",sucess:false})
    }
    else{
      const hashPass =await bcrypt.hash(password,10) 
      user = await User.create({email,password:hashPass,age,caste,income,gender,states,highedu,occupation,empstatus,disability,marriage})
      res.json({message:"User registered Sucessfully",sucess:true})
    }

    
  } catch (error) {
    res.json("Error!!")
  }
})


export const login=async(req,res)=>{
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email})
    if (!user) return res.json({message:"User not found !",sucess:false})
      const validpassword=await bcrypt.compare(password,user.password)
    if (!validpassword)return res.json({message:"Invalid Credentials",sucess:false})

      const token = jwt.sign({userId:user._id},"@#$$##%%",{
        expiresIn:'365d'
      })
      
      res.json({message:`Matched Credentials `,
        token,sucess:true
        ,
        admin:user.admin})
  } catch (error) {
    res.json({message:error.message})
  }
}
export const getGovernmentSchemes = async (req, res) => {
  try {
    const { age, caste, income, gender, states, highedu, occupation, empstatus, disability } = req.user;
    const {sector} = req.body;
    console.log(age)
    console.log(caste)
    console.log(income)
    console.log(gender)
    console.log(states)
    console.log(highedu)
    console.log(sector)
    console.log(disability)

    // Construct the prompt dynamically based on the user input
    const prompt = `Please provide a comprehensive list of government schemes available for a ${gender}, ${occupation}, age ${age}, residing in ${states}, currently ${empstatus} with an income of ${income}. 
I have the following details: my highest education is ${highedu}, caste is ${caste}, and  
I'm specifically interested in schemes related to ${sector}. For each scheme, please include eligibility criteria and any available links to application forms or relevant portals where I can apply. 
Make sure to provide the most current information available and clarify if any details might change frequently.Dont give formal messages or reasons just give me schemes this is for a chatbot for my website . Give me schemes at any cost`;

    // Call the Google Gemini API with the constructed prompt
    const result = await model.generateContent(prompt); // Pass prompt directly

    // Access the response correctly
    const responseText = result.response.text(); // Get the text response

    // Return the response back to the client
    res.status(200).json({
      success: true,
      schemes: responseText, // Return the raw response text for now
    });

  } catch (error) {
    console.error('Error generating schemes:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating schemes',
      error: error.message,
    });
  }
};
export const getDocuments = async (req, res) => {
  try {
    const {state, schemeName} = req.body;

    // Construct the prompt dynamically based on the user input
    const prompt = `I   would like detailed information on the required documents for the ${schemeName}. Please provide a comprehensive list of all necessary documents needed for application, along with any specific eligibility criteria or procedures . If available, also include links to official resources or government portals where I can find the most current information on this scheme. This is for a chatbot so dont give formal messages and give gauranteed documents of the scheme asked .`;


    // Call the Google Gemini API with the constructed prompt
    const result = await model.generateContent(prompt); // Pass prompt directly

    // Access the response correctly
    const responseText = result.response.text(); // Get the text response

    // Return the response back to the client
    res.status(200).json({
      success: true,
      schemes: responseText, // Return the raw response text for now
    });

  } catch (error) {
    console.error('Error generating schemes:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating schemes',
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user; // Extract user ID from the token
    const user = await User.find(userId).select("-password"); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user info", error: error.message });
  }
};

// Update user profile based on token and provided fields
export const updateUserProfile = async (req, res) => {
  const { age, caste, income, gender, states, highedu, occupation, empstatus, disability, marriage } = req.body;

  try {
    const userId = req.user; // Extract user ID from the token
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields if provided in the request body
    user.age = age || user.age;
    user.caste = caste || user.caste;
    user.income = income || user.income;
    user.gender = gender || user.gender;
    user.states = states || user.states;
    user.highedu = highedu || user.highedu;
    user.occupation = occupation || user.occupation;
    user.empstatus = empstatus || user.empstatus;
    user.disability = disability || user.disability;
    user.marriage = marriage || user.marriage;

    await user.save(); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user info", error: error.message });
  }
};
