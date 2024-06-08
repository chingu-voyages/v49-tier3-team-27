import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {

    try{
        const keyword = req.nextUrl.searchParams
        console.log('The keyword is : ', keyword);
        
    } catch(err) {
        console.error(err)
    }
    
}