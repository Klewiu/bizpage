export type Locale = 'pl' | 'en';

export const translations: Record<string, Record<Locale, string>> = {
  'brand.name': { pl: 'WickyWave Software', en: 'WickyWave Software' },
  'menu.home': { pl: 'Home', en: 'Home' },
  'menu.activeSaas': { pl: 'Aktywne SaaS', en: 'Active SaaS' },
  'menu.offer': { pl: 'Oferta', en: 'Offer' },
  'menu.about': { pl: 'O nas', en: 'About us' },
  'menu.news': { pl: 'Aktualności', en: 'News' },
  'menu.contact': { pl: 'Kontakt', en: 'Contact' },
  'menu.cta': { pl: 'Umów rozmowę', en: 'Book a call' },
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
  // ── HOME PAGE ──────────────────────────────────────────────────────────────
  // Hero
  'home.eyebrow':  { pl: 'Software House', en: 'Software House' },
  'home.title':    { pl: 'Tworzymy aplikacje webowe, które usprawniają procesy i wspierają rozwój Twojego biznesu.', en: 'We build web applications that improve processes and support your business growth.' },
  'home.subtitle': { pl: 'Projektujemy i rozwijamy dedykowane aplikacje B2B, platformy dla klientów oraz systemy wewnętrzne oparte na Django, Angular i nowoczesnych API. Dostarczamy rozwiązania, które automatyzują pracę, integrują dane i eliminują ograniczenia gotowych systemów.', en: 'We design and develop custom B2B applications, client platforms and internal systems built on Django, Angular and modern APIs — automating work, integrating data, and eliminating the limits of off-the-shelf software.' },
  'home.hero.cta': { pl: 'Porozmawiajmy o projekcie', en: 'Let\'s talk about your project' },

  // Problemy
  'home.problems.title':   { pl: 'Czy któryś z tych problemów brzmi znajomo?', en: 'Do any of these problems sound familiar?' },
  'home.problems.item1':   { pl: 'pracownicy wykonują te same czynności ręcznie każdego dnia', en: 'employees repeat the same manual tasks every day' },
  'home.problems.item2':   { pl: 'dane znajdują się w kilku różnych systemach', en: 'data is scattered across multiple systems' },
  'home.problems.item3':   { pl: 'Excel stał się najważniejszym narzędziem w firmie', en: 'Excel has become the most important tool in the company' },
  'home.problems.item4':   { pl: 'obecny system nie rozwija się razem z biznesem', en: 'the current system can\'t scale with the business' },
  'home.problems.item5':   { pl: 'klienci oczekują wygodniejszej obsługi online', en: 'customers expect a better online experience' },
  'home.problems.closing': { pl: 'Jeżeli choć jeden z tych punktów dotyczy Twojej firmy, prawdopodobnie warto zbudować dedykowaną aplikację zamiast dopasowywania biznesu do ograniczeń gotowego oprogramowania.', en: 'If even one of these applies to your company, it\'s probably worth building a custom application instead of fitting your business around off-the-shelf limitations.' },

  // Usługi
  'home.services.title':    { pl: 'Projektujemy oprogramowanie dopasowane do sposobu działania Twojej firmy', en: 'We design software tailored to the way your business works' },
  'home.services.lead':     { pl: 'Tworzymy rozwiązania, które wspierają codzienną pracę zespołów oraz obsługę klientów.', en: 'We create solutions that support daily team operations and customer service.' },
  'home.services.sublabel': { pl: 'Najczęściej realizujemy:', en: 'We most often build:' },
  'home.services.item1':    { pl: 'aplikacje webowe B2B i B2C', en: 'B2B and B2C web applications' },
  'home.services.item2':    { pl: 'systemy do zarządzania procesami', en: 'process management systems' },
  'home.services.item3':    { pl: 'panele administracyjne', en: 'admin panels' },
  'home.services.item4':    { pl: 'portale klienta', en: 'client portals' },
  'home.services.item5':    { pl: 'platformy SaaS', en: 'SaaS platforms' },
  'home.services.item6':    { pl: 'integracje z ERP, CRM i zewnętrznymi API', en: 'ERP, CRM and external API integrations' },
  'home.services.item7':    { pl: 'automatyzację procesów biznesowych', en: 'business process automation' },

  // Kiedy gotowe systemy przestają wystarczyć
  'home.why.title':   { pl: 'Kiedy gotowe systemy przestają wystarczyć', en: 'When off-the-shelf systems stop being enough' },
  'home.why.lead':    { pl: 'Standardowe rozwiązania dobrze sprawdzają się na początku. Wraz z rozwojem firmy pojawiają się jednak ograniczenia:', en: 'Standard solutions work well at the start. But as your company grows, limitations appear:' },
  'home.why.item1':   { pl: 'procesy trzeba dostosowywac do możliwości programu', en: 'processes must conform to software capabilities' },
  'home.why.item2':   { pl: 'kolejne integracje stają się kosztowne', en: 'additional integrations become expensive' },
  'home.why.item3':   { pl: 'pracownicy wykonują wiele czynności ręcznie', en: 'employees handle many tasks manually' },
  'home.why.item4':   { pl: 'rozwój nowych funkcji trwa zbyt długo', en: 'developing new features takes too long' },
  'home.why.closing': { pl: 'Dedykowana aplikacja pozwala zbudować system zgodny z rzeczywistym sposobem działania firmy — a nie odwrotnie.', en: 'A custom application lets you build a system that matches how your business actually works — not the other way around.' },

  // Technologie
  'home.tech.title':    { pl: 'Technologie, które wybieramy pod potrzeby projektu', en: 'Technologies we select based on project needs' },
  'home.tech.sublabel': { pl: 'Pracujemy głównie z:', en: 'We primarily work with:' },
  'home.tech.closing':  { pl: 'Technologia jest dla nas narzędziem. Najpierw projektujemy rozwiązanie biznesowe, dopiero później dobieramy odpowiedni stos technologiczny.', en: 'Technology is a tool for us. We design the business solution first, then choose the appropriate technology stack.' },

  // Jak pracujemy
  'home.process.title':       { pl: 'Przejrzysty proces. Jedna odpowiedzialność.', en: 'Clear process. Single point of accountability.' },
  'home.process.step1.title': { pl: 'Poznajemy biznes', en: 'We learn your business' },
  'home.process.step1.body':  { pl: 'Rozumiemy procesy, użytkowników i cele projektu. Dzięki temu budujemy rozwiązanie odpowiadające realnym potrzebom.', en: 'We understand processes, users and project goals. This way we build a solution that meets real needs.' },
  'home.process.step2.title': { pl: 'Projektujemy', en: 'We design' },
  'home.process.step2.body':  { pl: 'Tworzymy makiety, architekturę oraz plan wdrożenia. Widzisz produkt, zanim powstanie.', en: 'We create wireframes, architecture and a deployment plan. You see the product before it\'s built.' },
  'home.process.step3.title': { pl: 'Tworzymy i wdrażamy', en: 'We build and deploy' },
  'home.process.step3.body':  { pl: 'Realizujemy projekt iteracyjnie, regularnie prezentując postępy i dostarczając kolejne funkcje.', en: 'We deliver iteratively, regularly presenting progress and shipping new features.' },
  'home.process.step4.title': { pl: 'Rozwijamy', en: 'We evolve' },
  'home.process.step4.body':  { pl: 'Po wdrożeniu nadal rozwijamy aplikację, monitorujemy jej działanie i pomagamy w kolejnych etapach wzrostu biznesu.', en: 'After launch we continue developing the app, monitor its performance, and support the next stages of business growth.' },

  // Dlaczego WickyWave
  'home.whyus.title': { pl: 'Nie tylko piszemy kod', en: 'We do more than write code' },
  'home.whyus.lead':  { pl: 'Pomagamy firmom budować oprogramowanie, które realnie usprawnia działalność.', en: 'We help companies build software that genuinely improves operations.' },
  'home.whyus.item1': { pl: 'analiza procesów przed rozpoczęciem programowania', en: 'process analysis before programming begins' },
  'home.whyus.item2': { pl: 'projektowanie z myślą o użytkownikach', en: 'design focused on users' },
  'home.whyus.item3': { pl: 'nowoczesna architektura gotowa na rozwój', en: 'modern architecture ready for growth' },
  'home.whyus.item4': { pl: 'integracja z istniejącymi systemami', en: 'integration with existing systems' },
  'home.whyus.item5': { pl: 'długoterminowe wsparcie po wdrożeniu', en: 'long-term post-launch support' },

  // CTA
  'home.cta.title': { pl: 'Porozmawiajmy o Twoim projekcie', en: 'Let\'s talk about your project' },
  'home.cta.body':  { pl: 'Masz pomysł na nową aplikację albo obecny system ogranicza rozwój firmy? Przeanalizujemy potrzeby, zaproponujemy możliwe rozwiązania i przygotujemy plan realizacji.', en: 'Have an idea for a new application or is your current system limiting growth? We\'ll analyze your needs, propose solutions and prepare a roadmap.' },
  'home.cta.btn':   { pl: 'Umów bezpłatną konsultację', en: 'Schedule a free consultation' },
  'offer.title': { pl: 'Oferta', en: 'Offer' },
  'offer.lead': { pl: 'Budujemy produkty, które są szybkie, skalowalne i zrozumiałe dla zespołu.', en: 'We build products that are fast, scalable, and easy for your team to use.' },
  'offer.item1': { pl: 'Aplikacje webowe B2B/B2C', en: 'B2B/B2C web applications' },
  'offer.item2': { pl: 'Panele administracyjne i dashboardy', en: 'Admin panels and dashboards' },
  'offer.item3': { pl: 'Automatyzacja procesów i integracje API', en: 'Process automation and API integrations' },
  'offer.item4': { pl: 'Opieka powdrożeniowa i rozwój', en: 'Post-launch support and evolution' },
  'about.title': { pl: 'O nas', en: 'About us' },
  'about.body': {
    pl: 'Jesteśmy software housem IT zorientowanym na rezultat. Łączymy technologię, design i analitykę, aby realnie poprawiać wyniki biznesowe klientów.',
    en: 'We are an IT software house focused on outcomes. We combine technology, design, and analytics to deliver measurable business improvements.'
  },
  'news.title': { pl: 'News', en: 'News' },
  'news.body': {
    pl: 'Publikujemy case studies, praktyczne poradniki i aktualności o trendach produktowych.',
    en: 'We publish case studies, practical guides, and updates on product trends.'
  },
  'news.card1': { pl: 'Jak skracamy czas obsługi zamówienia o 43%', en: 'How we reduced order processing time by 43%' },
  'news.card2': { pl: 'Checklist MVP dla startupu B2B', en: 'MVP checklist for B2B startups' },
  'news.card3': { pl: 'Kiedy warto zamienić Excel na aplikację', en: 'When to replace spreadsheets with an app' },
  'xoaila.title': { pl: 'Xoaila - aktywny SaaS pod nowoczesne pozycjonowanie AI', en: 'Xoaila - active SaaS for modern AI-first positioning' },
  'xoaila.body': {
    pl: 'Xoaila to aktywny produkt SaaS, który pomaga markom budować widoczność w nowym modelu wyszukiwania: od klasycznego SEO po odpowiedzi generowane przez AI.',
    en: 'Xoaila is an active SaaS product helping brands build visibility in a new search model: from classic SEO to AI-generated answer surfaces.'
  },
  'xoaila.point1': { pl: 'Monitoring obecności marki w wynikach AI i wyszukiwarkach.', en: 'Brand visibility monitoring across AI answers and search engines.' },
  'xoaila.point2': { pl: 'Rekomendacje treści pod indeksowanie semantyczne i LLM.', en: 'Content recommendations for semantic indexing and LLM relevance.' },
  'xoaila.point3': { pl: 'Dashboard wzrostu widoczności i tematów, które konwertują.', en: 'Growth dashboard for visibility and conversion-ready topic clusters.' },
  'contact.title': { pl: 'Kontakt', en: 'Contact' },
  'contact.body': {
    pl: 'Opowiedz nam o swoim celu. Odpowiadamy zwykle w ciągu jednego dnia roboczego.',
    en: 'Tell us about your goal. We usually reply within one business day.'
  },
  'contact.prompt': {
    pl: 'Porozmawiajmy o Twoim projekcie.',
    en: 'Let’s talk about your project.'
  },
  'contact.reply': {
    pl: 'Odpowiadamy zwykle w ciągu jednego dnia roboczego.',
    en: 'We usually reply within one business day.'
  },
  'contact.loading': { pl: 'Ładowanie', en: 'Loading' },
  'contact.cta': { pl: 'Napisz: hello@wickywave.wicky', en: 'Email us: hello@wickywave.wicky' },
  'footer.copy': {
    pl: 'WickyWave Software. Nowoczesne produkty dla nowoczesnych firm.',
    en: 'WickyWave Software. Modern products for modern companies.'
  }
};
