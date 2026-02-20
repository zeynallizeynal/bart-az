# API İstifadə Analizi Hesabatı (Tam Təfərrüatlı)

Bu sənəd `api_collection.json` faylındakı BÜTÜN endpoint-lərin `bart_frontend` layihəsində istifadə vəziyyətini tam əhatə edir.

## 📊 Xülasə
`api_collection.json` faylında ümumilikdə **13 kateqoriya** üzrə çoxsaylı endpointlər mövcuddur. Frontend tərəfində əsasən **Elanlar (Adv/Ads)**, **Bizneslər (Businesses)**, **İstifadəçi Profili (Auth/User)** və **Köməkçi Məlumatlar (Locations, Categories, Types)** ilə bağlı API-lər aktivdir.

Mövcud olan, lakin frontend kodunda istifadə olunmayan API-lər əsasən:
- **Maşınlar (Cars)**
- **Xəbərlər (News)**
- **Menyu (Menu)**
- **Temalar (Themes)**
- **OAuth Advanced**
- **User Balance**
- **Biznes Şəkil Silmə** və **Elan Şəkil Silmə** funksiyalarıdır.

---

## 1. Auth (Autentifikasiya)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/register` | POST | ✅ | `actions/auth.action.ts` | İstifadə olunur. |
| `/login` | POST | ✅ | `actions/auth.action.ts` | İstifadə olunur. |
| `/user` | GET | ✅ | `actions/profile.action.ts` | İstifadə olunur. |
| `/logout` | POST | ✅ | `actions/auth.action.ts` | İstifadə olunur. |
| `/forgot-password` | POST | ❌ | - | İstifadə olunmur. |
| `/reset-password` | POST | ❌ | - | İstifadə olunmur. |
| `/user/update` | POST | ✅ | `actions/profile.action.ts` | İstifadə olunur. |

## 2. Categories (Kateqoriyalar)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/categories` | GET | ❌ | - | Ümumi axtarış istifadə olunmur. |
| `/categories/parents` | GET | ✅ | `actions/category.action.ts` | Ana kateqoriyalar yüklənir. |
| `/categories/{id}` | GET | ❌ | - | İstifadə olunmur. |
| `/categories/slug/{slug}` | GET | ❌ | - | İstifadə olunmur. |

## 3. Services (Xidmətlər)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/services` | GET | ❌ | - | İstifadə olunmur. |
| `/services/latest` | GET | ❌ | - | İstifadə olunmur. |
| `/services/{id}` | GET | ❌ | - | İstifadə olunmur. |
| `/services/slug/{slug}` | GET | ❌ | - | İstifadə olunmur. |

## 4. Businesses (Bizneslər)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/businesses` | GET | ✅ | `actions/business.action.ts` | İstifadə olunur. |
| `/businesses/{id}` | GET | ✅ | `actions/business.action.ts` | İstifadə olunur. |
| `/businesses/slug/{slug}` | GET | ✅ | `actions/business.action.ts` | İstifadə olunur. |
| `/businesses/{id}/adv` | GET | ❌ | - | Birbaşa endpoint kimi çağırılmır, ola bilsin biznes detalları daxilində gəlir. |
| `/businesses/slug/{slug}/adv` | GET | ❌ | - | İstifadə olunmur. |
| `/businesses` | POST | ❌ | - | Kodda `createBusinessAppeal` var, birbaşa `createBusiness` yoxdur. |
| `/businesses/{id}` | PUT | ❌ | - | İstifadə olunmur. |
| `/businesses/{id}` | DELETE | ❌ | - | İstifadə olunmur. |
| `/businesses/image/{id}` | DELETE | ❌ | - | Biznes şəkli silmə funksiyası yoxdur. |

## 5. News (Xəbərlər)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/news` | GET | ❌ | - | Frontend-də xəbərlər modulu yoxdur. |
| `/news/latest` | GET | ❌ | - | İstifadə olunmur. |
| `/news/{id}` | GET | ❌ | - | İstifadə olunmur. |
| `/news/slug/{slug}` | GET | ❌ | - | İstifadə olunmur. |
| `/news/{id}/related` | GET | ❌ | - | İstifadə olunmur. |

