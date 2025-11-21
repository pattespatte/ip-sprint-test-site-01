# Skapa en Vue.js-webbplats med Försäkringskassans Designsystem (FKUI)

En omfattande, steg-för-steg-guide för att bygga "ip-sprint-test-site-01" som använder FKUI som grund.

**Utvecklingsmiljö:** VMware med Ubuntu Client

## Innehållsförteckning

1. [Förutsättningar](#förutsättningar)
2. [Arkitekturöversikt](#arkitekturöversikt)
3. [Initial konfigurering](#initial-konfigurering)
4. [Konfiguration](#konfiguration)
5. [Skapa temalagret](#skapa-temalagret)
6. [Bygga de tre sidorna](#bygga-de-tre-sidorna)
7. [Bästa praxis](#bästa-praxis)
8. [Testning & lokal körning](#testning--lokal-körning)
9. [Prestanda & optimering](#prestanda--optimering)
10. [Säkerhetsöverväganden](#säkerhetsöverväganden)
11. [Tillgänglighet](#tillgänglighet)
12. [Driftsättningsförberedelse](#driftsättningsförberedelse)
13. [Felsökningssektion](#felsökningssektion)
14. [Nästa steg & resurser](#nästa-steg--resurser)

---

## Förutsättningar

### Systemkrav

**Utvecklingsmiljö:**

- VMware Workstation eller VMware Player
- Ubuntu 22.04 LTS eller nyare (rekommenderas)
- Minimum 4GB RAM allokerat till VM (8GB rekommenderas)
- 20GB ledigt diskutrymme

💡 **Tips**: Se till att VMware Tools är installerat på din Ubuntu VM för bättre prestanda och utdelning av klippbord mellan värd- och gäst-OS.

### Nödvändig programvara och versioner

Innan du börjar, se till att du har följande programvara installerad på ditt Ubuntu-system:

#### Checklista för konfigurering

- [ ] Node.js v16+ installerat
- [ ] Git konfigurerat med SSH-nycklar
- [ ] VS Code med Vue-tillägg
- [ ] Byggverktyg installerade
- [ ] Projektkatalog skapad

#### 1. **Node.js** (v16.x eller högre)

Det finns flera sätt att installera Node.js på Ubuntu. Här är den rekommenderade metoden med NodeSource:

```bash
# Uppdatera paketindex
sudo apt update

# Installera curl om det inte redan är installerat
sudo apt install -y curl

# Lägg till NodeSource-förråd för Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Installera Node.js
sudo apt install -y nodejs

# Verifiera installation
node --version
npm --version
```

**Alternativ metod med nvm (Node Version Manager):**

```bash
# Installera nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Ladda om shell-konfiguration
source ~/.bashrc

# Installera Node.js LTS-version
nvm install --lts

# Verifiera installation
node --version
npm --version
```

💡 **Tips**: Att använda nvm låter dig enkelt växla mellan olika Node.js-versioner, vilket är användbart för att hantera flera projekt.

⚠️ **Varning**: FKUI kräver Node.js 16.x eller högre. Verifiera din version med `node --version` innan du fortsätter.

#### 2. **npm** (v8.x eller högre) eller **yarn** (v1.22.x eller högre)

npm följer med Node.js. För att installera yarn:

```bash
# Installera yarn globalt med npm
sudo npm install -g yarn

# Verifiera installation
yarn --version
```

#### 3. **Git**

```bash
# Installera Git
sudo apt update
sudo apt install -y git

# Verifiera installation
git --version

# Konfigurera Git (ersätt med din information)
git config --global user.name "Ditt Namn"
git config --global user.email "din.epost@example.com"
```

#### 4. **Kodredigerare**

**Rekommenderas: Visual Studio Code**

```bash
# Metod 1: Ladda ner och installera från officiell webbplats
# Besök https://code.visualstudio.com/Download och ladda ner .deb-paketet

# Metod 2: Installera via snap (rekommenderas för Ubuntu)
sudo snap install --classic code

# Verifiera installation
code --version
```

**Installera rekommenderade VS Code-tillägg:**

```bash
# Starta VS Code och installera tillägg via kommandoraden
code --install-extension Vue.volar
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

**Alternativa redigerare som fungerar bra på Ubuntu:**

- WebStorm (tillgänglig via snap: `sudo snap install webstorm --classic`)
- Sublime Text (tillgänglig via snap: `sudo snap install sublime-text --classic`)
- Vim/Neovim (för avancerade användare: `sudo apt install vim` eller `sudo apt install neovim`)

#### 5. **Ytterligare byggverktyg** (krävs för vissa npm-paket)

```bash
# Installera byggessentials (krävs för nativa npm-moduler)
sudo apt install -y build-essential

# Installera ytterligare utvecklingsbibliotek
sudo apt install -y libssl-dev
```

### Ubuntu-specifika terminaltips

I hela denna guide kommer du att använda Ubuntu Terminal. Här är några hjälpsamma tips:

**Öppna terminalen:**

- Tryck `Ctrl + Alt + T`
- Eller sök efter "Terminal" i Aktiviteter-menyn

**Användbara terminalgenvägar:**

- `Ctrl + C` - Avbryt aktuellt kommando
- `Ctrl + L` - Rensa terminalskärmen
- `Tab` - Autocomplete-kommandon och filsökvägar
- `↑` / `↓` - Navigera i kommandohistorik
- `Ctrl + Shift + C` - Kopiera markerad text
- `Ctrl + Shift + V` - Klistra in text

💡 **Tips**: Du kan öppna aktuell katalog i din filhanterare med kommandot `xdg-open .`

### Kunskapsförutsättningar

Denna guide förutsätter att du har:

- Grundläggande förståelse för HTML, CSS och JavaScript
- Bekantskap med Linux/Ubuntu terminal och grundläggande kommandon (ls, cd, mkdir, etc.)
- Grundläggande kunskaper i Git-operationer (clone, commit, push)
- Begränsad Vue.js-erfarenhet är OK - vi förklarar koncept när vi går

### Hjälpsamma lärresurser

Om du behöver friska upp några koncept:

- [Vue.js Official Guide](https://vuejs.org/guide/introduction.html)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [npm Documentation](https://docs.npmjs.com/)
- [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
- [Ubuntu Terminal Basics](https://ubuntu.com/tutorials/command-line-for-beginners)

---

## Arkitekturöversikt

### Förstå "temalager"-konceptet

"Temalagret" är ett lättviktigt tillvägagångssätt för att anpassa FKUI utan att uppfinna hjulet på nytt. Tänk på det som att sätta ett anpassat omslag på en bok - innehållet och strukturen förblir desamma, men utseendet ändras för att matcha ditt varumärke.

```
┌─────────────────────────────────────┐
│         ip-sprint-test-site-01      │  ← Ditt anpassade temalager
│  (färger, typsnitt, varumärke, sidor)   │
├─────────────────────────────────────┤
│             FKUI Core               │  ← Basdesignsystem
│    (komponenter, mönster, verktyg)    │
├─────────────────────────────────────┤
│            Vue.js Framework         │  ← Underliggande ramverk
└─────────────────────────────────────┘
```

💡 **Tips**: Temalager-metoden innebär att du bara behöver underhålla dina anpassade ändringar, inte hela designsystemet. Detta gör uppdateringar mycket enklare!

### När man ska åsidosätta vs när man ska ärva

**Åsidosätt när:**

- Ändra färger, typsnitt eller avstånd
- Modifiera komponentutseende (inte beteende)
- Lägga till varumärkesspecifika element
- Skapa anpassade layouter

**Ärva när:**

- Använda standardkomponenter som de är
- Följa etablerade interaktionsmönster
- Utnyttja tillgänglighetsfunktioner
- Bibehålla konsekvent användarupplevelse

⚠️ **Varning**: Var försiktig när du åsidosätter FKUI-komponenter. För många anpassningar kan göra framtida uppdateringar svåra. Fråga dig alltid om ändringen verkligen är nödvändig.

### Fördelar med detta tillvägagångssätt

1. **Underhållbarhet**: FKUI-uppdateringar kan integreras med minimala ändringar
2. **Konsekvens**: Kärnfunktionalitet förblir tillförlitlig och testad
3. **Prestanda**: Mindre kodbas, snabbare laddningstider
4. **Utvecklarupplevelse**: Lättare att förstå och modifiera

---

## Initial konfigurering

### Steg 1: Analysera FKUI-förråd

⏱️ **Beräknad tid: 15 minuter**

Först, låt oss utforska FKUI-förråd för att förstå deras struktur:

1. **Main Design System**: [https://github.com/Forsakringskassan/designsystem](https://github.com/Forsakringskassan/designsystem)
   - Innehåller kärnkomponenter, stilar och verktyg
   - Granska README för att förstå beroenden och krav

2. **User Template**: [https://github.com/Forsakringskassan/designsystem-user-lib](https://github.com/Forsakringskassan/designsystem-user-lib)
   - Mall för att skapa anpassade applikationer med FKUI
   - Visar hur man korrekt importerar och använder FKUI-komponenter

⚠️ **Viktigt**: Innan du fortsätter, verifiera komponentnamn och importsökvägar i FKUI-dokumentationen. Komponent-API:er kan ändras mellan versioner.

### Steg 2: Konfigurera GitLab-förråd

⏱️ **Beräknad tid: 10 minuter**

1. Skapa ett nytt förråd i GitLab med namnet "ip-sprint-test-site-01"
2. Initialisera det med en README.md (du kan använda standard)
3. Klona förrådet till din Ubuntu VM:

   ```bash
   # Navigera till din föredragna projektkatalog
   cd ~/projects  # eller var du håller din kod
   
   # Skapa katalog om den inte finns
   mkdir -p ~/projects
   
   # Klona förrådet
   git clone https://gitlab.com/your-username/ip-sprint-test-site-01.git
   
   # Navigera in i projektkatalogen
   cd ip-sprint-test-site-01
   ```

💡 **Tips**: Använd SSH istället för HTTPS för Git-operationer för att undvika att ange uppgifter upprepade gånger.

**Konfigurera SSH-nycklar på Ubuntu:**

```bash
# Generera SSH-nyckel (tryck Enter för att acceptera standardvärden)
ssh-keygen -t ed25519 -C "din.epost@example.com"

# Starta ssh-agent
eval "$(ssh-agent -s)"

# Lägg till din SSH-nyckel till agenten
ssh-add ~/.ssh/id_ed25519

# Kopiera din publika nyckel till klippbordet
cat ~/.ssh/id_ed25519.pub
# Kopiera sedan manuellt utdata och lägg till den i GitLab (Settings → SSH Keys)
```

### Steg 3: Projektinitialisering

⏱️ **Beräknad tid: 10 minuter**

Vi kommer att använda Vite som vårt byggverktyg, vilket rekommenderas för Vue.js-projekt:

```bash
# Se till att du är i projektkatalogen
cd ~/projects/ip-sprint-test-site-01

# Skapa ett nytt Vue-projekt med Vite (punkten skapar det i aktuell katalog)
npm create vue@latest .

# När du blir tillfrågad, välj följande alternativ:
# ✅ TypeScript? Yes
# ✅ JSX Support? No
# ✅ Vue Router? Yes
# ✅ Pinia? No (behövs inte för detta projekt)
# ✅ Vitest? No (vi lägger till testning senare vid behov)
# ✅ End-to-End Testing Solution? No
# ✅ ESLint? Yes
# ✅ Prettier? Yes
```

⚠️ **Varning**: Punkten (.) efter kommandot skapar projektet i aktuell katalog. Se till att du är i rätt katalog innan du kör detta kommando! Använd `pwd` för att kontrollera din aktuella katalog.

**Installera beroenden:**

```bash
# Installera alla projektberoenden
npm install

# Detta kan ta några minuter vid första körningen
```

### Steg 4: Installera FKUI-beroenden

⏱️ **Beräknad tid: 5 minuter**

Baserat på FKUI-dokumentationen, installera nödvändiga paket:

```bash
# Installera FKUI-paket (se till att alla använder samma version)
npm install @fkui/theme-default@^6.26.0 @fkui/design@^6.26.0 @fkui/date@^6.26.0 @fkui/logic@^6.26.0 @fkui/vue@^6.26.0

# Installera SCSS-stöd för Vite
npm install -D sass-embedded
```

💡 **Tips**: Kontrollera FKUI-dokumentationen för senaste versionsnumret och eventuella ytterligare beroenden som krävs för ditt specifika användningsfall.

⚠️ **Viktigt**: Använd alltid samma versionsnummer för alla @fkui-paket för att undvika kompatibilitetsproblem. Verifiera med:

```bash
# För att lista alla @fkui-paket: Använd
npm list @fkui/*
# eller helt enkelt
npm list
# för att se alla beroenden
# För att kontrollera ett specifikt @fkui-paket: Använd det fullständiga namnet som
npm list @fkui/vue
# För att se alla @fkui-paket globalt: Använd
npm list -g | grep @fkui
```

### Steg 5: Projektmappsstruktur

Din projektstruktur bör se ut så här:

```
ip-sprint-test-site-01/
├── public/                 # Statiska tillgångar
├── src/
│   ├── assets/            # Anpassade tillgångar (bilder, typsnitt)
│   ├── components/        # Anpassade Vue-komponenter
│   ├── plugins/           # Vue-plugins (FKUI-registrering)
│   ├── router/            # Vue Router-konfiguration
│   ├── styles/            # Anpassade stilar och temaåsidosättningar
│   ├── types/             # TypeScript-typdefinitioner
│   ├── views/             # Sidkomponenter
│   ├── App.vue            # Huvudapplikationskomponent
│   ├── main.ts            # Applikationsingångspunkt
│   └── style.css          # Basstilar
├── .env                   # Miljövariabler
├── .env.local             # Lokala miljövariabler (inte commitad)
├── .gitignore             # Git ignore-fil
├── index.html             # HTML-mall
├── package.json           # Projektberoenden och skript
├── tsconfig.json          # TypeScript-konfiguration
├── tsconfig.app.json      # App-specifik TypeScript-konfig
├── tsconfig.node.json     # Node-specifik TypeScript-konfig
└── vite.config.ts         # Vite-konfiguration
```

**Skapa ytterligare kataloger:**

```bash
# Skapa katalogstruktur
mkdir -p src/plugins
mkdir -p src/types
mkdir -p src/styles/components
```

**Visa din projektstruktur:**

```bash
# Använd tree-kommandot för att visualisera katalogstruktur (installera vid behov)
sudo apt install tree
tree -L 2 -I 'node_modules'

# Eller använd ls
ls -la
```

💡 **Tips**: Att hålla dina temafiler organiserade i `src/styles/`-katalogen gör dem lättare att hitta och underhålla när ditt projekt växer.

---

## Konfiguration

### Steg 1: Konfigurera byggverktyg (Vite)

⏱️ **Beräknad tid: 10 minuter**

Uppdatera din `vite.config.ts` för att korrekt hantera FKUI:

```typescript
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Lägg till FKUI:s SCSS-variabler och mixins
        additionalData: `@use "@fkui/design/src/core/variables" as *;`,
        api: 'modern-compiler' // Använd modern Sass API
      }
    }
  },
  server: {
    port: 5173,
    host: true // Detta tillåter åtkomst från värdmaskin till VM
  }
})
```

💡 **Tips**: Inställningen `host: true` låter dig komma åt din utvecklingsserver från din värdmaskins webbläsare med VM:s IP-adress.

### Steg 2: Konfigurera package.json

Uppdatera din `package.json` med nödvändiga skript:

```json
{
  "name": "ip-sprint-test-site-01",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "@fkui/date": "^6.26.0",
    "@fkui/design": "^6.26.0",
    "@fkui/logic": "^6.26.0",
    "@fkui/theme-default": "^6.26.0",
    "@fkui/vue": "^6.26.0",
    "vue": "^3.5.24",
    "vue-router": "^4.6.3"
  },
  "devDependencies": {
    "@types/node": "^24.10.1",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.8.1",
    "eslint": "^9.39.1",
    "prettier": "^3.0.0",
    "sass-embedded": "^1.93.3",
    "typescript": "~5.9.3",
    "vite": "^7.2.4",
    "vue-tsc": "^3.1.4"
  }
}
```

### Steg 3: Konfigurera TypeScript-definitioner för FKUI

Skapa typdefinitioner för FKUI-komponenter:

```typescript
// src/types/fkui.d.ts
declare module '@fkui/vue' {
  import { DefineComponent } from 'vue'
  
  export const FkButton: DefineComponent<any, any, any>
  export const FkInput: DefineComponent<any, any, any>
  export const FkCard: DefineComponent<any, any, any>
  export const FkAlert: DefineComponent<any, any, any>
  export const FkForm: DefineComponent<any, any, any>
  export const FkFormGroup: DefineComponent<any, any, any>
  export const FkLabel: DefineComponent<any, any, any>
  export const FkSelect: DefineComponent<any, any, any>
  export const FkTextarea: DefineComponent<any, any, any>
  export const FkCheckbox: DefineComponent<any, any, any>
  export const FkCheckboxGroup: DefineComponent<any, any, any>
  export const FkFieldset: DefineComponent<any, any, any>
  export const FkErrorMessage: DefineComponent<any, any, any>
  export const FkTable: DefineComponent<any, any, any>
  export const FkTableRow: DefineComponent<any, any, any>
  export const FkTableCell: DefineComponent<any, any, any>
  export const FkTableHeaderCell: DefineComponent<any, any, any>
  export const FkBadge: DefineComponent<any, any, any>
  // Lägg till andra FKUI-komponenter vid behov
}
```

### Steg 4: Skapa FKUI-plugin för komponentregistrering

Skapa ett plugin för att registrera FKUI-komponenter:

```typescript
// src/plugins/fkui.ts
import type { App } from 'vue'
import { 
  FkButton, 
  FkInput,
  FkCard,
  FkAlert,
  FkForm,
  FkFormGroup,
  FkLabel,
  FkSelect,
  FkTextarea,
  FkCheckbox,
  FkCheckboxGroup,
  FkFieldset,
  FkErrorMessage,
  FkTable,
  FkTableRow,
  FkTableCell,
  FkTableHeaderCell,
  FkBadge
  // Importera andra FKUI-komponenter vid behov
} from '@fkui/vue'

const components = {
  FkButton,
  FkInput,
  FkCard,
  FkAlert,
  FkForm,
  FkFormGroup,
  FkLabel,
  FkSelect,
  FkTextarea,
  FkCheckbox,
  FkCheckboxGroup,
  FkFieldset,
  FkErrorMessage,
  FkTable,
  FkTableRow,
  FkTableCell,
  FkTableHeaderCell,
  FkBadge
  // Lägg till andra komponenter här
}

export default {
  install(app: App) {
    // Registrera alla FKUI-komponenter globalt
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}
```

⚠️ **Viktigt**: Verifiera alla komponentnamn mot [FKUI Component Documentation](https://forsakringskassan.github.io/designsystem/components.html). Komponentnamn som används i denna guide är exempel och kan skilja sig från faktiska FKUI-exporter.

### Steg 5: Konfigurera temalager-system

Skapa grunden för dina temaåsidosättningar:

```bash
# Skapa styles-katalogstruktur
mkdir -p src/styles
```

```scss
// src/styles/theme.scss

// Importera FKUI-tema
@use "@fkui/theme-default";

// Definera anpassade temavariabler
:root {
  // Åsidosätt primärfärger
  --fk-primary-color: #3366cc;  // Ditt varumärkes primärfärg
  --fk-secondary-color: #6699ff; // Ditt varumärkes sekundärfärg
  
  // Åsidosätt typsnitt
  --fk-font-family-base: "Noto Sans", Arial, sans-serif;
  
  // Åsidosätt avstånd (vid behov)
  --fk-spacing-large: 2rem;
}

// Anpassade komponentåsidosättningar
.fk-button {
  // Anpassade knappstilar som utökar FKUI
  border-radius: 6px; // Något annorlunda än FKUI-standard
  
  &.primary {
    background-color: var(--fk-primary-color);
  }
}
```

### Steg 6: Miljökonfiguration

Ställ in miljövariabler för olika stadier:

```bash
# Skapa miljöfiler
touch .env .env.local
```

```bash
# .env
VITE_APP_TITLE=IP Sprint Test Site 01
VITE_APP_VERSION=1.0.0
VITE_FKUI_THEME=default
```

```bash
# .env.local (inte commitad till versionshantering)
VITE_API_URL=http://localhost:3000/api
VITE_DEBUG=true
```

---

## Skapa temalagret

### Steg 1: Hur man korrekt utökar FKUI

⏱️ **Beräknad tid: 20 minuter**

Nyckeln till ett framgångsrikt temalager är att utöka, inte ersätta. Så här sätter du upp ditt tema korrekt:

```bash
# Skapa temarelaterade SCSS-filer
touch src/styles/_variables.scss
touch src/styles/_colors.scss
touch src/styles/_typography.scss
touch src/styles/_branding.scss
```

```scss
// src/styles/_variables.scss

// Importera först FKUI-variabler
@use "@fkui/design/src/core/variables" as fkui;

// Definera sedan dina åsidosättningar
$primary-color: #3366cc;  // Ditt varumärkesprimär
$secondary-color: #6699ff; // Ditt varumärkessekundär
$text-color: #333333;     // Din textfärg
$background-color: #ffffff; // Din bakgrundsfärg

// Åsidosätt FKUI-variabler med dina värden
$fk-primary: $primary-color;
$fk-secondary: $secondary-color;
$fk-text: $text-color;
$fk-background: $background-color;
```

⚠️ **Varning**: Importera alltid FKUI-variabler innan du definierar dina åsidosättningar. Detta säkerställer att du kan referera till FKUI:s originalvärden vid behov.

### Steg 2: Skapa anpassade färgscheman

Skapa ett strukturerat tillvägagångssätt för färger:

```scss
// src/styles/_colors.scss

// Definera din färgpalett
$colors: (
  primary: (
    50: #e6f2ff,
    100: #b3d9ff,
    500: #3366cc,  // Huvudprimärfärg
    600: #2952a3,
    900: #0d1f40
  ),
  secondary: (
    50: #f0f4ff,
    100: #d9e3ff,
    500: #6699ff,  // Huvudsekundärfärg
    600: #4d7acc,
    900: #1a2e66
  ),
  neutral: (
    50: #f8f9fa,
    100: #e9ecef,
    500: #6c757d,
    900: #212529
  )
);

// Generera CSS-anpassade egenskaper
:root {
  @each $color-name, $color-shades in $colors {
    @each $shade, $value in $color-shades {
      --color-#{$color-name}-#{$shade}: #{$value};
    }
  }
}
```

### Steg 3: Anpassa typsnitt

Ställ in ditt typsnittssystem:

```scss
// src/styles/_typography.scss

// Importera anpassade typsnitt (använder Noto Sans som exempel)
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');

// Definera typsnittsfamiljer
$font-family-sans-serif: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

// Åsidosätt FKUI-typsnittsvariabler
$fk-font-family-base: $font-family-sans-serif;
$fk-font-family-monospace: $font-family-monospace;

// Anpassade typsnittsstorlekar (vid behov)
$font-sizes: (
  xs: 0.75rem,     // 12px
  sm: 0.875rem,    // 14px
  base: 1rem,      // 16px
  lg: 1.125rem,    // 18px
  xl: 1.25rem,     // 20px
  '2xl': 1.5rem,   // 24px
  '3xl': 1.875rem, // 30px
  '4xl': 2.25rem   // 36px
);

// Generera CSS-anpassade egenskaper för typsnittsstorlekar
:root {
  @each $size-name, $size-value in $font-sizes {
    --font-size-#{$size-name}: #{$size-value};
  }
}
```

### Steg 4: Varumärkesanpassningar

Lägg till dina varumärkesspecifika element:

```scss
// src/styles/_branding.scss

// Logotyp och varumärkeselement
.brand-logo {
  height: 40px;
  width: auto;
  // Dina logotypsspecifika stilar
}

// Anpassade varumärkeskomponenter
.brand-header {
  background-color: var(--color-primary-500);
  color: white;
  padding: 1rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
}

.brand-footer {
  background-color: var(--color-neutral-900);
  color: white;
  padding: 2rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
}
```

### Steg 5: Komponentspecifika åsidosättningar

Skapa åsidosättningar för specifika FKUI-komponenter:

```scss
// src/styles/components/_buttons.scss

// Anpassade knappåsidosättningar
.fk-button {
  // Förbättra knapputseende
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &.primary {
    background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  }
}
```

```scss
// src/styles/components/_forms.scss

// Anpassade formulärsidosättningar
.fk-input,
.fk-select,
.fk-textarea {
  border-radius: 4px;
  
  &:focus {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(51, 102, 204, 0.1);
  }
}
```

### Steg 6: Huvudtemafil

Skapa huvudtemafil som importerar allt:

```scss
// src/styles/theme.scss

// Importera FKUI-bastema
@use "@fkui/theme-default";

// Importera anpassade temafiler
@use "variables";
@use "colors";
@use "typography";
@use "branding";

// Importera komponentåsidosättningar
@use "components/buttons";
@use "components/forms";

// Importera FKUI grundstilar (måste komma efter @use)
@import "@fkui/design/lib/fkui.css";
@import "@fkui/design/lib/fonts.css";
```

### Steg 7: Vilka filer att skapa vs vilka att importera

**Skapa dessa filer i ditt projekt:**

- `src/styles/theme.scss` - Huvudtemafil som importerar allt
- `src/styles/_variables.scss` - Variabelåsidosättningar
- `src/styles/_colors.scss` - Färgsystem
- `src/styles/_typography.scss` - Typsnittssystem
- `src/styles/_branding.scss` - Varumärkesspecifika stilar
- `src/styles/components/_buttons.scss` - Knappanpassningar
- `src/styles/components/_forms.scss` - Formuläranpassningar

**Importera FKUI-filer istället för att kopiera dem:**

- Komponentstilar från `@fkui/design/`
- Verktygsstilar från `@fkui/design/`
- Basstilar från `@fkui/design/`

💡 **Tips**: Genom att importera FKUI-filer istället för att kopiera dem får du automatiskt uppdateringar och buggfixar när du uppgraderar FKUI-versionen.

---

## Bygga de tre sidorna

Vi kommer att skapa tre sidor för att demonstrera olika aspekter av FKUI:

1. Landningssida - Visar layout och innehållskomponenter
2. Formulärsida - Demonstrerar FKUI-formulärskomponenter
3. Dashboard/statussida - Visar datavisningskomponenter

### Steg 1: Konfigurera Vue Router

⏱️ **Beräknad tid: 10 minuter**

```bash
# Skapa views-katalog om den inte finns
mkdir -p src/views
```

Uppdatera din routerkonfiguration:

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    }
  ]
})

export default router
```

💡 **Tips**: Att använda dynamiska importer (`() => import(...)`) möjliggör koddelning, vilket förbättrar initiala sidans laddningstid.

### Steg 1.5: Konfigurera huvudapplikationsingångspunkt

⏱️ **Beräknad tid: 5 minuter**

Uppdatera din `src/main.ts` för att korrekt importera och registrera FKUI-komponenter:

```typescript
// src/main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

// Importera FKUI-plugin
import FkuiPlugin from './plugins/fkui'
import '@fkui/theme-default'

const app = createApp(App)

app.use(router)
app.use(FkuiPlugin)

app.mount('#app')
```

### Steg 2: Skapa landningssida

⏱️ **Beräknad tid: 20 minuter**

```bash
# Skapa HomeView-komponent
touch src/views/HomeView.vue
```

```vue
<!-- src/views/HomeView.vue -->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToForm = () => {
  router.push('/form')
}
</script>

<template>
  <div class="home-view">
    <!-- Hero-sektion -->
    <section class="hero-section">
      <div class="container">
        <h1 class="fk-heading-1">Välkommen till IP Sprint Test Site</h1>
        <p class="fk-text-large fk-mb-4">
          Detta är en demonstrationswebbplats byggd med Försäkringskassans Designsystem (FKUI).
        </p>
        <FkButton variant="primary" size="large" @click="navigateToForm">
          Kom igång
        </FkButton>
      </div>
    </section>

    <!-- Funktionssektion -->
    <section class="features-section">
      <div class="container">
        <h2 class="fk-heading-2 fk-mb-4">Funktioner</h2>
        <div class="feature-grid">
          <FkCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">✓</div>
              <h3 class="fk-heading-3">Lätt att använda</h3>
              <p>Byggd med FKUI-komponenter för konsekvens och tillgänglighet.</p>
            </div>
          </FkCard>
          <FkCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">⚙</div>
              <h3 class="fk-heading-3">Anpassningsbar</h3>
              <p>Temalager möjliggör enkel varumärkesanpassning och anpassning.</p>
            </div>
          </FkCard>
          <FkCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">🛡</div>
              <h3 class="fk-heading-3">Säker</h3>
              <p>Följer svenska statliga säkerhets- och tillgänglighetsstandarder.</p>
            </div>
          </FkCard>
        </div>
      </div>
    </section>

    <!-- CTA-sektion -->
    <section class="cta-section">
      <div class="container">
        <h2 class="fk-heading-2">Redo att prova vårt formulär?</h2>
        <FkButton variant="secondary" @click="navigateToForm">
          Prova formulärdemo
        </FkButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background-color: var(--color-primary-50);
  padding: 4rem 0;
  text-align: center;
}

.features-section {
  padding: 4rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-section {
  background-color: var(--color-neutral-100);
  padding: 3rem 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
```

### Steg 3: Skapa formulärsida

⏱️ **Beräknad tid: 30 minuter**

```bash
# Skapa FormView-komponent
touch src/views/FormView.vue
```

```vue
<!-- src/views/FormView.vue -->
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  contactMethod: '',
  notifications: [],
  comments: '',
  agreedToTerms: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  contactMethod: '',
  agreedToTerms: ''
})

const validateForm = () => {
  // Återställ fel
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  let isValid = true
  
  if (!formData.firstName) {
    errors.firstName = 'Förnamn är obligatoriskt'
    isValid = false
  }
  
  if (!formData.lastName) {
    errors.lastName = 'Efternamn är obligatoriskt'
    isValid = false
  }
  
  if (!formData.email) {
    errors.email = 'E-post är obligatoriskt'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'E-post är ogiltig'
    isValid = false
  }
  
  if (!formData.contactMethod) {
    errors.contactMethod = 'Välj en kontaktmetod'
    isValid = false
  }
  
  if (!formData.agreedToTerms) {
    errors.agreedToTerms = 'Du måste godkänna villkoren'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    // Simulera API-anrop
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Visa framgångsmeddelande
    showSuccessMessage.value = true
    
    // Återställ formulär
    resetForm()
    
    // Scrolla till toppen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Formulärinsändningsfel:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(formData, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: '',
    notifications: [],
    comments: '',
    agreedToTerms: false
  })
  
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}
</script>

<template>
  <div class="form-view">
    <div class="container">
      <nav class="breadcrumb fk-mb-4">
        <router-link to="/">Hem</router-link>
        <span class="separator">/</span>
        <span>Formulär</span>
      </nav>
      
      <h1 class="fk-heading-1 fk-mb-4">Ansökningsformulär</h1>
      <p class="fk-text-large fk-mb-6">
        Fyll i detta formulär för att demonstrera FKUI-formulärskomponenter.
      </p>
      
      <form @submit="handleSubmit" class="application-form">
        <!-- Personinformation-sektion -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Personinformation</legend>
          
          <FkFormGroup>
            <FkLabel for="firstName">Förnamn *</FkLabel>
            <FkInput
              id="firstName"
              v-model="formData.firstName"
              type="text"
              :class="{ 'error': errors.firstName }"
            />
            <FkErrorMessage v-if="errors.firstName">
              {{ errors.firstName }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="lastName">Efternamn *</FkLabel>
            <FkInput
              id="lastName"
              v-model="formData.lastName"
              type="text"
              :class="{ 'error': errors.lastName }"
            />
            <FkErrorMessage v-if="errors.lastName">
              {{ errors.lastName }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="email">E-postadress *</FkLabel>
            <FkInput
              id="email"
              v-model="formData.email"
              type="email"
              :class="{ 'error': errors.email }"
            />
            <FkErrorMessage v-if="errors.email">
              {{ errors.email }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="phone">Telefonnummer</FkLabel>
            <FkInput
              id="phone"
              v-model="formData.phone"
              type="tel"
            />
          </FkFormGroup>
        </fieldset>
        
        <!-- Preferenser-sektion -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Preferenser</legend>
          
          <FkFormGroup>
            <FkLabel for="contactMethod">Önskad kontaktmetod *</FkLabel>
            <FkSelect
              id="contactMethod"
              v-model="formData.contactMethod"
              :class="{ 'error': errors.contactMethod }"
            >
              <option value="">Välj</option>
              <option value="email">E-post</option>
              <option value="phone">Telefon</option>
              <option value="mail">Post</option>
            </FkSelect>
            <FkErrorMessage v-if="errors.contactMethod">
              {{ errors.contactMethod }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel>Aviseringspreferenser</FkLabel>
            <FkCheckboxGroup v-model="formData.notifications">
              <FkCheckbox value="updates">Produktuppdateringar</FkCheckbox>
              <FkCheckbox value="newsletter">Nyhetsbrev</FkCheckbox>
              <FkCheckbox value="promotions">Erbjudanden</FkCheckbox>
            </FkCheckboxGroup>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="comments">Ytterligare kommentarer</FkLabel>
            <FkTextarea
              id="comments"
              v-model="formData.comments"
              rows="4"
            />
          </FkFormGroup>
        </fieldset>
        
        <!-- Avtalsektion -->
        <fieldset class="form-section">
          <FkFormGroup>
            <FkCheckbox v-model="formData.agreedToTerms">
              Jag godkänner villkoren och bestämmelserna *
            </FkCheckbox>
            <FkErrorMessage v-if="errors.agreedToTerms">
              {{ errors.agreedToTerms }}
            </FkErrorMessage>
          </FkFormGroup>
        </fieldset>
        
        <!-- Formuläråtgärder -->
        <div class="form-actions">
          <FkButton variant="secondary" type="button" @click="resetForm">
            Återställ
          </FkButton>
          <FkButton variant="primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Skickar...' : 'Skicka ansökan' }}
          </FkButton>
        </div>
      </form>
      
      <!-- Framgångsmeddelande -->
      <FkAlert
        v-if="showSuccessMessage"
        variant="success"
        class="fk-mt-6"
        dismissible
        @close="showSuccessMessage = false"
      >
        <strong>Lyckades!</strong> Din ansökan har skickats framgångsrikt.
      </FkAlert>
    </div>
  </div>
</template>

<style scoped>
.form-view {
  padding: 2rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-neutral-600);
}

.breadcrumb a {
  color: var(--color-primary-500);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: var(--color-neutral-400);
}

.application-form {
  max-width: 600px;
}

.form-section {
  border: none;
  padding: 0;
  margin-bottom: 2rem;
}

.form-section legend {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-neutral-200);
  width: 100%;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
```

### Steg 4: Skapa Dashboard/statussida

⏱️ **Beräknad tid: 30 minuter**

```bash
# Skapa DashboardView-komponent
touch src/views/DashboardView.vue
```

```vue
<!-- src/views/DashboardView.vue -->
<script setup>
import { reactive, ref, onMounted } from 'vue'

const stats = reactive({
  applications: 12,
  pending: 3,
  approved: 7,
  needsAction: 2
})

const applications = ref([
  {
    id: 'APP-001',
    name: 'John Doe',
    type: 'Benefits',
    date: '2025-11-15',
    status: 'Approved'
  },
  {
    id: 'APP-002',
    name: 'Jane Smith',
    type: 'Healthcare',
    date: '2025-11-14',
    status: 'Pending'
  },
  {
    id: 'APP-003',
    name: 'Bob Johnson',
    type: 'Benefits',
    date: '2025-11-13',
    status: 'Needs Action'
  },
  {
    id: 'APP-004',
    name: 'Alice Brown',
    type: 'Pension',
    date: '2025-11-12',
    status: 'Approved'
  }
])

const activities = ref([
  {
    id: 1,
    title: 'Ansökan godkänd',
    description: 'Ansökan APP-001 har godkänts.',
    timestamp: '2025-11-15T14:30:00Z',
    type: 'success'
  },
  {
    id: 2,
    title: 'Dokument uppladdat',
    description: 'Nytt dokument uppladdat för ansökan APP-002.',
    timestamp: '2025-11-15T10:15:00Z',
    type: 'info'
  },
  {
    id: 3,
    title: 'Åtgärd krävs',
    description: 'Ytterligare information behövs för ansökan APP-003.',
    timestamp: '2025-11-14T16:45:00Z',
    type: 'warning'
  }
])

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Approved': return 'success'
    case 'Pending': return 'info'
    case 'Needs Action': return 'warning'
    default: return 'neutral'
  }
}

const viewDetails = (id: string) => {
  // I en riktig applikation skulle detta navigera till en detaljsida
  alert(`Visar detaljer för ansökan ${id}`)
}

onMounted(() => {
  // I en riktig applikation skulle du hämta data från ett API
  console.log('Dashboard laddad')
})
</script>

<template>
  <div class="dashboard-view">
    <div class="container">
      <nav class="breadcrumb fk-mb-4">
        <router-link to="/">Hem</router-link>
        <span class="separator">/</span>
        <span>Dashboard</span>
      </nav>
      
      <h1 class="fk-heading-1 fk-mb-4">Dashboard</h1>
      <p class="fk-text-large fk-mb-6">
        Översikt av din ansökningsstatus och senaste aktivitet.
      </p>
      
      <!-- Statuskort -->
      <div class="stats-grid fk-mb-6">
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">📄</div>
            <h3 class="fk-heading-4">Ansökningar</h3>
            <p class="fk-text-large">{{ stats.applications }}</p>
          </div>
        </FkCard>
        
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">🕐</div>
            <h3 class="fk-heading-4">Väntande</h3>
            <p class="fk-text-large">{{ stats.pending }}</p>
          </div>
        </FkCard>
        
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">✓</div>
            <h3 class="fk-heading-4">Godkända</h3>
            <p class="fk-text-large">{{ stats.approved }}</p>
          </div>
        </FkCard>
        
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">⚠</div>
            <h3 class="fk-heading-4">Behöver åtgärd</h3>
            <p class="fk-text-large">{{ stats.needsAction }}</p>
          </div>
        </FkCard>
      </div>
      
      <!-- Senaste ansökningstabell -->
      <FkCard class="fk-mb-6">
        <div class="card-header">
          <h2 class="fk-heading-2">Senaste ansökningar</h2>
        </div>
        
        <div class="table-wrapper">
          <FkTable>
            <thead>
              <tr>
                <FkTableHeaderCell>ID</FkTableHeaderCell>
                <FkTableHeaderCell>Namn</FkTableHeaderCell>
                <FkTableHeaderCell>Typ</FkTableHeaderCell>
                <FkTableHeaderCell>Datum</FkTableHeaderCell>
                <FkTableHeaderCell>Status</FkTableHeaderCell>
                <FkTableHeaderCell>Åtgärder</FkTableHeaderCell>
              </tr>
            </thead>
            <tbody>
              <FkTableRow v-for="application in applications" :key="application.id">
                <FkTableCell>{{ application.id }}</FkTableCell>
                <FkTableCell>{{ application.name }}</FkTableCell>
                <FkTableCell>{{ application.type }}</FkTableCell>
                <FkTableCell>{{ formatDate(application.date) }}</FkTableCell>
                <FkTableCell>
                  <FkBadge :variant="getStatusVariant(application.status)">
                    {{ application.status }}
                  </FkBadge>
                </FkTableCell>
                <FkTableCell>
                  <FkButton 
                    variant="ghost" 
                    size="small" 
                    @click="viewDetails(application.id)"
                  >
                    Visa
                  </FkButton>
                </FkTableCell>
              </FkTableRow>
            </tbody>
          </FkTable>
        </div>
      </FkCard>
      
      <!-- Aktivitetstidslinje -->
      <FkCard class="fk-mb-6">
        <div class="card-header">
          <h2 class="fk-heading-2">Senaste aktivitet</h2>
        </div>
        
        <div class="activity-list">
          <div 
            v-for="activity in activities" 
            :key="activity.id" 
            class="activity-item"
          >
            <div class="activity-icon" :class="`activity-${activity.type}`">
              {{ activity.type === 'success' ? '✓' : activity.type === 'warning' ? '⚠' : 'ℹ' }}
            </div>
            <div class="activity-content">
              <h4 class="activity-title">{{ activity.title }}</h4>
              <p class="activity-description">{{ activity.description }}</p>
              <span class="activity-time">{{ formatDate(activity.timestamp) }}</span>
            </div>
          </div>
        </div>
      </FkCard>
      
      <!-- Systemavisering -->
      <FkAlert variant="info" class="fk-mb-4">
        <strong>Systemuppdatering:</strong> Planerat underhåll kommer att ske denna helg från 02:00 till 06:00.
      </FkAlert>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  padding: 2rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-neutral-600);
}

.breadcrumb a {
  color: var(--color-primary-500);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: var(--color-neutral-400);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.status-card {
  text-align: center;
}

.status-card-content {
  padding: 2rem 1rem;
}

.status-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-neutral-200);
}

.table-wrapper {
  overflow-x: auto;
}

.activity-list {
  padding: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-neutral-100);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.activity-success {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.activity-warning {
  background-color: #fff3cd;
  color: #856404;
}

.activity-info {
  background-color: #d1ecf1;
  color: #0c5460;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.activity-description {
  color: var(--color-neutral-600);
  margin-bottom: 0.5rem;
}

.activity-time {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
```

### Steg 5: Skapa navigering mellan sidor

⏱️ **Beräknad tid: 15 minuter**

Uppdatera din huvud-App.vue för att inkludera navigering:

```vue
<!-- src/App.vue -->
<script setup>
import { ref } from 'vue'

const appTitle = import.meta.env.VITE_APP_TITLE || 'IP Sprint Test Site'
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <nav class="app-nav">
          <div class="app-logo">
            <router-link to="/">
              <h1>{{ appTitle }}</h1>
            </router-link>
          </div>
          
          <button 
            class="mobile-menu-toggle" 
            @click="toggleMobileMenu"
            aria-label="Växla navigeringsmeny"
          >
            ☰
          </button>
          
          <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
            <li>
              <router-link to="/" class="nav-link" @click="mobileMenuOpen = false">
                Hem
              </router-link>
            </li>
            <li>
              <router-link to="/form" class="nav-link" @click="mobileMenuOpen = false">
                Formulär
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard" class="nav-link" @click="mobileMenuOpen = false">
                Dashboard
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="app-main">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Laddar...</p>
          </div>
        </template>
      </Suspense>
    </main>
    
    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2025 IP Sprint Test Site. Byggd med Försäkringskassans Designsystem.</p>
        <p class="version">Version {{ import.meta.env.VITE_APP_VERSION || '1.0.0' }}</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Importera temastilar */
@import '@/styles/theme.scss';

/* Globala layoutstilar */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--fk-font-family-base, 'Noto Sans', sans-serif);
}

.app-header {
  background-color: var(--color-primary-500);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-logo a {
  color: white;
  text-decoration: none;
}

.app-logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  border-bottom-color: white;
}

.app-main {
  flex: 1;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-neutral-200);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.app-footer {
  background-color: var(--color-neutral-900);
  color: white;
  padding: 1.5rem 0;
  text-align: center;
  margin-top: auto;
}

.app-footer .version {
  font-size: 0.875rem;
  color: var(--color-neutral-400);
  margin-top: 0.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Mobilresponsiv */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-primary-600);
    flex-direction: column;
    gap: 0;
    padding: 1rem;
    display: none;
  }
  
  .nav-links.mobile-open {
    display: flex;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
```

---

## Bästa praxis

### Maporganisation för åsidosättningar

Organisera dina temafiler i en logisk struktur:

```
src/
├── styles/
│   ├── theme.scss           # Huvudtemafil (importerar alla andra)
│   ├── _variables.scss      # Variabelåsidosättningar
│   ├── _colors.scss         # Färgsystem
│   ├── _typography.scss     # Typsnittssystem
│   ├── _branding.scss       # Varumärkesspecifika stilar
│   └── components/          # Komponentspecifika åsidosättningar
│       ├── _buttons.scss    # Knappanpassningar
│       ├── _forms.scss      # Formuläranpassningar
│       └── _layout.scss     # Layoutanpassningar
```

### Namngivningskonventioner

Följ dessa namngivningskonventioner för konsekvens:

1. **SCSS-filer**:
   - Använd understreck för partialer: `_variables.scss`
   - Använd kebab-case för komponentfiler: `_form-controls.scss`

2. **CSS-klasser**:
   - Prefixa anpassade klasser med ditt projektnamn: `ip-header`
   - Använd BEM-metodik för komponentstilar: `ip-card__title--highlighted`

3. **Vue-komponenter**:
   - Använd PascalCase för komponentnamn: `FormPage.vue`
   - Använd beskrivande namn som indikerar syfte: `ApplicationStatusCard.vue`

4. **TypeScript/JavaScript**:
   - Använd camelCase för variabler och funktioner: `const userName = ...`
   - Använd PascalCase för typer och gränssnitt: `interface UserData { ... }`

### Dokumentation inom projektet

⏱️ **Beräknad tid: 15 minuter**

Skapa omfattande dokumentation:

```bash
# Skapa docs-katalog
mkdir docs
touch docs/THEME_CUSTOMIZATION.md
touch docs/COMPONENT_GUIDE.md
```

```markdown
<!-- docs/THEME_CUSTOMIZATION.md -->
# Temaanpassningsguide

## Översikt
Denna guide förklarar hur man anpassar temalagret för ip-sprint-test-site-01.

## Färgsystem
Färger definieras i `src/styles/_colors.scss` med ett strukturerat tillvägagångssätt:
- Primärfärger: Används för huvudsakliga varumärkeselement
- Sekundärfärger: Används för stödjande element
- Neutralfärger: Används för text, bakgrunder och ramar

## Typsnitt
Typsnitt definieras i `src/styles/_typography.scss`:
- Typsnittsfamiljer definieras som variabler
- Typsnittsstorlekar följer en modulär skala
- Radhöjder är optimerade för läsbarhet

## Komponentåsidosättningar
Komponentspecifika åsidosättningar finns i `src/styles/components/`:
- Varje fil riktar sig till specifika FKUI-komponenter
- Använd CSS-anpassade egenskaper för dynamisk tematisering
- Undvik att modifiera FKUI-kärnstilar direkt

## Lägga till nya anpassningar
1. Identifiera om anpassningen ska vara global eller komponentspecifik
2. Lägg till variabler till lämplig fil
3. Skapa CSS-anpassade egenskaper för dynamiska värden
4. Dokumentera syfte och användning av anpassningen
```

### Hur man kontrollerar om något ska åsidosättas eller ärvas

Använd detta beslutsträd när du överväger anpassningar:

| Scenario | Åtgärd | Varför |
|----------|--------|-----|
| Visuell varumärkesprofilering (färger, typsnitt) | Åsidosätt i temalager | Varumärkesidentitetskrav |
| Komponentbeteende | Utöka, åsidosätt inte | Bibehåll tillgänglighet & UX |
| Layoutstruktur | Skapa anpassade komponenter | Bevara FKUI-komponenter |
| Tillgänglighetsfunktioner | Alltid ärva | Standarder efterlevnad |

### Vanliga fallgropar att undvika

❌ **Gör inte: Modifiera FKUI-källfiler direkt**

```scss
// Dåligt - redigerar node_modules/@fkui/design/...
.fk-button { ... }
```

✅ **Gör: Åsidosätt i ditt temalager**

```scss
// Bra - i src/styles/components/_buttons.scss
.fk-button {
  // Dina anpassningar
}
```

❌ **Gör inte: Importera komponenter utan att registrera dem**

```vue
<template>
  <FkButton>Klicka på mig</FkButton> <!-- Misslyckas om inte registrerad -->
</template>
```

✅ **Gör: Registrera komponenter korrekt**

```typescript
// I src/plugins/fkui.ts eller komponentfil
import { FkButton } from '@fkui/vue'
app.component('FkButton', FkButton)
```

❌ **Gör inte: Använd inlinestilar för tematisering**

```vue
<FkButton style="background-color: #3366cc">Klicka</FkButton>
```

✅ **Gör: Använd CSS-anpassade egenskaper**

```vue
<FkButton class="custom-button">Klicka</FkButton>
```

```scss
.custom-button {
  background-color: var(--color-primary-500);
}
```

---

## Testning & lokal körning

### Konfigurering av utvecklingsserver

⏱️ **Beräknad tid: 5 minuter**

Starta utvecklingsserver:

```bash
# Se till att du är i projektkatalogen
cd ~/projects/ip-sprint-test-site-01

# Installera beroenden (om du inte redan har gjort det)
npm install

# Starta utvecklingsserver
npm run dev
```

Utvecklingsservern startar vid `http://localhost:5173` (eller en annan port om 5173 är upptagen).

**Komma åt från värdmaskin:**

```bash
# Hämta din VM:s IP-adress
ip addr show

# Leta efter inet-adress under ditt nätverksgränssnitt (vanligtvis ens33 eller liknande)
# Exempel: inet 192.168.1.100/24
```

Komma åt från din värdmaskins webbläsare:

- `http://192.168.1.100:5173` (ersätt med din VM:s IP)

💡 **Tips**: Om du inte kan komma åt från värdmaskin, kontrollera din Ubuntu-brandvägg:

```bash
# Kontrollera brandväggsstatus
sudo ufw status

# Tillåt port 5173 om brandvägg är aktiv
sudo ufw allow 5173/tcp

# Alternativt: stäng av brandvägg tillfälligt för testning
sudo ufw disable
```

### Ubuntu-specifika utvecklingstips

**Terminalmultiplexering:**

```bash
# Installera och använd tmux för flera terminalsessioner
sudo apt install tmux

# Starta tmux-session
tmux

# Dela rutor: Ctrl+b sedan "
# Växla mellan rutor: Ctrl+b sedan piltangenter
```

**Processhantering:**

```bash
# Kör utvecklingsserver i bakgrunden
npm run dev &

# Visa körande Node-processer
ps aux | grep node

# Döda process vid behov
kill <process-id>

# Eller använd pkill
pkill -f "vite"
```

### Hur man verifierar FKUI-integration

⏱️ **Beräknad tid: 10 minuter**

1. **Kontrollera komponentrendering**:
   - Öppna Firefox eller Chrome på Ubuntu (`firefox` eller `google-chrome` från terminal)
   - Tryck `F12` för att öppna utvecklingsverktyg
   - Inspektera FKUI-element för att verifiera att de har korrekta klasser
   - Verifiera att FKUI-stilar appliceras

2. **Verifiera temaåsidosättningar**:
   - Använd webbläsarens beräknade stilar-panel för att kontrollera dina anpassningar
   - Säkerställ att CSS-anpassade egenskaper appliceras korrekt
   - Testa responsivt beteende vid olika skärmstorlekar

3. **Testa komponentfunktionalitet**:
   - Testa alla interaktiva element (knappar, formulär, navigering)
   - Verifiera att formulärvalidering fungerar korrekt
   - Kontrollera att routernavigering fungerar korrekt

### Testa anpassningar

Skapa en dedikerad testsida för att verifiera ditt tema:

```bash
# Skapa ThemeTestView-komponent
touch src/views/ThemeTestView.vue
```

```vue
<!-- src/views/ThemeTestView.vue -->
<script setup>
import { reactive } from 'vue'

// Definera din färgpalett för testning
const colorPalette = reactive({
  primary: {
    50: '#e6f2ff',
    100: '#b3d9ff',
    500: '#3366cc',
    600: '#2952a3',
    900: '#0d1f40'
  },
  secondary: {
    50: '#f0f4ff',
    100: '#d9e3ff',
    500: '#6699ff',
    600: '#4d7acc',
    900: '#1a2e66'
  },
  neutral: {
    50: '#f8f9fa',
    100: '#e9ecef',
    500: '#6c757d',
    900: '#212529'
  }
})
</script>

<template>
  <div class="theme-test-view">
    <div class="container">
      <h1 class="fk-heading-1">Tematestsida</h1>
      
      <!-- Färgtester -->
      <section class="test-section">
        <h2 class="fk-heading-2">Färgsystem</h2>
        <div class="color-swatch-grid">
          <div v-for="(shades, colorName) in colorPalette" :key="colorName" class="color-group">
            <h3>{{ colorName }}</h3>
            <div v-for="(hex, shade) in shades" :key="shade" class="color-swatch">
              <div class="swatch" :style="{ backgroundColor: hex }"></div>
              <span>{{ shade }}: {{ hex }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Typsnittstester -->
      <section class="test-section">
        <h2 class="fk-heading-2">Typsnitt</h2>
        <p class="fk-text-small">Liten text</p>
        <p>Normal text</p>
        <p class="fk-text-large">Stor text</p>
        <h1 class="fk-heading-1">Rubrik 1</h1>
        <h2 class="fk-heading-2">Rubrik 2</h2>
        <h3 class="fk-heading-3">Rubrik 3</h3>
      </section>
      
      <!-- Komponenttester -->
      <section class="test-section">
        <h2 class="fk-heading-2">Komponentvariationer</h2>
        <div class="component-test-group">
          <h3>Knappar</h3>
          <FkButton variant="primary" class="fk-mr-2">Primär</FkButton>
          <FkButton variant="secondary" class="fk-mr-2">Sekundär</FkButton>
          <FkButton variant="ghost" class="fk-mr-2">Ghost</FkButton>
        </div>
        
        <div class="component-test-group">
          <h3>Badges</h3>
          <FkBadge variant="success" class="fk-mr-2">Framgång</FkBadge>
          <FkBadge variant="warning" class="fk-mr-2">Varning</FkBadge>
          <FkBadge variant="error" class="fk-mr-2">Fel</FkBadge>
        </div>
        
        <div class="component-test-group">
          <h3>Aviseringar</h3>
          <FkAlert variant="info" class="fk-mb-2">Infoavisering</FkAlert>
          <FkAlert variant="success" class="fk-mb-2">Framgångsavisering</FkAlert>
          <FkAlert variant="warning" class="fk-mb-2">Varningsavisering</FkAlert>
          <FkAlert variant="error" class="fk-mb-2">Felavisering</FkAlert>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.theme-test-view {
  padding: 2rem 0;
}

.test-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-neutral-100);
}

.color-swatch-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.color-group {
  min-width: 200px;
}

.color-swatch {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.swatch {
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  border: 1px solid var(--color-neutral-300);
}

.component-test-group {
  margin-bottom: 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
```

Lägg till denna testsida till din router:

```typescript
// src/router/index.ts
{
  path: '/theme-test',
  name: 'theme-test',
  component: () => import('../views/ThemeTestView.vue')
}
```

---

## Prestanda & optimering

⏱️ **Beräknad tid: 15 minuter**

### Lazy Loading-rutter

Rutter är redan konfigurerade med lazy loading med dynamiska importer:

```typescript
// src/router/index.ts - redan implementerat
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('../views/DashboardView.vue')
}
```

💡 **Tips**: Detta skapar separata chunkar för varje rutt, vilket förbättrar initiala laddningstid.

### Optimera bilder

```bash
# Installera bildoptimeringsverktyg
sudo apt install imagemagick

# Optimera bilder i assets-mappen
cd src/assets
mogrify -resize 1200x1200\> -quality 85 *.jpg
mogrify -resize 1200x1200\> -quality 85 *.png

# Eller använd moderna format
mogrify -format webp *.jpg
```

### Buntnanalys

```bash
# Installera buntnalyserare
npm install -D rollup-plugin-visualizer

# Uppdatera vite.config.ts
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  // ... resten av konfig
})
```

```bash
# Bygg och analysera
npm run build
# Öppnar visualisering i webbläsare
```

### Produktionsbyggsoptimering

```bash
# Bygg för produktion med optimeringar
npm run build

# Kontrollera byggstorlek
du -sh dist/

# Förhandsgranska produktionsbygge
npm run preview
```

---

## Säkerhetsöverväganden

⏱️ **Beräknad tid: 10 minuter`

### Inmatningssanering

```bash
# Installera DOMPurify för att sanitera användarinmatning
npm install dompurify
npm install -D @types/dompurify
```

```typescript
// src/utils/sanitize.ts
import DOMPurify from 'dompurify'

export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty)
}

// Användning i komponenter
import { sanitizeHTML } from '@/utils/sanitize'

const cleanHTML = sanitizeHTML(userInput)
```

### Miljövariabler

⚠️ **Säkerhetsbästa praxis:**

1. **Aldrig commita `.env.local`**

   ```bash
   # Verifiera att .env.local är i .gitignore
   cat .gitignore | grep .env.local
   ```

2. **Använd olika uppgifter för dev/prod**

   ```bash
   # .env.local (utveckling)
   VITE_API_URL=http://localhost:3000/api
   
   # .env.production (produktion)
   VITE_API_URL=https://api.production.com
   ```

3. **Rotera API-nycklar regelbundet**
   - Ändra API-nycklar var 90:e dag
   - Använd GitLab CI/CD-variabler för känslig data

### Beroendesäkerhet

```bash
# Kontrollera sårbarheter
npm audit

# Fixa automatiskt när möjligt
npm audit fix

# För brytande ändringar
npm audit fix --force

# Visa detaljerad sårbarhetsrapport
npm audit --json
```

### Innehållssäkerhetspolicy

Lägg till CSP-rubriker i din driftsättning:

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               script-src 'self';">
```

---

## Tillgänglighet

⏱️ **Beräknad tid: 15 minuter**

### Test av tangentbordsnavigering

```bash
# Testchecklista:
# - Tabba igenom alla interaktiva element
# - Enter/Blanksteg för att aktivera knappar
# - Piltangenter för navigering
# - Escape för att stänga modaler/dialoger
# - Fokusindikatorer synliga på alla element
```

### Test med skärmläsare

```bash
# Installera Orca skärmläsare på Ubuntu
sudo apt install orca

# Starta Orca
orca

# Eller använd kommandoraden
orca --replace
```

**Testchecklista:**

- [ ] Alla bilder har alt-text
- [ ] Formulärinmatningar har tillhörande etiketter
- [ ] Knappar har beskrivande text
- [ ] Navigeringslandmärken är korrekt markerade
- [ ] Hoppa till huvudinnehåll-länk finns

### Färgkontrast

```bash
# Använd webbläsarens utvecklingsverktyg för att kontrollera kontrastförhållanden
# Säkerställ WCAG AA-efterlevnad (4.5:1 för normal text)
```

**Lägg till kontrastkontroll i ditt tema:**

```scss
// src/styles/_accessibility.scss

// Säkerställ tillräcklig kontrast
.fk-button {
  // Primärknapp - kontrollera kontrast
  &.primary {
    background-color: var(--color-primary-500); // #3366cc
    color: white; // Kontrastförhållande: 7.37:1 ✓
  }
}

// Högkontrastläge
@media (prefers-contrast: high) {
  .fk-button {
    border: 2px solid currentColor;
  }
}

// Minskad rörelse
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ARIA-etiketter

Säkerställ korrekta ARIA-etiketter i dina komponenter:

```vue
<template>
  <!-- Bra: Har aria-label -->
  <button 
    class="mobile-menu-toggle" 
    @click="toggleMenu"
    aria-label="Växla navigeringsmeny"
    aria-expanded="false"
  >
    ☰
  </button>
  
  <!-- Bra: Har aria-live för dynamiskt innehåll -->
  <div aria-live="polite" aria-atomic="true">
    {{ statusMessage }}
  </div>
  
  <!-- Bra: Beskrivande länktext -->
  <a href="/form" aria-label="Gå till ansökningsformulär">
    Ansök nu
  </a>
</template>
```

---

## Driftsättningsförberedelse

### Byggkommandon

⏱️ **Beräknad tid: 5 minuter**

Bygg ditt projekt för produktion:

```bash
# Bygg för produktion
npm run build

# Förhandsgranska produktionsbygge lokalt
npm run preview
```

Byggkommandot skapar optimerade tillgångar i `dist`-katalogen.

**Kontrollera byggutdata:**

```bash
# Visa byggutdata med storlekar
du -sh dist/
tree dist/ -L 2

# Kontrollera stora filer
find dist/ -type f -size +500k -exec ls -lh {} \;
```

⚠️ **Varning**: Testa alltid ditt produktionsbygge lokalt innan driftsättning. Produktionsbygget kan bete sig annorlunda än utvecklingsbygget.

### Vilka filer att commita till GitLab

Skapa en korrekt `.gitignore`-fil:

```bash
# Skapa/redigera .gitignore
nano .gitignore
```

```gitignore
# .gitignore

# Beroenden
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Byggutdata
dist/
dist-ssr/
build/

# Miljövariabler
.env.local
.env.*.local

# IDE-filer
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~
.DS_Store

# Loggar
logs/
*.log

# Täckningskatalog
coverage/
*.lcov

# Temporära mappar
tmp/
temp/
.cache/

# Ubuntu-specifika
.directory

# Vite
.vite/
```

**Commita dina ändringar:**

```bash
# Kontrollera status
git status

# Lägg till alla filer (respekterar .gitignore)
git add .

# Commita med beskrivande meddelande
git commit -m "feat: initial projektuppsättning med FKUI-integration

- Setup Vue 3 med Vite och TypeScript
- Integrera FKUI-designsystem
- Skapa temalager med anpassade färger och typsnitt
- Implementera tre sidor: Hem, Formulär, Dashboard
- Lägg till responsiv navigering
- Konfigurera bygg- och utvecklingsmiljö"

# Pusha till GitLab
git push origin main
```

💡 **Tips**: Använd konventionella commit-meddelanden för bättre ändringsspårning.

### Git-bästa praxis

```bash
# Skapa funktionsgrenar för nytt arbete
git checkout -b feature/add-user-profile

# Efter att arbetet är klart
git add .
git commit -m "feat: lägg till användarprofilsida med FKUI-komponenter"

# Pusha funktionsgren
git push origin feature/add-user-profile

# Slå ihop till main (via GitLab merge request rekommenderas)
git checkout main
git merge feature/add-user-profile
git push origin main

# Radera funktionsgren
git branch -d feature/add-user-profile
git push origin --delete feature/add-user-profile
```

### Miljövariabler för driftsättning

Ställ in miljövariabler för olika driftsättningsstadier:

```bash
# Skapa produktionsmiljöfil
touch .env.production
```

```bash
# .env.production
VITE_APP_TITLE=IP Sprint Test Site 01
VITE_APP_VERSION=1.0.0
VITE_FKUI_THEME=production
VITE_API_URL=https://api.yourdomain.com
```

### GitLab CI/CD-konfiguration

⏱️ **Beräknad tid: 20 minuter**

Skapa en `.gitlab-ci.yml`-fil för automatiserad driftsättning:

```bash
# Skapa CI/CD-konfiguration
touch .gitlab-ci.yml
```

```yaml
# .gitlab-ci.yml

stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: '18'

cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
    - .npm/

# Installera beroenden
.install_deps: &install_deps
  - npm ci --cache .npm --prefer-offline

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - *install_deps
    - npm run lint
    # Lägg till enhetstester när tillgängliga
    # - npm run test
  only:
    - merge_requests
    - main

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - *install_deps
    - npm run build
    - echo "Bygg slutfördes framgångsrikt"
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main

deploy_staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh
  script:
    - echo "Driftsätter till stagingserver"
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - ssh-keyscan -H $STAGING_SERVER >> ~/.ssh/known_hosts
    - rsync -avz --delete dist/ $STAGING_USER@$STAGING_SERVER:$STAGING_PATH
  environment:
    name: staging
    url: https://staging.yourdomain.com
  only:
    - main
  when: manual

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh
  script:
    - echo "Driftsätter till produktionsserver"
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - ssh-keyscan -H $PROD_SERVER >> ~/.ssh/known_hosts
    - rsync -avz --delete dist/ $PROD_USER@$PROD_SERVER:$PROD_PATH
  environment:
    name: production
    url: https://yourdomain.com
  only:
    - main
  when: manual
```

**Konfigurera GitLab CI/CD-variabler:**

1. Gå till GitLab Project → Settings → CI/CD → Variables
2. Lägg till följande variabler:
   - `SSH_PRIVATE_KEY` - Din driftsättnings SSH-nyckel
   - `STAGING_SERVER` - Stagingserverns värdnamn
   - `STAGING_USER` - Stagingserverns användarnamn
   - `STAGING_PATH` - Sökväg på stagingserver
   - `PROD_SERVER` - Produktionsserverns värdnamn
   - `PROD_USER` - Produktionsserverns användarnamn
   - `PROD_PATH` - Sökväg på produktionsserver

---

## Felsökningssektion

### Ubuntu-specifika problem

#### 1. Behörighetsfel

**Problem**: `EACCES: permission denied` vid installation av globala paket

**Lösning**: Använd npm:s rekommenderade metod för att undvika sudo

```bash
# Skapa katalog för globala paket
mkdir ~/.npm-global

# Konfigurera npm för att använda ny katalog
npm config set prefix '~/.npm-global'

# Lägg till PATH (lägg till detta i ~/.bashrc eller ~/.profile)
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc

# Ladda om shell-konfiguration
source ~/.bashrc

# Installera nu globala paket utan sudo
npm install -g yarn
```

#### 2. Porten används redan

**Problem**: `Error: listen EADDRINUSE: address already in use :::5173`

**Lösning**: Hitta och döda process som använder port

```bash
# Hitta process som använder port 5173
sudo lsof -i :5173

# Döda process
kill -9 <PID>

# Eller använd fuser
sudo fuser -k 5173/tcp

# Eller ändra port i vite.config.ts
server: {
  port: 3000, // Använd en annan port
}
```

#### 3. Gräns för filbevakning överskriden

**Problem**: `ENOSPC: System limit for number of file watchers reached`

**Lösning**: Öka gräns för filbevakning

```bash
# Kontrollera aktuell gräns
cat /proc/sys/fs/inotify/max_user_watches

# Öka gräns tillfälligt
sudo sysctl -w fs.inotify.max_user_watches=524288

# Gör permanent
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### 4. VMware delade mappar-problem

**Problem**: Långsam prestanda eller filbevakning fungerar inte i delade mappar

**Lösning**: Klona projektet till VM:s lokala disk istället för delad mapp

```bash
# Klona hemkatalog istället
cd ~
mkdir projects
cd projects
git clone https://gitlab.com/your-username/ip-sprint-test-site-01.git
```

### Vanliga fel för Vue-nybörjare

#### 1. "Modul hittades inte"-fel

**Problem**: Importsökvägar är inkorrekta

**Lösning**: Kontrollera att filsökvägar är korrekta och använd `@`-alias för src-katalog

```typescript
// Dåligt
import MyComponent from '../../../components/MyComponent.vue'

// Bra
import MyComponent from '@/components/MyComponent.vue'
```

```bash
# Verifiera att fil finns
ls -l src/components/MyComponent.vue
```

#### 2. "Komponent inte registrerad"-fel

**Problem**: Komponent inte korrekt registrerad

**Lösning**: Säkerställ att komponent är registrerad i FKUI-plugin eller importerad lokalt

```typescript
// Global registrering (i src/plugins/fkui.ts)
import { FkButton } from '@fkui/vue'
app.component('FkButton', FkButton)

// Lokal registrering
<script setup>
import { FkButton } from '@fkui/vue'
</script>
```

#### 3. "Props mutation"-varning

**Problem**: Försök att modifiera props direkt

**Lösning**: Använd reaktiva kopior eller sänd händelser

```vue
<script setup>
import { ref } from 'vue'

const props = defineProps<{
  initialValue: string
}>()

// Skapa en lokal kopia
const localValue = ref(props.initialValue)

// Eller sänd ändringar till förälder
const emit = defineEmits(['update:modelValue'])
</script>
```

### FKUI-specifika problem

#### 1. FKUI-komponenter renderas inte

**Problem**: FKUI-stilar appliceras inte

**Lösning**: Säkerställ att du importerar FKUI-tema korrekt

```typescript
// src/main.ts
import '@fkui/theme-default'
```

**Felsökningssteg:**

```bash
# Kontrollera om FKUI-paket är installerade
npm list @fkui/vue @fkui/theme-default @fkui/design @fkui/date @fkui/logic

# Verifiera att alla paket har samma version
npm list @fkui

# Rensa cache och installera om vid versionsmatchning
rm -rf node_modules package-lock.json
npm install
```

#### 2. Temaåsidosättningar fungerar inte

**Problem**: Anpassade stilar åsidosätts av FKUI

**Lösning**: Säkerställ korrekt CSS-specificitet och importordning

```scss
// src/styles/theme.scss

// Importera FKUI först
@use "@fkui/theme-default";

// Sedan dina åsidosättningar
.fk-button {
  // Dina anpassade stilar
  background-color: var(--color-primary-500);
}
```

#### 3. Komponentvarianter är inte tillgängliga

**Problem**: Använder en variant som inte finns i aktuell FKUI-version

**Lösning**: Kontrollera FKUI-dokumentationen för tillgängliga varianter

```bash
# Kontrollera FKUI-dokumentation
# https://forsakringskassan.github.io/designsystem/components.html
```

### Beroendekonflikter

#### 1. Vue-version matchar inte

**Problem**: FKUI kräver en annan Vue-version än vad som är installerat

**Lösning**: Kontrollera FKUI:s package.json för kompatibla Vue-versioner

```bash
# Kontrollera installerad Vue-version
npm list vue

# Kontrollera FKUI peer-beroenden
npm info @fkui/vue peerDependencies

# Installera kompatibel version
npm install vue@3.5.24
```

#### 2. CSS-preprocessorproblem

**Problem**: Sass/SCSS-kompileringsfel

**Lösning**: Säkerställ kompatibla versioner

```bash
# Installera sass-embedded (rekommenderas för Vite)
npm install -D sass-embedded

# Rensa Vite-cache
rm -rf node_modules/.vite

# Starta om utvecklingsserver
npm run dev
```

#### 3. Byggfel på Ubuntu

**Problem**: Kompilering av nativ modul misslyckas

**Lösning**: Installera byggverktyg

```bash
# Installera nödvändiga byggverktyg
sudo apt update
sudo apt install -y build-essential python3

# Bygg om nativa moduler
npm rebuild

# Om det fortfarande misslyckas, rensa och installera om
rm -rf node_modules package-lock.json
npm install
```

### Felsökningstips för Ubuntu

```bash
# Övervaka loggar i realtid
npm run dev 2>&1 | tee debug.log

# Kontrollera Node.js- och npm-versioner
node --version
npm --version

# Rensa alla cachar
npm cache clean --force
rm -rf node_modules package-lock.json
rm -rf ~/.npm
npm install

# Kör med utförlig loggning
npm run dev --verbose

# Kontrollera systemresurser
free -h  # Minne
df -h    # Diskutrymme
htop     # CPU och processer (installera med: sudo apt install htop)
```

### Kända problem & lösningar

#### Problem: FKUI-komponent X renderas inte

**Orsak**: Versionsmatchning mellan @fkui-paket

**Lösning**: Säkerställ att alla @fkui-paket använder samma version

```bash
# Kontrollera versioner
npm list @fkui

# Uppdatera alla till samma version
npm install @fkui/vue@6.26.0 @fkui/design@6.26.0 @fkui/date@6.26.0 @fkui/logic@6.26.0 @fkui/theme-default@6.26.0
```

#### Problem: TypeScript-fel i FKUI-importer

**Orsak**: Saknade typdefinitioner

**Lösning**: Använd typdefinitionsfil vi skapade

```typescript
// Verifiera att src/types/fkui.d.ts finns
// Om inte, skapa den med komponentdeklarationer
```

### Var man kan hitta hjälp

1. **FKUI-dokumentation**
   - [Official FKUI Documentation](https://forsakringskassan.github.io/designsystem/)
   - [FKUI GitHub Issues](https://github.com/Forsakringskassan/designsystem/issues)

2. **Vue.js-resurser**
   - [Vue.js Official Documentation](https://vuejs.org/guide/)
   - [Vue.js Discord Community](https://discord.com/invite/vue)

3. **Ubuntu-community**
   - [Ubuntu Forums](https://ubuntuforums.org/)
   - [Ask Ubuntu](https://askubuntu.com/)
   - [Ubuntu Discourse](https://discourse.ubuntu.com/)

4. **GitLab-ärenden**
   - Skapa ett ärende i ditt GitLab-förråd för projektspecifika problem
   - Inkludera felmeddelanden, steg för att återskapa och förväntat beteende

5. **Stack Overflow**
   - Sök med taggar: `vue.js`, `vite`, `ubuntu`, `scss`
   - Inkludera relevanta kodavsnitt och felmeddelanden

---

## Nästa steg & resurser

### Hur man lägger till fler anpassningar

⏱️ **Beräknad tid: varierar med funktion**

#### 1. Lägga till nya sidor

```bash
# Skapa ny sidkomponent
touch src/views/AboutView.vue

# Lägg till rutt i src/router/index.ts
{
  path: '/about',
  name: 'about',
  component: () => import('../views/AboutView.vue')
}

# Lägg till navigeringslänk i App.vue
<router-link to="/about" class="nav-link">Om</router-link>
```

#### 2. Utöka komponenter

```bash
# Skapa anpassad komponent
mkdir -p src/components
touch src/components/CustomButton.vue
```

```vue
<!-- src/components/CustomButton.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'custom'
  size?: 'small' | 'medium' | 'large'
}>()

const buttonClass = computed(() => {
  return {
    [`fk-button--${props.variant}`]: props.variant,
    [`fk-button--${props.size}`]: props.size,
    'custom-button': true
  }
})
</script>

<template>
  <FkButton :class="buttonClass">
    <slot></slot>
  </FkButton>
</template>

<style scoped>
.custom-button {
  /* Dina anpassade stilar */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
</style>
```

#### 3. Lägga till nya temavariabler

```scss
// src/styles/_variables.scss

// Lägg till nya anpassade variabler
$border-radius-small: 4px;
$border-radius-medium: 6px;
$border-radius-large: 8px;

$shadow-small: 0 2px 4px rgba(0, 0, 0, 0.1);
$shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-large: 0 8px 16px rgba(0, 0, 0, 0.1);

// Konvertera till CSS-anpassade egenskaper
:root {
  --border-radius-small: #{$border-radius-small};
  --border-radius-medium: #{$border-radius-medium};
  --border-radius-large: #{$border-radius-large};
  
  --shadow-small: #{$shadow-small};
  --shadow-medium: #{$shadow-medium};
  --shadow-large: #{$shadow-large};
}
```

### FKUI-dokumentationslänkar

1. **Huvuddokumentation**
   - [FKUI Getting Started Guide](https://forsakringskassan.github.io/designsystem/getting-started.html)
   - [Component Library](https://forsakringskassan.github.io/designsystem/components.html)
   - [Design Tokens](https://forsakringskassan.github.io/designsystem/design-tokens.html)

2. **GitHub-förråd**
   - [Main Design System](https://github.com/Forsakringskassan/designsystem)
   - [User Template](https://github.com/Forsakringskassan/designsystem-user-lib)
   - [Issue Tracker](https://github.com/Forsakringskassan/designsystem/issues)

### Vue.js-lärresurser

1. **Officiell dokumentation**
   - [Vue.js Guide](https://vuejs.org/guide/introduction.html)
   - [Vue.js API Reference](https://vuejs.org/api/)
   - [Vue.js Style Guide](https://vuejs.org/style-guide/)

2. **Community-resurser**
   - [Vue.js News](https://news.vuejs.org/)
   - [Awesome Vue](https://github.com/vuejs/awesome-vue)
   - [Vue School](https://vueschool.io/) (Betalade kurser)

3. **YouTube-kanaler**
   - [Vue Mastery](https://www.youtube.com/@VueMastery)
   - [Program With Erik](https://www.youtube.com/@ProgramWithErik)

### Avancerade ämnen att utforska

#### 1. Tillståndshantering med Pinia

```bash
npm install pinia
```

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')
  
  function setUser(userData: { name: string; email: string }) {
    name.value = userData.name
    email.value = userData.email
  }
  
  return { name, email, setUser }
})
```

#### 2. Testa Vue-applikationer

```bash
# Installera Vitest och Vue Test Utils
npm install -D vitest @vue/test-utils happy-dom

# Lägg till testskript i package.json
"scripts": {
  "test": "vitest"
}
```

#### 3. Progressive Web App (PWA)-funktioner

```bash
# Installera Vite PWA-plugin
npm install -D vite-plugin-pwa
```

#### 4. Internationalisering (i18n)

```bash
# Installera Vue I18n
npm install vue-i18n@9
```

#### 5. API-integration

```bash
# Installera Axios för API-anrop
npm install axios

# Skapa API-tjänst
mkdir src/services
touch src/services/api.ts
```

```typescript
// src/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
```

### Ubuntu-utvecklingsproduktivitetstips

```bash
# Skapa användbara alias (lägg till i ~/.bashrc)
cat << 'EOF' >> ~/.bashrc

# Utvecklingsalias
alias dev="npm run dev"
alias build="npm run build"
alias preview="npm run preview"

# Git-alias
alias gst="git status"
alias gco="git checkout"
alias gcm="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph --decorate"

# Navigering
alias projects="cd ~/projects"
alias ip-sprint="cd ~/projects/ip-sprint-test-site-01"
EOF

# Ladda om bashrc
source ~/.bashrc

# Installera användbara utvecklingsverktyg
sudo apt install -y \
  htop \
  ncdu \
  tldr \
  bat \
  ripgrep \
  fd-find

# Valfritt: Bättre terminal med oh-my-zsh
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

---

## Slutsats

Denna guide ger en omfattande grund för att bygga en Vue.js-applikation med Försäkringskassans Designsystem (FKUI) på **Ubuntu som körs i VMware**. Genom att följa temalager-metoden kan du skapa en anpassad applikation samtidigt som du behåller fördelarna med ett robust designsystem.

### Nyckelprinciper att komma ihåll

1. **Ärva innan du åsidosätter** - Utnyttja FKUI:s funktionalitet när det är möjligt
2. **Dokumentera dina anpassningar** - Gör det enkelt för framtida utvecklare att förstå dina ändringar
3. **Testa grundligt** - Säkerställ att dina anpassningar fungerar över olika webbläsare och enheter
4. **Håll dig uppdaterad** - Håll FKUI-beroenden aktuella för att dra nytta av förbättringar och säkerhetsuppdateringar
5. **Använd Ubuntu-bästa praxis** - Utnyttja Linux-miljön för effektiv utveckling
6. **Prioritera tillgänglighet** - Säkerställ att din applikation är användbar för alla
7. **Säkerhet först** - Sanitera alltid inmatningar och följ säkerhetsbästa praxis

### Snabbreferenskommandon

```bash
# Utveckling
cd ~/projects/ip-sprint-test-site-01
npm run dev                    # Starta utvecklingsserver
npm run build                  # Bygg för produktion
npm run preview                # Förhandsgranska produktionsbygge
npm run lint                   # Kör linter

# Git-arbetsflöde
git status                     # Kontrollera status
git add .                      # Staga alla ändringar
git commit -m "Ditt meddelande"   # Commita ändringar
git push                       # Pusha till remote

# Felsökning
npm audit                      # Kontrollera sårbarheter
npm audit fix                  # Fixa sårbarheter
rm -rf node_modules package-lock.json && npm install  # Rensa ominstallation

# System
ip addr show                   # Kontrollera VM IP-adress
sudo ufw allow 5173/tcp        # Tillåt utvecklingsserver genom brandvägg
pkill -f "vite"                # Döda utvecklingsserver
free -h                        # Kontrollera minne
df -h                          # Kontrollera diskutrymme
```

### Projektstrukturöversikt

```
ip-sprint-test-site-01/
├── src/
│   ├── assets/                # Bilder, typsnitt, etc.
│   ├── components/            # Återanvändbara komponenter
│   ├── plugins/               # Vue-plugins (FKUI-registrering)
│   ├── router/                # Vue Router-konfiguration
│   ├── styles/                # Tema och anpassade stilar
│   │   ├── theme.scss         # Huvudtemafil
│   │   ├── _variables.scss    # Variabelåsidosättningar
│   │   ├── _colors.scss       # Färgsystem
│   │   ├── _typography.scss   # Typsnitt
│   │   └── components/        # Komponentåsidosättningar
│   ├── types/                 # TypeScript-definitioner
│   ├── views/                 # Sidkomponenter
│   ├── App.vue                # Rotkomponent
│   └── main.ts                # Applikationsingång
├── public/                    # Statiska tillgångar
├── docs/                      # Projektdokumentation
├── .env                       # Miljövariabler
├── .env.local                 # Lokal miljö (inte commitad)
├── .gitignore                 # Git ignore-fil
├── .gitlab-ci.yml             # CI/CD-konfiguration
├── package.json               # Beroenden
├── vite.config.ts             # Vite-konfiguration
└── tsconfig.json              # TypeScript-konfiguration
```

### Få hjälp

Om du stöter på problem:

1. Kontrollera [Felsökningssektion](#felsökningssektion)
2. Granska FKUI-dokumentation
3. Sök efter liknande problem på Stack Overflow
4. Skapa ett ärende i ditt GitLab-förråd
5. Fråga i Vue.js Discord-community

### Nästa workshopssteg

- [ ] Slutföra tresidig webbplats
- [ ] Anpassa tema för att matcha ditt varumärke
- [ ] Lägga till formulärvalidering och felhantering
- [ ] Implementera tillgänglighetsbästa praxis
- [ ] Sätta upp CI/CD-pipeline
- [ ] Driftsätta till stagingmiljö
- [ ] Genomföra användartestning
- [ ] Driftsätta till produktion

**Lycka till med FKUI-kodning! 🚀**

---

## Bilaga: Användbara Bash-skript

### Utvecklingskonfigurationsskript

```bash
#!/bin/bash
# setup-dev.sh - Snabb utvecklingsmiljökonfigurering

echo "Konfigurerar IP Sprint Test Site utvecklingsmiljö..."

# Kontrollera Node.js-version
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"

# Installera beroenden
echo "Installerar beroenden..."
npm install

# Skapa miljöfil om den inte finns
if [ ! -f .env.local ]; then
    echo "Skapar .env.local fil..."
    cat > .env.local << EOF
VITE_API_URL=http://localhost:3000/api
VITE_DEBUG=true
EOF
fi

# Kontrollera FKUI-versionkonsekvens
echo "Kontrollerar FKUI-paketversioner..."
npm list @fkui

echo "Konfigurering klar! Kör 'npm run dev' för att starta utvecklingsserver."
```

### Driftsättningskontrollskript

```bash
#!/bin/bash
# pre-deploy-check.sh - Kör kontroller innan driftsättning

echo "Kör driftsättningskontroller..."

# Kör linter
echo "Kör linter..."
npm run lint

# Kontrollera sårbarheter
echo "Kontrollerar säkerhetssårbarheter..."
npm audit

# Bygg projekt
echo "Bygger projekt..."
npm run build

# Kontrollera byggstorlek
echo "Byggstorlek:"
du -sh dist/

echo "Driftsättningskontroller klara!"
```

Gör skript körbara:

```bash
chmod +x setup-dev.sh pre-deploy-check.sh
```

---

**Dokumentversion**: 2.0  
**Senast uppdaterad**: November 2025  
**Författare**: Workshop-team  
**Licens**: MIT
