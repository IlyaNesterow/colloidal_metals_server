import validator from 'validator'

import { Introduction, Info, HowProduced, Sellers, OtherSources, Link } from '../types/index'
import { ValidateEdit } from '../types/functions'


export const validateIntroduction: ValidateEdit<Introduction> = (data) => {
  const { title, text, bgImage, sectionName, videos } = data

  if(title) if(validateTitle(title)) return 'Wrong title'
  if(validateText(text)) return 'Wrong text'
  if(validateURL(bgImage)) return 'Invalid background image path'
  if(validateTitle(sectionName)) return 'Section name is either short or long'

  if(videos && videos.length > 0) if(validateLinks(videos, 'Video')) return 'check video paths and names'
}

export const validateInformation: ValidateEdit<Info> = (data) => {
  const { summary, title, bgImage, sectionName, pdfFile, subSections } = data

  if(title) if(validateTitle(title)) return 'Wrong title'
  if(validateText(summary)) return 'Overview must be 40 - 600 characters and include only numbers and letters'
  if(validateURL(bgImage)) return 'Background image URl is incorrect'
  if(validateTitle(sectionName)) return 'Section name is either short or long'

  if(pdfFile){
    const { url, description } = pdfFile
    if(validateURL(url)) return 'Wrong PDF file path'
    if(validateText(description, { min: 20, max: 100 })) return 'PDF file description must be 20 - 100 characters long'
  }

  try {
    if(subSections && subSections.length > 0){
      for(let i = 0; i < subSections.length; i++){
        const { sectionName, text, title, bgImage, _arguments } = subSections[i] 
        if((title && validateTitle(title)) ||
          (text && validateText(text))     || 
          (validateURL(bgImage))           || 
          (validateTitle(sectionName))) throw new Error(`Check subsections number ${i + 1} content`)
        for(let j = 0; j < _arguments.length; j++){
          if(validateText(_arguments[j].statement, { min: 30, max: 300 })) throw new Error(`Check statement ${j + 1} of ${i + 1} section`)
        }
      }
    }
  } catch(err) {
    return err.message
  }
}

export const validateSynthesys: ValidateEdit<HowProduced> = (data) => {
  const { title, bgImage, sectionName, text } = data

  if(title) if(validateTitle(title)) return 'Title is wrong'
  if(validateText(text)) return 'Overview is wrong'
  if(validateURL(bgImage)) return 'Background image URL is wrong'
  if(validateTitle(sectionName)) return 'Section Name is wrong'
}

export const validateSellers: ValidateEdit<Sellers> = (data) => {
  const { title, sectionName, sellers, bgImage } = data

  if(title) if(validateTitle(title, { max: 25 })) return 'Title is wrong'
  if(validateURL(bgImage)) return 'Background image URL is wrong'
  if(validateTitle(sectionName)) return 'Section name is incorrect'
  if(sellers.length > 0) if(validateLinks(sellers, 'Resource')) return 'Check URL and name of sellers'
}

export const validateOther: ValidateEdit<OtherSources> = (data) => {
  const { title, urls, sectionName } = data

  if(title) if(validateTitle(title)) return 'Wrong title'
  if(validateTitle(sectionName)) return 'Wrong section name'
  if(urls.length > 0) if(validateLinks(urls, 'Resource')) return 'Check URL and name of resources'
}

const validateLinks: ((links: Link[], ctx: string) => boolean) = (links, ctx) => {
  let error = false

  for(let i = 0; i < links.length; i++){
    const { _name, url } = links[i]
    if(validateTitle(_name) || validateURL(url)){
      error = true
      break
    }
  }

  return error
}

interface ArgOptions{
  max?: number
  min?: number
}

const validateTitle: ((title: string, options?: ArgOptions) => boolean) = (title, options) => {
  let min = options ? options.min : 4
  let max = options ? options.max : 30

  return (!validator.isAlphanumeric(title)) || (!validator.isLength(title, { max, min }))
}

const validateText: ((text: string, options?: ArgOptions) => boolean) = (text, options) => {
  let min = options ? options.min : 40
  let max = options ? options.max : 600

  return !validator.isAlphanumeric(text) || !validator.isLength(text, { max, min })
}

const validateURL: ((url: string) => boolean) = (url) => {
  return validator.isURL(url)
}
