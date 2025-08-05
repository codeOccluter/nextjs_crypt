import { ClientDB } from "@/lib/db/client-db"
import { Subject } from "@/types/entities/Subject"
import { mapSubjectToUI } from "@/lib/utils/icons/iconMap"
import { SubjectUI } from "@/types/subject/subject-ui"

export async function getSubjects(): Promise<SubjectUI[]> {

    if(!ClientDB.isInitialized) await ClientDB.initialize()
    const subjects = await ClientDB.getRepository(Subject).find()
    
    return subjects.map(mapSubjectToUI)
}

export async function getSubjectsById(id: string): Promise<SubjectUI | null> {

    if(!ClientDB.isInitialized) await ClientDB.initialize()
    const subject = await ClientDB.getRepository(Subject).findOneBy({ id })

    return subject ? mapSubjectToUI(subject) : null

}