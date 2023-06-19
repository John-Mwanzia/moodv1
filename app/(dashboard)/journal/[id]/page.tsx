import Editor from '@/app/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async id => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      },
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);
  const {mood, summary,subject,color, negative} = entry?.analysis;

  const analysisData = [
    {
      name: 'Summary',
      value: summary
    },
    {
      name: 'Subject',
      value: subject
    },
    {
      name: 'Mood',
      value: mood
    },
    {
      name: 'Negative',
      value: negative?'true':'false'
    }
  ];
  return (
    <div className="h-full w-full grid grid-cols-3 overflow-x-hidden">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/5">
        <div className="px-6 py-10 "  style={{backgroundColor: color}}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
            <ul>
                {analysisData.map((data)=>(
                    <li key={data.name} className="flex justify-between border-b border-t px-2 py-4 border-black/10">
                        <span className='text-lg font-semibold'>{data.name}</span>
                        <span>{data.value}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
