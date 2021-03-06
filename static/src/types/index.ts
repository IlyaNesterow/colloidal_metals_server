
export const Pages = ['content', 'pictures', 'credentials']

interface Section {
  sectionName: string
  title?: string
}

interface SectionWithImage extends Section {
  bgImage?: string
}

interface SectionWithResizableImage extends SectionWithImage {
  bgImageWidth?: number
  bgImageHeight?: number
}

interface Argument{
  bold?: boolean
  statement: string
}

export interface SubSection extends SectionWithResizableImage{
  text?: string
  _arguments: Argument[]
}

export interface VideoContent{
  url: string
  description: string
}

export interface PdfFile extends SectionWithResizableImage {
  url: string
  description: string
}

export interface Introduction extends SectionWithImage {
  text: string
  videos?: VideoContent[]
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
  info: Info
  howProduced?: HowProduced
  sellers: Sellers
  otherSources?: OtherSources
}

export interface Content {
  pages: {
    silver: Page
    platinum: Page
    gold: Page
    copper: Page
  } 
}