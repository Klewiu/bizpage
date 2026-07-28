export type Locale = 'pl' | 'en';

export const translations: Record<string, Record<Locale, string>> = {
  'brand.name': { pl: 'WickyWave Software', en: 'WickyWave Software' },
  'menu.home': { pl: 'Home', en: 'Home' },
  'menu.activeSaas': { pl: 'Aktywne SaaS', en: 'Active SaaS' },
  'menu.offer': { pl: 'Oferta', en: 'Offer' },
  'menu.about': { pl: 'O nas', en: 'About us' },
  'menu.news': { pl: 'Aktualnosci', en: 'News' },
  'menu.contact': { pl: 'Kontakt', en: 'Contact' },
  'menu.cta': { pl: 'Umow rozmowe', en: 'Book a call' },
  'ocean.tagline': {
    pl: 'Mamy pomysł na software na każdą porę dnia.',
    en: 'We have a software idea for every time of the day.'
  },
  'ocean.mood.dawn': { pl: 'ŚWIT', en: 'DAWN' },
  'ocean.mood.morning': { pl: 'PORANEK', en: 'MORNING' },
  'ocean.mood.midday': { pl: 'POŁUDNIE', en: 'MIDDAY' },
  'ocean.mood.goldenHour': { pl: 'ZŁOTA GODZINA', en: 'GOLDEN HOUR' },
  'ocean.mood.sunset': { pl: 'ZACHÓD SŁOŃCA', en: 'SUNSET' },
  'ocean.mood.moonlit': { pl: 'NOC', en: 'NIGHT' },
  'home.eyebrow': { pl: 'Nowoczesne produkty cyfrowe dla rosnacych firm', en: 'Modern digital products for growing companies' },
  'home.title': { pl: 'Tworzymy aplikacje, ktore przyspieszaja Twoj biznes', en: 'We build applications that accelerate your business' },
  'home.subtitle': {
    pl: 'Projektujemy webowe produkty B2B i B2C oraz wdrazamy wewnetrzne narzedzia, ktore poprawiaja wspolprace zespolu.',
    en: 'We design B2B and B2C web products and implement internal tools that upgrade your team workflow.'
  },
  'home.hook.readiness.title': { pl: 'Czy jestescie gotowi?', en: 'Are you ready?' },
  'home.hook.readiness.body': {
    pl: 'Czy jestescie gotowi pokazac klientom nowoczesna aplikacje webowa lub usprawnic wspolprace zespolu dzieki aplikacji online?',
    en: 'Are you ready to show customers a modern web app or improve teamwork through an online platform?'
  },
  'home.hook.frustration.title': { pl: 'Frustruje Was status quo?', en: 'Frustrated with the status quo?' },
  'home.hook.frustration.body': {
    pl: 'Czy Twoje narzedzia online dzialaja jakby byl 1999 rok? A moze nadal brakuje strony, ktora buduje zaufanie klientow?',
    en: 'Do your online tools still feel like 1999? Or are you still missing a website that earns customer trust?'
  },
  'home.hook.process.title': { pl: 'Mamy proces i tempo', en: 'We bring process and speed' },
  'home.hook.process.body': {
    pl: 'Wprowadzamy nowoczesne aplikacje, ktore podnosza doswiadczenie klienta i automatyzuja codzienne operacje zespolu.',
    en: 'We introduce modern apps that elevate customer experience and automate your team operations.'
  },
  'home.process.title': { pl: 'Jak pracujemy', en: 'How we work' },
  'home.process.body': {
    pl: 'Od strategii i UX, przez development, po wdrozenie i opieke. Jedna odpowiedzialna druzyna od pomyslu po wynik.',
    en: 'From strategy and UX to development, launch, and support. One accountable team from idea to measurable outcome.'
  },
  'home.process.step1': { pl: 'Odkrycie potrzeb', en: 'Discovery workshop' },
  'home.process.step2': { pl: 'Projekt i prototyp', en: 'Product design and prototype' },
  'home.process.step3': { pl: 'Wdrozenie i rozwoj', en: 'Implementation and iteration' },
  'offer.title': { pl: 'Oferta', en: 'Offer' },
  'offer.lead': { pl: 'Budujemy produkty, ktore sa szybkie, skalowalne i zrozumiale dla zespolu.', en: 'We build products that are fast, scalable, and easy for your team to use.' },
  'offer.item1': { pl: 'Aplikacje webowe B2B/B2C', en: 'B2B/B2C web applications' },
  'offer.item2': { pl: 'Panele administracyjne i dashboardy', en: 'Admin panels and dashboards' },
  'offer.item3': { pl: 'Automatyzacja procesow i integracje API', en: 'Process automation and API integrations' },
  'offer.item4': { pl: 'Opieka powdrozeniowa i rozwoj', en: 'Post-launch support and evolution' },
  'about.title': { pl: 'O nas', en: 'About us' },
  'about.body': {
    pl: 'Jestesmy software housem IT zorientowanym na rezultat. Laczymy technologie, design i analityke, aby realnie poprawiac wyniki biznesowe klientow.',
    en: 'We are an IT software house focused on outcomes. We combine technology, design, and analytics to deliver measurable business improvements.'
  },
  'news.title': { pl: 'News', en: 'News' },
  'news.body': {
    pl: 'Publikujemy case studies, praktyczne poradniki i aktualnosci o trendach produktowych.',
    en: 'We publish case studies, practical guides, and updates on product trends.'
  },
  'news.card1': { pl: 'Jak skracamy czas obslugi zamowienia o 43%', en: 'How we reduced order processing time by 43%' },
  'news.card2': { pl: 'Checklist MVP dla startupu B2B', en: 'MVP checklist for B2B startups' },
  'news.card3': { pl: 'Kiedy warto zamienic Excel na aplikacje', en: 'When to replace spreadsheets with an app' },
  'xoaila.title': { pl: 'Xoaila - aktywny SaaS pod nowoczesne pozycjonowanie AI', en: 'Xoaila - active SaaS for modern AI-first positioning' },
  'xoaila.body': {
    pl: 'Xoaila to aktywny produkt SaaS, ktory pomaga markom budowac widocznosc w nowym modelu wyszukiwania: od klasycznego SEO po odpowiedzi generowane przez AI.',
    en: 'Xoaila is an active SaaS product helping brands build visibility in a new search model: from classic SEO to AI-generated answer surfaces.'
  },
  'xoaila.point1': { pl: 'Monitoring obecnosci marki w wynikach AI i wyszukiwarkach.', en: 'Brand visibility monitoring across AI answers and search engines.' },
  'xoaila.point2': { pl: 'Rekomendacje tresci pod indeksowanie semantyczne i LLM.', en: 'Content recommendations for semantic indexing and LLM relevance.' },
  'xoaila.point3': { pl: 'Dashboard wzrostu widocznosci i tematow, ktore konwertuja.', en: 'Growth dashboard for visibility and conversion-ready topic clusters.' },
  'contact.title': { pl: 'Kontakt', en: 'Contact' },
  'contact.body': {
    pl: 'Opowiedz nam o swoim celu. Odpowiadamy zwykle w ciagu jednego dnia roboczego.',
    en: 'Tell us about your goal. We usually reply within one business day.'
  },
  'contact.cta': { pl: 'Napisz: hello@wickywave.wicky', en: 'Email us: hello@wickywave.wicky' },
  'footer.copy': {
    pl: 'WickyWave Software. Nowoczesne produkty dla nowoczesnych firm.',
    en: 'WickyWave Software. Modern products for modern companies.'
  }
};
