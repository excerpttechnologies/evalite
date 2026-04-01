
// "use client"

// import { useEffect, useState } from "react"

// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"

// import {
// Select,
// SelectContent,
// SelectItem,
// SelectTrigger,
// SelectValue
// } from "@/app/components/ui/select"

// import { Save, Building2 } from "lucide-react"

// export function SettingsForm(){

// const [settings,setSettings] = useState<any>({
// name:"",
// gst:"",
// address:"",
// phone:"",
// email:"",
// invoiceTheme:"Classic",
// currency:"INR"
// })

// useEffect(()=>{
//  loadSettings()
// },[])

// // const loadSettings = async ()=>{

// //  const res = await fetch("/api/settings")
// //  const data = await res.json()

// //  if(data){
// //   setSettings(data)
// //  }

// // }




// const loadSettings = async () => {

//   const res = await fetch("/api/settings")
//   const data = await res.json()

//   setSettings({
//     name: data?.name || "",
//     gst: data?.gst || "",
//     address: data?.address || "",
//     phone: data?.phone || "",
//     email: data?.email || "",
//     invoiceTheme: data?.invoiceTheme || "Classic",
//     currency: data?.currency || "INR"
//   })

// }
// const saveSettings = async ()=>{

//  await fetch("/api/settings",{
//   method:"POST",
//   headers:{
//    "Content-Type":"application/json"
//   },
//   body:JSON.stringify(settings)
//  })

//  alert("Settings saved successfully")

// }

// return(

// <div className="flex flex-col gap-6 max-w-2xl">

// <Card>

// <CardHeader>

// <div className="flex items-center gap-3">

// <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
// <Building2 className="size-5 text-primary"/>
// </div>

// <div>

// <CardTitle className="text-base">
// Business Information
// </CardTitle>

// <CardDescription>
// Configure your business details for invoices
// </CardDescription>

// </div>

// </div>

// </CardHeader>

// <CardContent className="flex flex-col gap-4">

// <div className="flex flex-col gap-1.5">

// <Label>Business Name</Label>
// <Input
// value={settings.name || ""}
// onChange={(e)=>setSettings({...settings,name:e.target.value})}
// />

// </div>

// <div className="flex flex-col gap-1.5">

// <Label>GST Number</Label>

// <Input
// value={settings.gst}
// onChange={(e)=>setSettings({...settings,gst:e.target.value})}
// />

// </div>

// <div className="flex flex-col gap-1.5">

// <Label>Address</Label>

// <Input
// value={settings.address}
// onChange={(e)=>setSettings({...settings,address:e.target.value})}
// />

// </div>

// <div className="grid gap-4 sm:grid-cols-2">

// <div className="flex flex-col gap-1.5">

// <Label>Phone Number</Label>

// <Input
// value={settings.phone}
// onChange={(e)=>setSettings({...settings,phone:e.target.value})}
// />

// </div>

// <div className="flex flex-col gap-1.5">

// <Label>Email</Label>

// <Input
// type="email"
// value={settings.email}
// onChange={(e)=>setSettings({...settings,email:e.target.value})}
// />

// </div>

// </div>

// </CardContent>

// </Card>

// <Card>

// <CardHeader>

// <CardTitle className="text-base">
// Invoice Settings
// </CardTitle>

// <CardDescription>
// Customize your invoice appearance
// </CardDescription>

// </CardHeader>

// <CardContent className="flex flex-col gap-4">

// <div className="grid gap-4 sm:grid-cols-2">

// <div className="flex flex-col gap-1.5">

// <Label>Invoice Theme</Label>

// <Select
// value={settings.invoiceTheme}
// onValueChange={(v)=>setSettings({...settings,invoiceTheme:v})}
// >

// <SelectTrigger>
// <SelectValue/>
// </SelectTrigger>

// <SelectContent>

// <SelectItem value="Classic">Classic</SelectItem>
// <SelectItem value="Modern">Modern</SelectItem>
// <SelectItem value="Minimal">Minimal</SelectItem>
// <SelectItem value="Professional">Professional</SelectItem>

// </SelectContent>

// </Select>

// </div>

// <div className="flex flex-col gap-1.5">

