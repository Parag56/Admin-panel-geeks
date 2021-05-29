import {createContext} from 'react'
export const AuthContext=createContext({
    isloggedin:false,
    adminid:null,
    token:null,
    adminname:null,
    login:()=>{},
    logout:()=>{}
})