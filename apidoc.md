# API Sənədləşdirməsi

Bu API Laravel Passport istifadə edərək istifadəçi autentifikasiyası və sistemin bütün resursları üçün yaradılmışdır.

## Base URL
```
http://localhost:8000/api
```

## Ümumi Məlumat

### Response Format
Bütün API cavabları aşağıdakı formatda qaytarılır:

**Uğurlu cavab:**
```json
{
    "success": true,
    "message": "Uğurlu əməliyyat",
    "data": {}
}
```

**Xəta cavabı:**
```json
{
    "success": false,
    "message": "Xəta mesajı",
    "errors": {}
}
```

**Pagination ilə cavab:**
```json
{
    "success": true,
    "message": "Uğurlu əməliyyat",
    "data": [],
    "pagination": {
        "current_page": 1,
        "last_page": 10,
        "per_page": 20,
        "total": 200,
        "from": 1,
        "to": 20
    }
}
```

### HTTP Status Kodları
- **200** - Uğurlu əməliyyat
- **201** - Uğurla yaradıldı
- **400** - Yanlış sorğu
- **401** - Autentifikasiya tələb olunur
- **404** - Resurs tapılmadı
- **422** - Validasiya xətası
- **500** - Server xətası

### Pagination Parametrləri
- `per_page` - Səhifədə göstəriləcək element sayı (default: 20)
- `page` - Səhifə nömrəsi (default: 1)

---

## OAuth2 Token Endpoints

### 1. Token Yaratmaq (OAuth2)
**POST** `/oauth/token`

**Request Body:**
```json
{
    "grant_type": "password",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "username": "test@example.com",
    "password": "password123",
    "scope": ""
}
```

**Response:**
```json
{
    "token_type": "Bearer",
    "expires_in": 31536000,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
    "refresh_token": "def50200..."
}
```

### 2. Refresh Token
**POST** `/oauth/token`

**Request Body:**
```json
{
    "grant_type": "refresh_token",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "refresh_token": "def50200..."
}
```

### 3. Client Credentials
**POST** `/oauth/token`

**Request Body:**
```json
{
    "grant_type": "client_credentials",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "scope": ""
}
```

---

## Auth Endpoints

### 1. İstifadəçi Qeydiyyatı
**POST** `/register`

**Request Body:**
```json
{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+994500000000",
    "whatsapp": "+994500000000",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "İstifadəçi uğurla qeydiyyatdan keçdi",
    "data": {
        "user": {
            "id": 1,
            "name": "Test User",
            "email": "test@example.com",
            "balance": 0.0,
            "created_at": "01.01.2024 00:00"
        },
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "token_type": "Bearer",
        "expires_in": 31536000
    }
}
```

### 2. İstifadəçi Girişi
**POST** `/login`

**Request Body:**
```json
{
    "email": "test@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Uğurla giriş edildi",
    "data": {
        "user": {
            "id": 1,
            "name": "Test User",
            "email": "test@example.com",
            "balance": 0.0
        },
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "token_type": "Bearer",
        "expires_in": 31536000
    }
}
```

### 3. İstifadəçi Profili
**GET** `/user`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "name": "Test User",
            "email": "test@example.com",
            "balance": 0.0
        }
    }
}
```

### 4. İstifadəçi Çıxışı
**POST** `/logout`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "success": true,
    "message": "Uğurla çıxış edildi"
}
```

### 5. Parol Bərpası
**POST** `/forgot-password`

**Request Body:**
```json
{
    "email": "test@example.com"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Parol bərpası linki email-ə göndərildi"
}
```

### 6. Parol Yeniləmə
**POST** `/reset-password`

**Request Body:**
```json
{
    "token": "reset_token_from_email",
    "email": "test@example.com",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Parol uğurla yeniləndi"
}
```

### 7. Profil Yeniləmə (Şəxsi Kabinet)
**POST** `/user/update`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "Yeni Ad",
    "email": "yeni@example.com",
    "password": "newpassword123",
    "password_confirmation": "newpassword123",
    "phone": "+994500000000",
    "phone1": "+994501111111",
    "whatsapp": "+994502222222",
    "birthday": "1990-01-01",
    "gender": "1"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Profil məlumatları uğurla yeniləndi",
    "data": {
        "user": {
            "id": 1,
            "name": "Yeni Ad",
            "email": "yeni@example.com",
            "balance": 0.0,
            "info": {
                "birthday": "1990-01-01",
                "phone": "+994500000000",
                "phone1": "+994501111111",
                "whatsapp": "+994502222222",
                "gender": "1"
            }
        }
    }
}
```

---

## Token Management Endpoints

### 1. Token Məlumatları
**GET** `/oauth/token/info`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "client_id": "1",
    "user_id": 1,
    "scopes": [],
    "revoked": false,
    "created_at": "01.01.2024 00:00",
    "updated_at": "01.01.2024 00:00",
    "expires_at": "01.01.2025 00:00"
}
```

### 2. İstifadəçi Token-ları
**GET** `/oauth/tokens`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "tokens": [
        {
            "id": "1",
            "client": {
                "id": "1",
                "name": "Auth Client"
            },
            "scopes": [],
            "revoked": false,
            "created_at": "01.01.2024 00:00",
            "expires_at": "01.01.2025 00:00"
        }
    ]
}
```

### 3. Bütün Token-ları Ləğv Etmək
**POST** `/oauth/tokens/revoke-all`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "message": "Bütün token-lar ləğv edildi"
}
```

### 4. Müəyyən Token-i Ləğv Etmək
**DELETE** `/oauth/tokens/{tokenId}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "message": "Token ləğv edildi"
}
```

---

## Categories API

