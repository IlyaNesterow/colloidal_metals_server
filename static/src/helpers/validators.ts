import validator from 'validator'

import { Introduction, Info, HowProduced, Sellers, OtherSources, Link } from '../types/index'
import { ValidateEdit } from '../types/functions'


export const validateIntroduction: ValidateEdit<Introduction> = (data) => {
  const { title, text, bgImage, sectionName, videos } = data

  if(title) if(validateTitle(title)) return 'Title is too short or too long'
  if(validateText(text)) return 'Test is too short or too long'
  if(validateURL(bgImage)) return 'Invalid background image path'
  if(validateTitle(sectionName)) return 'Section name is either short or long'

  if(videos && videos.length > 0){
    let error = validateLinks(videos, 'videos')
    if(error) return error
  }
}

export const validateInformation: ValidateEdit<Info> = (data) => {
  const { summary, title, bgImage, sectionName, pdfFile, subSections } = data

  if(title) if(validateTitle(title)) return 'Title is too short or too long'
  if(validateText(summary, { max: 900, min: 40 })) return 'Overview must be 40 - 900 characters and include only numbers and letters'
  if(validateURL(bgImage)) return 'Background image URl is invalid'
  if(validateTitle(sectionName)) return 'Section name is either short or long'

  if(pdfFile){
    const { url, description } = pdfFile
    if(validateURL(url)) return 'Invalid PDF file path'
    if(validateText(description, { min: 20, max: 100 })) return 'PDF file description must be 20 - 100 characters long'
  }

  try {
    if(subSections && subSections.length > 0){
      for(let i = 0; i < subSections.length; i++){
        const { sectionName, text, title, bgImage, _arguments } = subSections[i] 
        if(title && validateTitle(title)) throw new Error(`Subsections ${i + 1} title seems to be invalid`)
        if(text && validateText(text)) throw new Error(`Subsections ${i + 1} text seems to be invalid`)
        if(validateURL(bgImage)) throw new Error(`Subsections ${i + 1} background image path seems to be invalid`)
        if(validateTitle(sectionName)) throw new Error(`Subsections ${i + 1} section name seems to be invalid`)
        for(let j = 0; j < _arguments.length; j++){
          if(validateText(_arguments[j].statement, { min: 30, max: 300 })) throw new Error(`Statement ${j + 1} of ${i + 1} section seems to be invalid`)
        }
      }
    }
  } catch(err) {
    return err.message
  }
}

export const validateSynthesys: ValidateEdit<HowProduced> = (data) => {
  const { title, bgImage, sectionName, text } = data

  if(title) if(validateTitle(title)) return 'Title is too short or too long'
  if(validateText(text)) return 'Overview is too short or too long'
  if(validateURL(bgImage)) return 'Background image URL is invalid'
  if(validateTitle(sectionName)) return 'Section Name is too short or too long'
}

export const validateSellers: ValidateEdit<Sellers> = (data) => {
  const { title, sectionName, sellers, bgImage } = data

  if(title) if(validateTitle(title, { max: 25 })) return 'Title is too short or too long'
  if(validateURL(bgImage)) return 'Background image URL is invalid'
  if(validateTitle(sectionName)) return 'Section name is too short or too long'
  
  if(sellers.length > 0){
    let error = validateLinks(sellers, 'sellers')
    if(error) return error
  }
}

export const validateOther: ValidateEdit<OtherSources> = (data) => {
  const { title, urls, sectionName } = data

  if(title) if(validateTitle(title)) return 'Title is too short or too long'
  if(validateTitle(sectionName)) return 'Section name is too short or too long'

  if(urls.length > 0){
    let error = validateLinks(urls, 'resources')
    if(error) return error
  }
}

const validateLinks: ((links: Link[], ctx: string) => string | undefined) = (links, ctx) => {
  let error: string | undefined 

  for(let i = 0; i < links.length; i++){
    const { _name, url } = links[i]
    try{
      if(validateTitle(_name)) throw new Error(`Invalid ${ctx} name of item ${ i + 1 }`)
      if(validateURL(url)) throw new Error(`Invalid ${ctx} url of item ${ i + 1 }`)
    } catch(err) {
      error = err.message
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

  return !validator.isLength(title, { max, min })
}

const validateText: ((text: string, options?: ArgOptions) => boolean) = (text, options) => {
  let min = options ? options.min : 40
  let max = options ? options.max : 600
  console.log(text.length)
  return !validator.isLength(text, { max, min })
}

const validateURL: ((url: string) => boolean) = (url) => {
  return !validator.isURL(url)
}
