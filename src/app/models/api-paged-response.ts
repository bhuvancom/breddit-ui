export default interface ApiPagedResponse<T>{
    content:T[],
    totalPages:number,
    last:boolean,
    first:boolean
}