### 1. Kategoriyaların Siyahısı
**GET** `/categories`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `parent_id` (integer, optional) - Parent kategoriya ID-si
- `type` (string, optional) - Kategoriya tipi
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Kategoriyalar uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "parent_id": 0,
            "type": "1",
            "status": 1,
            "order": 1,
            "translations": [
                {
                    "locale": "az",
                    "name": "Kategoriya Adı",
                    "slug": "kategoriya-adi",
                    "title": "SEO Başlığı",
                    "keywords": "açar sözlər",
                    "description": "SEO təsviri"
                }
            ],
            "image_url": "/uploads/2024/12/03/Category/1/original/image.jpg",
            "image_thumb": "/uploads/2024/12/03/Category/1/thumb/image.jpg",
            "children": [
                {
                    "id": 2,
                    "parent_id": 1,
                    "type": "1",
                    "status": 1,
                    "order": 1,
                    "translations": [
                        {
                            "locale": "az",
                            "name": "Alt Kategoriya",
                            "slug": "alt-kategoriya"
                        }
                    ],
                    "image_url": "/uploads/2024/12/03/Category/2/original/image.jpg",
                    "image_thumb": "/uploads/2024/12/03/Category/2/thumb/image.jpg"
                }
            ]
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 5,
        "per_page": 20,
        "total": 100,
        "from": 1,
        "to": 20
    }
}
```

**Qeyd:** 
- `image_url` - Orijinal ölçüdə şəkil URL-i
- `image_thumb` - Kiçik ölçüdə (thumbnail) şəkil URL-i
- Əgər kateqoriyada şəkil yoxdursa, default şəkil göstərilir: `/app/img/custom_category.png`
- Alt kateqoriyalar üçün də şəkil məlumatları göstərilir

### 2. Parent Kategoriyalar
**GET** `/categories/parents`

**Response:**
```json
{
    "success": true,
    "message": "Parent kategoriyalar uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "parent_id": 0,
            "type": "1",
            "status": 1,
            "order": 1,
            "translations": [
                {
                    "locale": "az",
                    "name": "Parent Kategoriya",
                    "slug": "parent-kategoriya"
                }
            ],
            "image_url": "/uploads/2024/12/03/Category/1/original/image.jpg",
            "image_thumb": "/uploads/2024/12/03/Category/1/thumb/image.jpg",
            "children": [
                {
                    "id": 2,
                    "parent_id": 1,
                    "translations": [
                        {
                            "locale": "az",
                            "name": "Alt Kategoriya",
                            "slug": "alt-kategoriya"
                        }
                    ],
                    "image_url": "/uploads/2024/12/03/Category/2/original/image.jpg",
                    "image_thumb": "/uploads/2024/12/03/Category/2/thumb/image.jpg"
                }
            ]
        }
    ]
}
```

**Qeyd:** Bu endpoint yalnız parent kategoriyaları (parent_id=0) və onların alt kategoriyalarını qaytarır.

### 3. Tək Kategoriya
**GET** `/categories/{id}`

**URL Parameters:**
- `id` (integer, required) - Kategoriya ID-si

**Response:**
```json
{
    "success": true,
    "message": "Kategoriya uğurla yükləndi",
    "data": {
        "id": 1,
        "parent_id": 0,
        "type": "1",
        "status": 1,
        "order": 1,
        "translations": [
            {
                "locale": "az",
                "name": "Kategoriya Adı",
                "slug": "kategoriya-adi",
                "title": "SEO Başlığı",
                "keywords": "açar sözlər",
                "description": "SEO təsviri"
            }
        ],
        "image_url": "/uploads/2024/12/03/Category/1/original/image.jpg",
        "image_thumb": "/uploads/2024/12/03/Category/1/thumb/image.jpg",
        "children": [],
        "parent": null
    }
}
```

**Xəta Cavabları:**
- **404** - Kategoriya tapılmadı

### 4. Slug-a Görə Kategoriya
**GET** `/categories/slug/{slug}`

**URL Parameters:**
- `slug` (string, required) - Kategoriya slug-ı

**Response:**
```json
{
    "success": true,
    "message": "Kategoriya uğurla yükləndi",
    "data": {
        "id": 1,
        "parent_id": 0,
        "type": "1",
        "status": 1,
        "order": 1,
        "translations": [
            {
                "locale": "az",
                "name": "Kategoriya Adı",
                "slug": "kategoriya-adi",
                "title": "SEO Başlığı",
                "keywords": "açar sözlər",
                "description": "SEO təsviri"
            }
        ],
        "image_url": "/uploads/2024/12/03/Category/1/original/image.jpg",
        "image_thumb": "/uploads/2024/12/03/Category/1/thumb/image.jpg",
        "children": [],
        "parent": null
    }
}
```

**Xəta Cavabları:**
- **404** - Kategoriya tapılmadı

**Qeyd:** Slug dil koduna görə axtarılır. Məsələn, `kategoriya-adi` slug-ı ilə axtarış edildikdə, sistem həmin slug-a sahib olan kateqoriyanı tapır.

---


## Services API

### 1. Xidmətlərin Siyahısı
**GET** `/services`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `type` (string, optional) - Xidmət tipi
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Xidmətlər uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "status": 1,
            "type": "1",
            "translations": [
                {
                    "locale": "az",
                    "name": "Xidmət Adı",
                    "slug": "xidmet-adi"
                }
            ],
            "prices": []
        }
    ],
    "pagination": {}
}
```

### 2. Son Xidmətlər
**GET** `/services/latest`

**Query Parameters:**
- `limit` (integer, optional) - Limit sayı (default: 10)

**Response:**
```json
{
    "success": true,
    "message": "Son xidmətlər uğurla yükləndi",
    "data": []
}
```

### 3. Tək Xidmət
**GET** `/services/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Xidmət uğurla yükləndi",
    "data": {}
}
```

### 4. Slug-a Görə Xidmət
**GET** `/services/slug/{slug}`

**Response:**
```json
{
    "success": true,
    "message": "Xidmət uğurla yükləndi",
    "data": {}
}
```

---

## Businesses API

