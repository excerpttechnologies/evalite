
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

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         alert(data.error)
//         setIsLoading(false)
//         return
//       }

//       localStorage.setItem("token", data.token)

//       alert("Login successful")

//       router.push("/dashboard")

//     } catch (error) {
//       console.error(error)
//       alert("Something went wrong")
//     }

//     setIsLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">

//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-white">evaLite</h1>
//           <p className="text-white/80 text-sm mt-2">
//             Smart billing for modern businesses
//           </p>
//         </div>

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

//             <Button
//               type="submit"
//               className="w-full mt-4"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing in..." : "Sign In"}
//             </Button>

//           </form>

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




// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { MdEmail, MdLock, MdArrowForward, MdAutoAwesome, MdPeople, MdStar } from "react-icons/md"
// import { RiShieldCheckFill } from "react-icons/ri"

// export default function LoginForm() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [focusedField, setFocusedField] = useState<string | null>(null)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData(e.currentTarget)
//     const email = formData.get("email")
//     const password = formData.get("password")

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         alert(data.error)
//         setIsLoading(false)
//         return
//       }

//       localStorage.setItem("token", data.token)
//       alert("Login successful")
//       router.push("/dashboard")
//     } catch (error) {
//       console.error(error)
//       alert("Something went wrong")
//     }

