import React, { useState, useCallback } from 'react'

import { UrlInput, TextInput, TitleInput } from './Inputs'

import { Introduction, VideoContent, EditSectionProps } from '../../types'


const Intro: React.FC<EditSectionProps<Introduction>> = ({ content, section }) => {
  const [ bgImage, setBgImage ] = useState<string>(content.bgImage)
  const [ sectionName, setSectionName ] = useState<string>(content.sectionName)
  const [ title, setTitle ] = useState<string | undefined>(content.title)
  const [ text, setText ] = useState<string>(content.text)
  const [ videos, setVideos ] = useState<VideoContent[] | undefined>(content.videos)

  const videoUrlOnChange = useCallback((video: VideoContent, e: React.FormEvent<HTMLInputElement>) => {
    videos && setVideos([
      ...videos.filter(v => (v.url !== video.url)),
      { 
        url: e.currentTarget.value, 
        description: video.description 
      }
    ])
  }, [ videos ])

  const videoDescOnChange = useCallback((video: VideoContent, e: React.FormEvent<HTMLInputElement>) => {
    videos && setVideos([
      ...videos.filter(v => (v.url !== video.url)),
      { 
        url: video.url, 
        description: e.currentTarget.value
      }
    ])
  }, [ videos ])

  const deleteVideo = useCallback((index: number) => {
    if(videos){
      const updatedVideos = videos
      updatedVideos.splice(index, 1)
      setVideos([...updatedVideos]) 
    }
  }, [ videos ])

  return(
    <div id="form-section">
      <h2>{ `Introduction of ${ section }` }</h2>
      <UrlInput
        label="Link to background image"
        value={ bgImage }
        onChange={(e) => setBgImage(e.currentTarget.value)}
        placeholder="https://example.com/image.png"
      />
      <TitleInput
        label="How you want Introduction section to be labeled"
        value={ sectionName }
        onChange={(e) => setSectionName(e.currentTarget.value)}
      />
      <TitleInput
        label="Title e.g. Nanoparticles, platinum, etc"
        value={ title as string }
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <TextInput
        label="A brief summary"
        value={ text }
        onChange={(e) => setText(e.currentTarget.value)}
        min={ 30 }
        max={ 400 }
      />
      <h3>Videos</h3>
      {videos && videos.length > 0 &&
        videos.map((video, index) => (
          <div 
            id="url-description"
            key={ video.description + index + 'video' }
          >
            <UrlInput
              label="Link on the Video"
              value={ video.url }
              placeholder="https://youtube.com/embed/<video_id>"
              onChange={(e) => videoUrlOnChange(video, e as React.FormEvent<HTMLInputElement>)}
            />
            <TitleInput
              label="Brief description"
              value={ video.description }
              placeholder="Something..."
              onChange={(e) => videoDescOnChange(video, e as React.FormEvent<HTMLInputElement>) }
            />
            <span 
              id="remove-smth"
              className="no-select"
              onClick={() => deleteVideo(index)}
            >🗑️</span>
          </div>
        ))
      }
      <span 
        id="add-smth"
        className="no-select"
        onClick={() => 
          setVideos([
            ...videos || [], 
            { url: '', description: '' } 
          ])
        }
      >Add Video🪄</span>
    </div>
  )
}

export default React.memo(Intro)