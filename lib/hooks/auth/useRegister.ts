import {
  RegisterUserInput,
  User,
  useRegisterUserMutation,
} from "@api/gql/types"
import useStore from "@lib/hooks/useStore"
import { setAuthToken, setRefreshToken } from "@api/urql/utils"
import shallow from "zustand/shallow"

const useRegister = () => {
  const { loggedIn, error, setUser, setLoggedIn, setAlert } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      error: state.auth.errors.register,
      setUser: state.auth.setUser,
      setLoggedIn: state.auth.setLoggedIn,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const [_, registerUser] = useRegisterUserMutation()

  const register = async (input: RegisterUserInput) => {
    registerUser({ input }).then(res => {
      const { data, error } = res
      const newUser = data?.registerUser?.user
      if (!loggedIn && newUser) {
        const { jwtAuthToken, jwtRefreshToken, ...user } = newUser
        jwtAuthToken && setAuthToken(jwtAuthToken)
        jwtRefreshToken && setRefreshToken(jwtRefreshToken)

        setUser(user as User)

        setAlert({
          open: true,
          type: "success",
          primary: `Welcome${(user?.firstName || user?.lastName) && ","}${
            user?.firstName && ` ${user.firstName}`
          }${user?.lastName && ` ${user.lastName}`}!`,
          secondary: "You are now registered.",
        })

        setLoggedIn(true)
      }
      // TODO - Set Error
    })
  }

  return { register }
}

export default useRegister
