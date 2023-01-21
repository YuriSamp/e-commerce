import React from 'react'
import Footer from '@ui/Footer'
import Navbar from '@ui/Navbar'
import CartItem from '@ui/CartItem'
import Button from '@ui/Button'
import { useRecoilState } from 'recoil'
import { CartAtom } from 'context/Atom'
import { FormataBRL } from 'utils/ConvertCurrency'
import Head from 'next/head'


function Cart() {

  const [Lista, setLista] = useRecoilState(CartAtom)
  const FinalPrice = Lista.reduce((acc, item) => acc += item.Quantity * item.Price, 0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const Cart = {
      Lista,
      FinalPrice
    }
    // const CartItem = {
    //   Name: props.Name,
    //   Quantity: value,
    //   Id: props.Id,
    //   Price: props.Price,
    //   Image: props.Imagem
    // }
    // setCart((prevState) => [...prevState, CartItem])
  }

  function Subtotal(ref: number) {

    if (ref === 1) {
      return <h3 className='text-lg'>Total ({ref} item) : {FormataBRL(FinalPrice)}</h3>
    }
    if (ref > 1) {
      return <h3 className='text-lg'>Total ({ref} itens) : {FormataBRL(FinalPrice)}</h3>
    }
    if (ref === 0) {
      return <h3 className='text-lg'>Nenhum item no carrinho</h3>
    }
  }


  function HandleRemove(id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const ListaVerificada = Lista.filter(item => item._id !== id)
    setLista(ListaVerificada)
    console.log('eu fui clicado')
  }


  return (
    <>
      <Head>
        <title>MagiCandy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Navbar />
      <main className='flex flex-col px-2 items-center justify-center py-4 bg-backgroundPink min-h-[calc(100vh-379px)]'>

        <div className='flex flex-col w-[80%] px-4 py-6 md:px-6 max-w-[1000px] items-center justify-center text-fontPurple border-fontPurple border-2 bg-white font-kalam rounded-lg'>

          <h2 className='text-2xl font-semibold'>Lista de Produtos</h2>
          <div>
            {Lista.map((item, index) => (
              <CartItem key={index} Name={item.Name} Imagem={item.Image} Quantity={item.Quantity} Price={item.Price} />
            ))}
          </div>
          <div className='flex items-center gap=2 md:gap-52 '>
            <Button value={"Finalizar compra"} href="../" type="LINK" />
            {Subtotal(Lista.length)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Cart