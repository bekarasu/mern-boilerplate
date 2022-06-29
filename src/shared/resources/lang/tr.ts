import { Language } from '../../../../@types/shared/Lang';

export const localeTR: Language = {
  forms: {
    login: 'Giriş Yap',
    logout: 'Çıkış Yap',
    username: 'Kullanıcı Adı',
    password: 'Şifre',
  },
  sidebar: {
    greetings: 'Merhaba, :name',
  },
  general: {
    notFound: ':item Bulunamadı',
  },
  resource: {
    // useful for admin panel
    management: ':item Yönetimi',
    add: 'Ekle',
    update: 'Güncelle',
    list: ':item Listesi',
    edit: 'Düzenle',
    show: 'Göster',
    delete: 'Sil',
    filter: 'Filtrele',
    dataNotFound: 'Veri Bulunamadı',
    recordDeleted: ':data Silindi',
    countRecordsFound: ':count Kayıt Bulundu',
    actions: 'Aksiyonlar',
    fetching: 'Veri Getiriliyor...',
  },
  db: {
    name: 'Adı',
    price: 'Fiyatı',
    sku: 'Stok Kodu',
    createdAt: 'Oluşturulma Tarihi',
    updatedAt: 'Güncellenme Tarihi',
    images: 'Resimler',
    status: 'Durum',
  },
  models: {
    logs: 'Kayıt',
    app: 'Uygulama',
  },
};
