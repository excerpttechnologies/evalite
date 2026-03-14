
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



"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/app/components/ui/select"
import { Save, Building2 } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch" // ✅

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

  useEffect(() => { loadSettings() }, [])

  const loadSettings = async () => {
    const res = await authFetch("/api/settings") // ✅
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
  }

  const saveSettings = async () => {
    await authFetch("/api/settings", { // ✅
      method: "POST",
      body: JSON.stringify(settings)
    })
    alert("Settings saved successfully")
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Business Information</CardTitle>
              <CardDescription>Configure your business details for invoices</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Business Name</Label>
            <Input
              value={settings.name || ""}
              onChange={e => setSettings({ ...settings, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>GST Number</Label>
            <Input
              value={settings.gst}
              onChange={e => setSettings({ ...settings, gst: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Address</Label>
            <Input
              value={settings.address}
              onChange={e => setSettings({ ...settings, address: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Phone Number</Label>
              <Input
                value={settings.phone}
                onChange={e => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={e => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invoice Settings</CardTitle>
          <CardDescription>Customize your invoice appearance</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Invoice Theme</Label>
              <Select
                value={settings.invoiceTheme}
                onValueChange={v => setSettings({ ...settings, invoiceTheme: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Classic">Classic</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Minimal">Minimal</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Currency</Label>
              <Select
                value={settings.currency}
                onValueChange={v => setSettings({ ...settings, currency: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveSettings}>
          <Save className="size-4 mr-1" />Save Settings
        </Button>
      </div>

    </div>
  )
}