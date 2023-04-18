import React from 'react'
import { Footer, FooterBanner, HeroBanner, Product } from '../components'
import { client } from '../lib/client'
const Home = ({ products, banners }) => {
  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]} />
      <div className='products-heading'>
        <h2>Best Selling</h2>
        <p>Latest</p>
      </div>
      <div className='products-container'>
        <div className="maylike-products-container track" style={{position:'initial'}}>
          {products?.map(p => <Product key={p._id} product={p} />)}
        </div>
      </div>

      <FooterBanner footerBanner={banners.length && banners[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type== "product"]';
  const products = await client.fetch(query)

  const bannerQuery = '*[_type== "banner"]';
  const banners = await client.fetch(bannerQuery)

  return { props: { products, banners } }
}

export default Home