// <Label>Currency</Label>

// <Select
// value={settings.currency}
// onValueChange={(v)=>setSettings({...settings,currency:v})}
// >

// <SelectTrigger>
// <SelectValue/>
// </SelectTrigger>

// <SelectContent>

// <SelectItem value="INR">INR - Indian Rupee</SelectItem>
// <SelectItem value="USD">USD - US Dollar</SelectItem>
// <SelectItem value="EUR">EUR - Euro</SelectItem>

// </SelectContent>

// </Select>

// </div>

// </div>

// </CardContent>

// </Card>

// <div className="flex justify-end">

// <Button onClick={saveSettings}>

// <Save className="size-4 mr-1"/>

// Save Settings

// </Button>

// </div>

// </div>

// )

// }










//aravind



// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue
// } from "@/app/components/ui/select"
// import { Save, Building2 } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// export function SettingsForm() {

//   const [settings, setSettings] = useState<any>({
//     name: "",
//     gst: "",
//     address: "",
//     phone: "",
//     email: "",
//     invoiceTheme: "Classic",
//     currency: "INR"
//   })

//   useEffect(() => { loadSettings() }, [])

//   const loadSettings = async () => {
//     const res = await authFetch("/api/settings") // ✅
//     const data = await res.json()

//     setSettings({
//       name: data?.name || "",
//       gst: data?.gst || "",
//       address: data?.address || "",
//       phone: data?.phone || "",
//       email: data?.email || "",
//       invoiceTheme: data?.invoiceTheme || "Classic",
//       currency: data?.currency || "INR"
//     })
//   }

//   const saveSettings = async () => {
//     await authFetch("/api/settings", { // ✅
//       method: "POST",
//       body: JSON.stringify(settings)
//     })
//     alert("Settings saved successfully")
//   }

//   return (
//     <div className="flex flex-col gap-4 max-w-2xl">

//       <Card className="rounded">
//         <CardHeader >
//           <div className="flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded bg-primary/10">
//               <Building2 className="size-5 text-primary" />
//             </div>
//             <div>
//               <CardTitle className="text-base">Business Information</CardTitle>
//               <CardDescription>Configure your business details for invoices</CardDescription>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="flex flex-col gap-4">
//           <div className="flex flex-col gap-1.5">
//             <Label>Business Name</Label>
//             <Input
//               value={settings.name || ""}
//               onChange={e => setSettings({ ...settings, name: e.target.value })}
//             />
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <Label>GST Number</Label>
//             <Input
//               value={settings.gst}
//               onChange={e => setSettings({ ...settings, gst: e.target.value })}
//             />
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <Label>Address</Label>
//             <Input
//               value={settings.address}
//               onChange={e => setSettings({ ...settings, address: e.target.value })}
//             />
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="flex flex-col gap-1.5">
//               <Label>Phone Number</Label>
//               <Input
//                 value={settings.phone}
//                 onChange={e => setSettings({ ...settings, phone: e.target.value })}
//               />
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 value={settings.email}
//                 onChange={e => setSettings({ ...settings, email: e.target.value })}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="rounded">
//         <CardHeader>
//           <CardTitle className="text-base">Invoice Settings</CardTitle>
//           <CardDescription>Customize your invoice appearance</CardDescription>
//         </CardHeader>

//         <CardContent className="flex flex-col gap-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="flex flex-col gap-1.5">
//               <Label>Invoice Theme</Label>
//               <Select
//                 value={settings.invoiceTheme}
//                 onValueChange={v => setSettings({ ...settings, invoiceTheme: v })}
//               >
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Classic">Classic</SelectItem>
//                   <SelectItem value="Modern">Modern</SelectItem>
//                   <SelectItem value="Minimal">Minimal</SelectItem>
//                   <SelectItem value="Professional">Professional</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Currency</Label>
//               <Select
//                 value={settings.currency}
//                 onValueChange={v => setSettings({ ...settings, currency: v })}
//               >
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="INR">INR - Indian Rupee</SelectItem>
//                   <SelectItem value="USD">USD - US Dollar</SelectItem>
//                   <SelectItem value="EUR">EUR - Euro</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-end ">
//         <Button onClick={saveSettings} className="text-white rounded">
//           <Save className="size-4 mr-1" />Save Settings
//         </Button>
//       </div>