//     setIsLoading(false)
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         @keyframes orb1 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(40px, -30px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.95); }
//         }
//         @keyframes orb2 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(-50px, 30px) scale(0.9); }
//           66% { transform: translate(30px, -40px) scale(1.1); }
//         }
//         @keyframes floatUp {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-14px); }
//         }
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateX(-30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes ticker {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         .login-root {
//           min-height: 100vh;
//           display: flex;
//           font-family: 'Outfit', sans-serif;
//         }

//         .brand-panel {
//           width: 44%;
//           background: #0c0c0c;
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           padding: 44px;
//           animation: fadeSlideIn 0.65s cubic-bezier(0.22,1,0.36,1) both;
//         }
//         @media (max-width: 820px) {
//           .brand-panel { display: none !important; }
//           .form-panel { width: 100% !important; }
//         }

//         .orb-1 {
//           position: absolute; width: 500px; height: 500px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(255,107,53,0.32) 0%, transparent 65%);
//           top: -140px; right: -140px;
//           animation: orb1 16s ease-in-out infinite; pointer-events: none;
//         }
//         .orb-2 {
//           position: absolute; width: 380px; height: 380px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(255,199,0,0.18) 0%, transparent 65%);
//           bottom: -80px; left: -80px;
//           animation: orb2 20s ease-in-out infinite; pointer-events: none;
//         }
//         .orb-3 {
//           position: absolute; width: 200px; height: 200px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 65%);
//           bottom: 28%; right: 8%;
//           animation: floatUp 9s ease-in-out infinite; pointer-events: none;
//         }

//         .brand-top { position: relative; z-index: 2; }
//         .brand-logo { display: flex; align-items: center; gap: 10px; }
//         .logo-icon {
//           width: 36px; height: 36px;
//           background: linear-gradient(135deg, #ff6b35, #ffc700);
//           border-radius: 9px;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .logo-name {
//           font-family: 'Instrument Serif', serif;
//           font-size: 26px; color: #fff; letter-spacing: -0.5px;
//         }

//         .brand-mid {
//           position: relative; z-index: 2;
//           flex: 1; display: flex; flex-direction: column; justify-content: center;
//           padding: 32px 0;
//         }
//         .brand-headline {
//           font-family: 'Instrument Serif', serif;
//           font-size: clamp(34px, 3.2vw, 50px);
//           color: #fff; line-height: 1.15; letter-spacing: -1px; margin-bottom: 18px;
//         }
//         .brand-headline em {
//           font-style: italic;
//           background: linear-gradient(90deg, #ff6b35, #ffc700);
//           -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
//         }
//         .brand-desc {
//           color: rgba(255,255,255,0.42); font-size: 14px; line-height: 1.65;
//           max-width: 290px; margin-bottom: 38px;
//         }
//         .stats-grid { display: flex; gap: 26px; }
//         .stat { }
//         .stat-val {
//           font-family: 'Instrument Serif', serif;
//           font-size: 30px; color: #fff; line-height: 1; margin-bottom: 3px;
//         }
//         .stat-lbl {
//           font-size: 10px; color: rgba(255,255,255,0.32);
//           text-transform: uppercase; letter-spacing: 0.08em;
//         }

//         .brand-foot { position: relative; z-index: 2; }
//         .ticker-outer {
//           overflow: hidden; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 18px;
//         }
//         .ticker-inner {
//           display: flex; gap: 28px; white-space: nowrap;
//           animation: ticker 22s linear infinite;
//         }
//         .t-item {
//           display: flex; align-items: center; gap: 7px;
//           font-size: 11px; color: rgba(255,255,255,0.28); flex-shrink: 0;
//         }
//         .t-dot { width: 4px; height: 4px; border-radius: 50%; background: #ff6b35; flex-shrink: 0; }

//         /* FORM PANEL */
//         .form-panel {
//           width: 56%;
//           background: #f7f6f3;
//           display: flex; align-items: center; justify-content: center;
//           padding: 48px 72px;
//           animation: fadeSlideUp 0.65s 0.1s cubic-bezier(0.22,1,0.36,1) both;
//         }
//         .form-box { width: 100%; max-width: 390px; }

//         .eyebrow {
//           display: inline-flex; align-items: center; gap: 5px;
//           background: rgba(255,107,53,0.09); border: 1px solid rgba(255,107,53,0.22);
//           border-radius: 20px; padding: 4px 11px;
//           font-size: 10px; font-weight: 700; color: #ff6b35;
//           letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px;
//         }
//         .form-title {
//           font-family: 'Instrument Serif', serif;
//           font-size: 40px; color: #111; letter-spacing: -1.2px; line-height: 1.08; margin-bottom: 8px;
//         }
//         .form-sub { font-size: 14px; color: #999; line-height: 1.5; margin-bottom: 36px; }

//         .field { margin-bottom: 18px; }
//         .f-label {
//           display: block; font-size: 11px; font-weight: 600;
//           color: #777; margin-bottom: 7px;
//           letter-spacing: 0.07em; text-transform: uppercase; transition: color 0.2s;
//         }
//         .f-label.act { color: #ff6b35; }

//         .pw-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
//         .fgt { font-size: 11px; color: #ff6b35; font-weight: 500; text-decoration: none; }
//         .fgt:hover { opacity: 0.7; }

//         .inp-wrap { position: relative; }
//         .inp-ico {
//           position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
//           font-size: 16px; color: #ccc; pointer-events: none; transition: color 0.2s;
//         }
//         .inp-ico.act { color: #ff6b35; }

//         .f-input {
//           width: 100%; height: 50px;
//           padding: 0 16px 0 42px;
//           background: #fff; border: 1.5px solid #e6e3dd; border-radius: 12px;
//           font-size: 14px; font-family: 'Outfit', sans-serif; color: #111;
//           outline: none; transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .f-input::placeholder { color: #ccc; }
//         .f-input:focus { border-color: #ff6b35; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
//         .f-input:disabled { background: #f2f2f2; cursor: not-allowed; }

//         .s-btn {
//           width: 100%; height: 52px; border: none; border-radius: 12px;
//           background: #111; color: #fff;
//           font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
//           cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
//           position: relative; overflow: hidden; margin-top: 6px;
//           transition: transform 0.15s, box-shadow 0.2s;
//           letter-spacing: 0.01em;
//         }
//         .s-btn::before {
//           content: ''; position: absolute; inset: 0;
//           background: linear-gradient(135deg, #ff6b35, #ffc700); opacity: 0; transition: opacity 0.28s;
//         }
//         .s-btn:hover:not(:disabled)::before { opacity: 1; }
//         .s-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 26px rgba(255,107,53,0.3); }
//         .s-btn:active:not(:disabled) { transform: translateY(0); }
//         .s-btn:disabled { opacity: 0.52; cursor: not-allowed; }
//         .btn-inner { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

//         .divider { display: flex; align-items: center; gap: 12px; margin: 26px 0; }
//         .div-line { flex: 1; height: 1px; background: #e6e3dd; }
//         .div-txt { font-size: 11px; color: #bbb; white-space: nowrap; }

//         .foot-line { text-align: center; font-size: 13px; color: #999; }
//         .reg-link {
//           color: #111; font-weight: 700; text-decoration: none;
//           border-bottom: 2px solid #ff6b35; padding-bottom: 1px; transition: color 0.15s;
//         }
//         .reg-link:hover { color: #ff6b35; }

//         .trust-row {
//           display: flex; align-items: center; justify-content: center; gap: 18px;
//           margin-top: 28px; padding-top: 22px; border-top: 1px solid #e6e3dd;
//         }
//         .t-badge { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #bbb; }
//         .t-ico { font-size: 13px; color: #ccc; }

//         .spinner {
//           width: 15px; height: 15px;
//           border: 2px solid rgba(255,255,255,0.35);
//           border-top-color: #fff; border-radius: 50%;
//           animation: spin 0.7s linear infinite;
//         }
//       `}</style>

//       <div className="login-root">
//         {/* BRAND PANEL */}
//         <div className="brand-panel">
//           <div className="orb-1" /><div className="orb-2" /><div className="orb-3" />

//           <div className="brand-top">
//             <div className="brand-logo">
//               <div className="logo-icon"><MdAutoAwesome style={{ color: "#fff", fontSize: "17px" }} /></div>
//               <span className="logo-name">evaLite</span>
//             </div>
//           </div>

//           <div className="brand-mid">
//             <h1 className="brand-headline">Billing that works<br />as <em>hard</em> as<br />you do.</h1>
//             <p className="brand-desc">The smartest way to manage invoices, track payments, and grow your business — all in one place.</p>
//             <div className="stats-grid">
//               <div className="stat"><div className="stat-val">12k+</div><div className="stat-lbl">Users</div></div>
//               <div className="stat"><div className="stat-val">$2M+</div><div className="stat-lbl">Billed / mo</div></div>
//               <div className="stat"><div className="stat-val">99.9%</div><div className="stat-lbl">Uptime</div></div>
//             </div>
//           </div>

//           <div className="brand-foot">
//             <div className="ticker-outer">
//               <div className="ticker-inner">
//                 {["Smart Invoicing","Auto Reminders","Tax Reports","Multi-currency","Team Access","Analytics",
//                   "Smart Invoicing","Auto Reminders","Tax Reports","Multi-currency","Team Access","Analytics"]
//                   .map((t, i) => <div key={i} className="t-item"><div className="t-dot" />{t}</div>)}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FORM PANEL */}
//         <div className="form-panel">
//           <div className="form-box">
//             <div className="eyebrow"><RiShieldCheckFill />Secure login</div>
//             <h2 className="form-title">Welcome<br />back.</h2>
//             <p className="form-sub">Sign in to your evaLite account to continue.</p>

//             <form onSubmit={handleSubmit}>
//               <div className="field">
//                 <label htmlFor="email" className={`f-label ${focusedField === "email" ? "act" : ""}`}>Email address</label>
//                 <div className="inp-wrap">
//                   <MdEmail className={`inp-ico ${focusedField === "email" ? "act" : ""}`} />
//                   <input className="f-input" id="email" name="email" type="email"
//                     placeholder="name@example.com" required autoComplete="email" disabled={isLoading}
//                     onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
//                 </div>
//               </div>

//               <div className="field">
//                 <div className="pw-top">
//                   <span className={`f-label ${focusedField === "password" ? "act" : ""}`} style={{ marginBottom: 0 }}>Password</span>
//                   <Link href="/forgot-password" className="fgt">Forgot password?</Link>
//                 </div>
//                 <div className="inp-wrap">
//                   <MdLock className={`inp-ico ${focusedField === "password" ? "act" : ""}`} />
//                   <input className="f-input" id="password" name="password" type="password"
//                     placeholder="••••••••" required autoComplete="current-password" disabled={isLoading}
//                     onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)} />
//                 </div>
//               </div>

//               <button type="submit" className="s-btn" disabled={isLoading}>
//                 <span className="btn-inner">
//                   {isLoading ? <><div className="spinner" />Signing in…</> : <>Sign In <MdArrowForward style={{ fontSize: "18px" }} /></>}
//                 </span>
//               </button>
//             </form>

//             <div className="divider"><div className="div-line" /><span className="div-txt">New to evaLite?</span><div className="div-line" /></div>
//             <div className="foot-line"><Link href="/register" className="reg-link">Create a free account →</Link></div>

//             <div className="trust-row">
//               <div className="t-badge"><RiShieldCheckFill className="t-ico" />SSL Encrypted</div>
//               <div className="t-badge"><MdStar className="t-ico" />4.9/5 rated</div>
//               <div className="t-badge"><MdPeople className="t-ico" />12k+ users</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }






"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight, HiOutlineChip } from "react-icons/hi"
import { TbInvoice, TbReportAnalytics, TbBuildingWarehouse } from "react-icons/tb"
import { RiShieldKeyholeLine } from "react-icons/ri"
import toast from "react-hot-toast"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error); setIsLoading(false); return }
      localStorage.setItem("token", data.token)
      toast("Login successful")
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    }
    setIsLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #ffffff;
          --accent: #f97316;
          --accent-dark: #ea580c;
          --accent-light: #fff7ed;
          --accent-mid: #fed7aa;
          --green: #16a34a;
          --green-bg: #f0fdf4;
          --red: #dc2626;
          --red-bg: #fef2f2;
          --blue: #2563eb;
          --text: #111827;
          --muted: #6b7280;
          --border: #e5e7eb;
          --surface: #f9fafb;
          --font: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.05)} }
        @keyframes floatCard { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-10px) rotate(-1.5deg)} }
        @keyframes floatCard2 { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinRing2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes barGrow { from{height:0} to{height:var(--h)} }
        @keyframes scanline { 0%{top:-20%} 100%{top:110%} }
        @keyframes borderGlow { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} 50%{box-shadow:0 0 16px 2px rgba(249,115,22,0.15)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }

        .root {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          font-family: var(--font);
          position: relative;
          overflow: hidden;
        }

        /* subtle dot grid on left panel bg */
        .grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, #f97316 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.07;
        }

        /* orange glow orbs - very subtle on white */
        .glow1 {
          position:absolute; width:560px; height:560px; border-radius:50%;
          background: radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 65%);
          top:-180px; left:-100px; pointer-events:none; z-index:0;
          animation: pulse 9s ease-in-out infinite;
        }
        .glow2 {
          position:absolute; width:400px; height:400px; border-radius:50%;
          background: radial-gradient(circle, rgba(234,88,12,0.07) 0%, transparent 65%);
          bottom:-100px; right:160px; pointer-events:none; z-index:0;
          animation: pulse 12s 2s ease-in-out infinite;
        }

        /* ── LEFT VISUAL HALF ── */
        .visual-half {
          width: 55%; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          padding: 44px 48px;
          animation: fadeIn 0.7s cubic-bezier(.22,1,.36,1) both;
        }
        @media(max-width:900px){ .visual-half{display:none} .form-half{width:100%!important} }

        .top-bar { display:flex; align-items:center; justify-content:space-between; margin-bottom:48px; }
        .logo-row { display:flex; align-items:center; gap:10px; }
        .logo-hex { width:38px; height:38px; position:relative; display:flex; align-items:center; justify-content:center; }
        .logo-hex svg { position:absolute; inset:0; }
        .logo-hex svg:first-child { animation: spinRing 8s linear infinite; }
        .logo-hex svg:nth-child(2) { animation: spinRing2 12s linear infinite; }
        .logo-hex-inner { position:relative; z-index:1; color:var(--accent); font-size:15px; }
        .logo-name { font-family:'Bebas Neue',sans-serif; font-size:28px; color:var(--text); letter-spacing:2px; }
        .logo-sub { font-size:9px; color:var(--muted); letter-spacing:0.15em; text-transform:uppercase; margin-top:-2px; }

        .nav-pill {
          background:var(--accent-light); border:1px solid var(--accent-mid);
          border-radius:20px; padding:6px 14px;
          font-size:11px; color:var(--accent-dark); letter-spacing:0.06em;
          display:flex; align-items:center; gap:6px;
        }
        .nav-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pulse 2s infinite; }

        .preview-title { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:4px; }
        .big-headline {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(44px,5vw,72px); color:var(--text); letter-spacing:2px; line-height:0.95; margin-bottom:6px;
        }
        .big-headline span { color: var(--accent); }
        .headline-sub { font-size:13px; color:var(--muted); margin-bottom:28px; max-width:340px; line-height:1.6; }

        /* DASHBOARD CARDS */
        .cards-scene { flex:1; position:relative; }

        .dash-card {
          position:absolute; top:0; left:0; right:40px;
          background:#ffffff;
          border:1px solid var(--border);
          border-radius:16px; padding:18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
          animation: floatCard 6s ease-in-out infinite;
          overflow:hidden;
        }
        .dash-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg, var(--accent), #fb923c, #fdba74);
        }
        .scanline {
          position:absolute; left:0; right:0; height:60px;
          background:linear-gradient(180deg,transparent,rgba(249,115,22,0.03),transparent);
          animation:scanline 5s linear infinite; pointer-events:none; z-index:2;
        }

        .dc-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .dc-title { font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; }
        .dc-badge { font-size:10px; background:var(--green-bg); border:1px solid #bbf7d0; color:var(--green); border-radius:20px; padding:2px 8px; font-weight:600; }

        .kpi-row { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:14px; }
        .kpi {
          background:var(--surface); border:1px solid var(--border);
          border-radius:10px; padding:10px 12px;
          animation: borderGlow 4s ease-in-out infinite;
        }
        .kpi:nth-child(2){animation-delay:1.3s} .kpi:nth-child(3){animation-delay:2.6s}
        .kpi-label { font-size:9px; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px; font-weight:600; }
        .kpi-val { font-size:18px; font-weight:800; color:var(--text); line-height:1; }
        .kpi-val.orange{color:var(--accent)} .kpi-val.green{color:var(--green)} .kpi-val.warn{color:#d97706}
        .kpi-delta { font-size:9px; margin-top:2px; font-weight:600; }
        .kpi-delta.up{color:var(--green)} .kpi-delta.down{color:var(--red)}

        .chart-area { display:flex; align-items:flex-end; gap:6px; height:70px; margin-bottom:12px; }
        .bar-col { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; }
        .bar {
          width:100%; border-radius:4px 4px 0 0;
          background:linear-gradient(180deg,var(--accent),#fed7aa);
          --h:40px; height:var(--h);
          animation:barGrow 1s cubic-bezier(.22,1,.36,1) both;
        }
        .bar.b2{background:linear-gradient(180deg,#ea580c,#fb923c)}
        .bar.b3{background:linear-gradient(180deg,#16a34a,#86efac)}
        .bar-lbl { font-size:8px; color:var(--muted); font-weight:600; }

        .inv-list { display:flex; flex-direction:column; gap:7px; }
        .inv-row {
          display:flex; align-items:center; gap:10px; padding:7px 10px;
          background:var(--surface); border-radius:8px; border:1px solid transparent; transition:border-color 0.2s;
        }
        .inv-row:hover{border-color:var(--accent-mid)}
        .inv-icon { width:24px; height:24px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:11px; flex-shrink:0; font-weight:700; }
        .inv-icon.paid{background:var(--green-bg);color:var(--green)}
        .inv-icon.pending{background:var(--accent-light);color:var(--accent)}
        .inv-icon.overdue{background:var(--red-bg);color:var(--red)}
        .inv-name { flex:1; font-size:11px; color:var(--text); font-weight:600; }
        .inv-amt { font-size:11px; font-weight:800; color:var(--text); }
        .inv-status { font-size:9px; padding:2px 7px; border-radius:10px; font-weight:700; }
        .inv-status.paid{background:var(--green-bg);color:var(--green)}
        .inv-status.pending{background:var(--accent-light);color:var(--accent-dark)}
        .inv-status.overdue{background:var(--red-bg);color:var(--red)}

        .mini-card-1 {
          position:absolute; bottom:-20px; right:-20px; width:160px;
          background:#fff; border:1.5px solid var(--accent-mid);
          border-radius:12px; padding:12px 14px;
          animation:floatCard2 7s 1s ease-in-out infinite;
          box-shadow:0 4px 20px rgba(249,115,22,0.15);
        }
        .mini-card-1::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),#fb923c);border-radius:12px 12px 0 0}
        .mc-label { font-size:9px; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px; font-weight:600; }
        .mc-val { font-size:22px; font-weight:800; color:var(--accent); line-height:1; }
        .mc-sub { font-size:9px; color:var(--green); margin-top:2px; font-weight:600; }

        /* ── FORM HALF ── */
        .form-half {
          width:45%; z-index:2; position:relative;
          display:flex; align-items:center; justify-content:center;
          padding:40px 48px 40px 24px;
          animation:fadeIn 0.7s 0.15s cubic-bezier(.22,1,.36,1) both;
        }

        .form-card {
          width:100%; max-width:400px;
          background:#ffffff;
          border:1.5px solid var(--border);
          border-radius:24px; padding:36px 32px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
          position:relative; overflow:hidden;
        }
        .form-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:4px;
          background:linear-gradient(90deg, var(--accent), #fb923c, #fdba74, var(--accent));
          background-size:200%;
          animation:shimmer 3s linear infinite;
        }

        .fc-eyebrow { display:flex; align-items:center; gap:8px; margin-bottom:20px; }
        .fc-ey-line { flex:1; height:1px; background:var(--border); }
        .fc-ey-text { font-size:10px; color:var(--muted); letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; font-weight:600; }

        .fc-title { font-family:'Bebas Neue',sans-serif; font-size:38px; color:var(--text); letter-spacing:2px; margin-bottom:4px; line-height:1; }
        .fc-sub { font-size:13px; color:var(--muted); margin-bottom:28px; }

        .field { margin-bottom:18px; }
        .f-lbl {
          font-size:10px; font-weight:700; color:var(--muted);
          text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px; display:block; transition:color 0.2s;
        }
        .f-lbl.act{color:var(--accent)}

        .inp-wrap { position:relative; }
        .inp-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#d1d5db; font-size:16px; pointer-events:none; transition:color 0.2s; }
        .inp-icon.act{color:var(--accent)}

        .f-inp {
          width:100%; height:48px; padding:0 14px 0 44px;
          background:var(--surface); border:1.5px solid var(--border);
          border-radius:12px; color:var(--text); font-size:14px; font-family:var(--font);
          outline:none; transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;
        }
        .f-inp::placeholder{color:#d1d5db}
        .f-inp:focus{border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px rgba(249,115,22,0.1)}
        .f-inp:disabled{opacity:0.5;cursor:not-allowed}

        .pw-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
        .fgt{font-size:11px;color:var(--accent);text-decoration:none;font-weight:600;opacity:0.85;transition:opacity 0.15s}
        .fgt:hover{opacity:1}

        .sub-btn {
          width:100%; height:50px; border:none; border-radius:12px;
          background:linear-gradient(135deg, var(--accent), var(--accent-dark));
          color:#fff; font-family:var(--font); font-size:14px; font-weight:700;
          letter-spacing:0.05em; cursor:pointer; text-transform:uppercase;
          display:flex; align-items:center; justify-content:center; gap:8px;
          position:relative; overflow:hidden; margin-top:8px;
          transition:transform 0.15s,box-shadow 0.2s;
          box-shadow:0 4px 16px rgba(249,115,22,0.3);
        }
        .sub-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%);transition:transform 0.5s}
        .sub-btn:hover:not(:disabled)::after{transform:translateX(100%)}
        .sub-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 28px rgba(249,115,22,0.4)}
        .sub-btn:active:not(:disabled){transform:translateY(0)}
        .sub-btn:disabled{opacity:0.55;cursor:not-allowed}

        .divider{display:flex;align-items:center;gap:10px;margin:20px 0}
        .dline{flex:1;height:1px;background:var(--border)}
        .dtxt{font-size:10px;color:var(--muted);white-space:nowrap;font-weight:600}

        .reg-btn {
          width:100%; height:44px; border:1.5px solid var(--border); border-radius:12px;
          background:transparent; color:var(--muted); font-family:var(--font);
          font-size:13px; font-weight:600; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:6px;
          transition:border-color 0.2s,color 0.2s,background 0.2s; text-decoration:none;
        }
        .reg-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-light)}

        .trust-row{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:22px}
        .t-item{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--muted);font-weight:500}

        .spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}

        .ver-tag{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);font-size:10px;color:#d1d5db;white-space:nowrap;letter-spacing:0.06em}
      `}</style>

      <div className="root">
        <div className="grid-bg"/>
        <div className="glow1"/><div className="glow2"/>

        {/* LEFT VISUAL */}
        <div className="visual-half">
          <div className="top-bar">
            <div className="logo-row">
              <div className="logo-hex">
                <img src="/icon.svg" className="h-32" alt="eva lite" />
                {/* <span className="logo-hex-inner"><HiOutlineChip/></span> */}
              </div>
              <div>
                <div className="logo-name">evaLite</div>
                <div className="logo-sub">ERP Billing System</div>
              </div>
            </div>
            <div className="nav-pill"><div className="nav-dot"/>System Online</div>
          </div>

          <div className="preview-title">// Live Dashboard Preview</div>
          <div className="big-headline">SMART<br/><span>BILLING</span><br/>ENGINE</div>
          <div className="headline-sub">Automate invoicing, track receivables & manage your entire financial workflow from one command center.</div>

          <div className="cards-scene">
            <div className="dash-card">
              <div className="scanline"/>
              <div className="dc-header">
                <span className="dc-title">Q4 Revenue Overview</span>
                <span className="dc-badge">▲ 18.4% MoM</span>
              </div>

              <div className="kpi-row">
                <div className="kpi">
                  <div className="kpi-label">Total Billed</div>
                  <div className="kpi-val orange">₹84.2L</div>
                  <div className="kpi-delta up">↑ 12.3%</div>
                </div>
                <div className="kpi">
                  <div className="kpi-label">Collected</div>
                  <div className="kpi-val green">₹71.8L</div>
                  <div className="kpi-delta up">↑ 9.1%</div>
                </div>
                <div className="kpi">
                  <div className="kpi-label">Pending</div>
                  <div className="kpi-val warn">₹12.4L</div>
                  <div className="kpi-delta down">↓ 3 inv</div>
                </div>
              </div>

              <div className="chart-area">
                {[
                  {h:"38px",cls:"",lbl:"Jul"},{h:"52px",cls:"b2",lbl:"Aug"},
                  {h:"44px",cls:"",lbl:"Sep"},{h:"68px",cls:"b3",lbl:"Oct"},
                  {h:"56px",cls:"b2",lbl:"Nov"},{h:"74px",cls:"",lbl:"Dec"},
                ].map((b,i)=>(
                  <div key={i} className="bar-col">
                    <div className={`bar ${b.cls}`} style={{"--h":b.h} as React.CSSProperties}/>
                    <div className="bar-lbl">{b.lbl}</div>
                  </div>
                ))}
              </div>

              <div className="inv-list">
                {[
                  {icon:"✓",cls:"paid",name:"Tata Motors Ltd.",amt:"₹4,28,000",status:"Paid",scls:"paid"},
                  {icon:"◷",cls:"pending",name:"Infosys Pvt. Ltd.",amt:"₹2,15,500",status:"Pending",scls:"pending"},
                  {icon:"!",cls:"overdue",name:"Reliance Retail",amt:"₹8,92,000",status:"Overdue",scls:"overdue"},
                ].map((r,i)=>(
                  <div key={i} className="inv-row">
                    <div className={`inv-icon ${r.cls}`}>{r.icon}</div>
                    <div className="inv-name">{r.name}</div>
                    <div className="inv-amt">{r.amt}</div>
                    <div className={`inv-status ${r.scls}`}>{r.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mini-card-1">
              <div className="mc-label">Today's Collection</div>
              <div className="mc-val">₹2.4L</div>
              <div className="mc-sub">↑ 8 invoices cleared</div>
            </div>
          </div>
        </div>

        {/* FORM HALF */}
        <div className="form-half">
          <div className="form-card">
            <div className="fc-eyebrow">
              <div className="fc-ey-line"/>
              <div className="fc-ey-text">Secure Portal Access</div>
              <div className="fc-ey-line"/>
            </div>

            <div className="fc-title">SIGN IN</div>
            <div className="fc-sub">Access your ERP billing command center</div>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="email" className={`f-lbl${focused==="email"?" act":""}`}>Corporate Email</label>
                <div className="inp-wrap">
                  <HiOutlineMail className={`inp-icon${focused==="email"?" act":""}`}/>
                  <input className="f-inp" id="email" name="email" type="email"
                    placeholder="you@company.com" required autoComplete="email" disabled={isLoading}
                    onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)}/>
                </div>
              </div>

              <div className="field">
                <div className="pw-row">
                  <span className={`f-lbl${focused==="password"?" act":""}`} style={{marginBottom:0}}>Password</span>
                  {/* <Link href="/forgot-password" className="fgt">Reset access?</Link> */}
                </div>
                <div className="inp-wrap" style={{marginTop:"8px"}}>
                  <HiOutlineLockClosed className={`inp-icon${focused==="password"?" act":""}`}/>
                  <input className="f-inp" id="password" name="password" type="password"
                    placeholder="••••••••••" required autoComplete="current-password" disabled={isLoading}
                    onFocus={()=>setFocused("password")} onBlur={()=>setFocused(null)}/>
                </div>
              </div>

              <button type="submit" className="sub-btn" disabled={isLoading}>
                {isLoading
                  ? <><div className="spinner"/>Authenticating…</>
                  : <>Enter System <HiArrowRight style={{fontSize:"17px"}}/></>}
              </button>
            </form>

            {/* <div className="divider"><div className="dline"/><span className="dtxt">No account yet?</span><div className="dline"/></div>
            <Link href="/register" className="reg-btn">Request Access →</Link>

            <div className="trust-row">
              <div className="t-item"><RiShieldKeyholeLine/>256-bit SSL</div>
              <div className="t-item"><TbReportAnalytics/>SOC 2</div>
              <div className="t-item"><TbBuildingWarehouse/>On-premise ready</div>
            </div> */}
          </div>

          <div className="ver-tag">evaLite ERP v3.2.1 · Enterprise Edition</div>
        </div>
      </div>
    </>
  )
}