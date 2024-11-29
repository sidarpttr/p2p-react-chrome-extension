# <img src="public/icons/icon_48.png" width="45" align="left"> Printify to ePortal Extension

## Genel Bakış

P2p Extension, Printify'daki siparişlerinizi kolayca ePortal'da faturalandırmanızı sağlar.

## Özellikler

-   **Güvenli Kimlik Doğrulama**: Token kullanarak kimlik doğrulama.
-   **Mağazalar**: Hesabınıza bağlı mağazaları görüntüler.
-   **Siparişler**: Mağazalarınızdaki siparişleri alır.
-   **Faturalandırma**: Siparişlerinizi faturalandırarar ePortal'a gönderir.
-   **Faturaları İmzalama**: ePortaldaki tüm fatura taslaklarını imzalar.
-   **SMS ile doğrulama**: Fatura imzalarken gereken SMS doğrulaması.


## Kurulum

1. Depoyu klonlayın:

    ```bash
    git clone https://github.com/sidarpttr/p2p-react-chrome-extension.git
    ```

2. Proje dizinine gidin:

    ```bash
    cd p2p-react-chrome-extension
    ```

3. Bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

4. Projeyi derleyin:

    ```bash
    npm run build
    ```

5. Eklentiyi tarayıcınıza yükleyin:
    - Tarayıcınızı açın ve eklentiler sayfasına gidin (örneğin, Chrome için `chrome://extensions`).
    - "Geliştirici modu"nu etkinleştirin.
    - "Paketlenmemiş yükle"ye tıklayın ve projenin `build` dizinini seçin.

## Kullanım

1. **Kimlik Doğrulama**:

    - e Portal için giriş:

    ![ePortal Giriş Ekranı](assets/images/eportal_login.png)

    - printify için token girdisi:
    ![Printify Token Ekranı](assets/images/printify_token.png)

    - Bilgilerinizi girin ve özelliklere erişmek için kimlik doğrulaması yapın.

2. **Mağazalar**:

    - Hesabınıza bağlı mağazaların listesini görüntüleyin.
    ![Mağazalar Ekranı](assets/images/shops1.png)

3. **Siparişler**:
    - Mağazalarınızdaki siparişleri alın.
    ![Printify Token Ekranı](assets/images/orders1.png)
    - Sipariş detaylarını görüntüleyin ve ePortalda fatura oluşturun.

4. **Tarih seçerek o tarihteki faturalar getirilir**:
    - Hangi tarihlerdeki faturaları görüntüleyeceğinizi takvimden seçin.
    ![Printify Token Ekranı](assets/images/calendar.png)

    - Faturalar ve onay durumu:
    ![Printify Token Ekranı](assets/images/invoices.png)

5. **Fatura imzalama ve SMS Doğrulaması**:
    - Faturaların imzalanabilmesi için SMS şifre doğrulaması.
    ![Printify Token Ekranı](assets/images/sms.png)



