import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";



export default async function handleCheckoutSession(req: NextApiRequest, res: NextApiResponse){
    const {priceId}= req.body

    if(req.method=="GET"){
        return res.status(405).json({error: 'Method not allowed'})
    }

    if(!priceId){
        return res.status(400).json({error: 'Price not found'})
    }
    const sucessURL= `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`
    const cancelURL= `${process.env.NEXT_URL}/`
    
    const checkoutSession= await stripe.checkout.sessions.create({
        mode: 'payment',
        cancel_url:cancelURL,
        success_url:sucessURL,
        line_items: [{
        price: priceId,
        quantity: 1,
        }]
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}