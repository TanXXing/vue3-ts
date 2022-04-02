class LocalCache {
  // 缓存数据
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存
  getCache(key: string) {
    /*
    这个地方，开始报错是因为， window.localStorage.getItem(key)
    得到的类型是联合类型 string | null, 但是JSON.parse()中传入的参数需要是string类型，
    最开始，采取的是type assert的方式，但是，这种方式只是适用于，我能让编译器确信我获取到的
    就是字符串类型，逃过编译，但是，假如我获得其实是一个null呢？再用这个去处理逻辑的话，可能会导致出错，
    所以，这里最好是使用类型缩小的方式(因为，它相当于把所有的情况都考虑到了)
    */
    // return JSON.parse(window.localStorage.getItem(key) as string)

    const value = window.localStorage.getItem(key)

    if (value) {
      // 注意，这里要将原来任何类型的数据(经过JSON.stringify()转化为JSON字符串之后，又转化回去，得到原始的数据类型)
      return JSON.parse(value)
    }
  }

  // 删除某个缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空本地缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
