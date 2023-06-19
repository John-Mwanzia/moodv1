import Entrycard from '@/app/components/Entrycard'
import NewEntrycard from '@/app/components/NewEntryCard'
import {getUserByClerkId} from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'
import React from 'react'

const getEntries = async () => {
    const user = await getUserByClerkId()
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        analysis: true,
      },
    })
  
    return entries
  }

export default async function JounalPage() {
    const entries = await getEntries()
    console.log("entries", entries)
  return (
    <div>
         <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>

      <div className="grid grid-cols-3 gap-4">
        <NewEntrycard />
        {entries.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <Entrycard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
