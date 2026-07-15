export function currencyFormat(amount:number){
     return '$' + (amount/100).toFixed(2);
}

export function filtereEmptyValues(values: object){
     return Object.fromEntries(
                    Object.entries(values).filter(([, value]) => value !== undefined && value !== null && value !== '' && value.length !== 0) 
                );
}