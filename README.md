<div align="center">

# bugün.

### Gününü sadeleştir. Küçük adımlarla ilerle.

Türkçe, kişisel günlük planlama paneli. Görevlerini sıraya koy, alışkanlıklarını takip et, aklındaki notları kaydet — hepsi tek ekranda ve doğrudan tarayıcında.

**Kurulum yok · Bağımlılık yok · Hesap yok · Veriler cihazında**

</div>

---

## İçindekiler

- [Projeye genel bakış](#projeye-genel-bakış)
- [Özellikler](#özellikler)
- [Hemen başla](#hemen-başla)
- [Nasıl kullanılır?](#nasıl-kullanılır)
- [Veri ve gizlilik](#veri-ve-gizlilik)
- [Teknik yapı](#teknik-yapı)
- [Erişilebilirlik ve uyumluluk](#erişilebilirlik-ve-uyumluluk)
- [Sorun giderme](#sorun-giderme)
- [Geliştirme ve katkı](#geliştirme-ve-katkı)
- [Lisans](#lisans)

## Projeye genel bakış

**bugün.**, yapılacaklar listesini, günlük alışkanlıkları ve hızlı notları tek bir sakin kontrol panelinde birleştiren hafif bir web uygulamasıdır. Arayüz Türkçe tasarlanmıştır; uygulama statik HTML, CSS ve JavaScript dosyalarından oluşur. Bir paket yöneticisi, derleme adımı, sunucu tarafı veya üçüncü taraf servis gerekmez.

Bu proje özellikle gününü basitçe planlamak ve verilerini kendi tarayıcısında tutmak isteyen kişiler için hazırlandı.

## Özellikler

### Görevler

- Görev ekleme, düzenleme, tamamlama ve silme
- Düşük, normal ve yüksek öncelik seçimi
- İsteğe bağlı son tarih
- **Bugün**, **Yaklaşan** ve **Tamamlanan** görünümleri
- Günlük tamamlanma oranı ve ilerleme göstergesi
- Tamamlanmış görevleri topluca temizleme

### Alışkanlıklar

- Günlük alışkanlıkları tek dokunuşla işaretleme
- Kendi alışkanlıklarını ekleme ve kaldırma
- Günlük tamamlanma sayacı

### Hızlı notlar

- Yazarken otomatik kaydetme
- 2.000 karakterlik not alanı ve canlı karakter sayacı

### Kullanım deneyimi

- Telefon, tablet ve masaüstüne uyumlu düzen
- Klavye ile erişilebilir kontroller ve görünür odak durumları
- Azaltılmış hareket tercihini dikkate alan arayüz
- Türkçe tarih ve saat gösterimi
- Harici font, görsel veya JavaScript kütüphanesi gerektirmeyen yalın yapı

## Hemen başla

### Gereksinimler

- Güncel bir web tarayıcısı
- Yerel sunucu kullanmak için Python 3 (isteğe bağlı)

### Seçenek 1: Dosyayı doğrudan aç

`index.html` dosyasını tarayıcında aç. Uygulama çoğu modern tarayıcıda sunucu olmadan çalışır.

### Seçenek 2: Yerel web sunucusu

Proje klasöründe terminal aç ve çalıştır:

```bash
python3 -m http.server 4173
```

Ardından tarayıcıda [http://localhost:4173](http://localhost:4173) adresini aç. Sunucuyu durdurmak için terminalde `Ctrl+C` tuşlarına bas.

> Python kullanmıyorsan Node.js ile `npx serve .` komutunu da çalıştırabilirsin. Bu seçenek `serve` paketini indirmek için internet bağlantısı gerektirebilir.

## Nasıl kullanılır?

1. **Görev ekle** düğmesiyle görevini oluştur.
2. İstersen öncelik ve son tarih belirle.
3. Görevleri tamamladıkça işaretle; günlük ilerleme otomatik güncellenir.
4. Sağdaki **Küçük alışkanlıklar** bölümünde günlük rutinlerini takip et.
5. **Hızlı notlar** alanına fikirlerini yaz; değişiklikler kısa bir beklemeden sonra kaydedilir.

## Veri ve gizlilik

Görevler, alışkanlıklar ve notlar `bugun-panel-v1` anahtarı altında tarayıcının `localStorage` alanında tutulur.

- İçerikler bu uygulama tarafından herhangi bir sunucuya gönderilmez.
- Uygulama analiz, reklam veya izleme servisi içermez.
- Veriler aynı tarayıcı ve cihazda kalır; farklı cihazlarla otomatik eşitlenmez.
- Tarayıcı verilerini/site verilerini temizlemek bu uygulamanın kayıtlarını da siler.
- Gizli gezinme pencereleri veya sıkı depolama kısıtları kayıtların kalıcılığını etkileyebilir.

**Yedekleme:** Şu an uygulama içinde dışa/içe aktarma özelliği yoktur. Kalıcı kayıt olarak yalnızca tarayıcı depolamasına güveniyorsan tarayıcı/site verilerini temizlemeden önce bunu göz önünde bulundur.

## Teknik yapı

| Dosya | Sorumluluk |
| --- | --- |
| `index.html` | Sayfa iskeleti, görev formu ve panel bölümleri |
| `style.css` | Görsel tasarım, responsive düzen ve hareket tercihleri |
| `app.js` | Uygulama durumu, etkileşimler, çizim ve `localStorage` |

Uygulama framework kullanmaz. Arayüz öğeleri DOM API ile oluşturulur; kullanıcı metinleri HTML olarak yorumlanmak yerine metin içeriği şeklinde işlenir.

## Erişilebilirlik ve uyumluluk

Arayüz semantik HTML, etiketli form alanları, klavye odağı, durum duyuruları ve azaltılmış hareket ayarını kullanır. Yerel `<dialog>`, `localStorage`, CSS Grid ve `conic-gradient` desteği bulunan güncel tarayıcılar hedeflenmiştir.

## Sorun giderme

**Görevlerim görünmüyor.** Aynı tarayıcı profilini ve cihazı kullandığını kontrol et. Tarayıcı/site verileri temizlendiyse yerel kayıtlar silinmiş olabilir.

**Veriler kaydedilmiyor.** Tarayıcının site verisi saklamasına izin verildiğini ve depolama alanının dolu olmadığını kontrol et. `file://` üzerinden açmak yerine yukarıdaki yerel sunucu yöntemini dene.

**Sayfa stilleri görünmüyor.** `index.html`, `style.css` ve `app.js` aynı proje klasöründe bulunmalı; sunucu komutunu proje klasöründe çalıştırmalısın.

## Geliştirme ve katkı

Uygulamanın bir derleme veya test komutu yoktur. Değişiklikleri yerel sunucuda açarak tarayıcıda kontrol edebilirsin. Katkı göndereceksen değişikliği küçük ve odaklı tut; arayüz metinlerinin Türkçe kalmasına, küçük ekranlara ve klavye kullanımına dikkat et.

Öneri veya hata bildirimi için GitHub’da bir [Issue](../../issues) açabilirsin.

## Lisans

Bu depoda henüz bir lisans dosyası bulunmuyor. Açık kaynak kullanım, değiştirme ve dağıtım koşulları için bir lisans eklenene kadar varsayımda bulunma.
