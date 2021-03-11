import { HandleEdit } from './functions'

export const Pages = ['content', 'pictures', 'credentials']

interface Section {
  sectionName: string
  title?: string
}

interface SectionWithImage extends Section {
  bgImage: string
}

interface SectionWithResizableImage extends SectionWithImage {
  bgImageWidth?: number
  bgImageHeight?: number
}

export interface Argument{
  bold?: boolean
  statement: string
}

export interface SubSection extends SectionWithResizableImage{
  text?: string
  _arguments: Argument[]
}

export interface PdfFile extends Section {
  url: string
  description: string
}

export interface Introduction extends SectionWithImage {
  text: string
  videos?: Link[]
}

export interface Info extends SectionWithImage {
  summary: string
  pdfFile?: PdfFile
  subSections?: SubSection[]
}

export interface HowProduced extends SectionWithResizableImage {
  text: string
}

export interface Link {
  _name: string 
  url: string
}

export interface Sellers extends SectionWithResizableImage {
  sellers: Link[]
}

export interface OtherSources extends Section {
  urls: Link[]
}

export interface Page {
  introduction: Introduction
  information: Info
  synthesys?: HowProduced
  sellers: Sellers
  other?: OtherSources
}

export interface IPages {
  silver: Page
  platinum: Page
  gold: Page
  copper: Page
}

export interface Content {
  pages: {
    silver: Page
    platinum: Page
    gold: Page
    copper: Page
  }
}

export interface EditSectionProps<T>{
  content: T
  page: string
  handleSubmit: HandleEdit<T>
}

export interface FormComponentProps<T>{
  elem: T
  index: number
  deleteItem: (i: number) => void
  onChange: (item: T, index: number) => void
}

export type SectionName = keyof Page //'introduction' | 'information' | 'synthesys' | 'sellers' | 'other'
export type SectionType = Content['pages'][keyof IPages][keyof Page]

export type PageName = keyof IPages
export type PageType = Content['pages'][keyof IPages]