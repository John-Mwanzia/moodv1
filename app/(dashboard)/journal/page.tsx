import Entrycard from '@/app/components/Entrycard';
import NewEntrycard from '@/app/components/NewEntryCard';
import Question from '@/app/components/Question';
import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';
import React from 'react';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      analysis: true
    }
  });
  //  console.log(await analyze("today i read a vey educative book, but it was hard to  get from the library :)"));

  return entries;
};

export default async function JounalPage() {
  const entries = await getEntries();
  return (
    <div>
      <div className="px-6 py-8 bg-zinc-100/50 h-full">
        <h1 className="text-4xl mb-12">Journals</h1>

        <div className='my-8'>
           <Question />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <NewEntrycard />
          {entries.map(entry => (
            <div key={entry.id}>
              <Link href={`/journal/${entry.id}`}>
                <Entrycard entry={entry} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
