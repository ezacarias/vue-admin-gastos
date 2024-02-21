export const formatearCantidad = cantidad=>{
 return Number(cantidad).toString('es-US',{
    style:'currency',
    currency:'USD'
 });
}