# Firebase Kurulum - Kalan Adımlar

`.env` dosyanız hazır! Şimdi aşağıdaki adımları tamamlayın:

## ✅ Adım 1: Firebase Authentication'ı Etkinleştir

1. Firebase Console'da sol menüden **Authentication**'a tıklayın
2. **Get Started** butonuna tıklayın
3. **Sign-in method** sekmesine gidin
4. **Email/Password** sağlayıcısını bulun ve üzerine tıklayın
5. **Enable** toggle'ını açın
6. **Save** butonuna tıklayın

## ✅ Adım 2: Firestore Database Oluştur

1. Firebase Console'da sol menüden **Firestore Database**'e tıklayın
2. **Create database** butonuna tıklayın
3. **Production mode** seçin (security rules'ı sonra ayarlayacağız)
4. Location olarak size en yakın bölgeyi seçin (örn: `europe-west3` - Frankfurt)
5. **Enable** butonuna tıklayın

## ✅ Adım 3: Security Rules Ayarla (İLK İMPORT İÇİN GEÇİCİ)

**⚠️ ÖNEMLİ:** İlk import işlemi için geçici olarak tüm yazma işlemlerine izin vermemiz gerekiyor. Import tamamlandıktan sonra kuralları güvenli hale getireceğiz.

1. Firestore Database sayfasında **Rules** sekmesine gidin
2. Mevcut kuralları silin ve **GEÇİCİ** kuralları yapıştırın (import için):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // GEÇICI: Import için tüm yazma işlemlerine izin ver
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. **Publish** butonuna tıklayın

4. **Import işlemini yapın** (Adım 5)

5. **Import tamamlandıktan sonra**, kuralları güvenli versiyonla değiştirin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for translations
    match /translations/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Public read, admin write
    match /config/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Admin only
    match /admin/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

6. Tekrar **Publish** butonuna tıklayın

## ✅ Adım 4: Admin Kullanıcısı Oluştur

1. Firebase Console'da **Authentication** > **Users** sayfasına gidin
2. **Add user** butonuna tıklayın
3. Email ve şifre girin (örn: `admin@tomiris.com` ve güçlü bir şifre)
4. **Add user** butonuna tıklayın
5. **Bu bilgileri kaydedin!** (Admin paneline giriş için gerekli)

## ✅ Adım 5: Verileri Import Et

Terminal'de şu komutu çalıştırın:

```bash
node scripts/import-data.js
```

Bu komut mevcut `translations.js` dosyasındaki tüm verileri Firestore'a aktaracak.

**Beklenen çıktı:**
```
Starting data import...

Importing Turkish translations...
✓ Turkish translations imported

Importing English translations...
✓ English translations imported

Importing product configurations...
✓ Products imported

Importing statistics...
✓ Statistics imported

✅ All data imported successfully!
```

## ✅ Adım 6: Test Et

1. Development server'ı başlatın:
   ```bash
   npm run dev
   ```

2. Tarayıcıda `/admin/login` adresine gidin

3. Oluşturduğunuz admin email ve şifre ile giriş yapın

4. Dashboard'u görmelisiniz! 🎉

## Sorun Giderme

### "Permission denied" hatası alıyorsanız:
- Security rules'ın yayınlandığından emin olun (Publish butonuna tıkladınız mı?)
- Admin kullanıcısıyla giriş yaptığınızı kontrol edin

### "Firebase app not initialized" hatası:
- `.env` dosyasının proje kök dizininde olduğunu kontrol edin
- Development server'ı yeniden başlatın (Ctrl+C, sonra `npm run dev`)

### Import script çalışmıyorsa:
- Node.js'in kurulu olduğundan emin olun: `node --version`
- Firebase paketinin kurulu olduğundan emin olun: `npm list firebase`

## Sonraki Adımlar

Artık admin panelinden:
- ✅ Tüm çevirileri düzenleyebilirsiniz
- ✅ Kampanyaları yönetebilirsiniz
- ✅ Testimonials ekleyebilirsiniz
- ✅ FAQ'ları güncelleyebilirsiniz
- ✅ İstatistikleri değiştirebilirsiniz
- ✅ Ve çok daha fazlası!

Herhangi bir sorunla karşılaşırsanız, lütfen bana bildirin!

