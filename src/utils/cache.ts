class LocalCache {
  setCache(key: string, value: any) {
    if (value === undefined) {
      window.localStorage.setItem(key, 'undefined')
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value === 'undefined') {
      return undefined
    }
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export const localCache = new LocalCache()
