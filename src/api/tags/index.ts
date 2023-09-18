import {get, post} from "../../utils/request";
import {CommonTag, TagItem} from "./type";

const prefix = '/api/tags'

export const addTag = (data: CommonTag) => post(`${prefix}/add`, data)
export const updateTag = (data: CommonTag & {id: number}) => post(`${prefix}/update`, data)
export const delTag = (data: CommonTag & {id: number}) => post(`${prefix}/del`, data)
export const tagList = () => get<TagItem[]>(`${prefix}/list`)