### 1. Bizneslərin Siyahısı
**GET** `/businesses`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `category_id` (integer, optional) - Kategoriya ID-si
- `verified` (integer, optional) - Təsdiqlənmiş bizneslər (0 və ya 1)
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Bizneslər uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "user_name": "İstifadəçi Adı",
            "category_id": 1,
            "category_name": "Kategoriya Adı",
            "name": "Biznes Adı",
            "slug": "biznes-adi",
            "status": 1,
            "verified": 1,
            "advs_count": 5,
            "user": {},
            "category": {},
            "theme": {}
        }
    ],
    "pagination": {}
}
```

### 2. Tək Biznes
**GET** `/businesses/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Biznes uğurla yükləndi",
    "data": {}
}
```

### 3. Slug-a Görə Biznes
**GET** `/businesses/slug/{slug}`

**Response:**
```json
{
    "success": true,
    "message": "Biznes uğurla yükləndi",
    "data": {}
}
```

### 4. Yeni Biznes Yaratmaq
**POST** `/businesses`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `name` (string, required) - Biznes adı
- `user_id` (integer, required) - İstifadəçi ID-si
- `category_id` (integer, required) - Kategoriya ID-si
- `theme_id` (integer, optional) - Tema ID-si
- `email` (string, required) - Email ünvanı
- `phone1` (string, required) - Əsas telefon nömrəsi
- `phone2` (string, optional) - İkinci telefon nömrəsi
- `whatsapp` (string, optional) - WhatsApp nömrəsi
- `slug` (string, optional) - Slug (avtomatik yaradılır)
- `banner` (file, optional) - Banner şəkli (jpeg, png, jpg, gif, webp, max: 10MB)
- `logo` (file, optional) - Logo şəkli (jpeg, png, jpg, gif, webp, max: 10MB)
- `title` (string, optional) - SEO başlığı (max: 60)
- `keywords` (string, optional) - SEO açar sözlər (max: 150)
- `description` (string, optional) - SEO təsviri (max: 160)
- `address` (string, optional) - Ünvan (max: 255)
- `map_lat` (decimal, optional) - Xəritə eni (-90 ilə 90 arası)
- `map_long` (decimal, optional) - Xəritə uzunluğu (-180 ilə 180 arası)
- `facebook` (url, optional) - Facebook linki
- `instagram` (url, optional) - Instagram linki
- `twitter` (url, optional) - Twitter linki
- `linkedin` (url, optional) - LinkedIn linki
- `youtube` (url, optional) - YouTube linki
- `tiktok` (url, optional) - TikTok linki
- `verified` (integer, optional) - Təsdiqlənmiş status (1 və ya 2, default: 1)
- `status` (integer, optional) - Status (1 və ya 2, default: 2)
- `weekly_work_hour` (string, optional) - Həftəlik iş saatları (format: "09:00|18:00", default: "09:00|18:00")
- `weekend_work_hour` (string, optional) - Həftəsonu iş saatları (format: "09:00|18:00", default: "09:00|18:00")

**Response:**
```json
{
    "success": true,
    "message": "Biznes uğurla yaradıldı",
    "data": {
        "id": 1,
        "name": "Biznes Adı",
        "slug": "biznes-adi",
        "email": "info@example.com",
        "phone1": "+994501234567",
        "status": 2,
        "verified": 1,
        "advs_count": 0,
        "user": {},
        "category": {},
        "theme": {}
    }
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **422** - Validasiya xətası

### 5. Biznesi Yeniləmək
**PUT/PATCH** `/businesses/{id}`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `name` (string, optional) - Biznes adı
- `category_id` (integer, optional) - Kategoriya ID-si
- `theme_id` (integer, optional) - Tema ID-si
- `email` (string, optional) - Email ünvanı
- `phone1` (string, optional) - Əsas telefon nömrəsi
- `phone2` (string, optional) - İkinci telefon nömrəsi
- `whatsapp` (string, optional) - WhatsApp nömrəsi
- `slug` (string, optional) - Slug
- `banner` (file, optional) - Banner şəkli (jpeg, png, jpg, gif, webp, max: 10MB)
- `logo` (file, optional) - Logo şəkli (jpeg, png, jpg, gif, webp, max: 10MB)
- `title` (string, optional) - SEO başlığı (max: 60)
- `keywords` (string, optional) - SEO açar sözlər (max: 150)
- `description` (string, optional) - SEO təsviri (max: 160)
- `address` (string, optional) - Ünvan (max: 255)
- `map_lat` (decimal, optional) - Xəritə eni (-90 ilə 90 arası)
- `map_long` (decimal, optional) - Xəritə uzunluğu (-180 ilə 180 arası)
- `facebook` (url, optional) - Facebook linki
- `instagram` (url, optional) - Instagram linki
- `twitter` (url, optional) - Twitter linki
- `linkedin` (url, optional) - LinkedIn linki
- `youtube` (url, optional) - YouTube linki
- `tiktok` (url, optional) - TikTok linki
- `verified` (integer, optional) - Təsdiqlənmiş status (1 və ya 2)
- `status` (integer, optional) - Status (1 və ya 2)
- `weekly_work_hour` (string, optional) - Həftəlik iş saatları (format: "09:00|18:00")
- `weekend_work_hour` (string, optional) - Həftəsonu iş saatları (format: "09:00|18:00")

**Response:**
```json
{
    "success": true,
    "message": "Biznes uğurla yeniləndi",
    "data": {
        "id": 1,
        "name": "Yenilənmiş Biznes Adı",
        "slug": "yenilenmis-biznes-adi",
        "email": "info@example.com",
        "phone1": "+994501234567",
        "status": 1,
        "verified": 1,
        "advs_count": 1,
        "user": {},
        "category": {},
        "theme": {}
    }
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **403** - Bu əməliyyatı yerinə yetirmək üçün icazəniz yoxdur (yalnız biznes sahibi və ya admin yeniləyə bilər)
- **404** - Biznes tapılmadı
- **422** - Validasiya xətası

### 6. Biznesin Elanları (ID ilə)
**GET** `/businesses/{id}/adv`

**URL Parameters:**
- `id` (integer, required) - Biznes ID-si

**Query Parameters:**
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi
- `locale` (string, optional) - Dil kodu (default: az)

**Response:**
```json
{
    "success": true,
    "message": "Biznesin elanları uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "type_id": 1,
            "type_name": "Satış",
            "head_category_id": 1,
            "head_category_name": "Nəqliyyat",
            "category_id": 1,
            "category_name": "Avtomobillər",
            "user_id": 1,
            "user_name": "İstifadəçi Adı",
            "business_id": 1,
            "business_name": "Biznes Adı",
            "windows_id": 1,
            "windows_name": "VIP",
            "city_id": 1,
            "city_name": "Bakı",
            "currency_id": 1,
            "currency_name": "AZN",
            "name": "Elan Adı",
            "slug": "elan-adi",
            "price": "100.00",
            "status": 1,
            "created_at": "2024-12-21T19:55:11.000000Z",
            "updated_at": "2024-12-21T19:55:11.000000Z",
            "type": {},
            "category": {},
            "image": {}
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 20,
        "total": 5
    }
}
```

### 7. Biznesin Elanları (Slug ilə)
**GET** `/businesses/slug/{slug}/adv`

**URL Parameters:**
- `slug` (string, required) - Biznes slug-ı

**Query Parameters:**
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi
- `locale` (string, optional) - Dil kodu (default: az)

**Response:**
```json
{
    "success": true,
    "message": "Biznesin elanları uğurla yükləndi",
    "data": [],
    "pagination": {}
}
```

### 8. Biznesi Silmək
**DELETE** `/businesses/{id}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "success": true,
    "message": "Biznes uğurla silindi"
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **403** - Bu əməliyyatı yerinə yetirmək üçün icazəniz yoxdur (yalnız biznes sahibi və ya admin silə bilər)
- **404** - Biznes tapılmadı

**Qeyd:** Biznes silinəndə onunla əlaqəli bütün şəkillər də silinir.

