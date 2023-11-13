import { useEffect, useState } from "react"

export function useHandleDatabaseRequest() {
    const [connectionErr, setConnectionErr] = useState("")

  useEffect(() => { 
    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  const handleOnlineStatus = () => {
    if (navigator.onLine) {
      setConnectionErr("")
    } else {
      setConnectionErr("Você está sem conexão com a Internet. Tente novamente mais tarde.")
    }
  }

  return {
    handleOnlineStatus, connectionErr, setConnectionErr
  }
}