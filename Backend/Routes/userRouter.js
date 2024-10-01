import express from 'express'
import {  register,login, getGovernmentSchemes, getDocuments, getUserProfile, updateUserProfile} from "../Controller/userContoller.js"
import { Authenticated } from '../Middleware/auth.js';
const Router = express.Router();
Router.post('/register',register)
Router.post('/login',login)
Router.post('/genscheme',Authenticated,getGovernmentSchemes)
Router.post('/gendocs',getDocuments)
Router.get('/profile', Authenticated, getUserProfile); // Route to fetch user profile
Router.put('/profile', Authenticated, updateUserProfile);





export default Router;
