





// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"

// export default function RegisterPage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setIsLoading(true)
//     setError(null)

//     const formData = new FormData(e.currentTarget)
//     const name = formData.get("name") as string
//     const email = formData.get("email") as string
//     const password = formData.get("password") as string
//     const confirmPassword = formData.get("confirmPassword") as string

//     // Simple validation
//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       setIsLoading(false)
//       return
//     }

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed')
//       }

//       // Success – redirect to dashboard or login
//       router.push('/dashboard')
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setIsLoading(false)
//     }
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

//         {/* Register Card */}
//         <div className="bg-white shadow-xl rounded-2xl p-8">
//           <div className="mb-6 text-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Create an account
//             </h2>
//             <p className="text-gray-500 text-sm">
//               Start your free trial today
//             </p>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Full Name */}
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="John Doe"
//                 required
//                 autoComplete="name"
//                 disabled={isLoading}
//               />
//             </div>

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
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 required
//                 autoComplete="new-password"
//                 disabled={isLoading}
//               />
//             </div>

//             {/* Confirm Password */}
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 placeholder="••••••••"
//                 required
//                 autoComplete="new-password"
//                 disabled={isLoading}
//               />
//             </div>

//             {/* Button */}
//             <Button type="submit" className="w-full mt-4" disabled={isLoading}>
//               {isLoading ? "Creating account..." : "Sign Up"}
//             </Button>
//           </form>

//           {/* Footer */}
//           <div className="text-center mt-6 text-sm text-gray-500">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="text-blue-600 font-medium hover:underline"
//             >
//               Sign in
//             </Link>
//           </div>

//           {/* Terms */}
//           <p className="text-xs text-gray-400 text-center mt-4">
//             By signing up, you agree to our{" "}
//             <Link href="/terms" className="underline hover:text-gray-600">
//               Terms
//             </Link>{" "}
//             and{" "}
//             <Link href="/privacy" className="underline hover:text-gray-600">
//               Privacy Policy
//             </Link>
//           </p>
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
// import { MdEmail, MdLock, MdPerson, MdArrowForward, MdAutoAwesome, MdCheckCircle } from "react-icons/md"
// import { RiShieldCheckFill } from "react-icons/ri"

// export default function RegisterPage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [focusedField, setFocusedField] = useState<string | null>(null)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setIsLoading(true)
//     setError(null)

//     const formData = new FormData(e.currentTarget)
//     const name = formData.get("name") as string
//     const email = formData.get("email") as string
//     const password = formData.get("password") as string
//     const confirmPassword = formData.get("confirmPassword") as string

//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       setIsLoading(false)
//       return
//     }

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed')
//       }

