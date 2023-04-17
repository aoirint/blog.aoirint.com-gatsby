import fs from 'fs'
import yaml from 'js-yaml'
import { z } from 'zod'

export const ChannelInfoSchema = z.object({
  key: z.string(),
  description: z.string(),
  indexNoIndex: z.boolean(),
  indexCategoryIndex: z.boolean(),
  topPostCount: z.boolean(),
})

export type ChannelInfo = z.infer<typeof ChannelInfoSchema>;

export function loadChannelInfoList(path: string): ChannelInfo[] {
  if (! fs.existsSync(path)) {
    console.warn(`Not found channels.yml at ${path}. Empty channel list will be used.`)
    return []
  }

  try {
    const channelList = yaml.load(fs.readFileSync(path, 'utf-8'))
    return ChannelInfoSchema.array().parse(channelList)
  } catch {
    console.warn(`Invalid channels.yml at ${path}. Empty channel list will be used.`)
    return []
  }
}
