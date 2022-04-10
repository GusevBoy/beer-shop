import axios from "axios";
import { SimilarType } from '../interfaces/beer';
const baseUrl = 'https://api.punkapi.com/v2/beers'      
 

export const getBeers = (page: number, pageSize: number, name?: string, brewedBefore?: string, brewedAfter?: string) => {
    const nameBeer = name ? `&beer_name=${name}` : ''
    const brewedBeforeText = brewedBefore ? `&brewed_before=${brewedBefore}` : ''
    const brewedAfterText = brewedAfter ? `&brewed_after=${brewedAfter}` : ''
    return axios(`${baseUrl}?page=${page}&per_page=${pageSize}${nameBeer}${brewedBeforeText}${brewedAfterText}`)
}

export const getBeer = (id: string) => axios(`${baseUrl}/${id}`)

export const getSimilarBeers = (abv: SimilarType, ibu: SimilarType) => {
  return axios(`${baseUrl}?abv_gt=${abv.gt}&abv_lt=${abv.lt}&ibu_gt=${ibu.gt}&ibu_lt=${ibu.lt}`)
}