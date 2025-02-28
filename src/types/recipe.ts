export interface Dish {
  nom: string,
  ingredients: Ingredient[],
  user: string,
  like?: Like,
  comments?: [Comment],
  _id?: string,
  cookingTime: number,
}

export interface Ingredient {
  nom: string,
  quantite: number,
  unite: string,
}

export interface Like {
  total: number,
  users: string[],
}

export interface Comment {
  user: string,
  note: number,
  description: string,
}