### 7. Qalereya Şəklini Silmək
**DELETE** `/businesses/image/{imageId}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**URL Parameters:**
- `imageId` (integer, required) - Qalereya şəklinin ID-si

**Response:**
```json
{
    "success": true,
    "message": "Şəkil uğurla silindi"
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **403** - Bu əməliyyatı yerinə yetirmək üçün icazəniz yoxdur (yalnız biznes sahibi və ya admin silə bilər)
- **404** - Şəkil tapılmadı

**Qeyd:** Bu endpoint biznesin qalereyasındakı tək bir şəkli silir. Şəkil fiziki olaraq serverdən də silinir.

---

## Business Appeals (Biznes Müraciətləri) API

### 1. Yeni Biznes Müraciəti Yaratmaq (Public)
**POST** `/business-appeals`

**Request Body:**
```json
{
    "fullname": "Ad Soyad",
    "email": "example@email.com",
    "phone": "+994501234567",
    "text": "Müraciət mətni"
}
```

**Request Body (JSON):**
- `fullname` (string, required) - Ad və soyad
- `email` (string, required) - Email ünvanı
- `phone` (string, required) - Telefon nömrəsi (max: 19)
- `text` (string, required) - Müraciət mətni

**Response:**
```json
{
    "success": true,
    "message": "Biznes müraciəti uğurla göndərildi",
    "data": {
        "id": 1,
        "fullname": "Ad Soyad",
        "email": "example@email.com",
        "phone": "+994501234567",
        "text": "Müraciət mətni",
        "status": 2,
        "created_at": "01.01.2024 00:00",
        "updated_at": "01.01.2024 00:00"
    }
}
```

**Xəta Cavabları:**
- **422** - Validasiya xətası

**Qeyd:** Bu endpoint public-dir və autentifikasiya tələb etmir. Yeni müraciətlər status=2 (gözləmədə) ilə yaradılır.

### 2. Biznes Müraciətlərinin Siyahısı (Admin)
**GET** `/business-appeals`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni (ad, email, telefon)
- `status` (integer, optional) - Status filter (1 - aktiv, 2 - gözləmədə)
- `sort_by` (string, optional) - Sıralama sahəsi (default: created_at)
- `sort_order` (string, optional) - Sıralama istiqaməti (asc, desc) (default: desc)
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Biznes müraciətləri uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "fullname": "Ad Soyad",
            "email": "example@email.com",
            "phone": "+994501234567",
            "text": "Müraciət mətni",
            "status": 2,
            "created_at": "01.01.2024 00:00",
            "updated_at": "01.01.2024 00:00"
        }
    ],
    "pagination": {}
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur

### 3. Tək Müraciətin Məlumatları (Admin)
**GET** `/business-appeals/{id}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "success": true,
    "message": "Biznes müraciəti uğurla yükləndi",
    "data": {
        "id": 1,
        "fullname": "Ad Soyad",
        "email": "example@email.com",
        "phone": "+994501234567",
        "text": "Müraciət mətni",
        "status": 2,
        "created_at": "01.01.2024 00:00",
        "updated_at": "01.01.2024 00:00"
    }
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **404** - Müraciət tapılmadı

### 4. Müraciəti Yeniləmək (Admin)
**PUT/PATCH** `/business-appeals/{id}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
    "fullname": "Yenilənmiş Ad Soyad",
    "email": "new@email.com",
    "phone": "+994501234567",
    "text": "Yenilənmiş müraciət mətni",
    "status": 1
}
```

**Request Body (JSON):**
- `fullname` (string, optional) - Ad və soyad
- `email` (string, optional) - Email ünvanı
- `phone` (string, optional) - Telefon nömrəsi (max: 19)
- `text` (string, optional) - Müraciət mətni
- `status` (integer, optional) - Status (1 - aktiv, 2 - gözləmədə)

**Response:**
```json
{
    "success": true,
    "message": "Biznes müraciəti uğurla yeniləndi",
    "data": {
        "id": 1,
        "fullname": "Yenilənmiş Ad Soyad",
        "email": "new@email.com",
        "phone": "+994501234567",
        "text": "Yenilənmiş müraciət mətni",
        "status": 1,
        "created_at": "01.01.2024 00:00",
        "updated_at": "01.01.2024 00:00"
    }
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **404** - Müraciət tapılmadı
- **422** - Validasiya xətası

### 5. Müraciəti Silmək (Admin)
**DELETE** `/business-appeals/{id}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "success": true,
    "message": "Biznes müraciəti uğurla silindi"
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **404** - Müraciət tapılmadı

---

## News API

### 1. Xəbərlərin Siyahısı
**GET** `/news`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `category_id` (integer, optional) - Kategoriya ID-si
- `bookmark` (string, optional) - Bookmark tipi (main_bookmark, alt_bookmark, trend_bookmark, editor_bookmark)
- `date_from` (date, optional) - Başlanğıc tarixi
- `date_to` (date, optional) - Bitmə tarixi
- `sort_by` (string, optional) - Sıralama sahəsi (default: created_at)
- `sort_order` (string, optional) - Sıralama istiqaməti (asc, desc) (default: desc)
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Xəbərlər uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "status": 1,
            "view_count": 100,
            "translations": [
                {
                    "locale": "az",
                    "name": "Xəbər Başlığı",
                    "slug": "xeber-bashligi"
                }
            ],
            "image": {},
            "categories": []
        }
    ],
    "pagination": {}
}
```

### 2. Son Xəbərlər
**GET** `/news/latest`

**Query Parameters:**
- `limit` (integer, optional) - Limit sayı (default: 10)

**Response:**
```json
{
    "success": true,
    "message": "Son xəbərlər uğurla yükləndi",
    "data": []
}
```

### 3. Tək Xəbər
**GET** `/news/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Xəbər uğurla yükləndi",
    "data": {}
}
```

### 4. Slug-a Görə Xəbər
**GET** `/news/slug/{slug}`

**Response:**
```json
{
    "success": true,
    "message": "Xəbər uğurla yükləndi",
    "data": {}
}
```

### 5. Əlaqəli Xəbərlər
**GET** `/news/{id}/related`

**Query Parameters:**
- `limit` (integer, optional) - Limit sayı (default: 10)

**Response:**
```json
{
    "success": true,
    "message": "Əlaqəli xəbərlər uğurla yükləndi",
    "data": []
}
```

---

## Locations API

### 1. Şəhərlərin Siyahısı
**GET** `/locations/cities`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `region_id` (integer, optional) - Region ID-si
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 50)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Şəhərlər uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "region_id": 1,
            "translations": [
                {
                    "locale": "az",
                    "name": "Bakı"
                }
            ]
        }
    ],
    "pagination": {}
}
```

### 2. Regionların Siyahısı
**GET** `/locations/regions`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 50)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Regionlar uğurla yükləndi",
    "data": [],
    "pagination": {}
}
```

