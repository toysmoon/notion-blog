import { useEffect, useState } from 'react'

const defaultUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'

const getMobileDetect = userAgent => {
  const isAndroid = Boolean(userAgent.match(/Android/i))
  const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = Boolean(userAgent.match(/IEMobile/i))

  const isMobile = Boolean(isAndroid || isIos || isOpera || isWindows)
  const isDesktop = !isMobile
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
  }
}
const useDeviceDetect = () => {
  const [device, setDevice] = useState(getMobileDetect(defaultUserAgent))
  useEffect(() => {
    setDevice(getMobileDetect(navigator.userAgent))
  }, [])
  return device
}

export default useDeviceDetect
