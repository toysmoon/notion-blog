import { NextApiRequest, NextApiResponse } from 'next'
import { setHeaders, handleData, handleError } from '../../../lib/notion/utils'
import getPageData from '../../../lib/notion/getPageData'

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (setHeaders(req, res)) return
  try {
    handleData(res, await getPageData(req.query.slug))
  } catch (error) {
    handleError(res, error)
  }
}
