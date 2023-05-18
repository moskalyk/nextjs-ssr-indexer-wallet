import Image from 'next/image'
import { SequenceIndexerClient } from '@0xsequence/indexer'

async function getNFTs(contractAddress: string) {

  const indexer = new SequenceIndexerClient('https://polygon-indexer.sequence.app')

  // query Sequence Indexer for all nft balances of the account on Polygon
  const nftBalances = await indexer.getTokenBalances({
      contractAddress: contractAddress,
      includeMetadata: true
  })

  return nftBalances
}

export default async function Home() {
  // Initiate both requests in parallel
  const artistData = getNFTs('0x631998e91476DA5B870D741192fc5Cbc55F5a52E');
  
  // Wait for the promises to resolve
  const [artist]: any = await Promise.all([artistData]);

  console.log(artist)
  return (
    <>
      <p className='title'>SSR Wallet Demo</p>
      <div>{artist.balances.map((nft: any) => {
        return <img className='nft' src={nft.tokenMetadata.image}></img>
      })}</div>
    </>
  )
}
