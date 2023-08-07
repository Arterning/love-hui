import {fetchJson} from "@/utils/fetch"

export async function serviceGetRankHistory() {
    return await fetchJson('/content/score/chart/find')
}
