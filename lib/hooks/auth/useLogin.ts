import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import { setAuthToken, setRefreshToken } from "@api/urql/utils"
import { useLoginUserMutation, User } from "@api/gql/types"

type LoginPropsType = {
  jwtInput: {
    username: string
    password: string
  }
  cookiesInput: {
    login: string
    password: string
    rememberMe: boolean
  }
}

const useLogin = () => {
  const { setAlert, setUser, setLoggedIn } = useStore(
    state => ({
      setUser: state.auth.setUser,
      setLoggedIn: state.auth.setLoggedIn,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const [_, loginMutation] = useLoginUserMutation()

  const login = async ({ jwtInput, cookiesInput }: LoginPropsType) => {
    loginMutation({
      jwtInput,
      cookiesInput,
    }).then(res => {
      const { data, error } = res
      if (data) {
        const { login, loginWithCookies } = data
        if (loginWithCookies?.status === "SUCCESS") {
          if (login?.user) {
            const { jwtAuthToken, jwtRefreshToken, ...user } = login.user

            setUser(user as User)

            jwtAuthToken && setAuthToken(jwtAuthToken)
            jwtRefreshToken && setRefreshToken(jwtRefreshToken)

            setAlert({
              open: true,
              type: "success",
              primary: `Welcome back${
                (user?.firstName || user?.lastName) && ","
              }${user?.firstName && ` ${user.firstName}`}${
                user?.lastName && ` ${user.lastName}`
              }!`,
              secondary: "You are now logged in.",
            })
          }

          setLoggedIn(true)
        }
      }

      // TODO - Set errors
    })
  }

  return { login }
}

export default useLogin
