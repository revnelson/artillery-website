import CollectionIcon from "@heroicons/react/outline/CollectionIcon"

type UserMenuItem = {
  name: string
  href: string
  icon: (props: React.ComponentProps<"svg">) => JSX.Element
}

const userMenu: UserMenuItem[] = [
  // { name: "Your Profile", href: "/dashboard" },
  {
    name: "orders",
    href: "/dashboard/orders",
    icon: props => <CollectionIcon {...props} />,
  },
]

export default userMenu
