import React from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  return (
    <div className='flex px-10 items-center justify-between'>

      <div>
        <h1 className=' text-rose-500'>Logo</h1>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  )
}

export default Navbar