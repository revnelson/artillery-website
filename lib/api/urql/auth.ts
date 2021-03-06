import { authExchange as authExchanges } from "@urql/exchange-auth"
import { makeOperation, Operation, OperationResult } from "@urql/core"

import { isServer } from "@lib/utils/isServer"
import {
  getAuthToken,
  getRefreshToken,
  getWooSession,
  isTokenValid,
  login,
  logout,
} from "./utils"
import { refreshMutation } from "@api/mutations/auth"
import {
  RefreshJwtAuthTokenInput,
  RefreshJwtAuthTokenPayload,
} from "@api/gql/types"

const authExchange = authExchanges({
  addAuthToOperation: ({
    authState,
    operation,
  }: {
    authState: string
    operation: Operation<any, any>
  }) => {
    // See if a wooCommerce session has been stored
    const wooSession = getWooSession()?.raw

    // If the token isn't in the auth state, return the operation without changes
    if (!authState && !wooSession) {
      return operation
    }

    // fetchOptions can be a function (See Client API) but you can simplify this based on usage
    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {}

    const headers: { authorization: string; ["woocommerce-session"]?: string } =
      {
        authorization: authState ? `Bearer ${authState ?? ""}` : "",
      }

    wooSession && (headers["woocommerce-session"] = wooSession)

    // Remove auth header if refreshing authToken
    operation.query.definitions.map(definition => {
      definition.kind === "OperationDefinition" &&
        definition.selectionSet.selections.map(selection => {
          selection.kind === "Field" &&
            selection.name.value === "refreshJwtAuthToken" &&
            (headers.authorization = "")
        })
    })

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        credentials: "include",
        headers: {
          ...fetchOptions.headers,
          ...headers,
        },
      },
    })
  },
  willAuthError: ({ operation, authState }) => {
    if (!authState) {
      // No auth token. Allow login mutation through
      const { kind } = operation

      const allowedFields = ["login", "registerUser"]

      const isAllowedOperation =
        kind === "query" ||
        (kind === "mutation" &&
          // Here we find any mutation definition with the "login" field
          operation.query.definitions.some(definition => {
            return (
              definition.kind === "OperationDefinition" &&
              definition.selectionSet.selections.some(node => {
                return (
                  node.kind === "Field" &&
                  allowedFields.includes(node.name.value)
                )
              })
            )
          }))

      return !isAllowedOperation
    } else if (!isTokenValid()) {
      // Auth token is expired.

      return true
    }
    // Auth token found and valid
    return false
  },
  didAuthError: ({ error }) => {
    if (error.graphQLErrors.some(e => e.extensions?.code === "FORBIDDEN")) {
      return true
    }

    return false
  },
  getAuth: async ({ authState, mutate }) => {
    // Triggered on initialization and any time didAuthError returns true

    if (!isServer) {
      // Initialization

      if (!authState) {
        // Get the auth state from localStorage
        const authToken = getAuthToken()?.authToken

        if (authToken) {
          login()
          return authToken
        }
        // Skip returning here to allow trying for refresh
      }

      // Found authState, but likely expired or invalid
      // Try to refresh first

      const jwtRefreshToken = getRefreshToken()

      if (jwtRefreshToken) {
        // Try to get refreshed authToken
        const result: OperationResult<
          { refreshJwtAuthToken: RefreshJwtAuthTokenPayload },
          RefreshJwtAuthTokenInput
        > = await mutate(
          refreshMutation,
          { input: { jwtRefreshToken } },
          { requestPolicy: "network-only" },
        )

        const authToken = result.data?.refreshJwtAuthToken?.authToken
        if (authToken) {
          // Save the new token in storage for next restart and set loggedIn to true
          login(authToken)

          // Return the new authToken
          return authToken
        } else {
          // Error getting new authToken. Remove all tokens and logout.
          logout(true)
          return null
        }
      }

      // No refresh token found. Ensure logged out and return null
      logout(true)
      return null
    }
    // Always return null on server
    return null
  },
})

export default authExchange
