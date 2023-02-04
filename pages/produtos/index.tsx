import React, { useEffect, useState } from 'react'
import Search from '@ui/Search'
import Product from 'models/product';
import dbConnect from 'services/connect';
import { DataBase } from 'interface/ServerSideDataBase'
import Head from 'next/head'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { FilterHelper } from 'helpers/ProdutcHelpers/FilterHelper';
import Image from 'next/image';
import { handleQuantityMinus, handleQuantityPlus } from 'helpers/ProdutcHelpers/HandleQuantity';
import { CardRender } from 'helpers/ProdutcHelpers/ItemRender';

const opcoes = ['Todos',
  'Bolos',
  'Donuts',
  'Brownies',
  'Mousses',
  'Tapiocas',
  'Cupcakes']

export async function getStaticProps() {
  dbConnect.connect()
  const database = await Product.find();
  dbConnect.disconnect()
  return {
    props: { db: JSON.parse(JSON.stringify(database)) }
  }
}

function Products({ db }: DataBase) {
  const [name, setName] = useState('')
  const [type, setType] = useState('Todos')
  const [Products, setProducts] = useState(db)
  const [Page, setPage] = useState(1)

  const QuantityofPages = Math.ceil(Products.length / 12)

  useEffect(() => {
    setPage(1)
    const ProdutosFiltrados = FilterHelper(name, type, db)
    setProducts(ProdutosFiltrados)
  }, [type, name])

  const onChangeHandler = (event: any) => {
    setName(event.target.value)
  }

  return (
    <>
      <Head>
        <title>MagiCandy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className='flex flex-col items-center w-full min-w-[320px]  bg-backgroundPink border-b-2 border-fontPurple'>
        <h1 className='text-4xl text-white font-kalam mt-6'>Products</h1>
        <div className='flex justify-center w-full flex-wrap gap-6 py-6'>
          <Search onChangeHandler={onChangeHandler} />
          <select id='filterSelect' className='py-2 px-4 w-[229px] text-center rounded-lg ring-fontPurple ring-2 bg-white'
            onChange={e => setType(e.target.value)}>
            {opcoes.map(item => <option key={item}>{item}</option>)}
          </select>
        </div>

        <section className="flex grow text-black flex-col h-full gap-x-42 lg:flex-row lg:px-48 gap-16 md:gap-8 px-2 pt-16 pb-8  items-center justify-evenly lg:items-start flex-wrap">
          {
            Products.length > 0 ?
              Products.map((product, index) => CardRender(product, index, Page)) :
              <div className='text-center text-2xl font-bold'>
                <span>Produto não encontrado</span>
                <Image
                  alt=""
                  src="https://http.cat/404"
                  width={400}
                  height={400}
                />
              </div>
          }
        </section>
        {QuantityofPages > 1 &&
          <section className='flex items-center gap-8 pb-8 '>
            <button
              className=' flex items-center justify-center gap-2 min-w-[110px] cursor-pointer text-lg p-2  mx-auto radius-5 ring-2 my-[1rem] ring-fontPurple bg-backgroundWhite font-kalam rounded-lg select-none button-secondary'
              onClick={() => setPage(handleQuantityMinus(Page, QuantityofPages))}
            >
              <AiOutlineArrowLeft />
              Voltar
            </button>
            <p className='font-kalam text-xl'>Página {Page} / {QuantityofPages}</p>
            <button
              className='flex items-center justify-center gap-2 min-w-[110px] cursor-pointer text-lg p-2  mx-auto radius-5 ring-2 my-[1rem] ring-fontPurple bg-backgroundWhite  font-kalam rounded-lg select-none button-secondary'
              onClick={() => setPage(handleQuantityPlus(Page, QuantityofPages))}
            >
              Avançar
              <AiOutlineArrowRight />
            </button>
          </section>
        }
      </main>
    </>
  )
}

export default Products