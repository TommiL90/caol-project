"use client"

import { use, useEffect, useState } from "react"
import { test } from "./prova"

export default function Home() {
  const [datax, setDatax] = useState<any[]>([])

  useEffect(() => {
   const getData = async () => {
      const data = await test()
      setDatax(data)
    }

    getData()
  }, [])

  return (
    <main >
      {JSON.stringify(datax, null, 2)}
    </main>
  )
}
