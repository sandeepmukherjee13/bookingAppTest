
export const sameAs = (field,getValues) => (value) =>{
    const a = getValues()
    const compareTo = getValues()[field];
    return compareTo === value;
    
}
//for each and map
//const object can be changed
