import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { GraphDefines } from "@/features/graph/new/new.constants"
import { ensureClientDBReady, ClientSQL } from "@/server/model/client-db"
import { Entities } from "@/server/model/client-db"
import { getTranslations } from "@/lib/i18n/i18n-server"

function toTinyIntBool(v: FormDataEntryValue | null): number {
    if(typeof v !== "string") return 0

    const s = v.toLowerCase()
    
    return s === "1" || s === "true" || s === "on" || s === "yes" ? 1 : 0
}

function toInt(v: FormDataEntryValue | null, fallback = 100) {
    
    const n = typeof v === "string" ? parseInt(v, 10) : NaN

    return Number.isFinite(n) ? n : fallback 
}

function emptyToNull(v: FormDataEntryValue | null): string | null {

    const s = typeof v === "string" ? v.trim() : ""
    
    return s === "" ? null : s
}

function safeJson(v: FormDataEntryValue | null): Record<string, any> | null {
    
    const s = typeof v === "string" ? v.trim() : ""
    if(!s) return null

    try{
        const parsed = JSON.parse(s)
        return typeof parsed === "object" && parsed !== null ? parsed : null
    }catch {
        return null
    }
}

function normalization<T extends readonly string[]> (
    value: FormDataEntryValue | null,
    allowed: T,
    fallback: T[number]
): T[number] {
    const s = typeof value === "string" ? value : ""

    return (allowed as readonly string[]).includes(s) ? (s as T[number]) : fallback
}

async function createGraph(formData: FormData) {
    "use server"

    await ensureClientDBReady()
    const GraphRepo = ClientSQL.getRepository(Entities.Graph)

    const slug = (formData.get("slug") ?? "").toString().trim()
    const title = (formData.get("title") ?? "").toString().trim()
    if(!slug || !title) redirect(`/graph/new?error=required`)

    const variant = normalization(
        formData.get("variant"),
        GraphDefines.GRAPH.variants,
        "Bar"
    )
    const tag_tone = normalization(
        formData.get("tag_tone"),
        GraphDefines.GRAPH.tagTones,
        "blue"
    )
    const visibility = normalization(
        formData.get("visibility"),
        GraphDefines.GRAPH.visibilities,
        "public"
    )

    const is_external = toTinyIntBool(formData.get("is_external"))
    const is_active = toTinyIntBool(formData.get("is_active"))
    const order_priority = toInt(formData.get("order_priority"), 100)

    const description = emptyToNull(formData.get("description"))
    const path = emptyToNull(formData.get("path"))
    const external_url = emptyToNull(formData.get("external_url"))
    const icon_key = emptyToNull(formData.get("icon_key"))
    const tag = emptyToNull(formData.get("tag"))
    const category = emptyToNull(formData.get("category"))
    const metadata = safeJson(formData.get("metadata"))

    const finalPath = is_external ? null : (path ?? `/data/${slug}`)

    try {
        await GraphRepo.insert({
            slug,
            title,
            description,
            path: finalPath,
            external_url,
            variant,
            icon_key,
            tag,
            tag_tone,
            category,
            is_active,
            is_external,
            order_priority,
            visibility,
            metadata
        })
    }catch(err: any) {
        if(err?.code === "ER_DUP_ENTRY") redirect(`/graph/new?error=duplicate`)
            
        console.log(err)
        redirect(`/graph/new?error=unknown`)
    }

    revalidatePath("/main")
    redirect("/main")
}

export default function NewGraphPage({ locale }: { locale: "ko" | "en" }) {

    const { t } = getTranslations(locale)

    const VARIANTS = GraphDefines.GRAPH.variants
    const TAG_TONES = GraphDefines.GRAPH.tagTones
    const VISIBILITIES = GraphDefines.GRAPH.visibilities

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{`${t("graphs.new.title")}`}</h1>

            <form action={createGraph} className="space-y-6">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Slug *</span>
                        <input name="slug" required placeholder={`${t("graphs.new.slug_placeholder")}`}
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.card_title")}`}</span>
                        <input name="title" required placeholder={`${t("graphs.new.card_title_placeholder")}`}
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                    <label className="md:col-span-2 flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.description")}`}</span>
                        <textarea name="description" rows={3} placeholder={`${t("graphs.new.description_placeholder")}`}
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="is_external" />
                        <span className="text-sm">{`${t("graphs.new.external_link")}`}</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="is_active" defaultChecked />
                        <span className="text-sm">{`${t("graphs.new.activate")}`}</span>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.path")}`}</span>
                        <input name="path" placeholder={`${t("graphs.new.path_placeholder")}`}
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                        <span className="text-xs text-gray-500">{`${t("graphs.new.path_noentry")}`}</span>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.external_url")}`}</span>
                        <input name="external_url" placeholder={`${t("graphs.new.external_url_placeholder")}`}
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.variant")}`}</span>
                        <select name="variant" className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900">
                            {VARIANTS.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.tag_tone")}`}</span>
                        <select name="tag_tone" className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900">
                            {TAG_TONES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.visibility")}`}</span>
                        <select name="visibility" className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900">
                            {VISIBILITIES.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </label>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.tag")}`}</span>
                        <input name="tag" placeholder="e.g. new"
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.category")}`}</span>
                        <input name="category" placeholder="e.g. tools"
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.icon_key")}`}</span>
                        <input name="icon_key" placeholder="e.g. chart-bar"
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.order_priority")}`}</span>
                        <input name="order_priority" type="number" defaultValue={100}
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{`${t("graphs.new.metadata")}`}</span>
                        <textarea name="metadata" rows={4} placeholder={`${t("graphs.new.metadata_placeholder")}`}
                        className="border rounded-md px-3 py-2 bg-white dark:bg-slate-900" />
                    </label>
                </section>

                <div className="flex items-center gap-3">
                    <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                        {`${t("graphs.new.save")}`}
                    </button>
                    <a href="/main" className="text-sm text-gray-600 hover:underline">{`${t("graphs.new.cancel")}`}</a>
                </div>
            </form>
        </div>
    )
}