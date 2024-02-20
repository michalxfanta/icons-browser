import { use } from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import Image from 'next/image'

async function getIcons() {
  const imageDirectory = path.join(process.cwd(), '/public/icons')

  return await fs.readdir(imageDirectory)
}

export default function Home() {
  const icons = use(getIcons())

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/prusa-icons-set-logo.svg"
        alt="Prusa Icons Set"
        width={180}
        height={39}
        priority
      />
      <span className="italic">icons count: <b>{icons.length}</b></span>

      <div className="grid text-center w-full mt-8 mb-8 lg:mb-0 lg:grid-cols-12 lg:text-left">
        <Icons iconsFilenames={icons}></Icons>
      </div>

    </main>
  )
}

const Icons = ({ iconsFilenames }: { iconsFilenames: Array<string> }) => {
  return (
    <>
      {iconsFilenames.map((el: string) => (
        <div
          key={el}
          className="rounded-md text-center border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <Image className="ml-auto mr-auto" width={64} height={64} alt={el} src={`/icons/${el}`} />
          <span className="break-all text-xs">{el}</span>
        </div>
      ))}
    </>
  )
}
