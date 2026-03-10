
// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"

// export default function LoginForm() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData(e.currentTarget)
//     const email = formData.get("email")
//     const password = formData.get("password")

//     console.log({ email, password })

//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     setIsLoading(false)
//     router.push("/dashboard")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 flex items-center justify-center px-4">

//       <div className="w-full max-w-md">

//         {/* Logo / Brand */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-white">evaLite</h1>
//           <p className="text-white/80 text-sm mt-2">
//             Smart billing for modern businesses
//           </p>
//         </div>

//         {/* Login Card */}
//         <div className="bg-white shadow-xl rounded-2xl p-8">

//           <div className="mb-6 text-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Welcome back
//             </h2>
//             <p className="text-gray-500 text-sm">
//               Sign in to your account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 required
//                 autoComplete="email"
//                 disabled={isLoading}
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>

//                 <Link
//                   href="/forgot-password"
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 required
//                 autoComplete="current-password"
//                 disabled={isLoading}
//               />
//             </div>

//             {/* Button */}
//             <Button
//               type="submit"
//               className="w-full mt-4"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing in..." : "Sign In"}
//             </Button>

//           </form>

//           {/* Footer */}
//           <div className="text-center mt-6 text-sm text-gray-500">
//             Don't have an account?{" "}
//             <Link
//               href="/register"
//               className="text-blue-600 font-medium hover:underline"
//             >
//               Create account
//             </Link>
//           </div>

//         </div>

//       </div>

//     </div>
//   )
// }






"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error)
        setIsLoading(false)
        return
      }

      localStorage.setItem("token", data.token)

      alert("Login successful")

      router.push("/dashboard")

    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">evaLite</h1>
          <p className="text-white/80 text-sm mt-2">
            Smart billing for modern businesses
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />

            </div>

            <div className="space-y-2">

              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />

            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

          </form>

          <div className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create account
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}