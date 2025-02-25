import { supabase } from "../config/spp.js";
// async function trySPP() {
//     // const { data, error } = await supabase.from('SHOPS').select('shop_address')
//     const response = await supabase.from('SHOPS').select("*")
//     console.log(response)
// }
// await trySPP()

export async function getPageAccessToken(page_id){
    // page_id = 562135403640783
    const {data, error} = await supabase.from('SHOPS').select('shop_fanpage_acctkn').eq('shop_fanpage_id',page_id)
    return data[0].shop_fanpage_acctkn
}