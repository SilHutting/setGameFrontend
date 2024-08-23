export enum Shape {
    golf = 0,
    ovaal = 1,
    ruit = 2 
}

export enum Fill {
    leeg = 0,
    vol = 1,
    halfvol = 2
}

export enum Color {
    groen = 0,
    paars = 1,
    rood = 2
}

export interface Card {
    id: number;
    shape: Shape;
    fill: Fill;
    color: Color;
    number: number;
}