### 3. Kəndlərin Siyahısı
**GET** `/locations/villages`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `city_id` (integer, optional) - Şəhər ID-si
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 50)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Kəndlər uğurla yükləndi",
    "data": [],
    "pagination": {}
}
```

### 4. Tək Şəhər
**GET** `/locations/city/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Şəhər uğurla yükləndi",
    "data": {}
}
```

### 5. Tək Region
**GET** `/locations/region/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Region uğurla yükləndi",
    "data": {}
}
```

### 6. Tək Kənd
**GET** `/locations/village/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Kənd uğurla yükləndi",
    "data": {}
}
```

---

## Cars API

### 1. Avtomobil Markaları
**GET** `/cars/brands`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni

**Response:**
```json
{
    "success": true,
    "message": "Markalar uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "name": "BMW"
        }
    ]
}
```

### 2. Avtomobil Modelləri
**GET** `/cars/models`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `brand_id` (integer, optional) - Marka ID-si

**Response:**
```json
{
    "success": true,
    "message": "Modellər uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "brand_id": 1,
            "name": "X5",
            "brand": {}
        }
    ]
}
```

### 3. Yanacaq Növləri
**GET** `/cars/fuels`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni

**Response:**
```json
{
    "success": true,
    "message": "Yanacaq növləri uğurla yükləndi",
    "data": []
}
```

### 4. Sürət Qutuları
**GET** `/cars/gearboxes`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni

**Response:**
```json
{
    "success": true,
    "message": "Sürət qutuları uğurla yükləndi",
    "data": []
}
```

### 5. Ötürücülər
**GET** `/cars/transmissions`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni

**Response:**
```json
{
    "success": true,
    "message": "Ötürücülər uğurla yükləndi",
    "data": []
}
```

### 6. Avtomobil Tipləri
**GET** `/cars/types`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni

**Response:**
```json
{
    "success": true,
    "message": "Avtomobil tipləri uğurla yükləndi",
    "data": []
}
```

---

## Ads API

### 1. Reklamların Siyahısı
**GET** `/ads`

**Query Parameters:**
- `type` (string, optional) - Reklam tipi
- `direction` (string, optional) - İstiqamət
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Reklamlar uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "link": "https://example.com",
            "type": "banner",
            "direction": "top",
            "status": 1,
            "translations": [],
            "image": {}
        }
    ],
    "pagination": {}
}
```

### 2. Tək Reklam
**GET** `/ads/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Reklam uğurla yükləndi",
    "data": {}
}
```

---

## Adv (Elanlar) API

### 1. Elanların Siyahısı
**GET** `/adv`

**Query Parameters:**
- `locale` (string, optional) - Dil kodu (az, en, ru) (default: az)
- `search` (string, optional) - Axtarış mətni
- `type_id` (integer, optional) - Tip ID-si
- `category_id` (integer, optional) - Kategoriya ID-si
- `head_category_id` (integer, optional) - Baş kategoriya ID-si
- `city_id` (integer, optional) - Şəhər ID-si
- `price_from` (decimal, optional) - Minimum qiymət
- `price_to` (decimal, optional) - Maksimum qiymət
- `vip` (integer, optional) - VIP elanlar (0 və ya 1)
- `special` (integer, optional) - Xüsusi elanlar (0 və ya 1)
- `user_id` (integer, optional) - İstifadəçi ID-si
- `status` (integer, optional) - Status (1 - aktiv, 2 - deaktiv, 3 - gözləmədə) (default: 1)
- `sort_by` (string, optional) - Sıralama sahəsi (default: created_at)
- `sort_order` (string, optional) - Sıralama istiqaməti (asc, desc) (default: desc)
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Elanlar uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "type_id": 1,
            "type_name": "Satış",
            "head_category_id": 1,
            "head_category_name": "Nəqliyyat",
            "category_id": 1,
            "category_name": "Avtomobillər",
            "user_id": 1,
            "user_name": "İstifadəçi Adı",
            "business_id": 1,
            "business_name": "Biznes Adı",
            "windows_id": 1,
            "windows_name": "VIP",
            "city_id": 1,
            "city_name": "Bakı",
            "currency_id": 1,
            "currency_name": "AZN",
            "name": "Elan Adı",
            "slug": "elan-adi",
            "price": 1000,
            "status": 1,
            "expired_at": "01.02.2024 00:00",
            "created_at": "01.01.2024 00:00",
            "updated_at": "01.01.2024 00:00",
            "type": {
                "id": 1,
                "status": 1,
                "transname": "Tip Adı",
                "transslug": "tip-adi"
            },
            "category": {
                "id": 1,
                "parent_id": 0,
                "type": "1",
                "adv_type": "1",
                "status": 1,
                "transname": "Kategoriya Adı",
                "transslug": "kategoriya-adi"
            },
            "city": {
                "id": 1,
                "status": 1,
                "transname": "Şəhər Adı",
                "transslug": "sheher-adi"
            },
            "user": {},
            "business": {},
            "image": {},
            "currency": {},
            "windows": {},
            "car_details": {
                "id": 1,
                "type": {
                     "id": 1,
                     "status": 1,
                     "name": "Sedan"
                },
                "fuel": {
                     "id": 1,
                     "status": 1,
                     "name": "Benzin"
                },
                "gearbox": {
                     "id": 1,
                     "status": 1,
                     "name": "Avtomat"
                },
                "brand": {},
                "model": {}
            },
            "house_details": null,
            "info": {
                 "id": 1,
                 "user_name": "Ad Soyad",
                 "user_email": "test@example.com",
                 "user_phone": "+994500000000"
            }
        }
    ],
    "pagination": {}
}
```

**Qeyd:**
- `locale` parametri ilə (default: `az`) tərcümə olunmuş dataları əldə edə bilərsiniz.
- `adv_type`-dan asılı olaraq `car_details` və ya `house_details` dolu və ya `null` ola bilər.
- `info` obyekti elan haqqında əlavə məlumatları saxlayır.
```

