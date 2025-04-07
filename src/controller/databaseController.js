import { supabase } from "../config/spp.js";

export async function getShop(page_id) {
    // page_id = 562135403640783
    const { data, error } = await supabase.from('SHOPS').select('shop_fanpage_acctkn, shop_id').eq('shop_fanpage_id', page_id)
    console.log(data)
    if (error) console.log(error)
    return {
        acc_tkn: data[0].shop_fanpage_acctkn,
        shop_id: data[0].shop_id
    }
}

export async function getSimilarDrinks(label, shopid) {
    const response = await supabase.from('TRAINED_DRINKS').select('attributes').eq('label', label)
    let attributes = response.data[0].attributes
    const response2 = await supabase.rpc('similardrinks',{attributes, shopid})
    let drinks = []
    response2.data.forEach(element => {
        if (drinks.length==3) return
        drinks.push(element.drink_name)
    });
    console.log('drinks are ',drinks)    
    return drinks
}

export async function getRecommendedDrink(shopid) {
    const response = await supabase.rpc('newest',{shopid})
    const drink = response.data[0]
    return drink
}
// getSimilarDrinks('chocolate_frappe',1)