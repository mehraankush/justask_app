const AuthLayout =({ children }:{ 
    children:React.ReactNode
}) =>{
    return (
      <main className="flex bg-[#111827] items-center justify-center h-full">
        {children}
      </main>
    )
}

export default AuthLayout;