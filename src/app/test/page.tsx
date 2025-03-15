"use client"
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="">
      <main>
  <h1 className="title">Next.js Chat Demo</h1>
  <Chat chatId={"1"} />
</main>

    </div>
  );
}
