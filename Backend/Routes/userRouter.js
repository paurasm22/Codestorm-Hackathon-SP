import express from 'express'
import {  register,login, getGovernmentSchemes, getDocuments} from "../Controller/userContoller.js"
import { Authenticated } from '../Middleware/auth.js';
const Router = express.Router();
Router.post('/register',register)
Router.post('/login',login)
Router.post('/genscheme',Authenticated,getGovernmentSchemes)
Router.post('/gendocs',getDocuments)






export default Router;