//     </div>
//   )
// }


/////jay

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/app/components/ui/select"
import { Save, Building2, Settings } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"
import toast, { Toaster } from 'react-hot-toast'

export function SettingsForm() {

  const [settings, setSettings] = useState<any>({
    name: "",
    gst: "",
    address: "",
    phone: "",
    email: "",
    invoiceTheme: "Classic",
    currency: "INR"
  })
  
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => { loadSettings() }, [])

  const loadSettings = async () => {
    try {
      const res = await authFetch("/api/settings")
      const data = await res.json()
     
      setSettings({
        name: data?.name || "",
        gst: data?.gst || "",
        address: data?.address || "",
        phone: data?.phone || "",
        email: data?.email || "",
        invoiceTheme: data?.invoiceTheme || "Classic",
        currency: data?.currency || "INR"
      })
    } catch (error) {
      toast.error("Failed to load settings")
    }
  }

  const saveSettings = async () => {
    setIsSaving(true)
    try {
      await authFetch("/api/settings", {
        method: "POST",
        body: JSON.stringify(settings)
      })
      toast.success("Settings saved successfully")
    } catch (error) {
      toast.error("Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.01,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  const buttonVariants:Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  const iconVariants:Variants = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 15, scale: 1.1 },
    tap: { rotate: -15, scale: 0.9 }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <motion.div 
        className="flex flex-col gap-4 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
          >
            <Card className="rounded overflow-hidden">
              <CardHeader>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                  <motion.div 
                    className="flex size-10 items-center justify-center rounded bg-primary/10"
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Building2 className="size-5 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-base">Business Information</CardTitle>
                    <CardDescription>Configure your business details for invoices</CardDescription>
                  </div>
                </motion.div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <motion.div 
                  className="flex flex-col gap-1.5"
                  variants={itemVariants}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Label>Business Name</Label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Input
                      value={settings.name || ""}
                      onChange={e => setSettings({ ...settings, name: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="flex flex-col gap-1.5"
                  variants={itemVariants}
                >
                  <Label>GST Number</Label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Input
                      value={settings.gst}
                      onChange={e => setSettings({ ...settings, gst: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="flex flex-col gap-1.5"
                  variants={itemVariants}
                >
                  <Label>Address</Label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Input
                      value={settings.address}
                      onChange={e => setSettings({ ...settings, address: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="grid gap-4 sm:grid-cols-2"
                  variants={itemVariants}
                >
                  <div className="flex flex-col gap-1.5">
                    <Label>Phone Number</Label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Input
                        value={settings.phone}
                        onChange={e => setSettings({ ...settings, phone: e.target.value })}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Email</Label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={e => setSettings({ ...settings, email: e.target.value })}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
          >
            <Card className="rounded overflow-hidden">
              <CardHeader>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  <motion.div 
                    className="flex size-10 items-center justify-center rounded bg-primary/10"
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Settings className="size-5 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-base">Invoice Settings</CardTitle>
                    <CardDescription>Customize your invoice appearance</CardDescription>
                  </div>
                </motion.div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <motion.div 
                  className="grid gap-4 sm:grid-cols-2"
                  variants={itemVariants}
                >
                  <div className="flex flex-col gap-1.5">
                    <Label>Invoice Theme</Label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Select
                        value={settings.invoiceTheme}
                        onValueChange={v => setSettings({ ...settings, invoiceTheme: v })}
                      >
                        <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Classic">Classic</SelectItem>
                          <SelectItem value="Modern">Modern</SelectItem>
                          <SelectItem value="Minimal">Minimal</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>Currency</Label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Select
                        value={settings.currency}
                        onValueChange={v => setSettings({ ...settings, currency: v })}
                      >
                        <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex justify-end"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              onClick={saveSettings} 
              className="text-white rounded relative overflow-hidden"
              disabled={isSaving}
            >
              <AnimatePresence mode="wait">
                {isSaving ? (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="size-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    />
                    Saving...
                  </motion.div>
                ) : (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Save className="size-4 mr-1" />
                    Save Settings
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}