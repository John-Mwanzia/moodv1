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
 
  return (
    <div className="h-full w-full overflow-x-hidden ">
      <div>
        <Editor entry={entry} />
      </div>
   
    </div>
  );
};

export default EntryPage;
