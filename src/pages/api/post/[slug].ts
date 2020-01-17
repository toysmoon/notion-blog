import { NextApiRequest, NextApiResponse } from 'next'
import getNotionAssetUrls from '../../../lib/notion/getNotionAssetUrls'
import { setHeaders, handleData, handleError } from '../../../lib/notion/utils'

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (setHeaders(req, res)) return
  try {
    const {
      query: { slug },
    } = req
  } catch (error) {
    handleError(res, error)
  }
}
