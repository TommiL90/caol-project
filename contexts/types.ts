export interface iChildrenProps {
  children: React.ReactNode
}

export interface iDataRegister {
  name: string
  email: string
  password: string
  repeatPassword?: string
}

export interface iUserProps {
  email: string
  name: string
  id: number | string
  password?: string
  repeatPassword?: string
}

export interface iDataResponseRegister {
  accessToken: string
  user: iUserProps
}

export interface iDataLogin {
  email: string
  password: string
}

export interface iDataResponseLogin {
  accessToken: string
  user: iUserProps
}

export interface iProduct {
  category: string
  id: number
  img: string
  name: string
  price: number
  count?: number
}

export interface iCurrentCart {
  category: string
  id: number
  img: string
  name: string
  price: number
  count?: number
}

export interface iGetVerificationUser {
  password: string
  id: number
  name: string
  email: string
}

export interface iGetVerificationproducts {
  id: number
  name: string
  category: string
  price: number
  img: string
}

export interface iUserContext {
  currentTheme: string
  setCurrentTheme: React.Dispatch<React.SetStateAction<string>>
  getOpositeTheme: () => 'light' | 'dark'
  registerUser(data: iDataRegister): Promise<void>
  loading: boolean
  loginUser: (data: iDataLogin) => Promise<void>
  user: iUserProps | null
  verification: boolean
}

export interface iCartContext {
  products: iProduct[]
  setProducts: React.Dispatch<React.SetStateAction<iProduct[]>>
  filteredList: iProduct[]
  setFilteredList: React.Dispatch<React.SetStateAction<iProduct[]>>
  currentCart: iCurrentCart[]
  setCurrentCart: React.Dispatch<React.SetStateAction<iCurrentCart[]>>
  handleAddProduct: (productId: iProduct) => void
  showCart: boolean
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>
  addSameProduct: (productId: number) => void
  subSameProduct: (productId: number) => void
}
