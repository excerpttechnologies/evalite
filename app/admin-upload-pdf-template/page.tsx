"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/app/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import {
  Users, Upload, FileText, ImageIcon, Mail, Calendar, CheckCircle, XCircle,
} from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"

type UserTemplate = {
  logoPath: string
  templatePath: string
  headerText: string
  footerText: string
  templateStyle: string
}

type User = {
  _id: string
  name: string
  email: string
  createdAt: string
  hasTemplate: boolean
  template: UserTemplate | null
}

export default function AdminTemplatePage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Form state
  const [headerText, setHeaderText] = useState("")
  const [footerText, setFooterText] = useState("")
  const [templateStyle, setTemplateStyle] = useState("Classic")

  // ✅ File state via React state (not document.getElementById)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const templateInputRef = useRef<HTMLInputElement>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [templateFile, setTemplateFile] = useState<File | null>(null)

  // Saved paths
  const [savedLogoPath, setSavedLogoPath] = useState("")
  const [savedTemplatePath, setSavedTemplatePath] = useState("")

  // Status flags
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingTemplate, setUploadingTemplate] = useState(false)
  const [logoUploadDone, setLogoUploadDone] = useState(false)
  const [templateUploadDone, setTemplateUploadDone] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await authFetch("/api/admin/users")
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const openUserModal = (user: User) => {
    setSelectedUser(user)
    setHeaderText(user.template?.headerText || "")
    setFooterText(user.template?.footerText || "")
    setTemplateStyle(user.template?.templateStyle || "Classic")
    setSavedLogoPath(user.template?.logoPath || "")
    setSavedTemplatePath(user.template?.templatePath || "")
    setLogoFile(null)
    setTemplateFile(null)
    setLogoUploadDone(false)
    setTemplateUploadDone(false)
    setModalOpen(true)
  }

  // ✅ Upload logo using React state file
  const uploadLogo = async () => {
    console.log("uploadLogo called, logoFile:", logoFile)
    if (!logoFile) {
      alert("Please select a logo file first")
      return
    }
    setUploadingLogo(true)
    try {
      const formData = new FormData()
      formData.append("file", logoFile)
      console.log("Calling /api/upload for logo...")
      const res = await authFetch("/api/upload", { method: "POST", body: formData })
      console.log("Upload response status:", res.status)
      const data = await res.json()
      console.log("Upload response data:", data)
      if (!res.ok) {
        alert("Upload failed: " + (data.error || "Unknown error"))
        return
      }
      setSavedLogoPath(data.path)
      setLogoUploadDone(true)
      alert("✅ Logo uploaded: " + data.path)
    } catch (err) {
      console.error("Logo upload error:", err)
      alert("Logo upload error: " + String(err))
    } finally {
      setUploadingLogo(false)
    }
  }

  // ✅ Upload template PDF using React state file
  const uploadTemplate = async () => {
    console.log("uploadTemplate called, templateFile:", templateFile)
    if (!templateFile) {
      alert("Please select a template PDF file first")
      return
    }
    setUploadingTemplate(true)
    try {
      const formData = new FormData()
      formData.append("file", templateFile)
      console.log("Calling /api/upload for template...")
      const res = await authFetch("/api/upload", { method: "POST", body: formData })
      console.log("Template upload status:", res.status)
      const data = await res.json()
      console.log("Template upload data:", data)
      if (!res.ok) {
        alert("Upload failed: " + (data.error || "Unknown error"))
        return
      }
      setSavedTemplatePath(data.path)
      setTemplateUploadDone(true)
      alert("✅ Template uploaded: " + data.path)
    } catch (err) {
      console.error("Template upload error:", err)
      alert("Template upload error: " + String(err))
    } finally {
      setUploadingTemplate(false)
    }
  }

  // ✅ Save all template settings for this user
  const saveTemplate = async () => {
    if (!selectedUser) return
    console.log("Saving template:", { logoPath: savedLogoPath, templatePath: savedTemplatePath, headerText, footerText, templateStyle })
    setSaving(true)
    try {
      const res = await authFetch(`/api/admin/template/${selectedUser._id}`, {
        method: "POST",
        body: JSON.stringify({
          logoPath: savedLogoPath,
          templatePath: savedTemplatePath,
          headerText,
          footerText,
          templateStyle,
        }),
      })
      const saved = await res.json()
      console.log("Save response:", saved)
      if (!res.ok) {
        alert("Failed to save: " + (saved.error || "Unknown error"))
        return
      }
      setUsers(users.map(u =>
        u._id === selectedUser._id
          ? { ...u, hasTemplate: true, template: saved }
          : u
      ))
      alert(`✅ Template saved for ${selectedUser.name}!`)
      setModalOpen(false)
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to save: " + String(error))
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Loading users...
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Users className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage invoice templates for each user</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">With Template</p>
            <p className="text-2xl font-bold text-green-600">{users.filter(u => u.hasTemplate).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">No Template</p>
            <p className="text-2xl font-bold text-yellow-600">{users.filter(u => !u.hasTemplate).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {users.length === 0 && (
              <p className="text-center text-muted-foreground py-6">No users found</p>
            )}
            {users.map(user => (
              <div
                key={user._id}
                className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/30 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {user.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="size-3" />{user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />{formatDate(user.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {user.hasTemplate ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
                      <CheckCircle className="size-3" />Template Set
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200 flex items-center gap-1">
                      <XCircle className="size-3" />No Template
                    </Badge>
                  )}
                  <Button size="sm" onClick={() => openUserModal(user)}>
                    {user.hasTemplate ? "Edit Template" : "Set Template"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Template for {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6 py-2">

            {/* User Details */}
            <div className="rounded-lg bg-muted/40 p-3 text-sm flex flex-col gap-1">
              <p><span className="text-muted-foreground">Email:</span> {selectedUser?.email}</p>
              <p><span className="text-muted-foreground">Joined:</span> {selectedUser?.createdAt ? formatDate(selectedUser.createdAt) : ""}</p>
              <p>
                <span className="text-muted-foreground">Status:</span>{" "}
                {selectedUser?.hasTemplate
                  ? <span className="text-green-600 font-medium">✅ Template exists</span>
                  : <span className="text-yellow-600 font-medium">⚠️ No template yet</span>
                }
              </p>
            </div>

            {/* Logo Upload */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="size-4" />Company Logo
              </Label>
              <div className="flex gap-2">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0] || null
                    console.log("Logo file selected:", file?.name)
                    setLogoFile(file)
                    setLogoUploadDone(false)
                  }}
                  className="flex-1 text-sm border rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary cursor-pointer"
                />
                <Button
                  type="button"
                  onClick={uploadLogo}
                  disabled={uploadingLogo || !logoFile}
                  size="sm"
                >
                  <Upload className="size-4 mr-1" />
                  {uploadingLogo ? "Uploading..." : "Upload"}
                </Button>
              </div>
              {logoFile && !logoUploadDone && (
                <p className="text-xs text-yellow-600">⚠️ "{logoFile.name}" selected — click Upload to save</p>
              )}
              {logoUploadDone && savedLogoPath && (
                <p className="text-xs text-green-600">✅ Uploaded: {savedLogoPath}</p>
              )}
              {!logoUploadDone && savedLogoPath && (
                <p className="text-xs text-blue-600">📁 Current logo: {savedLogoPath}</p>
              )}
            </div>

            {/* PDF Template Upload */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <FileText className="size-4" />PDF Template File
              </Label>
              <div className="flex gap-2">
                <input
                  ref={templateInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={e => {
                    const file = e.target.files?.[0] || null
                    console.log("Template file selected:", file?.name)
                    setTemplateFile(file)
                    setTemplateUploadDone(false)
                  }}
                  className="flex-1 text-sm border rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary cursor-pointer"
                />
                <Button
                  type="button"
                  onClick={uploadTemplate}
                  disabled={uploadingTemplate || !templateFile}
                  size="sm"
                >
                  <Upload className="size-4 mr-1" />
                  {uploadingTemplate ? "Uploading..." : "Upload"}
                </Button>
              </div>
              {templateFile && !templateUploadDone && (
                <p className="text-xs text-yellow-600">⚠️ "{templateFile.name}" selected — click Upload to save</p>
              )}
              {templateUploadDone && savedTemplatePath && (
                <p className="text-xs text-green-600">✅ Uploaded: {savedTemplatePath}</p>
              )}
              {!templateUploadDone && savedTemplatePath && (
                <p className="text-xs text-blue-600">📁 Current template: {savedTemplatePath}</p>
              )}
            </div>

            {/* Header Text */}
            <div className="flex flex-col gap-2">
              <Label>Header Text (Company name, address, phone)</Label>
              <textarea
                className="w-full border rounded-md p-3 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder={`ABC Company Pvt Ltd\n123 Main Street, Chennai - 600001\nPhone: 9876543210 | GST: 33XXXXX`}
                value={headerText}
                onChange={e => setHeaderText(e.target.value)}
              />
            </div>

            {/* Footer Text */}
            <div className="flex flex-col gap-2">
              <Label>Footer Text (Thank you note, terms, bank details)</Label>
              <textarea
                className="w-full border rounded-md p-3 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder={`Thank you for your business!\nPayment due within 30 days.\nBank: HDFC | Acc: XXXX | IFSC: HDFC0001`}
                value={footerText}
                onChange={e => setFooterText(e.target.value)}
              />
            </div>

            {/* Template Style */}
            <div className="flex flex-col gap-2">
              <Label>Invoice Template Style</Label>
              <Select value={templateStyle} onValueChange={setTemplateStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Classic">Classic — Traditional layout</SelectItem>
                  <SelectItem value="Modern">Modern — Clean & colorful</SelectItem>
                  <SelectItem value="Minimal">Minimal — Simple & clean</SelectItem>
                  <SelectItem value="Professional">Professional — Corporate style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Save Button */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={saveTemplate}
                disabled={saving}
                className="flex-1"
              >
                {saving ? "Saving..." : "💾 Save Template"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}