### 2. Tək Elan
**GET** `/adv/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Elan uğurla yükləndi",
    "data": {
        "id": 1,
        "type_id": 1,
        "type_name": "Satış",
        "head_category_id": 1,
        "head_category_name": "Nəqliyyat",
        "category_id": 1,
        "category_name": "Avtomobillər",
        "user_id": 1,
        "user_name": "İstifadəçi Adı",
        "business_id": 1,
        "business_name": "Biznes Adı",
        "windows_id": 1,
        "windows_name": "VIP",
        "city_id": 1,
        "city_name": "Bakı",
        "currency_id": 1,
        "currency_name": "AZN",
        "name": "Elan Adı",
        "slug": "elan-adi",
        "price": 1000,
        "status": 1,
        "expired_at": "01.02.2024 00:00",
        "created_at": "01.01.2024 00:00",
        "updated_at": "01.01.2024 00:00",
        "type": {
            "id": 1,
            "status": 1,
            "transname": "Tip Adı",
            "transslug": "tip-adi"
        },
        "category": {
            "id": 1,
            "parent_id": 0,
            "type": "1",
            "adv_type": "1",
            "status": 1,
            "transname": "Kategoriya Adı",
            "transslug": "kategoriya-adi"
        },
        "city": {
            "id": 1,
            "status": 1,
            "transname": "Şəhər Adı",
            "transslug": "sheher-adi"
        },
        "user": {},
        "business": {},
        "image": {},
        "currency": {},
        "windows": {},
        "car_details": {
            "id": 1,
            "type": {
                 "id": 1,
                 "status": 1,
                 "name": "Sedan"
            },
            "fuel": {
                 "id": 1,
                 "status": 1,
                 "name": "Benzin"
            },
            "gearbox": {
                 "id": 1,
                 "status": 1,
                 "name": "Avtomat"
            },
            "brand": {},
            "model": {}
        },
        "house_details": null,
        "info": {
             "id": 1,
             "user_name": "Ad Soyad",
             "user_email": "test@example.com",
             "user_phone": "+994500000000"
        }
    }
}
```

### 3. Slug-a Görə Elan
**GET** `/adv/slug/{slug}`

**Response:**
```json
{
    "success": true,
    "message": "Elan uğurla yükləndi",
    "data": {
        "id": 1,
        "type_id": 1,
        "type_name": "Satış",
        "head_category_id": 1,
        "head_category_name": "Nəqliyyat",
        "category_id": 1,
        "category_name": "Avtomobillər",
        "user_id": 1,
        "user_name": "İstifadəçi Adı",
        "business_id": 1,
        "business_name": "Biznes Adı",
        "windows_id": 1,
        "windows_name": "VIP",
        "city_id": 1,
        "city_name": "Bakı",
        "currency_id": 1,
        "currency_name": "AZN",
        "name": "Elan Adı",
        "slug": "elan-adi",
        "price": 1000,
        "status": 1,
        "expired_at": "01.02.2024 00:00",
        "created_at": "01.01.2024 00:00",
        "updated_at": "01.01.2024 00:00",
        "type": {
            "id": 1,
            "status": 1,
            "transname": "Tip Adı",
            "transslug": "tip-adi"
        },
        "category": {
            "id": 1,
            "parent_id": 0,
            "type": "1",
            "adv_type": "1",
            "status": 1,
            "transname": "Kategoriya Adı",
            "transslug": "kategoriya-adi"
        },
        "city": {
            "id": 1,
            "status": 1,
            "transname": "Şəhər Adı",
            "transslug": "sheher-adi"
        },
        "user": {},
        "business": {},
        "image": {},
        "currency": {},
        "windows": {},
        "car_details": {
            "id": 1,
            "type": {
                 "id": 1,
                 "status": 1,
                 "name": "Sedan"
            },
            "fuel": {
                 "id": 1,
                 "status": 1,
                 "name": "Benzin"
            },
            "gearbox": {
                 "id": 1,
                 "status": 1,
                 "name": "Avtomat"
            },
            "brand": {},
            "model": {}
        },
        "house_details": null,
        "info": {
             "id": 1,
             "user_name": "Ad Soyad",
             "user_email": "test@example.com",
             "user_phone": "+994500000000"
        }
    }
}
```

### 4. Yeni Elan Yaratmaq
**POST** `/adv`

