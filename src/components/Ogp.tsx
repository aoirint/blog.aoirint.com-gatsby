import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

import React from "react"
import { Helmet } from "react-helmet"

export interface Frontmatter {
    title: string
    description?: string
    date?: string
    updated?: string
    category?: string
    tags?: string[]
}

export interface Post {
  id: string
  slug?: string
  excerpt?: string
  frontmatter?: Frontmatter
}

export interface OgpProps {
  post: Post
}

const Ogp: React.FC<OgpProps> = ({
    post
}) => {
    let description = post.frontmatter?.description
    if (description == null) description = post.excerpt

    let keywords: string[] = []
    if (post.frontmatter.category != null) keywords.push(post.frontmatter.category)
    post.frontmatter.tags?.forEach((tag) => keywords.push(tag))

    // unique
    keywords = keywords.filter((value, index, self) => self.indexOf(value) === index)
  
    const ogpPublishedTime = post.frontmatter?.date != null ? dayjs(post.frontmatter?.date).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null
    const ogpModifiedTime = post.frontmatter?.updated != null ? dayjs(post.frontmatter?.updated).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null
  
    return (
        <Helmet>
            <meta property="og:url" content={`https://blog.aoirint.com/entry/${post.slug}`} />
            <meta property="og:locale" content="ja-JP" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={`${post.frontmatter?.title} - えやみぐさ`} />

            {description != null ? (
                <meta name="description" content={description} />
            ) : ''}
            {description != null ? (
                <meta property="og:description" content={description} />
            ) : ''}

            <meta property="og:image" content="https://blog.aoirint.com/ogp.png" />
            {ogpPublishedTime != null ? (
                <meta property="article:published_time" content={ogpPublishedTime} />
            ) : ''}
            {ogpModifiedTime != null ? (
                <meta property="article:modified_time" content={ogpModifiedTime} />
            ) : ''}

            <meta name="keywords" content={keywords.join(',')} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@aoirint" />
            <meta name="twitter:creator" content="@aoirint" />
        </Helmet>
    )
}

export default Ogp
