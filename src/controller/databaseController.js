import { supabase } from "../config/spp.js";

export async function getShop(page_id) {
    // page_id = 562135403640783
    const { data, error } = await supabase.from('SHOPS').select('shop_fanpage_acctkn', 'shop_id').eq('shop_fanpage_id', page_id)
    return {
        acc_tkn: data[0].shop_fanpage_acctkn,
        shop_id: data[0].shop_id
    }
}

export async function getSimilarDrinks(label, shopid) {
    const response = await supabase.from('TRAINED_DRINKS').select('attributes').eq('label', label)
    let attributes = response.data[0].attributes
    const response2 = await supabase.from('DRINKS').select('drink_name').eq('shop_id',shopid).overlaps('drink_attributes',attributes)
    console.log(response2)
}
getSimilarDrinks('chocolate_frappe',)