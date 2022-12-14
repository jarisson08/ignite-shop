import { AppProps } from "next/app"
import { globalStyles } from "../../styles/global"
import logoImg from '../../public/logo.svg'
import Image from 'next/image'
import { Container, Header } from "../../styles/pages/app"


 
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  
  return(
    <Container>
      <Header>
        <Image src={logoImg} />
      </Header>

      <Component {...pageProps} />
    </Container>
    
  )

  
}


