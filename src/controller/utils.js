export function awsStringToJSON(string){
    let obj = {}
    // let cleanStr = string.slice(1,-1)
    let parts = string.split('","') //split the string into two parts, the last part contains the labels
    let part0 = parts[0].split(',"') //label,confidence -- probabilities
    let part0split = part0[0].split(',')
    obj.label = part0split[0]
    obj.confidence = part0split[1]
    obj.probabilities = JSON.parse(part0[1])
    parts[1]= parts[1].slice(0,-1).replace(/'/g,'"')
    obj.suggestions = JSON.parse(parts[1])
    console.log(obj)
    return obj
}
// awsStringToJSON(`strawberryfrappe,0.5895771384239197,"[0.5895771384239197, 0.4104228913784027]","['strawberryfrappe', 'tradau']"`)