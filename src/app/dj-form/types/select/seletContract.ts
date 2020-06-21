export interface SelectContract{
    value:string;
    name:string;
}

export interface SelectMapper{
    map(data:any[]):SelectContract;
}
