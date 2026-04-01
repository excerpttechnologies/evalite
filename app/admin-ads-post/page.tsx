"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineTrash,
  HiOutlineLink,
  HiOutlinePhone,
  HiOutlineSpeakerphone,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineCloudUpload,
  HiOutlineChip,
  HiArrowRight,
  HiX,
  HiOutlinePencilAlt,
  HiOutlineEye,
  HiOutlineRefresh,
  HiOutlineExternalLink,
} from "react-icons/hi"
import { TbAd2 } from "react-icons/tb"
import { MdOutlineDriveFileRenameOutline } from "react-icons/md"

const MAX_FILES = 5

type MediaFile = {
  id: string
  file: File
  preview: string
  type: "image" | "video"
}

type AdRecord = {
  _id: string
  adName: string
  clickLink: string
  contact?: string
  mediaPaths: string[]
  mediaTypes: string[]
  isActive: boolean
  createdAt: string
}

type ToastType = "success" | "error" | null
type ModalType = "delete" | "edit" | null

export default function AdminAdsPostingPage() {
  const dropRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  // ── Form state (new ad) ──
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [adName, setAdName] = useState("")
  const [clickLink, setClickLink] = useState("")
  const [contact, setContact] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // ── Posted ads list ──
  const [ads, setAds] = useState<AdRecord[]>([])
  const [loadingAds, setLoadingAds] = useState(true)

  // ── Toast ──
  const [toast, setToast] = useState<{ type: ToastType; msg: string }>({ type: null, msg: "" })

  // ── Delete modal ──
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; ad: AdRecord | null }>({ open: false, ad: null })
  const [isDeleting, setIsDeleting] = useState(false)

  // ── Edit modal ──
  const [editModal, setEditModal] = useState<{ open: boolean; ad: AdRecord | null }>({ open: false, ad: null })
  const [editName, setEditName] = useState("")
  const [editLink, setEditLink] = useState("")
  const [editContact, setEditContact] = useState("")
  const [editNewFiles, setEditNewFiles] = useState<MediaFile[]>([])
  const [editRemovedPaths, setEditRemovedPaths] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // ── Fetch ads on mount ──
  useEffect(() => { fetchAds() }, [])

  const fetchAds = async () => {
    setLoadingAds(true)
    try {
      const res = await fetch("/api/admin/ads")
      const data = await res.json()
      if (data.success) setAds(data.ads)
    } catch { } finally { setLoadingAds(false) }
  }

  const showToast = (type: ToastType, msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast({ type: null, msg: "" }), 4000)
  }

  // ── New ad: file handling ──
  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming)
    const allowed = MAX_FILES - mediaFiles.length
    if (allowed <= 0) { showToast("error", `Maximum ${MAX_FILES} files allowed.`); return }
    const toAdd = arr.slice(0, allowed)
    const mapped: MediaFile[] = toAdd.map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      file: f,
      preview: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image",
    }))
    setMediaFiles((prev) => [...prev, ...mapped])
    if (arr.length > allowed) showToast("error", `Only first ${allowed} file(s) added.`)
  }, [mediaFiles.length])

  const removeFile = (id: string) => {
    setMediaFiles((prev) => {
      const removed = prev.find((f) => f.id === id)
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  // ── Submit new ad ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!adName.trim()) { showToast("error", "Please enter an ad name."); return }
    if (mediaFiles.length === 0) { showToast("error", "Please upload at least one image or video."); return }
    if (!clickLink.trim()) { showToast("error", "Please enter a clickable link."); return }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("adName", adName.trim())
      formData.append("clickLink", clickLink.trim())
      formData.append("contact", contact.trim())
      mediaFiles.forEach((mf) => formData.append("media", mf.file))

      const res = await fetch("/api/admin/ads", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to post ad")

      showToast("success", "Ad published successfully!")
      setAdName(""); setClickLink(""); setContact("")
      mediaFiles.forEach((f) => URL.revokeObjectURL(f.preview))
      setMediaFiles([])
      fetchAds()
    } catch (err: any) {
      showToast("error", err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── DELETE ──
  const confirmDelete = async () => {
    if (!deleteModal.ad) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/ads?id=${deleteModal.ad._id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast("success", "Ad deleted successfully.")
      setDeleteModal({ open: false, ad: null })
      fetchAds()
    } catch (err: any) {
      showToast("error", err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  // ── EDIT: open modal ──
  const openEdit = (ad: AdRecord) => {
    setEditModal({ open: true, ad })
    setEditName(ad.adName)
    setEditLink(ad.clickLink)
    setEditContact(ad.contact || "")
    setEditNewFiles([])
    setEditRemovedPaths([])
  }

  const addEditFiles = (incoming: FileList | File[]) => {
    const existing = (editModal.ad?.mediaPaths.length || 0) - editRemovedPaths.length + editNewFiles.length
    const allowed = MAX_FILES - existing
    if (allowed <= 0) { showToast("error", `Maximum ${MAX_FILES} files.`); return }
    const arr = Array.from(incoming).slice(0, allowed)
    const mapped: MediaFile[] = arr.map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      file: f,
      preview: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image",
    }))
    setEditNewFiles((prev) => [...prev, ...mapped])
  }

  const removeEditExisting = (path: string) => setEditRemovedPaths((prev) => [...prev, path])
  const removeEditNew = (id: string) => {
    setEditNewFiles((prev) => {
      const r = prev.find((f) => f.id === id)
      if (r) URL.revokeObjectURL(r.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  const saveEdit = async () => {
    if (!editModal.ad) return
    if (!editName.trim()) { showToast("error", "Ad name is required."); return }
    if (!editLink.trim()) { showToast("error", "Clickable link is required."); return }

    const remainingPaths = editModal.ad.mediaPaths.filter((p) => !editRemovedPaths.includes(p))
    if (remainingPaths.length + editNewFiles.length === 0) {
      showToast("error", "At least one media file is required."); return
    }

    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("adName", editName.trim())
      formData.append("clickLink", editLink.trim())
      formData.append("contact", editContact.trim())
      formData.append("removedPaths", JSON.stringify(editRemovedPaths))
      editNewFiles.forEach((mf) => formData.append("media", mf.file))

      const res = await fetch(`/api/admin/ads?id=${editModal.ad._id}`, { method: "PUT", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      showToast("success", "Ad updated successfully!")
      setEditModal({ open: false, ad: null })
      editNewFiles.forEach((f) => URL.revokeObjectURL(f.preview))
      fetchAds()
    } catch (err: any) {
      showToast("error", err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f9fafb;
          --white: #ffffff;
          --accent: #f97316;
          --accent-dark: #ea580c;
          --accent-light: #fff7ed;
          --accent-mid: #fed7aa;
          --text: #111827;
          --muted: #6b7280;
          --border: #e5e7eb;
          --surface: #f3f4f6;
          --green: #16a34a;
          --green-bg: #f0fdf4;
          --red: #dc2626;
          --red-bg: #fef2f2;
          --font: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes shimmer  { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes spinRing { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
        @keyframes spinRing2{ from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
        @keyframes pulse    { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes toastIn  { from{opacity:0;transform:translateX(60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes modalIn  { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }

        body { background: var(--bg); font-family: var(--font); }

        .page { min-height:100vh; background:var(--bg); padding:32px 24px 80px; }
        .page::before {
          content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image:radial-gradient(circle,#f97316 1px,transparent 1px);
          background-size:28px 28px; opacity:0.05;
        }
        .inner { max-width:900px; margin:0 auto; position:relative; z-index:1; }

        /* HEADER */
        .page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
        .header-left  { display:flex; align-items:center; gap:14px; }
        .logo-hex     { width:44px; height:44px; position:relative; display:flex; align-items:center; justify-content:center; }
        .logo-hex svg { position:absolute; inset:0; }
        .logo-hex svg:first-child  { animation:spinRing  8s linear infinite; }
        .logo-hex svg:nth-child(2) { animation:spinRing2 12s linear infinite; }
        .logo-hex-inner { position:relative; z-index:1; color:var(--accent); font-size:18px; }
        .page-title { font-family:'Bebas Neue',sans-serif; font-size:30px; color:var(--text); letter-spacing:2px; line-height:1; }
        .page-sub   { font-size:12px; color:var(--muted); margin-top:2px; font-weight:500; }
        .breadcrumb { display:flex; align-items:center; gap:6px; font-size:11px; color:var(--muted); font-weight:600; background:var(--white); border:1px solid var(--border); border-radius:20px; padding:6px 14px; }
        .bc-sep    { color:var(--accent-mid); }
        .bc-active { color:var(--accent); }

        /* FORM CARD */
        .form-card { background:var(--white); border:1.5px solid var(--border); border-radius:20px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.06); animation:fadeUp 0.55s 0.08s cubic-bezier(.22,1,.36,1) both; }
        .form-card-top { height:4px; background:linear-gradient(90deg,var(--accent),#fb923c,#fdba74,var(--accent)); background-size:200%; animation:shimmer 3s linear infinite; }
        .form-body { padding:32px 36px 36px; }

        .section-title { display:flex; align-items:center; gap:8px; font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:18px; padding-bottom:10px; border-bottom:1px solid var(--border); }
        .section-title svg { color:var(--accent); font-size:15px; }

        /* UPLOAD ZONE */
        .upload-zone { border:2px dashed var(--accent-mid); border-radius:14px; background:var(--accent-light); padding:28px 20px; text-align:center; cursor:pointer; transition:border-color .2s,background .2s,transform .15s; margin-bottom:16px; }
        .upload-zone:hover  { border-color:var(--accent); background:#fff3e5; transform:scale(1.004); }
        .upload-zone.drag   { border-color:var(--accent); background:#ffe8d0; box-shadow:0 0 0 4px rgba(249,115,22,.1); }
        .upload-icon  { font-size:36px; color:var(--accent); margin-bottom:8px; opacity:.85; }
        .upload-label { font-size:14px; font-weight:700; color:var(--text); margin-bottom:4px; }
        .upload-sub   { font-size:12px; color:var(--muted); }
        .upload-badge { display:inline-flex; align-items:center; gap:4px; margin-top:10px; background:var(--white); border:1px solid var(--accent-mid); border-radius:20px; padding:3px 10px; font-size:11px; color:var(--accent-dark); font-weight:600; }
        .file-input   { display:none; }

        .counter-pill { display:inline-flex; align-items:center; gap:5px; background:var(--accent-light); border:1px solid var(--accent-mid); border-radius:20px; padding:4px 12px; font-size:11px; font-weight:700; color:var(--accent-dark); margin-bottom:12px; }
        .counter-pill.full { background:var(--red-bg); border-color:#fecaca; color:var(--red); }

        /* MEDIA GRID */
        .media-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:10px; margin-bottom:8px; }
        .media-item { position:relative; border-radius:12px; overflow:hidden; border:2px solid var(--border); background:var(--surface); aspect-ratio:1; transition:border-color .2s,transform .15s; animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both; }
        .media-item:hover { border-color:var(--accent-mid); transform:scale(1.02); }
        .media-item img,.media-item video { width:100%; height:100%; object-fit:cover; display:block; }
        .media-type-badge { position:absolute; top:5px; left:5px; background:rgba(0,0,0,.55); border-radius:5px; padding:2px 6px; font-size:9px; font-weight:700; color:#fff; display:flex; align-items:center; gap:3px; }
        .media-remove { position:absolute; top:5px; right:5px; width:22px; height:22px; border-radius:50%; background:rgba(220,38,38,.85); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; transition:background .15s,transform .15s; }
        .media-remove:hover { background:var(--red); transform:scale(1.12); }
        .media-filename { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(0deg,rgba(0,0,0,.65),transparent); padding:18px 5px 5px; font-size:9px; color:#fff; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

        /* FIELDS */
        .fields-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:24px; }
        .field-full  { grid-column:1/-1; }
        .f-label { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; transition:color .2s; }
        .f-label svg { font-size:13px; color:var(--accent); }
        .f-label.act { color:var(--accent); }
        .inp-wrap { position:relative; }
        .inp-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:#d1d5db; font-size:16px; pointer-events:none; transition:color .2s; }
        .inp-icon.act { color:var(--accent); }
        .f-inp { width:100%; height:48px; padding:0 14px 0 42px; background:var(--surface); border:1.5px solid var(--border); border-radius:12px; color:var(--text); font-size:14px; font-family:var(--font); outline:none; transition:border-color .2s,box-shadow .2s,background .2s; }
        .f-inp::placeholder { color:#d1d5db; }
        .f-inp:focus { border-color:var(--accent); background:var(--white); box-shadow:0 0 0 3px rgba(249,115,22,.1); }
        .f-inp:disabled { opacity:.5; cursor:not-allowed; }
        .f-hint { font-size:11px; color:var(--muted); margin-top:5px; padding-left:2px; }

        /* FORM FOOTER */
        .form-footer { display:flex; align-items:center; justify-content:space-between; margin-top:32px; padding-top:22px; border-top:1px solid var(--border); flex-wrap:wrap; gap:12px; }
        .footer-info { font-size:12px; color:var(--muted); }
        .footer-info strong { color:var(--text); }
        .btn-row { display:flex; gap:10px; }
        .btn-cancel { height:46px; padding:0 22px; border:1.5px solid var(--border); border-radius:12px; background:transparent; color:var(--muted); font-family:var(--font); font-size:13px; font-weight:600; cursor:pointer; transition:border-color .2s,color .2s,background .2s; display:flex; align-items:center; gap:6px; }
        .btn-cancel:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-light); }
        .btn-submit { height:46px; padding:0 28px; border:none; border-radius:12px; background:linear-gradient(135deg,var(--accent),var(--accent-dark)); color:#fff; font-family:var(--font); font-size:13px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:8px; position:relative; overflow:hidden; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 14px rgba(249,115,22,.3); }
        .btn-submit::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent); transform:translateX(-100%); transition:transform .5s; }
        .btn-submit:hover:not(:disabled)::after { transform:translateX(100%); }
        .btn-submit:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 24px rgba(249,115,22,.4); }
        .btn-submit:disabled { opacity:.55; cursor:not-allowed; }

        /* ── POSTED ADS SECTION ── */
        .ads-section { margin-top:36px; animation:fadeUp .55s .15s cubic-bezier(.22,1,.36,1) both; }
        .ads-section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
        .ads-section-title { font-family:'Bebas Neue',sans-serif; font-size:22px; color:var(--text); letter-spacing:2px; display:flex; align-items:center; gap:10px; }
        .ads-count-badge { font-family:var(--font); font-size:11px; font-weight:700; background:var(--accent-light); border:1px solid var(--accent-mid); color:var(--accent-dark); border-radius:20px; padding:3px 10px; letter-spacing:0; }
        .refresh-btn { display:flex; align-items:center; gap:5px; font-size:12px; font-weight:600; color:var(--muted); background:var(--white); border:1px solid var(--border); border-radius:20px; padding:6px 14px; cursor:pointer; transition:border-color .2s,color .2s; }
        .refresh-btn:hover { border-color:var(--accent); color:var(--accent); }

        /* ADS GRID */
        .ads-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }

        .ad-card { background:var(--white); border:1.5px solid var(--border); border-radius:16px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,.05); transition:border-color .2s,box-shadow .2s,transform .15s; }
        .ad-card:hover { border-color:var(--accent-mid); box-shadow:0 6px 24px rgba(249,115,22,.1); transform:translateY(-2px); }
        .ad-card-top { height:3px; background:linear-gradient(90deg,var(--accent),#fb923c); }

        /* Media slider */
        .ad-media { position:relative; height:160px; background:var(--surface); overflow:hidden; }
        .ad-media img,.ad-media video { width:100%; height:100%; object-fit:cover; display:block; }
        .ad-media-count { position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,.6); color:#fff; font-size:10px; font-weight:700; border-radius:8px; padding:2px 7px; display:flex; align-items:center; gap:4px; }
        .ad-media-nav { position:absolute; top:50%; transform:translateY(-50%); background:rgba(0,0,0,.45); border:none; color:#fff; cursor:pointer; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; font-size:12px; transition:background .15s; }
        .ad-media-nav:hover { background:rgba(0,0,0,.7); }
        .ad-media-nav.prev { left:6px; }
        .ad-media-nav.next { right:6px; }
        .ad-active-badge { position:absolute; top:8px; left:8px; background:var(--green-bg); border:1px solid #bbf7d0; color:var(--green); font-size:9px; font-weight:700; border-radius:6px; padding:2px 7px; }

        /* Card body */
        .ad-body { padding:14px 16px; }
        .ad-name { font-size:14px; font-weight:700; color:var(--text); margin-bottom:8px; line-height:1.35; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ad-meta { display:flex; flex-direction:column; gap:5px; margin-bottom:12px; }
        .ad-meta-row { display:flex; align-items:center; gap:6px; font-size:11px; color:var(--muted); font-weight:500; }
        .ad-meta-row svg { color:var(--accent); font-size:13px; flex-shrink:0; }
        .ad-meta-row a { color:var(--accent); text-decoration:none; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:180px; }
        .ad-meta-row a:hover { text-decoration:underline; }
        .ad-date { font-size:10px; color:#9ca3af; margin-bottom:12px; }

        /* Card actions */
        .ad-actions { display:flex; gap:8px; padding-top:12px; border-top:1px solid var(--border); }
        .ad-btn { flex:1; height:36px; border-radius:9px; border:none; font-family:var(--font); font-size:12px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px; transition:background .15s,transform .12s,box-shadow .15s; }
        .ad-btn:hover { transform:translateY(-1px); }
        .ad-btn.edit { background:var(--accent-light); color:var(--accent-dark); border:1px solid var(--accent-mid); }
        .ad-btn.edit:hover { background:#ffe0c2; box-shadow:0 3px 10px rgba(249,115,22,.2); }
        .ad-btn.del  { background:var(--red-bg); color:var(--red); border:1px solid #fecaca; }
        .ad-btn.del:hover  { background:#fee2e2; box-shadow:0 3px 10px rgba(220,38,38,.15); }

        /* EMPTY STATE */
        .empty-state { text-align:center; padding:60px 20px; }
        .empty-icon  { font-size:48px; color:var(--accent-mid); margin-bottom:12px; }
        .empty-title { font-size:16px; font-weight:700; color:var(--text); margin-bottom:6px; }
        .empty-sub   { font-size:13px; color:var(--muted); }

        /* LOADING SKELETON */
        @keyframes skeletonPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
        .skeleton { background:var(--border); border-radius:8px; animation:skeletonPulse 1.4s ease-in-out infinite; }

        /* ── MODAL OVERLAY ── */
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); backdrop-filter:blur(3px); z-index:999; display:flex; align-items:center; justify-content:center; padding:20px; }
        .modal-box { background:var(--white); border-radius:20px; width:100%; max-width:480px; box-shadow:0 24px 64px rgba(0,0,0,.18); overflow:hidden; animation:modalIn .25s cubic-bezier(.22,1,.36,1) both; }
        .modal-top  { height:4px; background:linear-gradient(90deg,var(--accent),#fb923c); }
        .modal-body { padding:28px 28px 24px; }
        .modal-title { font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--text); letter-spacing:1.5px; margin-bottom:6px; }
        .modal-sub   { font-size:13px; color:var(--muted); margin-bottom:22px; }
        .modal-footer { display:flex; justify-content:flex-end; gap:10px; margin-top:24px; padding-top:18px; border-top:1px solid var(--border); }

        /* Edit modal media */
        .edit-media-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(90px,1fr)); gap:8px; margin-bottom:12px; }
        .edit-media-item { position:relative; border-radius:10px; overflow:hidden; border:2px solid var(--border); aspect-ratio:1; background:var(--surface); }
        .edit-media-item img,.edit-media-item video { width:100%; height:100%; object-fit:cover; display:block; }
        .edit-media-item .media-remove { top:4px; right:4px; width:20px; height:20px; font-size:10px; }
        .removed-overlay { position:absolute; inset:0; background:rgba(220,38,38,.55); display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; font-weight:700; }

        /* Delete confirm */
        .delete-preview { display:flex; align-items:center; gap:12px; background:var(--red-bg); border:1px solid #fecaca; border-radius:12px; padding:12px 14px; margin-bottom:6px; }
        .delete-preview-icon { font-size:28px; color:var(--red); flex-shrink:0; }
        .delete-preview-name { font-size:13px; font-weight:700; color:var(--text); }
        .delete-preview-sub  { font-size:11px; color:var(--muted); margin-top:2px; }

        /* TOAST */
        .toast { position:fixed; top:24px; right:24px; z-index:9999; display:flex; align-items:center; gap:10px; padding:13px 18px; border-radius:12px; font-size:13px; font-weight:600; font-family:var(--font); box-shadow:0 8px 32px rgba(0,0,0,.12); animation:toastIn .35s cubic-bezier(.22,1,.36,1) both; max-width:340px; }
        .toast.success { background:var(--white); border:1.5px solid #bbf7d0; color:var(--green); }
        .toast.error   { background:var(--white); border:1.5px solid #fecaca; color:var(--red); }
        .toast svg { font-size:18px; flex-shrink:0; }

        .spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,.4); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
        .spinner-dark { width:14px; height:14px; border:2px solid rgba(0,0,0,.15); border-top-color:var(--accent); border-radius:50%; animation:spin .7s linear infinite; }

        /* modal scrollable */
        .modal-scroll { max-height:60vh; overflow-y:auto; padding-right:4px; }
        .modal-scroll::-webkit-scrollbar { width:4px; }
        .modal-scroll::-webkit-scrollbar-thumb { background:var(--border); border-radius:4px; }
      `}</style>

      {/* TOAST */}
      {toast.type && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? <HiOutlineCheckCircle /> : <HiOutlineExclamationCircle />}
          {toast.msg}
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteModal.open && deleteModal.ad && (
        <div className="modal-overlay" onClick={() => !isDeleting && setDeleteModal({ open: false, ad: null })}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top" />
            <div className="modal-body">
              <div className="modal-title">Delete Ad</div>
              <div className="modal-sub">This action cannot be undone. The ad and its media will be permanently removed.</div>
              <div className="delete-preview">
                <div className="delete-preview-icon"><TbAd2 /></div>
                <div>
                  <div className="delete-preview-name">{deleteModal.ad.adName}</div>
                  <div className="delete-preview-sub">{deleteModal.ad.mediaPaths.length} file(s) · {formatDate(deleteModal.ad.createdAt)}</div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setDeleteModal({ open: false, ad: null })} disabled={isDeleting}>
                  <HiX /> Cancel
                </button>
                <button
                  className="btn-submit" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 14px rgba(220,38,38,.3)" }}
                  onClick={confirmDelete} disabled={isDeleting}
                >
                  {isDeleting ? <><div className="spinner" />Deleting…</> : <><HiOutlineTrash style={{ fontSize: "15px" }} />Delete</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editModal.open && editModal.ad && (
        <div className="modal-overlay" onClick={() => !isSaving && setEditModal({ open: false, ad: null })}>
          <div className="modal-box" style={{ maxWidth: "540px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-top" />
            <div className="modal-body">
              <div className="modal-title">Edit Ad</div>
              <div className="modal-sub">Update your ad details and media files.</div>
              <div className="modal-scroll">

                {/* Existing media */}
                <div style={{ marginBottom: "14px" }}>
                  <div className="f-label" style={{ marginBottom: "8px" }}><HiOutlinePhotograph />Current Media</div>
                  <div className="edit-media-grid">
                    {editModal.ad.mediaPaths.map((path, i) => (
                      <div key={path} className="edit-media-item">
                        {editModal.ad!.mediaTypes[i] === "video"
                          ? <video src={path} muted />
                          : <img src={path} alt="" />}
                        {editRemovedPaths.includes(path)
                          ? <div className="removed-overlay">REMOVED</div>
                          : <button type="button" className="media-remove" onClick={() => removeEditExisting(path)}><HiOutlineTrash /></button>}
                      </div>
                    ))}
                    {editNewFiles.map((mf) => (
                      <div key={mf.id} className="edit-media-item">
                        {mf.type === "video" ? <video src={mf.preview} muted /> : <img src={mf.preview} alt="" />}
                        <button type="button" className="media-remove" onClick={() => removeEditNew(mf.id)}><HiX /></button>
                      </div>
                    ))}
                  </div>
                  {/* Add more files button */}
                  {(editModal.ad.mediaPaths.length - editRemovedPaths.length + editNewFiles.length) < MAX_FILES && (
                    <button type="button" className="btn-cancel" style={{ fontSize: "11px", height: "34px", padding: "0 14px" }}
                      onClick={() => editFileInputRef.current?.click()}>
                      <HiOutlineCloudUpload /> Add More Files
                    </button>
                  )}
                  <input ref={editFileInputRef} type="file" className="file-input" accept="image/*,video/*" multiple
                    onChange={(e) => e.target.files && addEditFiles(e.target.files)} />
                </div>

                {/* Ad Name */}
                <div className="field" style={{ marginBottom: "14px" }}>
                  <div className={`f-label${editName ? " act" : ""}`}><MdOutlineDriveFileRenameOutline />Ad Name</div>
                  <div className="inp-wrap">
                    <HiOutlineSpeakerphone className={`inp-icon${editName ? " act" : ""}`} />
                    <input className="f-inp" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} maxLength={120} placeholder="Ad name / title" />
                  </div>
                </div>

                {/* Click Link */}
                <div className="field" style={{ marginBottom: "14px" }}>
                  <div className={`f-label${editLink ? " act" : ""}`}><HiOutlineLink />Clickable Link</div>
                  <div className="inp-wrap">
                    <HiOutlineLink className={`inp-icon${editLink ? " act" : ""}`} />
                    <input className="f-inp" type="url" value={editLink} onChange={(e) => setEditLink(e.target.value)} placeholder="https://yourwebsite.com" />
                  </div>
                </div>

                {/* Contact */}
                <div className="field" style={{ marginBottom: "4px" }}>
                  <div className={`f-label${editContact ? " act" : ""}`}><HiOutlinePhone />Phone / Website / Contact</div>
                  <div className="inp-wrap">
                    <HiOutlinePhone className={`inp-icon${editContact ? " act" : ""}`} />
                    <input className="f-inp" type="text" value={editContact} onChange={(e) => setEditContact(e.target.value)} placeholder="+91 98765 43210 or www.site.com" />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => { setEditModal({ open: false, ad: null }); editNewFiles.forEach(f => URL.revokeObjectURL(f.preview)) }} disabled={isSaving}>
                  <HiX /> Cancel
                </button>
                <button className="btn-submit" onClick={saveEdit} disabled={isSaving}>
                  {isSaving ? <><div className="spinner" />Saving…</> : <><HiOutlineCheckCircle style={{ fontSize: "15px" }} />Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="page">
        <div className="inner">

          {/* PAGE HEADER */}
          <div className="page-header">
            <div className="header-left">
              <div className="logo-hex">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="20" stroke="rgba(249,115,22,0.35)" strokeWidth="1.5" strokeDasharray="4 3" />
                </svg>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="13" stroke="rgba(234,88,12,0.25)" strokeWidth="1" strokeDasharray="2 4" />
                </svg>
                <span className="logo-hex-inner"><HiOutlineChip /></span>
              </div>
              <div>
                <div className="page-title">Ad Campaign Manager</div>
                <div className="page-sub">evaLite ERP · Promotions Module</div>
              </div>
            </div>
            <div className="breadcrumb">
              <span>Admin</span><span className="bc-sep">›</span>
              <span>Ads</span><span className="bc-sep">›</span>
              <span className="bc-active">Manage</span>
            </div>
          </div>

          {/* ── POST NEW AD FORM ── */}
          <div className="form-card">
            <div className="form-card-top" />
            <div className="form-body">
              <form onSubmit={handleSubmit}>

                <div className="section-title"><HiOutlinePhotograph />Media Upload</div>

                <div className={`counter-pill${mediaFiles.length >= MAX_FILES ? " full" : ""}`}>
                  {mediaFiles.length >= MAX_FILES
                    ? <><HiX style={{ fontSize: "11px" }} />Limit reached ({MAX_FILES}/{MAX_FILES})</>
                    : <><HiOutlineCloudUpload style={{ fontSize: "11px" }} />{mediaFiles.length}/{MAX_FILES} files uploaded</>}
                </div>

                {mediaFiles.length < MAX_FILES && (
                  <div
                    ref={dropRef}
                    className={`upload-zone${isDragging ? " drag" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <div className="upload-icon">{isDragging ? <HiOutlineCloudUpload /> : <HiOutlinePhotograph />}</div>
                    <div className="upload-label">{isDragging ? "Drop files here!" : "Click or drag & drop files"}</div>
                    <div className="upload-sub">Supports JPG, PNG, GIF, MP4, MOV, WEBM</div>
                    <div className="upload-badge"><HiOutlineVideoCamera style={{ fontSize: "11px" }} />Up to {MAX_FILES} images or videos</div>
                    <input ref={fileInputRef} type="file" className="file-input" accept="image/*,video/*" multiple onChange={(e) => e.target.files && addFiles(e.target.files)} />
                  </div>
                )}

                {mediaFiles.length > 0 && (
                  <div className="media-grid">
                    {mediaFiles.map((mf, idx) => (
                      <div key={mf.id} className="media-item" style={{ animationDelay: `${idx * 0.07}s` }}>
                        {mf.type === "image" ? <img src={mf.preview} alt={mf.file.name} /> : <video src={mf.preview} muted playsInline />}
                        <div className="media-type-badge">
                          {mf.type === "image" ? <><HiOutlinePhotograph style={{ fontSize: "9px" }} />IMG</> : <><HiOutlineVideoCamera style={{ fontSize: "9px" }} />VID</>}
                        </div>
                        <button type="button" className="media-remove" onClick={() => removeFile(mf.id)}><HiOutlineTrash /></button>
                        <div className="media-filename">{mf.file.name}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="section-title" style={{ marginTop: "28px" }}><TbAd2 />Ad Details</div>

                <div className="fields-grid">
                  <div className="field field-full">
                    <div className={`f-label${adName ? " act" : ""}`}><MdOutlineDriveFileRenameOutline />Ad Name / Title</div>
                    <div className="inp-wrap">
                      <HiOutlineSpeakerphone className={`inp-icon${adName ? " act" : ""}`} />
                      <input className="f-inp" type="text" placeholder="e.g. Summer Sale — 50% Off on All Products" value={adName} onChange={(e) => setAdName(e.target.value)} maxLength={120} required />
                    </div>
                    <div className="f-hint">{adName.length}/120 characters</div>
                  </div>

                  <div className="field">
                    <div className={`f-label${clickLink ? " act" : ""}`}><HiOutlineLink />Clickable Link</div>
                    <div className="inp-wrap">
                      <HiOutlineLink className={`inp-icon${clickLink ? " act" : ""}`} />
                      <input className="f-inp" type="url" placeholder="https://yourwebsite.com/offer" value={clickLink} onChange={(e) => setClickLink(e.target.value)} required />
                    </div>
                    <div className="f-hint">URL visitors go to when they click the ad</div>
                  </div>

                  <div className="field">
                    <div className={`f-label${contact ? " act" : ""}`}><HiOutlinePhone />Phone / Website / Contact</div>
                    <div className="inp-wrap">
                      <HiOutlinePhone className={`inp-icon${contact ? " act" : ""}`} />
                      <input className="f-inp" type="text" placeholder="+91 98765 43210 or www.site.com" value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>
                    <div className="f-hint">Shown as contact info on the ad</div>
                  </div>
                </div>

                <div className="form-footer">
                  <div className="footer-info">
                    <strong>{mediaFiles.length}</strong> file{mediaFiles.length !== 1 ? "s" : ""} selected · Stored in <strong>/public/uploads/ads/</strong>
                  </div>
                  <div className="btn-row">
                    <button type="button" className="btn-cancel"
                      onClick={() => { setAdName(""); setClickLink(""); setContact(""); mediaFiles.forEach(f => URL.revokeObjectURL(f.preview)); setMediaFiles([]) }}>
                      <HiX /> Clear
                    </button>
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? <><div className="spinner" />Publishing…</> : <>Publish Ad <HiArrowRight style={{ fontSize: "16px" }} /></>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ── POSTED ADS SECTION ── */}
          <div className="ads-section">
            <div className="ads-section-header">
              <div className="ads-section-title">
                <TbAd2 /> Posted Ads
                {!loadingAds && <span className="ads-count-badge">{ads.length} Total</span>}
              </div>
              <button className="refresh-btn" onClick={fetchAds} disabled={loadingAds}>
                <HiOutlineRefresh style={{ animation: loadingAds ? "spin .7s linear infinite" : "none" }} />
                Refresh
              </button>
            </div>

            {loadingAds ? (
              <div className="ads-grid">
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ background: "var(--white)", borderRadius: "16px", overflow: "hidden", border: "1.5px solid var(--border)" }}>
                    <div className="skeleton" style={{ height: "160px" }} />
                    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div className="skeleton" style={{ height: "14px", width: "75%" }} />
                      <div className="skeleton" style={{ height: "11px", width: "55%" }} />
                      <div className="skeleton" style={{ height: "11px", width: "40%" }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : ads.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><TbAd2 /></div>
                <div className="empty-title">No ads posted yet</div>
                <div className="empty-sub">Use the form above to publish your first ad campaign.</div>
              </div>
            ) : (
              <div className="ads-grid">
                {ads.map((ad) => (
                  <AdCard
                    key={ad._id}
                    ad={ad}
                    onEdit={() => openEdit(ad)}
                    onDelete={() => setDeleteModal({ open: true, ad })}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

/* ── AD CARD with internal media slider ── */
function AdCard({ ad, onEdit, onDelete, formatDate }: { ad: AdRecord; onEdit: () => void; onDelete: () => void; formatDate: (d: string) => string }) {
  const [idx, setIdx] = useState(0)
  const total = ad.mediaPaths.length
  const cur = ad.mediaPaths[idx]
  const curType = ad.mediaTypes[idx]

  return (
    <div className="ad-card">
      <div className="ad-card-top" />
      <div className="ad-media">
        {curType === "video"
          ? <video src={cur} muted autoPlay loop playsInline />
          : <img src={cur} alt={ad.adName} />}

        {ad.isActive && <div className="ad-active-badge">● Active</div>}

        {total > 1 && (
          <>
            <button className="ad-media-nav prev" onClick={() => setIdx((i) => (i - 1 + total) % total)}>‹</button>
            <button className="ad-media-nav next" onClick={() => setIdx((i) => (i + 1) % total)}>›</button>
            <div className="ad-media-count"><HiOutlinePhotograph style={{ fontSize: "9px" }} />{idx + 1}/{total}</div>
          </>
        )}
      </div>

      <div className="ad-body">
        <div className="ad-name" title={ad.adName}>{ad.adName}</div>
        <div className="ad-meta">
          <div className="ad-meta-row">
            <HiOutlineLink />
            <a href={ad.clickLink} target="_blank" rel="noopener noreferrer">{ad.clickLink}</a>
            <HiOutlineExternalLink style={{ fontSize: "11px", flexShrink: 0 }} />
          </div>
          {ad.contact && (
            <div className="ad-meta-row">
              <HiOutlinePhone />
              <span>{ad.contact}</span>
            </div>
          )}
        </div>
        <div className="ad-date">Posted on {formatDate(ad.createdAt)} · {total} file{total !== 1 ? "s" : ""}</div>

        <div className="ad-actions">
          <button className="ad-btn edit" onClick={onEdit}>
            <HiOutlinePencilAlt style={{ fontSize: "13px" }} /> Edit
          </button>
          <button className="ad-btn del" onClick={onDelete}>
            <HiOutlineTrash style={{ fontSize: "13px" }} /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}