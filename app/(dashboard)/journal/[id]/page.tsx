
import Editor from "@/app/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id) => {
    const user = await getUserByClerkId()
    console.log(user);
    const entry = await prisma.journalEntry.findUnique({
        where:{
            userId_id : {
               
                userId: user.id,
                id
            }
        }
    })
    return entry
 
}
    


const EntryPage = async({params}) => {
    const entry = await getEntry(params.id)
    return (
        <div className="h-full">
            <Editor entry={entry} />
        </div>
    )
}

export default EntryPage