**Headers:**
```
Authorization: Bearer {access_token} (Optional)
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `name` (string, required) - Elan adı
- `category_id` (integer, required) - Kategoriya ID-si
- `type_id` (integer, optional) - Tip ID-si (Nullable - ləğv edilə bilər)
- `head_category_id` (integer, automatic) - Baş kategoriya ID-si (Kateqoriya ID-sinə görə sistem tərəfindən avtomatik tapılır. Artıq `0` dəyərini qəbul edir və relasiya (FK) yoxdur)
- `user_id` (integer, optional) - İstifadəçi ID-si.
    - Əgər `user_id` göndərilirsə, mütləq `Authorization` tokeni də göndərilməli və bu token həmin istifadəçiyə aid olmalıdır.
    - Əgər `user_id` göndərilmirsə, elan "Guest" (qonaq) elanı kimi qeydə alınır (lakin token göndərilibsə həmin user avtomatik təyin ediləcək).
- `business_id` (integer, optional) - Biznes ID-si
- `city_id` (integer, optional) - Şəhər ID-si
- `price` (decimal, optional) - Qiymət
- `sale` (decimal, optional) - Endirim qiyməti
- `currency_id` (integer, optional) - Valyuta ID-si
- `barter` (integer, optional) - Barter (1 - hə, 2 - yox, default: 2)
- `credit` (integer, optional) - Kredit (1 - hə, 2 - yox, default: 2)
- `discount` (integer, optional) - Endirim (1 - hə, 2 - yox, default: 2)
- `gift` (integer, optional) - Hədiyyə (1 - hə, 2 - yox, default: 2)
- `vip` (integer, optional) - VIP elan (1 - hə, 2 - yox, default: 2)
- `special` (integer, optional) - Xüsusi elan (1 - hə, 2 - yox, default: 2)
- `status` (integer, optional) - Status (1 - aktiv, 2 - ləğv, 3 - gözləmədə, default: 3)
- `slug` (string, optional) - Slug (avtomatik yaradılır)
- `image` (file, optional) - Əsas şəkil (jpeg, png, jpg, gif, webp, max: 10MB)
- `images` (array, optional) - R2-yə əvvəlcədən yüklənmiş şəkillərin yolları (məs: ["uploads/temp/file1.jpg", "uploads/temp/file2.jpg"])
- `text` (string, required) - Elan mətni/təsviri (**AdvInfo-ya yazılır**)
- `user_name` (string, optional) - Əlaqədar şəxs (**user_id yoxdursa / tapılmasa məcburidir**)
- `user_email` (string, optional) - Email (**user_id yoxdursa / tapılmasa məcburidir**)
- `user_phone` (string, optional) - Telefon nömrəsi (**user_id yoxdursa / tapılmasa məcburidir**)
- `user_whatsapp` (string, optional) - WhatsApp nömrəsi
- `condition` (integer, optional) - Vəziyyət (1 - Yeni, 2 - İşlənmiş, default: 2)
- `delivery` (integer, optional) - Çatdırılma (1 - Var, 2 - Yox, default: 2)

**Response:**
```json
{
    "success": true,
    "message": "Elan uğurla yaradıldı",
    "data": {
        "id": 1,
        "name": "Elan Adı",
        "slug": "elan-adi",
        "price": 1000,
        "status": 1,
        "type": {},
        "category": {},
        "city": {},
        "user": {},
        "business": {},
        "image": {}
    }
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **422** - Validasiya xətası

### 5. Elanı Yeniləmək (Təsdiq üçün)
**PUT/PATCH** `/adv/{id}`

**Qeyd:** Elan yenilənəndə dəyişikliklər birbaşa `adv` cədvəlində tətbiq olunmur. Dəyişikliklər `adv_edit` cədvəlinə yazılır və admin tərəfindən təsdiqləndikdən sonra əsas elanda əks olunur.

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `name` (string, optional) - Elan adı
- `category_id` (integer, optional) - Kategoriya ID-si
- `type_id` (integer, optional) - Tip ID-si (1 - Satış, 2 - İcarə və s.)
- `business_id` (integer, optional) - Biznes ID-si
- `city_id` (integer, optional) - Şəhər ID-si
- `price` (decimal, optional) - Qiymət
- `sale` (decimal, optional) - Endirim qiyməti
- `currency_id` (integer, optional) - Valyuta ID-si
- `barter` (integer, optional) - Barter (1 - hə, 2 - yox)
- `credit` (integer, optional) - Kredit (1 - hə, 2 - yox)
- `discount` (integer, optional) - Endirim (1 - hə, 2 - yox)
- `gift` (integer, optional) - Hədiyyə (1 - hə, 2 - yox)
- `vip` (integer, optional) - VIP elan (1 - hə, 2 - yox)
- `special` (integer, optional) - Xüsusi elan (1 - hə, 2 - yox)
- `status` (integer, optional) - Status (1, 2, 3)
- `slug` (string, optional) - Slug
- `image` (file, optional) - Yeni əsas şəkil
- `images` (array, optional) - Yeni qalereya şəkilləri (R2 path-ləri)
- `text` (string, optional) - Elan mətni/təsviri
- `title` (string, optional) - SEO Başlığı
- `keywords` (string, optional) - SEO Açar sözləri
- `description` (string, optional) - SEO Təsviri
- `condition` (integer, optional) - Vəziyyət (1 - Yeni, 2 - İşlənmiş)
- `delivery` (integer, optional) - Çatdırılma (1 - Var, 2 - Yox)

**Avtomobil detalları (Kategoriya uyğundursa):**
- `brand_id` (integer, optional) - Marka ID
- `model_id` (integer, optional) - Model ID
- `car_type_id` (integer, optional) - Kuzov tipi ID
- `fuel_id` (integer, optional) - Yanacaq növü ID
- `gearbox_id` (integer, optional) - Sürət qutusu ID
- `engine` (string, optional) - Mühərrik həcmi (məs: "2.0")
- `power` (string, optional) - At gücü
- `mileage` (string, optional) - Yürüş
- `seats` (string, optional) - Yer sayı
- `color` (string, optional) - Rəng
- `vin_code` (string, optional) - VIN kod
- `year` (date/string, optional) - Buraxılış ili

**Ev detalları (Kategoriya uyğundursa):**
- `region_id` (integer, optional) - Rayon ID
- `village_id` (integer, optional) - Qəsəbə ID
- `repair` (integer, optional) - Təmir (1 - Var, 2 - Yox)
- `bill` (integer, optional) - Çıxarış/Kupça (1 - Var, 2 - Yox)
- `mortgage` (integer, optional) - İpoteka (1 - Var, 2 - Yox)
- `room` (string, optional) - Otaq sayı
- `floor` (string, optional) - Yerləşdiyi mərtəbə
- `floors` (string, optional) - Ümumi mərtəbə sayı
- `area` (string, optional) - Sahə (m2)
- `address` (string, optional) - Ünvan
- `map_lat` (numeric, optional) - Enlik (Latitude)
- `map_long` (numeric, optional) - Uzunluq (Longitude)

**Response:**
```json
{
    "success": true,
    "message": "Dəyişikliklər qeydə alındı və təsdiq üçün göndərildi",
    "data": {
        "id": 1,
        "adv_id": 5,
        "name": "Yenilənmiş Elan Adı",
        "status": "3",
        "user_id": 1,
        "created_at": "01.01.2024 00:00",
        "updated_at": "01.01.2024 00:00"
    }
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **403** - Bu əməliyyatı yerinə yetirmək üçün icazəniz yoxdur (yalnız elan sahibi və ya admin yeniləyə bilər)
- **404** - Elan tapılmadı
- **422** - Validasiya xətası

### 6. Elanı Silmək
**DELETE** `/adv/{id}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "success": true,
    "message": "Elan uğurla silindi"
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **403** - Bu əməliyyatı yerinə yetirmək üçün icazəniz yoxdur (yalnız elan sahibi və ya admin silə bilər)
- **404** - Elan tapılmadı

**Qeyd:** Elan silinəndə onunla əlaqəli bütün şəkillər də silinir.

### 7. Qalereya Şəklini Silmək
**DELETE** `/adv/image/{imageId}`

**Headers:**
```
Authorization: Bearer {access_token}
```

**URL Parameters:**
- `imageId` (integer, required) - Qalereya şəklinin ID-si

**Response:**
```json
{
    "success": true,
    "message": "Şəkil uğurla silindi"
}
```

**Xəta Cavabları:**
- **401** - Autentifikasiya tələb olunur
- **403** - Bu əməliyyatı yerinə yetirmək üçün icazəniz yoxdur (yalnız elan sahibi və ya admin silə bilər)
- **404** - Şəkil tapılmadı

**Qeyd:** Bu endpoint elanın qalereyasındakı tək bir şəkli silir. Şəkil fiziki olaraq serverdən də silinir.

---

## Types API

### 1. Tiplərin Siyahısı
**GET** `/types`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Tiplər uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "status": 1,
            "translations": [
                {
                    "locale": "az",
                    "name": "Tip Adı",
                    "slug": "tip-adi"
                }
            ]
        }
    ],
    "pagination": {}
}
```

### 2. Son Tiplər
**GET** `/types/latest`

**Query Parameters:**
- `limit` (integer, optional) - Limit sayı (default: 10)

**Response:**
```json
{
    "success": true,
    "message": "Son tiplər uğurla yükləndi",
    "data": []
}
```

### 3. Tək Tip
**GET** `/types/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Tip uğurla yükləndi",
    "data": {}
}
```

### 4. Slug-a Görə Tip
**GET** `/types/slug/{slug}`

**Response:**
```json
{
    "success": true,
    "message": "Tip uğurla yükləndi",
    "data": {}
}
```

---

## Themes API

### 1. Temaların Siyahısı
**GET** `/themes`

**Query Parameters:**
- `search` (string, optional) - Axtarış mətni
- `business_id` (integer, optional) - Biznes ID-si (Verilən biznesə aid və ya business_id-si null olan temaları qaytarır)

**Response:**
```json
{
    "success": true,
    "message": "Temalar uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "business_id": null,
            "name": "Global Tema",
            "slug": "global-tema",
            "status": 1,
            "created_at": "01.01.2024 00:00",
            "updated_at": "01.01.2024 00:00"
        },
        {
            "id": 2,
            "business_id": 1,
            "name": "Biznesə Özəl Tema",
            "slug": "ozel-tema",
            "status": 1,
            "created_at": "01.01.2024 00:00",
            "updated_at": "01.01.2024 00:00"
        }
    ]
}
```

**Qeyd:** Bu endpoint aktiv (status=1) temaları qaytarır. Əgər `business_id` göndərilməsə, yalnız `business_id` null olan temalar qaytarılır. Əgər göndərilsə, həm `null` həm də həmin ID-yə aid olanlar qaytarılır.

---

## User Balance API

### 1. Balans Tarixçəsi
**GET** `/user/balance-history`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `per_page` (integer, optional) - Səhifədə göstəriləcək element sayı (default: 20)
- `page` (integer, optional) - Səhifə nömrəsi

**Response:**
```json
{
    "success": true,
    "message": "Balans tarixçəsi uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "service_id": 5,
            "amount": 10.00,
            "type": "out",
            "description": "VIP Elan xidməti",
            "balance_before": 50.00,
            "balance_after": 40.00,
            "created_at": "04.02.2026 23:55",
            "updated_at": "04.02.2026 23:55",
            "service": {
                "id": 5,
                "status": 1,
                "type": "1",
                "translations": [
                    {
                        "locale": "az",
                        "name": "VIP Elan",
                        "slug": "vip-elan"
                    }
                ]
            }
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 20,
        "total": 1
    }
}
```

---

## Currencies API

### 1. Valyutaların Siyahısı
**GET** `/currencies`

**Response:**
```json
{
    "success": true,
    "message": "Valyutalar uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "name": "AZN",
            "symbol": "₼",
            "rate": 1.00,
            "status": 1,
            "created_at": "01.01.2024 00:00",
            "updated_at": "01.01.2024 00:00"
        },
        {
            "id": 2,
            "name": "USD",
            "symbol": "$",
            "rate": 1.70,
            "status": 1,
            "created_at": "01.01.2024 00:00",
            "updated_at": "01.01.2024 00:00"
        }
    ]
}
```

**Qeyd:** 
- Bu endpoint yalnız aktiv (status=1) valyutaları qaytarır.
- `rate` sahəsi valyutanın AZN-ə nisbətən məzənnəsini göstərir.

---

## Menu API

### 1. Menyunun Siyahısı
**GET** `/menu`

**Query Parameters:**
- `parent_id` (integer, optional) - Parent menu ID-si
- `search` (string, optional) - Axtarış mətni

**Response:**
```json
{
    "success": true,
    "message": "Menu uğurla yükləndi",
    "data": [
        {
            "id": 1,
            "parent_id": 0,
            "status": 1,
            "translations": [
                {
                    "locale": "az",
                    "name": "Menu Adı",
                    "slug": "menu-adi"
                }
            ],
            "children": [],
            "parent": null
        }
    ]
}
```

### 2. Tək Menu Elementi
**GET** `/menu/{id}`

**Response:**
```json
{
    "success": true,
    "message": "Menu uğurla yükləndi",
    "data": {}
}
```

### 3. Slug-a Görə Menu
**GET** `/menu/slug/{slug}`

**Response:**
```json
{
    "success": true,
    "message": "Menu uğurla yükləndi",
    "data": {}
}
```

---

## Cloudflare R2 Upload API

### 1. Şəkil Yükləmək (Professional)
**POST** `/upload/image`

Bu endpoint şəkilləri Cloudflare R2-yə yükləyir, ölçüləndirir və optimallaşdırır.

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `image` (file, required) - Yüklənəcək şəkil (jpeg, png, jpg, webp, gif, max: 10MB)
- `path` (string, optional) - Yüklənəcək qovluq yolu (default: `uploads/images`)
- `optimize` (boolean, optional) - Şəklin optimallaşdırılması (default: true)

**Response:**
```json
{
    "success": true,
    "message": "Şəkil uğurla Cloudflare R2-yə yükləndi",
    "data": {
        "success": true,
        "path": "uploads/images/uuid-filename.webp",
        "url": "https://pub-xxxx.r2.dev/uploads/images/uuid-filename.webp",
        "filename": "uuid-filename.webp",
        "size": 150240,
        "mime_type": "image/webp"
    }
}
```

### 2. Faylı Silmək
**DELETE** `/upload/file`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
    "path": "uploads/images/uuid-filename.webp"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Fayl uğurla silindi"
}
```

