import sanityClient from '@sanity/client'
import imageUrlBuilder  from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'v2mramt2',
    dataset: 'production',
    apiVersion: '2023-04-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (src) => builder.image(src)