//       router.push('/dashboard')
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setIsLoading(false)
//     }
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
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes errShake {
//           0%, 100% { transform: translateX(0); }
//           20%, 60% { transform: translateX(-6px); }
//           40%, 80% { transform: translateX(6px); }
//         }

//         .reg-root { min-height: 100vh; display: flex; font-family: 'Outfit', sans-serif; }

//         .brand-panel {
//           width: 44%; background: #0c0c0c; position: relative; overflow: hidden;
//           display: flex; flex-direction: column; justify-content: space-between;
//           padding: 44px;
//           animation: fadeSlideIn 0.65s cubic-bezier(0.22,1,0.36,1) both;
//         }
//         @media (max-width: 820px) {
//           .brand-panel { display: none !important; }
//           .form-panel { width: 100% !important; }
//         }

//         .orb-1 {
//           position: absolute; width: 500px; height: 500px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(16,185,129,0.28) 0%, transparent 65%);
//           top: -140px; right: -140px;
//           animation: orb1 16s ease-in-out infinite; pointer-events: none;
//         }
//         .orb-2 {
//           position: absolute; width: 380px; height: 380px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%);
//           bottom: -80px; left: -80px;
//           animation: orb2 20s ease-in-out infinite; pointer-events: none;
//         }
//         .orb-3 {
//           position: absolute; width: 200px; height: 200px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%);
//           bottom: 28%; right: 8%;
//           animation: floatUp 9s ease-in-out infinite; pointer-events: none;
//         }

//         .brand-top { position: relative; z-index: 2; }
//         .brand-logo { display: flex; align-items: center; gap: 10px; }
//         .logo-icon {
//           width: 36px; height: 36px;
//           background: linear-gradient(135deg, #10b981, #3b82f6);
//           border-radius: 9px; display: flex; align-items: center; justify-content: center;
//         }
//         .logo-name { font-family: 'Instrument Serif', serif; font-size: 26px; color: #fff; letter-spacing: -0.5px; }

//         .brand-mid {
//           position: relative; z-index: 2; flex: 1;
//           display: flex; flex-direction: column; justify-content: center; padding: 32px 0;
//         }
//         .brand-headline {
//           font-family: 'Instrument Serif', serif;
//           font-size: clamp(32px, 3vw, 48px); color: #fff; line-height: 1.15;
//           letter-spacing: -1px; margin-bottom: 18px;
//         }
//         .brand-headline em {
//           font-style: italic;
//           background: linear-gradient(90deg, #10b981, #3b82f6);
//           -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
//         }
//         .brand-desc { color: rgba(255,255,255,0.4); font-size: 14px; line-height: 1.65; max-width: 290px; margin-bottom: 36px; }

//         .perks { display: flex; flex-direction: column; gap: 14px; }
//         .perk { display: flex; align-items: center; gap: 12px; }
//         .perk-icon {
//           width: 32px; height: 32px; border-radius: 8px;
//           background: rgba(255,255,255,0.06);
//           display: flex; align-items: center; justify-content: center; flex-shrink: 0;
//         }
//         .perk-text { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.4; }
//         .perk-text strong { color: rgba(255,255,255,0.85); font-weight: 600; display: block; font-size: 13px; }

//         .brand-foot { position: relative; z-index: 2; }
//         .ticker-outer { overflow: hidden; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 18px; }
//         .ticker-inner { display: flex; gap: 28px; white-space: nowrap; animation: ticker 22s linear infinite; }
//         .t-item { display: flex; align-items: center; gap: 7px; font-size: 11px; color: rgba(255,255,255,0.28); flex-shrink: 0; }
//         .t-dot { width: 4px; height: 4px; border-radius: 50%; background: #10b981; flex-shrink: 0; }

//         /* FORM PANEL */
//         .form-panel {
//           width: 56%; background: #f7f6f3;
//           display: flex; align-items: center; justify-content: center;
//           padding: 48px 72px;
//           animation: fadeSlideUp 0.65s 0.1s cubic-bezier(0.22,1,0.36,1) both;
//         }
//         .form-box { width: 100%; max-width: 400px; }

//         .eyebrow {
//           display: inline-flex; align-items: center; gap: 5px;
//           background: rgba(16,185,129,0.09); border: 1px solid rgba(16,185,129,0.22);
//           border-radius: 20px; padding: 4px 11px;
//           font-size: 10px; font-weight: 700; color: #10b981;
//           letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px;
//         }
//         .form-title {
//           font-family: 'Instrument Serif', serif;
//           font-size: 38px; color: #111; letter-spacing: -1.2px; line-height: 1.08; margin-bottom: 8px;
//         }
//         .form-sub { font-size: 14px; color: #999; line-height: 1.5; margin-bottom: 30px; }

//         .error-box {
//           padding: 10px 14px; background: rgba(239,68,68,0.07);
//           border: 1px solid rgba(239,68,68,0.2); border-radius: 10px;
//           color: #dc2626; font-size: 13px; margin-bottom: 18px;
//           display: flex; align-items: center; gap: 8px;
//           animation: errShake 0.4s ease;
//         }

//         .field { margin-bottom: 16px; }
//         .f-label {
//           display: block; font-size: 11px; font-weight: 600; color: #777;
//           margin-bottom: 7px; letter-spacing: 0.07em; text-transform: uppercase; transition: color 0.2s;
//         }
//         .f-label.act { color: #10b981; }

//         .inp-wrap { position: relative; }
//         .inp-ico {
//           position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
//           font-size: 16px; color: #ccc; pointer-events: none; transition: color 0.2s;
//         }
//         .inp-ico.act { color: #10b981; }

//         .f-input {
//           width: 100%; height: 50px; padding: 0 16px 0 42px;
//           background: #fff; border: 1.5px solid #e6e3dd; border-radius: 12px;
//           font-size: 14px; font-family: 'Outfit', sans-serif; color: #111;
//           outline: none; transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .f-input::placeholder { color: #ccc; }
//         .f-input:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.1); }
//         .f-input:disabled { background: #f2f2f2; cursor: not-allowed; }

//         .s-btn {
//           width: 100%; height: 52px; border: none; border-radius: 12px;
//           background: #111; color: #fff;
//           font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
//           cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
//           position: relative; overflow: hidden; margin-top: 8px;
//           transition: transform 0.15s, box-shadow 0.2s; letter-spacing: 0.01em;
//         }
//         .s-btn::before {
//           content: ''; position: absolute; inset: 0;
//           background: linear-gradient(135deg, #10b981, #3b82f6); opacity: 0; transition: opacity 0.28s;
//         }
//         .s-btn:hover:not(:disabled)::before { opacity: 1; }
//         .s-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 26px rgba(16,185,129,0.28); }
//         .s-btn:active:not(:disabled) { transform: translateY(0); }
//         .s-btn:disabled { opacity: 0.52; cursor: not-allowed; }
//         .btn-inner { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

//         .divider { display: flex; align-items: center; gap: 12px; margin: 22px 0; }
//         .div-line { flex: 1; height: 1px; background: #e6e3dd; }
//         .div-txt { font-size: 11px; color: #bbb; white-space: nowrap; }

//         .foot-line { text-align: center; font-size: 13px; color: #999; }
//         .login-link {
//           color: #111; font-weight: 700; text-decoration: none;
//           border-bottom: 2px solid #10b981; padding-bottom: 1px; transition: color 0.15s;
//         }
//         .login-link:hover { color: #10b981; }

//         .terms-txt { text-align: center; font-size: 11px; color: #bbb; margin-top: 18px; line-height: 1.6; }
//         .terms-txt a { color: #999; text-decoration: underline; }

//         .spinner {
//           width: 15px; height: 15px;
//           border: 2px solid rgba(255,255,255,0.35);
//           border-top-color: #fff; border-radius: 50%;
//           animation: spin 0.7s linear infinite;
//         }
//       `}</style>

//       <div className="reg-root">
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
//             <h1 className="brand-headline">Your billing,<br /><em>effortlessly</em><br />automated.</h1>
//             <p className="brand-desc">Join thousands of businesses who trust evaLite to handle their invoicing, payments, and financial reporting.</p>
//             <div className="perks">
//               {[
//                 { title: "14-day free trial", desc: "No credit card required to get started" },
//                 { title: "Cancel anytime", desc: "No long-term contracts or hidden fees" },
//                 { title: "Enterprise-grade security", desc: "SOC 2 compliant, 256-bit encryption" },
//               ].map(({ title, desc }) => (
//                 <div key={title} className="perk">
//                   <div className="perk-icon">
//                     <MdCheckCircle style={{ color: "#10b981", fontSize: "16px" }} />
//                   </div>
//                   <div className="perk-text">
//                     <strong>{title}</strong>{desc}
//                   </div>
//                 </div>
//               ))}
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
//             <div className="eyebrow"><RiShieldCheckFill />Free to start</div>
//             <h2 className="form-title">Create your<br />account.</h2>
//             <p className="form-sub">Start your free 14-day trial — no credit card needed.</p>

//             {error && (
//               <div className="error-box">
//                 <span>⚠</span> {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="field">
//                 <label htmlFor="name" className={`f-label ${focusedField === "name" ? "act" : ""}`}>Full name</label>
//                 <div className="inp-wrap">
//                   <MdPerson className={`inp-ico ${focusedField === "name" ? "act" : ""}`} />
//                   <input className="f-input" id="name" name="name" type="text"
//                     placeholder="John Doe" required autoComplete="name" disabled={isLoading}
//                     onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} />
//                 </div>
//               </div>

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
//                 <label htmlFor="password" className={`f-label ${focusedField === "password" ? "act" : ""}`}>Password</label>
//                 <div className="inp-wrap">
//                   <MdLock className={`inp-ico ${focusedField === "password" ? "act" : ""}`} />
//                   <input className="f-input" id="password" name="password" type="password"
//                     placeholder="••••••••" required autoComplete="new-password" disabled={isLoading}
//                     onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)} />
//                 </div>
//               </div>

//               <div className="field">
//                 <label htmlFor="confirmPassword" className={`f-label ${focusedField === "confirmPassword" ? "act" : ""}`}>Confirm password</label>
//                 <div className="inp-wrap">
//                   <MdLock className={`inp-ico ${focusedField === "confirmPassword" ? "act" : ""}`} />
//                   <input className="f-input" id="confirmPassword" name="confirmPassword" type="password"
//                     placeholder="••••••••" required autoComplete="new-password" disabled={isLoading}
//                     onFocus={() => setFocusedField("confirmPassword")} onBlur={() => setFocusedField(null)} />
//                 </div>
//               </div>

//               <button type="submit" className="s-btn" disabled={isLoading}>
//                 <span className="btn-inner">
//                   {isLoading
//                     ? <><div className="spinner" />Creating account…</>
//                     : <>Create Account <MdArrowForward style={{ fontSize: "18px" }} /></>}
//                 </span>
//               </button>
//             </form>

//             <div className="divider"><div className="div-line" /><span className="div-txt">Already have an account?</span><div className="div-line" /></div>
//             <div className="foot-line"><Link href="/login" className="login-link">Sign in instead →</Link></div>

//             <p className="terms-txt">
//               By signing up you agree to our{" "}
//               <Link href="/terms">Terms of Service</Link> and{" "}
//               <Link href="/privacy">Privacy Policy</Link>
//             </p>
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
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiArrowRight, HiOutlineChip, HiOutlineCheckCircle } from "react-icons/hi"
import { TbReportAnalytics, TbBuildingWarehouse, TbInvoice } from "react-icons/tb"
import { RiShieldKeyholeLine } from "react-icons/ri"
import { MdOutlineAutoGraph } from "react-icons/md"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Registration failed')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
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
          --amber: #d97706;
          --text: #111827;
          --muted: #6b7280;
          --border: #e5e7eb;
          --surface: #f9fafb;
          --font: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.05)} }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(-2deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(1.5deg)} 50%{transform:translateY(-8px) rotate(1.5deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinRing2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes errShake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }
        @keyframes progressFill { from{width:0} to{width:var(--w)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes borderGlow { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} 50%{box-shadow:0 0 14px 2px rgba(249,115,22,0.13)} }

        .root {
          min-height:100vh; background:var(--bg);
          display:flex; font-family:var(--font); position:relative; overflow:hidden;
        }

        .grid-bg {
          position:absolute; inset:0; z-index:0; pointer-events:none;
          background-image:radial-gradient(circle,#f97316 1px,transparent 1px);
          background-size:28px 28px; opacity:0.06;
        }

        .glow1 {
          position:absolute; width:560px; height:560px; border-radius:50%;
          background:radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 65%);
          top:-160px; right:-80px; pointer-events:none; z-index:0; animation:pulse 9s ease-in-out infinite;
        }
        .glow2 {
          position:absolute; width:400px; height:400px; border-radius:50%;
          background:radial-gradient(circle,rgba(234,88,12,0.06) 0%,transparent 65%);
          bottom:-100px; left:60px; pointer-events:none; z-index:0; animation:pulse 13s 3s ease-in-out infinite;
        }

        /* VISUAL HALF */
        .visual-half {
          width:52%; position:relative; z-index:1;
          display:flex; flex-direction:column; padding:44px 40px 44px 44px;
          animation:fadeIn 0.7s cubic-bezier(.22,1,.36,1) both;
        }
        @media(max-width:900px){.visual-half{display:none}.form-half{width:100%!important}}

        .top-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:40px}
        .logo-row{display:flex;align-items:center;gap:10px}
        .logo-hex{width:38px;height:38px;position:relative;display:flex;align-items:center;justify-content:center}
        .logo-hex svg{position:absolute;inset:0}
        .logo-hex svg:first-child{animation:spinRing 10s linear infinite}
        .logo-hex svg:nth-child(2){animation:spinRing2 15s linear infinite}
        .logo-hex-inner{position:relative;z-index:1;color:var(--accent);font-size:15px}
        .logo-name{font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--text);letter-spacing:2px}
        .logo-sub{font-size:9px;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;margin-top:-2px}

        .nav-pill{background:var(--accent-light);border:1px solid var(--accent-mid);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--accent-dark);letter-spacing:0.06em;display:flex;align-items:center;gap:6px;font-weight:600}
        .nav-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2.5s infinite}

        .big-headline{font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,4.5vw,66px);color:var(--text);letter-spacing:2px;line-height:0.95;margin-bottom:6px}
        .big-headline span{color:var(--accent)}
        .headline-sub{font-size:13px;color:var(--muted);margin-bottom:26px;max-width:320px;line-height:1.6}

        .visual-grid{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:12px;position:relative}

        /* CARDS */
        .vc {
          background:#fff; border:1px solid var(--border);
          border-radius:14px; padding:16px;
          box-shadow:0 2px 12px rgba(0,0,0,0.05);
          position:relative; overflow:hidden;
        }
        .vc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
        .vc-1::before{background:linear-gradient(90deg,var(--accent),#fb923c)}
        .vc-2::before{background:linear-gradient(90deg,var(--green),#4ade80)}
        .vc-3::before{background:linear-gradient(90deg,var(--accent),#fb923c,var(--green))}

        .vc-1{animation:floatA 7s ease-in-out infinite;grid-column:1;grid-row:1}
        .vc-2{animation:floatB 8s 1s ease-in-out infinite;grid-column:2;grid-row:1}
        .vc-3{animation:floatC 6s 0.5s ease-in-out infinite;grid-column:1/-1;grid-row:2}

        .vc-lbl{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;font-weight:700}
        .vc-big{font-size:26px;font-weight:800;color:var(--text);line-height:1;margin-bottom:2px}
        .vc-big.orange{color:var(--accent)} .vc-big.green{color:var(--green)} .vc-big.amber{color:var(--amber)}
        .vc-delta{font-size:10px;margin-bottom:10px;font-weight:600}
        .vc-delta.up{color:var(--green)} .vc-delta.warn{color:var(--amber)}

        .prog-list{display:flex;flex-direction:column;gap:8px}
        .prog-item{}
        .prog-top{display:flex;justify-content:space-between;margin-bottom:4px}
        .prog-name{font-size:10px;color:var(--muted);font-weight:500}
        .prog-pct{font-size:10px;color:var(--text);font-weight:700}
        .prog-track{height:5px;background:var(--border);border-radius:3px;overflow:hidden}
        .prog-fill{height:100%;border-radius:3px;--w:60%;animation:progressFill 1.2s cubic-bezier(.22,1,.36,1) both}
        .pf-o{background:linear-gradient(90deg,var(--accent),#fb923c)}
        .pf-g{background:linear-gradient(90deg,var(--green),#4ade80)}
        .pf-r{background:#ef4444}

        .module-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
        .mod-item{
          display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 6px;
          background:var(--surface);border-radius:10px;border:1px solid var(--border);
          transition:border-color 0.2s,background 0.2s;cursor:default;
        }
        .mod-item:hover{border-color:var(--accent-mid);background:var(--accent-light)}
        .mod-icon{font-size:18px;color:var(--accent)}
        .mod-icon.green{color:var(--green)} .mod-icon.amber{color:var(--amber)} .mod-icon.dark{color:var(--text)}
        .mod-name{font-size:9px;color:var(--muted);text-align:center;line-height:1.3;font-weight:600}

        /* FORM HALF */
        .form-half {
          width:48%;z-index:2;position:relative;
          display:flex;align-items:center;justify-content:center;
          padding:32px 44px 32px 16px;
          animation:fadeIn 0.7s 0.15s cubic-bezier(.22,1,.36,1) both;
        }

        .form-card {
          width:100%;max-width:400px;
          background:#ffffff;border:1.5px solid var(--border);
          border-radius:24px;padding:30px 28px;
          box-shadow:0 8px 40px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04);
          position:relative;overflow:hidden;
        }
        .form-card::before {
          content:'';position:absolute;top:0;left:0;right:0;height:4px;
          background:linear-gradient(90deg,var(--accent),#fb923c,#fdba74,var(--accent));
          background-size:200%;animation:shimmer 3s linear infinite;
        }

        .fc-eyebrow{display:flex;align-items:center;gap:8px;margin-bottom:16px}
        .fc-ey-line{flex:1;height:1px;background:var(--border)}
        .fc-ey-text{font-size:10px;color:var(--muted);letter-spacing:0.12em;text-transform:uppercase;white-space:nowrap;font-weight:700}

        .fc-title{font-family:'Bebas Neue',sans-serif;font-size:36px;color:var(--text);letter-spacing:2px;margin-bottom:2px;line-height:1}
        .fc-sub{font-size:12px;color:var(--muted);margin-bottom:22px}

        .error-box{
          padding:10px 13px;background:var(--red-bg);border:1px solid #fecaca;
          border-radius:10px;color:var(--red);font-size:12px;margin-bottom:14px;
          display:flex;align-items:center;gap:8px;animation:errShake 0.4s ease;font-weight:500;
        }

        .field{margin-bottom:14px}
        .f-lbl{display:block;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:7px;transition:color 0.2s}
        .f-lbl.act{color:var(--accent)}

        .inp-wrap{position:relative}
        .inp-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#d1d5db;font-size:15px;pointer-events:none;transition:color 0.2s}
        .inp-icon.act{color:var(--accent)}

        .f-inp{
          width:100%;height:46px;padding:0 13px 0 41px;
          background:var(--surface);border:1.5px solid var(--border);
          border-radius:11px;color:var(--text);font-size:13px;font-family:var(--font);
          outline:none;transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;
        }
        .f-inp::placeholder{color:#d1d5db}
        .f-inp:focus{border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px rgba(249,115,22,0.1)}
        .f-inp:disabled{opacity:0.5;cursor:not-allowed}

        .sub-btn{
          width:100%;height:48px;border:none;border-radius:12px;
          background:linear-gradient(135deg,var(--accent),var(--accent-dark));
          color:#fff;font-family:var(--font);font-size:13px;font-weight:700;
          letter-spacing:0.06em;cursor:pointer;text-transform:uppercase;
          display:flex;align-items:center;justify-content:center;gap:8px;
          position:relative;overflow:hidden;margin-top:6px;
          transition:transform 0.15s,box-shadow 0.2s;
          box-shadow:0 4px 16px rgba(249,115,22,0.3);
        }
        .sub-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%);transition:transform 0.5s}
        .sub-btn:hover:not(:disabled)::after{transform:translateX(100%)}
        .sub-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 28px rgba(249,115,22,0.4)}
        .sub-btn:active:not(:disabled){transform:translateY(0)}
        .sub-btn:disabled{opacity:0.55;cursor:not-allowed}

        .divider{display:flex;align-items:center;gap:10px;margin:16px 0}
        .dline{flex:1;height:1px;background:var(--border)}
        .dtxt{font-size:10px;color:var(--muted);white-space:nowrap;font-weight:600}

        .login-btn{
          width:100%;height:42px;border:1.5px solid var(--border);border-radius:12px;
          background:transparent;color:var(--muted);font-family:var(--font);
          font-size:13px;font-weight:600;cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:6px;
          transition:border-color 0.2s,color 0.2s,background 0.2s;text-decoration:none;
        }
        .login-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-light)}

        .terms-txt{text-align:center;font-size:10px;color:#9ca3af;margin-top:14px;line-height:1.6}
        .terms-txt a{color:var(--muted);text-decoration:underline}
        .terms-txt a:hover{color:var(--accent)}

        .trust-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:14px}
        .t-item{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--muted);font-weight:500}

        .spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}

        .ver-tag{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);font-size:10px;color:#d1d5db;white-space:nowrap;letter-spacing:0.06em}
      `}</style>

      <div className="root">
        <div className="grid-bg"/>
        <div className="glow1"/><div className="glow2"/>

        {/* VISUAL HALF */}
        <div className="visual-half">
          <div className="top-bar">
            <div className="logo-row">
              <div className="logo-hex">
                 <img src="/icon.svg" className="h-32" alt="eva lite" />
              </div>
              <div>
                <div className="logo-name">EVALITE</div>
                <div className="logo-sub">ERP Billing System</div>
              </div>
            </div>
            <div className="nav-pill"><div className="nav-dot"/>New Account</div>
          </div>

          <div className="big-headline">ENTERPRISE<br/><span>ERP</span> SUITE</div>
          <div className="headline-sub">Full-stack billing intelligence — from PO to payment reconciliation, all in one platform.</div>

          <div className="visual-grid">
            <div className="vc vc-1">
              <div className="vc-lbl">Monthly Revenue</div>
              <div className="vc-big orange">₹1.2Cr</div>
              <div className="vc-delta up">↑ 23.4% vs last month</div>
              <div className="prog-list">
                <div className="prog-item">
                  <div className="prog-top"><span className="prog-name">Invoiced</span><span className="prog-pct">87%</span></div>
                  <div className="prog-track"><div className="prog-fill pf-o" style={{"--w":"87%"} as React.CSSProperties}/></div>
                </div>
                <div className="prog-item">
                  <div className="prog-top"><span className="prog-name">Collected</span><span className="prog-pct">74%</span></div>
                  <div className="prog-track"><div className="prog-fill pf-g" style={{"--w":"74%"} as React.CSSProperties}/></div>
                </div>
              </div>
            </div>

            <div className="vc vc-2">
              <div className="vc-lbl">Active Invoices</div>
              <div className="vc-big green">348</div>
              <div className="vc-delta warn">⊙ 12 need attention</div>
              <div className="prog-list">
                <div className="prog-item">
                  <div className="prog-top"><span className="prog-name">Paid</span><span className="prog-pct">291</span></div>
                  <div className="prog-track"><div className="prog-fill pf-g" style={{"--w":"84%"} as React.CSSProperties}/></div>
                </div>
                <div className="prog-item">
                  <div className="prog-top"><span className="prog-name">Overdue</span><span className="prog-pct">12</span></div>
                  <div className="prog-track"><div className="prog-fill pf-r" style={{"--w":"4%"} as React.CSSProperties}/></div>
                </div>
              </div>
            </div>

            <div className="vc vc-3">
              <div className="vc-lbl">Included ERP Modules</div>
              <div className="module-grid">
                {[
                  {icon:<TbInvoice/>,cls:"",name:"GST Billing"},
                  {icon:<TbReportAnalytics/>,cls:"green",name:"Reports"},
                  {icon:<TbBuildingWarehouse/>,cls:"amber",name:"Inventory"},
                  {icon:<MdOutlineAutoGraph/>,cls:"dark",name:"Analytics"},
                  {icon:<HiOutlineCheckCircle/>,cls:"green",name:"Approvals"},
                  {icon:<RiShieldKeyholeLine/>,cls:"amber",name:"Audit Log"},
                  {icon:<HiOutlineChip/>,cls:"",name:"API Access"},
                  {icon:<HiOutlineUser/>,cls:"dark",name:"HR Links"},
                ].map((m,i)=>(
                  <div key={i} className="mod-item">
                    <div className={`mod-icon ${m.cls}`}>{m.icon}</div>
                    <div className="mod-name">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FORM HALF */}
        <div className="form-half">
          <div className="form-card">
            <div className="fc-eyebrow">
              <div className="fc-ey-line"/>
              <div className="fc-ey-text">New Account Registration</div>
              <div className="fc-ey-line"/>
            </div>

            <div className="fc-title">REGISTER</div>
            <div className="fc-sub">Set up your enterprise billing access</div>

            {error && <div className="error-box"><span>⚠</span>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name" className={`f-lbl${focused==="name"?" act":""}`}>Full Name</label>
                <div className="inp-wrap">
                  <HiOutlineUser className={`inp-icon${focused==="name"?" act":""}`}/>
                  <input className="f-inp" id="name" name="name" type="text"
                    placeholder="Your full name" required autoComplete="name" disabled={isLoading}
                    onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)}/>
                </div>
              </div>

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
                <label htmlFor="password" className={`f-lbl${focused==="password"?" act":""}`}>Password</label>
                <div className="inp-wrap">
                  <HiOutlineLockClosed className={`inp-icon${focused==="password"?" act":""}`}/>
                  <input className="f-inp" id="password" name="password" type="password"
                    placeholder="Create strong password" required autoComplete="new-password" disabled={isLoading}
                    onFocus={()=>setFocused("password")} onBlur={()=>setFocused(null)}/>
                </div>
              </div>

              <div className="field">
                <label htmlFor="confirmPassword" className={`f-lbl${focused==="confirmPassword"?" act":""}`}>Confirm Password</label>
                <div className="inp-wrap">
                  <HiOutlineLockClosed className={`inp-icon${focused==="confirmPassword"?" act":""}`}/>
                  <input className="f-inp" id="confirmPassword" name="confirmPassword" type="password"
                    placeholder="Repeat password" required autoComplete="new-password" disabled={isLoading}
                    onFocus={()=>setFocused("confirmPassword")} onBlur={()=>setFocused(null)}/>
                </div>
              </div>

              <button type="submit" className="sub-btn" disabled={isLoading}>
                {isLoading
                  ? <><div className="spinner"/>Provisioning Account…</>
                  : <>Activate Account <HiArrowRight style={{fontSize:"17px"}}/></>}
              </button>
            </form>

            <div className="divider"><div className="dline"/><span className="dtxt">Have an account?</span><div className="dline"/></div>
            <Link href="/login" className="login-btn">Sign into System →</Link>

            <p className="terms-txt">
              By registering you accept our <Link href="/terms">Terms of Service</Link> & <Link href="/privacy">Privacy Policy</Link>
            </p>

            <div className="trust-row">
              <div className="t-item"><RiShieldKeyholeLine/>256-bit SSL</div>
              <div className="t-item"><TbReportAnalytics/>SOC 2</div>
              <div className="t-item"><TbBuildingWarehouse/>On-premise</div>
            </div>
          </div>
          <div className="ver-tag">evaLite ERP v3.2.1 · Enterprise Edition</div>
        </div>
      </div>
    </>
  )
}