---

## OAuth2 Client Yaratmaq

### Personal Access Client
```bash
php artisan oauth:client "Personal Access Client" --personal
```

### Password Grant Client
```bash
php artisan oauth:client "Password Grant Client" --password
```

### Authorization Code Client
```bash
php artisan oauth:client "Auth Code Client" --redirect="http://localhost:3000/callback"
```

---

## Test Etmək

1. OAuth2 client yaradın
2. Postman collection faylını (`API_Collection.json`) import edin
3. `base_url` dəyişənini öz serverinizə uyğun təyin edin
4. Collection-dakı requestləri test edin

---

## Qeyd

- **Personal Access Token-lar** (register/login endpoints) refresh token olmadan yaradılır
- **OAuth2 Token-lar** (oauth/token endpoint) refresh token ilə yaradılır
- Refresh token yalnız OAuth2 grant types üçün mövcuddur
- Bütün public API endpoint-ləri autentifikasiya tələb etmir
- Protected endpoint-lər üçün `Authorization: Bearer {access_token}` header-ı tələb olunur

---

## Təhlükəsizlik

- Bütün parollar bcrypt ilə şifrələnir
- Access token-lar Laravel Passport tərəfindən idarə olunur
- Parol bərpası linkləri 60 dəqiqə ərzində etibarlıdır
- Token-lar 1 il ərzində etibarlıdır
- API rate limiting tətbiq edilə bilər (60 request/dəqiqə)
