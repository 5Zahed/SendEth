"use client";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'sonner'
export default function Home() {
  const [value, setValue] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [txHash, setTxHash] = useState(null);


  const {
    sendTransactionAsync,
    isPending,
    error,
  } = useSendTransaction();


  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected && !from) {
      setFrom(address ?? "");
    }
  }, [isConnected, address]);

  console.log(value, to, from)
  async function SendTransctions() {
    if (!to || !value) {
      toast('Please fill all the inputs')
      return;
    }

    try {
      const tx = await sendTransactionAsync({
        to,
        value: parseEther(value),
      });
      setTxHash(tx.hash);
      console.log('tx sent:', tx.hash);
    } catch (err) {
      console.error('tx failed', err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="px-10">
        <h1 className="font-mono text-5xl">Send ETH <span className="text-sm">(Sepolia)</span></h1>

        <div className="flex ">
          <div className="flex flex-col">
            <div className="mt-2">
              <p>From</p>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="no-spinner pl-5 w-[30rem] border-rose-500 py-3 rounded"

              />
            </div>
            <div className="mt-2">
              <p>To</p>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="no-spinner pl-5 w-[30rem] border-rose-500 py-3 rounded"
              />
            </div>
          </div>
          <div className="flex mt-16 ml-5 flex-col">
            <p>Amount</p>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}

              className="w-[30rem] pl-5 self-start outline-rose-500 rounded-md outline-2 border-blue-500 py-3"
            />
          </div>
        </div>

        {isConnected ? (
          <button
            onClick={SendTransctions}
            disabled={isPending}
            className="px-10 py-3 mt-10 border-0 rounded-md text-white bg-gradient-to-r from-rose-500 to-blue-500 disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send Transaction"}
          </button>

        ) : (
          <p className="text-lg text-red-500 mt-5">
            Connect Wallet to Send Transaction
          </p>
        )}
        {error && (
          <p className="mt-5 text-red-600">
            error: {error.message}
          </p>
        )}

      </div>
    </div>
  );
}
