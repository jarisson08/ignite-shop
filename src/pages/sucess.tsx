import { GetServerSideProps } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { ImageContainer, SuccessContainer } from "../../styles/pages/sucess";
import { stripe } from "../lib/stripe";
import Image from 'next/future/image'

interface SucessProps{
  customerName: string
  product:{
    name: string
    imageUrl: string
  }

}

export default function Sucess({customerName, product}: SucessProps) {
    return (
      <SuccessContainer>
        <ImageContainer>
        <Image src={product.imageUrl} width={120} height={110} alt=""/>
        </ImageContainer>
        <p>
        Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>
      <Link href={`/sucess`}>Voltar ao Catálogo</Link>
      </SuccessContainer>
    )
  }
  
  export const getServerSideProps: GetServerSideProps= async ({query})=>{
    const sessionId= String(query.sessionId)

    const session= await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName= "customer_details name"
    const product= session.line_items.data[0].price.product as Stripe.Product

    console.log(session)
    return{
      props:{
        customerName,
        product:{
          name: product.name,
          imageUrl: product.images[0],
        }
      }
    }
  }