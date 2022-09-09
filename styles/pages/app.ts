import { styled } from "..";

export const Container=styled('div', {
    display: 'flex',
    alignItems:'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',//para que ocupe a tela toda
})

export const Header= styled('header', {
    padding: '2rem',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
})