# 🚨 İstifadə Olunan API-lərin Analizi və Problemlər

Proyektin `actions` və `lib` fayllarını incələyərkən, aktiv istifadə olunan API inteqrasiyalarında bəzi **texniki səhvlər**, **təhlükəsizlik boşluqları** və **kod təkrarı** aşkarlandı.

Aşağıda problemlər və onların həlli yolları ətraflı qeyd olunub:

## 1. 🛑 Kritik Problemlər (Critical Issues)

### A. Authentication Header Problemi (`lib/api-server.ts`)
`apiAuth` interceptor-da token yoxlanışı düzgün aparılmır. Əgər istifadəçi "login" olmayıbsa (cookie yoxdursa), sorğuya `Authorization: Bearer undefined` başlığı əlavə olunur. Bu, server tərəfində 401 yerinə "Malformed Token" xətasına səbəb ola bilər.

**Cari Kod:**
```typescript
res.headers.Authorization = `Bearer ${cookie.get("access_token")?.value}`;
```
**Təklif:**
```typescript
const token = cookie.get("access_token")?.value;
if (token) {
    res.headers.Authorization = `Bearer ${token}`;
}
```

### B. "Manual" Token İdarəetməsi (`actions/listing.action.ts`)
`createListing` və `updateListing` funksiyalarında `apiAuth` əvəzinə adi `api` instansiyası işlədilir və token **əl ilə (manual)** header-ə əlavə edilir. Bu, kod təkrarıdır və `apiAuth` məntiqini pozur.

**Səhv Yanaşma:**
```typescript
const res = await api.post(..., {
    headers: { Authorization: ... } // ❌ Bunu hər dəfə əl ilə yazmağa ehtiyac yoxdur
});
```
**Həlli:** `apiAuth.post(...)` istifadə edin və interceptor işini görsün.

### C. Xəta İdarəetməsi (Error Handling) - `actions/auth.action.ts`
Login və Register funksiyalarında xəta baş verərsə, `catch` bloku birbaşa xəta obyektini qaytarır (`return err as APIResponse`). Axios-da `err` obyekti böyük bir obyektdir, API cavabı isə `err.response?.data` daxilində olur.

**Səhv Kod:**
```typescript
} catch (err) {
    return err as APIResponse; // ❌ Bu, frontend-ə səhv struktur göndərir
}
```
**Həlli:**
```typescript
} catch (err: any) {
    return (err.response?.data || { success: false, message: "Xəta baş verdi" }) as APIResponse;
}
```

---

## 2. ⚠️ Təhlükəsizlik və Konfiqurasiya

### A. Təhlükəsiz Cookie (`actions/auth.action.ts`)
Cookie set edilərkən `secure: false` qoyulub.
```typescript
cookie.set("access_token", ..., {
  secure: false, // ⚠️ Prodakşnda bu mütləq true olmalıdır
  httpOnly: true,
  ...
});
```
**Təklif:** `secure: process.env.NODE_ENV === 'production'` şərti ilə verilməlidir.

---

## 3. 🛠 Kod Keyfiyyəti və Optimallaşdırma

### A. Type Safety (`any` istifadəsi)
Bir çox yerdə `catch (err: any)` istifadə olunur və `err.response` yoxlanışı olmadan məlumat oxunur. Şəbəkə xətası (Network Error) olduqda `err.response` mövcud olmur və kod **crash** edə bilər.

### B. Keşləmə Strategiyası (`use cache`)
Next.js 15/16 "use cache" direktivi hələ yeni və eksperimental ola bilər. `listing.action.ts` faylında `cacheTag("listings", ...query)` dinamik axtarışlar üçün çox sayda keş açarı yarada bilər.
*   **Məsləhət:** Çox spesifik axtarış parametrlərini (məs: dəqiq qiymət aralığı) keşləməmək daha yaxşı olar, eks halda server yaddaşı lazımsız dolacaq.

---

## 📝 Yekun Nəticə və Plan

Hal-hazırda sistem işləkdir, lakin yuxarıdakı **"Authentication Header"** və **"Error Handling"** problemləri, istifadəçi sessiyası bitdikdə və ya API səhv qaytardıqda frontend-in düzgün işləməməsinə səbəb ola bilər.

**Tövsiyə olunan Addımlar:**
1.  `lib/api-server.ts` faylında interceptor-u düzəltmək.
2.  `actions/listing.action.ts` faylını `apiAuth` istifadə edəcək şəkildə refaktor etmək.
3.  `actions/auth.action.ts` faylında xəta tutma (catch) blokunu düzəltmək.