## 6. Locations (Məkanlar)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/locations/cities` | GET | ✅ | `actions/location.action.ts` | Şəhərlər istifadə olunur. |
| `/locations/regions` | GET | ❌ | - | Regionlar kodda yoxdur. |
| `/locations/villages` | GET | ❌ | - | Kəndlər kodda yoxdur. |
| `/locations/city/{id}` | GET | ❌ | - | İstifadə olunmur. |
| `/locations/region/{id}` | GET | ❌ | - | İstifadə olunmur. |
| `/locations/village/{id}` | GET | ❌ | - | İstifadə olunmur. |

## 7. Cars (Avtomobillər)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/cars/brands` | GET | ❌ | - | Maşın brendləri API-si çağırılmır. |
| `/cars/models` | GET | ❌ | - | Modul yoxdur. |
| `/cars/fuels` | GET | ❌ | - | Modul yoxdur. |
| `/cars/gearboxes` | GET | ❌ | - | Modul yoxdur. |
| `/cars/transmissions` | GET | ❌ | - | Modul yoxdur. |
| `/cars/types` | GET | ❌ | - | Modul yoxdur. |

## 8. Ads / Adv (Elanlar)
*Collection-da həm `Ads`, həm `Adv` qrupu var. Kodda `/adv` istifadə olunur.*

| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/adv` | GET | ✅ | `actions/listing.action.ts` | Elanların siyahısı. |
| `/adv` | POST | ✅ | `actions/listing.action.ts` | Elan yaratmaq. |
| `/adv/{id}` | GET | ✅ | `actions/listing.action.ts` | Elan detalları. |
| `/adv/slug/{slug}` | GET | ✅ | `actions/listing.action.ts` | Slug ilə detallar. |
| `/adv/{id}` | PUT | ✅ | `actions/listing.action.ts` | Yeniləmə (PATCH olaraq kodda keçir). |
| `/adv/{id}` | DELETE | ✅ | `actions/listing.action.ts` | Silmə. |
| `/adv/image/{id}` | DELETE | ❌ | - | Kodda şəkli ayrıca silmək üçün funksiya yoxdur (Update daxilində ola bilər). |
| `/ads` | GET | ❌ | - | `/adv` istifadə olunur, `/ads` yox. |
| `/ads/{id}` | GET | ❌ | - | `/adv/{id}` istifadə olunur. |

## 9. Types (Elan Növləri)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/types` | GET | ✅ | `actions/listing.action.ts` | İstifadə olunur (`getListingTypes`). |
| `/types/latest` | GET | ❌ | - | İstifadə olunmur. |
| `/types/{id}` | GET | ❌ | - | İstifadə olunmur. |
| `/types/slug/{slug}` | GET | ❌ | - | İstifadə olunmur. |

## 10. Business Appeals (Biznes Müraciətləri)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/business-appeals` | POST | ✅ | `actions/business.action.ts` | Müraciət forması var. |
| `/business-appeals` | GET | ❌ | - | Müraciətləri oxumaq üçün kod yoxdur. |
| `/business-appeals/{id}` | GET | ❌ | - | - |
| `/business-appeals/{id}` | PUT | ❌ | - | - |
| `/business-appeals/{id}` | DELETE | ❌ | - | - |

## 11. Menu (Menyu)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/menu` | GET | ❌ | - | Dinamik menyu API-dən gəlmir, statikdir. |
| `/menu/{id}` | GET | ❌ | - | - |
| `/menu/slug/{slug}` | GET | ❌ | - | - |

## 12. Themes (Temalar)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/themes` | GET | ❌ | - | Biznes temaları seçimi API ilə edilmir. |

## 13. Currencies (Valyutalar)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/currencies` | GET | ✅ | `actions/currency.action.ts` | İstifadə olunur. |

## 14. Upload (Yükləmə)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/upload/image` | POST | ✅ | `actions/upload.action.ts` | Şəkil yükləmə var. |
| `/upload/file` | DELETE | ❌ | - | Fayl silmə ayrıca yoxdur. |

## 15. User Balance (Balans)
| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/user/balance-history` | GET | ❌ | - | Balans tarixçəsi kodda yoxdur. |

## 16. OAuth2 & Token Management
*Frontend **NextAuth** və ya sadə cookie sessiyası işlədir və OAuth flow-nu (`/oauth/*`) birbaşa idarə etmir.*

| Endpoint | Metod | Kodda Var? | İstinad | Qeyd |
| :--- | :--- | :--- | :--- | :--- |
| `/oauth/token` | POST | ❌ | - | Autentifikasiya `/login` üzərindən gedir. |
| `/oauth/token/info` | GET | ❌ | - | - |
| `/oauth/tokens/*` | GET/DELETE | ❌ | - | - |
