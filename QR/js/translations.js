const translations = {
  en: {
    skip: "Skip to content", navFeatures: "Features", navFaq: "FAQ", navPrivacy: "Privacy", language: "Language",
    heroEyebrow: "PRIVATE BY DESIGN · FREE FOREVER", heroTitle: "Make your next<br><span class=\"gradient-text\">connection count.</span>", heroSubtitle: "Create beautiful, ready-to-scan QR codes in seconds. Your data stays right here, on your device.", heroCta: "Create your QR code", heroTrust: "No account. No tracking. No server.", heroCard: "Ready to connect", heroChip: "Your brand, your code",
    studioEyebrow: "THE QR WORKSHOP", studioTitle: "Your code, your way.", studioSubtitle: "Choose what to share, then make it unmistakably yours.",
    contentTitle: "Choose your content", contentHint: "Pick a QR type to get started.", designTitle: "Make it yours", designHint: "A little personality. Keep it scannable.",
    typeUrl: "Website", typeText: "Plain text", typeWifi: "Wi-Fi", typeContact: "Contact", typeEmail: "Email", typePhone: "Phone", typeSms: "SMS",
    fieldUrl: "Website URL", fieldText: "Your text", fieldSsid: "Network name (SSID)", fieldPassword: "Password", fieldEncryption: "Security", fieldHidden: "Hidden network",
    fieldName: "Full name", fieldPhone: "Phone number", fieldEmail: "Email address", fieldOrganization: "Organization", fieldWebsite: "Website", fieldAddress: "Address",
    fieldRecipient: "Recipient email", fieldSubject: "Subject", fieldBody: "Message", fieldMessage: "Message", fieldSmsMessage: "Message",
    hintUrl: "Include a website address (https:// is added if omitted).", hintSsid: "Network names can be up to 32 UTF-8 bytes.", hintPassword: "WPA passwords must be 8–63 characters (or a 64-digit hex key).", hintWepPassword: "WEP passwords must be 5 or 13 bytes, or a 10/26-digit hex key.", hintContact: "Only the name is required. Other details are optional.", hintSensitive: "Anyone who scans this code can read its content. Do not share sensitive information.",
    openNetwork: "None (open network)", wpaNetwork: "WPA / WPA2 / WPA3", wepNetwork: "WEP",
    foreground: "Foreground", background: "Background", transparent: "Transparent background", supported: "PNG / SVG", dotStyle: "Dot style", cornerStyle: "Corner style", styleSquare: "Square", styleRounded: "Rounded", styleCircle: "Circle",
    logoLabel: "Add a logo", logoHint: "PNG, JPEG or WebP · processed on-device", upload: "Upload", logoSize: "Logo size", logoMargin: "Logo margin", removeLogo: "Remove logo",
    designWarning: "Styles, colors, and logos can affect scanning. Keep strong contrast and test with your phone before printing.", reset: "Reset design",
    livePreview: "LIVE PREVIEW", waiting: "Waiting for content", emptyTitle: "Your QR code will appear here", emptyHint: "Add your content to see a live preview.", staticNote: "Static QR codes — the content is fixed once created.",
    exportSize: "Export size", downloadPng: "Download PNG", downloadSvg: "Download SVG", copyContent: "Copy encoded content",
    scanTest: "Before you print: scan your code with multiple phones and apps at the final printed size.",
    featuresEyebrow: "MADE FOR PEACE OF MIND", featuresTitle: "Simple to use. Yours to trust.", featuresSubtitle: "Everything you need to create a QR code, nothing you don’t.",
    featurePrivateTitle: "Private by default", featurePrivateBody: "Your content and uploaded logo are processed on this device. Nothing is sent to a server or saved for later.",
    featureFormatTitle: "The right format", featureFormatBody: "Create practical QR codes for links, Wi-Fi, contact cards, email, phone, SMS, and plain text.",
    featureExportTitle: "Ready to share", featureExportBody: "Download crisp PNGs or scalable SVGs at sizes for screens, presentations, or print.",
    privacyBannerTitle: "Your data stays yours.", privacyBannerBody: "QR Studio works entirely in your browser. No accounts, trackers, storage, or uploads. Anyone who scans a QR can read its content, so don’t encode secrets or sensitive information.", privacyDetails: "How privacy works",
    faqEyebrow: "GOOD TO KNOW", faqTitle: "A few quick answers.",
    faq1Question: "Are my QR codes static or dynamic?", faq1Answer: "QR Studio creates static QR codes. Their content is embedded directly in the pattern and cannot be changed after creation. To update the content, create and share a new QR code.",
    faq2Question: "Is my QR code encrypted?", faq2Answer: "No. QR codes are not encrypted. Anyone with a camera or scanner can read the content encoded in one. Avoid putting passwords, private keys, or sensitive personal data in a QR code you share publicly.",
    faq3Question: "Can a logo or color make my QR code harder to scan?", faq3Answer: "Yes. Low contrast, decorative styles, and logos covering too many modules can reduce scan reliability. Keep a clear border, use strong contrast, and test the exported code on multiple phones before printing.",
    faq4Question: "Can I use QR Studio offline?", faq4Answer: "After the required site files have loaded, QR generation and image processing work in your browser without a network connection. A first visit still needs to load the site files; QR Studio does not promise offline access before that.",
    footerTagline: "Create. Customize. Scan.", backTop: "Back to top ↑", footerRights: "Free to use · Made with care",
    errorRequired: "This field is required.", errorTooLong: "Please shorten this value before generating a QR code.", errorUrl: "Enter a valid website address using http or https.", errorEmail: "Enter a valid email address.", errorPhone: "Enter a valid phone number, including country code if needed.", errorSsid: "Enter a network name no longer than 32 UTF-8 bytes.", errorWpa: "WPA passwords need 8–63 characters or a 64-character hexadecimal key.", errorWep: "WEP passwords need 5 or 13 bytes, or a 10/26-character hexadecimal key.", errorQrCapacity: "This content is too long for a QR code. Shorten it and try again.", errorQrUnavailable: "The QR generator could not be loaded. Reload the page and try again.", errorQrGeneration: "The QR code could not be generated. Please try shorter or different content.", errorLogoType: "Choose a PNG, JPEG, or WebP image.", errorLogoSize: "Choose an image smaller than 3 MB.", errorLogoRead: "This image could not be processed on your device.", errorContrast: "These colors have low contrast. Choose darker foreground and lighter background colors for easier scanning.",
    successPng: "PNG downloaded.", successSvg: "SVG downloaded.", successCopy: "Content copied.", errorCopy: "Clipboard access is unavailable in this browser.", errorDownload: "The file could not be created. Please try again.",
    themeLabel: "Switch color theme", mainNavigation: "Main navigation", previewRegion: "QR code preview", qrPreviewAlt: "Generated QR code preview", ready: "Ready to download", warning: "Check contrast", error: "Needs attention",
    processingLogo: "Processing logo on this device…", preparingDownload: "Preparing your download…",
    pageTitle: "QR Studio — Create. Customize. Scan.", privacyPageDocumentTitle: "Privacy — QR Studio", privacyPageTitle: "Your privacy, clearly explained", privacyPageLead: "QR Studio is designed to work without sending your QR content or uploaded images anywhere.",
    privacyWhatTitle: "What happens to your content", privacyWhatBody: "The content you enter is held in page memory and encoded locally by the QR generator included with this site. It is not uploaded, transmitted, logged, or saved to browser storage. QR Studio has no accounts, analytics, advertising, or backend.",
    privacyLogoTitle: "Your uploaded logo", privacyLogoBody: "An accepted PNG, JPEG, or WebP image is read and resized locally in your browser for the preview and export. The temporary file URL is released when it is replaced, removed, or the page closes. The processed image exists only in page memory while you use the editor.",
    privacyNetworkTitle: "Network and offline use", privacyNetworkBody: "The site loads its own styles, scripts, fonts, and QR library from the site host. QR generation and image processing do not make network requests. After the site files have loaded, the editor works offline; first-visit offline availability is not guaranteed.",
    privacyStaticTitle: "Static QR codes and safety", privacyStaticBody: "The generated code stores its content directly and cannot be edited after download. QR codes are not encrypted: anyone who scans one can read the embedded information. Do not encode passwords, private keys, or sensitive personal data in a public QR code.",
    privacyControlsTitle: "Your controls", privacyControlsBody: "Changing the content updates the preview in memory. Use Remove logo or Reset design to clear the logo and design options; closing the page clears the remaining in-memory content. QR Studio does not keep a history.",
    privacyUpdated: "Last updated: November 2026", returnHome: "Return to QR Studio", contactTitle: "No contact or account is required to use QR Studio."
  },
  fr: {
    skip: "Aller au contenu", navFeatures: "Fonctionnalités", navFaq: "FAQ", navPrivacy: "Confidentialité", language: "Langue",
    heroEyebrow: "PRIVÉ PAR CONCEPTION · GRATUIT POUR TOUJOURS", heroTitle: "Faites de chaque<br><span class=\"gradient-text\">connexion un lien.</span>", heroSubtitle: "Créez en quelques secondes de beaux QR codes faciles à scanner. Vos données restent sur votre appareil.", heroCta: "Créer votre QR code", heroTrust: "Sans compte. Sans suivi. Sans serveur.", heroCard: "Prêt à connecter", heroChip: "Votre marque, votre code",
    studioEyebrow: "L’ATELIER QR", studioTitle: "Votre code, à votre façon.", studioSubtitle: "Choisissez votre contenu, puis personnalisez-le.",
    contentTitle: "Choisissez votre contenu", contentHint: "Sélectionnez un type de QR code.", designTitle: "Personnalisez-le", designHint: "Une touche de personnalité, sans nuire au scan.",
    typeUrl: "Site web", typeText: "Texte", typeWifi: "Wi-Fi", typeContact: "Contact", typeEmail: "E-mail", typePhone: "Téléphone", typeSms: "SMS",
    fieldUrl: "Adresse du site web", fieldText: "Votre texte", fieldSsid: "Nom du réseau (SSID)", fieldPassword: "Mot de passe", fieldEncryption: "Sécurité", fieldHidden: "Réseau masqué",
    fieldName: "Nom complet", fieldPhone: "Numéro de téléphone", fieldEmail: "Adresse e-mail", fieldOrganization: "Organisation", fieldWebsite: "Site web", fieldAddress: "Adresse",
    fieldRecipient: "E-mail du destinataire", fieldSubject: "Objet", fieldBody: "Message", fieldMessage: "Message", fieldSmsMessage: "Message",
    hintUrl: "Saisissez une adresse web (https:// sera ajouté si nécessaire).", hintSsid: "Le nom du réseau peut contenir jusqu’à 32 octets UTF-8.", hintPassword: "Mot de passe WPA : 8 à 63 caractères (ou clé hexadécimale de 64 caractères).", hintWepPassword: "Mot de passe WEP : 5 ou 13 octets, ou clé hexadécimale de 10/26 caractères.", hintContact: "Seul le nom est obligatoire. Les autres informations sont facultatives.", hintSensitive: "Toute personne qui scanne ce code peut lire son contenu. N’y mettez pas d’informations sensibles.",
    openNetwork: "Aucun (réseau ouvert)", wpaNetwork: "WPA / WPA2 / WPA3", wepNetwork: "WEP",
    foreground: "Premier plan", background: "Arrière-plan", transparent: "Arrière-plan transparent", supported: "PNG / SVG", dotStyle: "Style des points", cornerStyle: "Style des repères", styleSquare: "Carré", styleRounded: "Arrondi", styleCircle: "Cercle",
    logoLabel: "Ajouter un logo", logoHint: "PNG, JPEG ou WebP · traité sur l’appareil", upload: "Importer", logoSize: "Taille du logo", logoMargin: "Marge du logo", removeLogo: "Supprimer le logo",
    designWarning: "Les styles, couleurs et logos peuvent gêner le scan. Gardez un contraste élevé et testez avec votre téléphone avant impression.", reset: "Réinitialiser le design",
    livePreview: "APERÇU EN DIRECT", waiting: "En attente de contenu", emptyTitle: "Votre QR code apparaîtra ici", emptyHint: "Ajoutez du contenu pour voir l’aperçu.", staticNote: "QR codes statiques — leur contenu est définitif.",
    exportSize: "Taille d’export", downloadPng: "Télécharger PNG", downloadSvg: "Télécharger SVG", copyContent: "Copier le contenu encodé",
    scanTest: "Avant impression : scannez le code avec plusieurs téléphones et applications à sa taille finale.",
    featuresEyebrow: "POUR VOTRE TRANQUILLITÉ", featuresTitle: "Simple à utiliser. Fiable.", featuresSubtitle: "Tout le nécessaire pour créer un QR code, rien de superflu.",
    featurePrivateTitle: "Privé par défaut", featurePrivateBody: "Votre contenu et votre logo sont traités sur cet appareil. Rien n’est envoyé à un serveur ni enregistré pour plus tard.",
    featureFormatTitle: "Le bon format", featureFormatBody: "Créez des QR codes pour les liens, le Wi-Fi, les contacts, les e-mails, le téléphone, les SMS et le texte.",
    featureExportTitle: "Prêt à partager", featureExportBody: "Téléchargez des PNG nets ou des SVG adaptables pour écran, présentation ou impression.",
    privacyBannerTitle: "Vos données restent les vôtres.", privacyBannerBody: "QR Studio fonctionne entièrement dans votre navigateur. Aucun compte, traceur, stockage ou téléversement. Toute personne qui scanne un QR code peut lire son contenu : n’y encodez pas de secrets.", privacyDetails: "En savoir plus",
    faqEyebrow: "BON À SAVOIR", faqTitle: "Quelques réponses rapides.",
    faq1Question: "Mes QR codes sont-ils statiques ou dynamiques ?", faq1Answer: "QR Studio crée des QR codes statiques. Leur contenu est directement intégré au motif et ne peut pas être modifié après création. Pour le changer, créez et partagez un nouveau QR code.",
    faq2Question: "Mon QR code est-il chiffré ?", faq2Answer: "Non. Les QR codes ne sont pas chiffrés. Toute personne disposant d’un appareil photo ou d’un scanner peut lire leur contenu. Évitez les mots de passe, clés privées et données personnelles sensibles dans un code public.",
    faq3Question: "Un logo ou une couleur peut-il gêner le scan ?", faq3Answer: "Oui. Un contraste faible, des styles décoratifs ou un logo trop grand peuvent réduire la fiabilité du scan. Gardez une bordure libre, un contraste élevé et testez le code sur plusieurs téléphones avant impression.",
    faq4Question: "QR Studio fonctionne-t-il hors ligne ?", faq4Answer: "Une fois les fichiers du site chargés, la création des QR codes et le traitement des images fonctionnent dans le navigateur sans réseau. La première visite nécessite le chargement des fichiers ; l’accès hors ligne initial n’est pas garanti.",
    footerTagline: "Créer. Personnaliser. Scanner.", backTop: "Haut de page ↑", footerRights: "Gratuit · Créé avec soin",
    errorRequired: "Ce champ est obligatoire.", errorTooLong: "Cette valeur est trop longue pour un QR code. Veuillez la raccourcir.", errorUrl: "Saisissez une adresse web valide en http ou https.", errorEmail: "Saisissez une adresse e-mail valide.", errorPhone: "Saisissez un numéro de téléphone valide, avec l’indicatif si nécessaire.", errorSsid: "Saisissez un nom de réseau de 32 octets UTF-8 maximum.", errorWpa: "Le mot de passe WPA doit contenir 8 à 63 caractères ou 64 caractères hexadécimaux.", errorWep: "Le mot de passe WEP doit contenir 5 ou 13 octets, ou 10/26 caractères hexadécimaux.", errorQrCapacity: "Ce contenu est trop long pour un QR code. Raccourcissez-le.", errorQrUnavailable: "Le générateur QR n’a pas pu être chargé. Rechargez la page.", errorQrGeneration: "Le QR code n’a pas pu être généré. Essayez un contenu plus court ou différent.", errorLogoType: "Choisissez une image PNG, JPEG ou WebP.", errorLogoSize: "Choisissez une image de moins de 3 Mo.", errorLogoRead: "Cette image n’a pas pu être traitée sur votre appareil.", errorContrast: "Le contraste est faible. Choisissez un premier plan plus sombre et un arrière-plan plus clair.",
    successPng: "PNG téléchargé.", successSvg: "SVG téléchargé.", successCopy: "Contenu copié.", errorCopy: "Le presse-papiers est indisponible dans ce navigateur.", errorDownload: "Le fichier n’a pas pu être créé. Réessayez.",
    themeLabel: "Changer de thème", mainNavigation: "Navigation principale", previewRegion: "Aperçu du QR code", qrPreviewAlt: "Aperçu du QR code généré", ready: "Prêt à télécharger", warning: "Vérifiez le contraste", error: "Vérification requise",
    processingLogo: "Traitement du logo sur cet appareil…", preparingDownload: "Préparation du téléchargement…",
    pageTitle: "QR Studio — Créer. Personnaliser. Scanner.", privacyPageDocumentTitle: "Confidentialité — QR Studio", privacyPageTitle: "Votre confidentialité, en toute clarté", privacyPageLead: "QR Studio est conçu pour ne transmettre ni le contenu de vos QR codes ni vos images.",
    privacyWhatTitle: "Traitement de votre contenu", privacyWhatBody: "Le contenu saisi reste en mémoire dans la page et est encodé localement par la bibliothèque QR incluse dans le site. Il n’est ni envoyé, transmis, journalisé ni enregistré dans le navigateur. QR Studio ne comporte ni compte, ni analyse d’audience, ni publicité, ni serveur applicatif.",
    privacyLogoTitle: "Votre logo importé", privacyLogoBody: "Une image PNG, JPEG ou WebP acceptée est lue et redimensionnée localement pour l’aperçu et l’export. L’URL temporaire du fichier est libérée lorsqu’il est remplacé, supprimé ou à la fermeture de la page. L’image traitée reste en mémoire pendant l’édition.",
    privacyNetworkTitle: "Réseau et mode hors ligne", privacyNetworkBody: "Le site charge ses propres styles, scripts, polices système et bibliothèque QR depuis son hébergement. La génération QR et le traitement des images n’effectuent aucune requête réseau. Une fois les fichiers chargés, l’éditeur fonctionne hors ligne ; le premier accès hors ligne n’est pas garanti.",
    privacyStaticTitle: "QR codes statiques et sécurité", privacyStaticBody: "Le code généré contient directement son contenu et ne peut plus être modifié après téléchargement. Les QR codes ne sont pas chiffrés : toute personne qui en scanne un peut lire les informations encodées. N’inscrivez pas de mots de passe, clés privées ou données personnelles sensibles dans un code public.",
    privacyControlsTitle: "Vos commandes", privacyControlsBody: "Le changement de contenu actualise l’aperçu en mémoire. Utilisez Supprimer le logo ou Réinitialiser le design pour effacer le logo et les options ; fermer la page efface le reste du contenu en mémoire. QR Studio ne conserve aucun historique.",
    privacyUpdated: "Dernière mise à jour : novembre 2026", returnHome: "Retour à QR Studio", contactTitle: "Aucun contact ni compte n’est nécessaire pour utiliser QR Studio."
  },
  ar: {
    skip: "انتقل إلى المحتوى", navFeatures: "المزايا", navFaq: "الأسئلة الشائعة", navPrivacy: "الخصوصية", language: "اللغة",
    heroEyebrow: "الخصوصية أساس التصميم · مجاني دائمًا", heroTitle: "اجعل تواصلك<br><span class=\"gradient-text\">أسهل وأجمل.</span>", heroSubtitle: "أنشئ رموز QR أنيقة وسهلة المسح خلال ثوانٍ. تبقى بياناتك على جهازك.", heroCta: "أنشئ رمز QR", heroTrust: "بلا حساب. بلا تتبّع. بلا خادم.", heroCard: "جاهز للتواصل", heroChip: "علامتك، ورمزك",
    studioEyebrow: "ورشة رموز QR", studioTitle: "رمزك بطريقتك.", studioSubtitle: "اختر ما تريد مشاركته ثم أضف لمستك الخاصة.",
    contentTitle: "اختر المحتوى", contentHint: "اختر نوع الرمز للبدء.", designTitle: "خصّص التصميم", designHint: "أضف لمستك مع الحفاظ على سهولة المسح.",
    typeUrl: "موقع ويب", typeText: "نص عادي", typeWifi: "واي فاي", typeContact: "جهة اتصال", typeEmail: "بريد إلكتروني", typePhone: "هاتف", typeSms: "رسالة نصية",
    fieldUrl: "رابط الموقع", fieldText: "النص", fieldSsid: "اسم الشبكة (SSID)", fieldPassword: "كلمة المرور", fieldEncryption: "الأمان", fieldHidden: "شبكة مخفية",
    fieldName: "الاسم الكامل", fieldPhone: "رقم الهاتف", fieldEmail: "البريد الإلكتروني", fieldOrganization: "المؤسسة", fieldWebsite: "الموقع الإلكتروني", fieldAddress: "العنوان",
    fieldRecipient: "بريد المستلم", fieldSubject: "الموضوع", fieldBody: "الرسالة", fieldMessage: "الرسالة", fieldSmsMessage: "الرسالة",
    hintUrl: "أدخل رابطًا؛ ستتم إضافة https:// إذا لم تكتبه.", hintSsid: "يمكن أن يصل اسم الشبكة إلى 32 بايت بترميز UTF-8.", hintPassword: "كلمة مرور WPA من 8 إلى 63 حرفًا أو مفتاح سداسي عشري من 64 رقمًا.", hintWepPassword: "كلمة مرور WEP من 5 أو 13 بايت أو مفتاح سداسي عشري من 10/26 رقمًا.", hintContact: "الاسم فقط مطلوب، وبقية البيانات اختيارية.", hintSensitive: "يمكن لأي شخص يمسح الرمز قراءة محتواه. لا تشارك معلومات حساسة.",
    openNetwork: "بلا كلمة مرور (شبكة مفتوحة)", wpaNetwork: "WPA / WPA2 / WPA3", wepNetwork: "WEP",
    foreground: "لون الرمز", background: "لون الخلفية", transparent: "خلفية شفافة", supported: "PNG / SVG", dotStyle: "شكل النقاط", cornerStyle: "شكل الزوايا", styleSquare: "مربع", styleRounded: "مستدير", styleCircle: "دائري",
    logoLabel: "أضف شعارًا", logoHint: "PNG أو JPEG أو WebP · معالجة محلية", upload: "تحميل", logoSize: "حجم الشعار", logoMargin: "هامش الشعار", removeLogo: "إزالة الشعار",
    designWarning: "قد تؤثر الألوان والأنماط والشعارات في قابلية المسح. استخدم تباينًا واضحًا واختبر الرمز بهاتفك قبل الطباعة.", reset: "إعادة التصميم الافتراضي",
    livePreview: "معاينة مباشرة", waiting: "بانتظار المحتوى", emptyTitle: "سيظهر رمز QR هنا", emptyHint: "أدخل المحتوى لمعاينة الرمز مباشرة.", staticNote: "رموز ثابتة — لا يمكن تغيير المحتوى بعد إنشائها.",
    exportSize: "حجم التصدير", downloadPng: "تنزيل PNG", downloadSvg: "تنزيل SVG", copyContent: "نسخ المحتوى المضمّن",
    scanTest: "قبل الطباعة: امسح الرمز بعدة هواتف وتطبيقات بالحجم النهائي.",
    featuresEyebrow: "راحة بال في كل خطوة", featuresTitle: "سهل الاستخدام وجدير بالثقة.", featuresSubtitle: "كل ما تحتاجه لإنشاء رمز QR دون إضافات غير ضرورية.",
    featurePrivateTitle: "الخصوصية افتراضيًا", featurePrivateBody: "تُعالج بياناتك وشعارك على هذا الجهاز. لا يُرسل شيء إلى خادم أو يُحفظ لاستخدام لاحق.",
    featureFormatTitle: "تنسيقات مفيدة", featureFormatBody: "أنشئ رموزًا للروابط والواي فاي وجهات الاتصال والبريد والهاتف والرسائل والنصوص.",
    featureExportTitle: "جاهز للمشاركة", featureExportBody: "نزّل ملفات PNG واضحة أو SVG قابلة للتكبير للشاشات والعروض والطباعة.",
    privacyBannerTitle: "بياناتك ملكك.", privacyBannerBody: "يعمل QR Studio بالكامل في متصفحك. بلا حسابات أو متتبعات أو تخزين أو رفع ملفات. يستطيع أي شخص يمسح الرمز قراءة محتواه، لذا لا تضع فيه أسرارًا أو معلومات حساسة.", privacyDetails: "كيف نحمي الخصوصية",
    faqEyebrow: "معلومات مفيدة", faqTitle: "إجابات سريعة.",
    faq1Question: "هل رموز QR ثابتة أم ديناميكية؟", faq1Answer: "ينشئ QR Studio رموزًا ثابتة. يُضمّن المحتوى داخل الرمز ولا يمكن تغييره بعد إنشائه. لتحديثه، أنشئ رمزًا جديدًا وشاركه.",
    faq2Question: "هل رمز QR مشفّر؟", faq2Answer: "لا. رموز QR غير مشفّرة، ويمكن لأي شخص لديه كاميرا أو ماسح قراءة محتواها. تجنب تضمين كلمات المرور أو المفاتيح الخاصة أو البيانات الشخصية الحساسة في رمز عام.",
    faq3Question: "هل قد يصعّب الشعار أو اللون مسح الرمز؟", faq3Answer: "نعم. قد يقلل ضعف التباين أو الأنماط الزخرفية أو كبر الشعار من موثوقية المسح. اترك إطارًا واضحًا واستخدم تباينًا قويًا واختبر الرمز على عدة هواتف قبل الطباعة.",
    faq4Question: "هل يعمل QR Studio دون اتصال؟", faq4Answer: "بعد تحميل ملفات الموقع المطلوبة، تعمل معالجة الصور وإنشاء الرموز في المتصفح دون اتصال. يتطلب الاستخدام الأول تحميل الملفات؛ ولا نضمن توفر الموقع دون اتصال في الزيارة الأولى.",
    footerTagline: "أنشئ. خصّص. امسح.", backTop: "العودة للأعلى ↑", footerRights: "مجاني للاستخدام · صُنع بعناية",
    errorRequired: "هذا الحقل مطلوب.", errorTooLong: "هذا المحتوى طويل جدًا لرمز QR. يرجى اختصاره.", errorUrl: "أدخل رابط موقع صالحًا باستخدام http أو https.", errorEmail: "أدخل بريدًا إلكترونيًا صالحًا.", errorPhone: "أدخل رقم هاتف صالحًا، مع رمز الدولة عند الحاجة.", errorSsid: "أدخل اسم شبكة لا يتجاوز 32 بايت بترميز UTF-8.", errorWpa: "يجب أن تتكون كلمة مرور WPA من 8 إلى 63 حرفًا أو 64 رقمًا سداسيًا عشريًا.", errorWep: "يجب أن تتكون كلمة مرور WEP من 5 أو 13 بايت أو 10/26 رقمًا سداسيًا عشريًا.", errorQrCapacity: "المحتوى طويل جدًا لرمز QR. اختصره ثم حاول مجددًا.", errorQrUnavailable: "تعذر تحميل منشئ QR. أعد تحميل الصفحة وحاول مجددًا.", errorQrGeneration: "تعذر إنشاء رمز QR. جرّب محتوى أقصر أو مختلفًا.", errorLogoType: "اختر صورة PNG أو JPEG أو WebP.", errorLogoSize: "اختر صورة يقل حجمها عن 3 ميغابايت.", errorLogoRead: "تعذرت معالجة هذه الصورة على جهازك.", errorContrast: "التباين ضعيف. اختر لونًا داكنًا للرمز وخلفية فاتحة لتسهيل المسح.",
    successPng: "تم تنزيل PNG.", successSvg: "تم تنزيل SVG.", successCopy: "تم نسخ المحتوى.", errorCopy: "ميزة الحافظة غير متاحة في هذا المتصفح.", errorDownload: "تعذر إنشاء الملف. حاول مرة أخرى.",
    themeLabel: "تبديل السمة", mainNavigation: "التنقل الرئيسي", previewRegion: "معاينة رمز QR", qrPreviewAlt: "معاينة رمز QR المُنشأ", ready: "جاهز للتنزيل", warning: "تحقق من التباين", error: "يتطلب الانتباه",
    processingLogo: "جارٍ معالجة الشعار على هذا الجهاز…", preparingDownload: "جارٍ تجهيز التنزيل…",
    pageTitle: "QR Studio — أنشئ. خصّص. امسح.", privacyPageDocumentTitle: "الخصوصية — QR Studio", privacyPageTitle: "خصوصيتك، بوضوح", privacyPageLead: "صُمم QR Studio للعمل دون إرسال محتوى رموزك أو صورك إلى أي مكان.",
    privacyWhatTitle: "كيف نتعامل مع المحتوى", privacyWhatBody: "يبقى المحتوى الذي تدخله في ذاكرة الصفحة ويُحوّل محليًا بواسطة مكتبة QR المضمّنة في الموقع. لا يُرفع أو يُرسل أو يُسجل أو يُحفظ في تخزين المتصفح. لا يحتوي QR Studio على حسابات أو تحليلات أو إعلانات أو خادم خلفي.",
    privacyLogoTitle: "الشعار الذي تختاره", privacyLogoBody: "تُقرأ صور PNG أو JPEG أو WebP وتُعاد أبعادها محليًا في المتصفح للمعاينة والتصدير. يُلغى رابط الملف المؤقت عند استبداله أو حذفه أو إغلاق الصفحة. تبقى الصورة المعالجة في ذاكرة الصفحة أثناء استخدام المحرر فقط.",
    privacyNetworkTitle: "الشبكة والعمل دون اتصال", privacyNetworkBody: "يحمّل الموقع أنماطه ونصوصه وخطوط النظام ومكتبة QR من الاستضافة نفسها. لا ينشئ توليد الرموز أو معالجة الصور أي طلبات شبكة. بعد تحميل الملفات، يعمل المحرر دون اتصال؛ ولا نضمن العمل دون اتصال في الزيارة الأولى.",
    privacyStaticTitle: "الرموز الثابتة والأمان", privacyStaticBody: "يحتوي الرمز على المحتوى مباشرة ولا يمكن تعديله بعد التنزيل. رموز QR غير مشفرة، ويمكن لأي شخص يمسحها قراءة المعلومات المضمّنة. لا تضع كلمات مرور أو مفاتيح خاصة أو بيانات شخصية حساسة في رمز عام.",
    privacyControlsTitle: "عناصر التحكم", privacyControlsBody: "يحدّث تغيير المحتوى المعاينة في الذاكرة. استخدم إزالة الشعار أو إعادة التصميم لمسح الشعار والخيارات؛ ويؤدي إغلاق الصفحة إلى مسح بقية المحتوى من الذاكرة. لا يحتفظ QR Studio بسجل.",
    privacyUpdated: "آخر تحديث: نوفمبر 2026", returnHome: "العودة إلى QR Studio", contactTitle: "لا تحتاج إلى حساب أو تواصل لاستخدام QR Studio."
  }
};

export function translate(language, key) {
  return translations[language]?.[key] ?? translations.en[key] ?? key;
}

export function hasTranslation(language, key) {
  return Object.hasOwn(translations[language] ?? {}, key);
}

export function translationKeys(language) {
  return Object.keys(translations[language] ?? {}).sort();
}

export function applyTranslations(language, root = document) {
  root.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translate(language, element.dataset.i18n);
    if (element.dataset.i18nHtml === "true") element.innerHTML = value;
    else element.textContent = value;
  });
  root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(language, element.dataset.i18nAriaLabel));
  });
}
