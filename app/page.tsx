import Link from "next/link";
import {auth} from  '@clerk/nextjs' 

export default async function Home() {
   const {userId} = await auth()

   let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
       <div className="max-w-[600px] mx-auto">
          <h1 className="text-white text-6xl mb-6"> The best journal app ever, period. </h1>
          <p className=" text-white/60 text-xl mb-6">
             this is the best app for tracking your mood throughout your life.All you have to do is be honest with yourself and write down how you feel.
          </p>
          <div>
          <Link href={href}>
              <button
                type="button"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              > 
              Get Started 
              </button>
            </Link>
          </div>
       </div>
    </div>
  )
}
