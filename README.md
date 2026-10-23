# 💧 Hydrate

Prosty i ładny **tracker picia wody** w formie PWA.

## Dlaczego nadaje się do Google Play?

- To pełnoprawna **Progressive Web App** (manifest + service worker)
- Działa offline
- Da się zainstalować na telefonie jak zwykłą aplikację
- Łatwo opakować w **Trusted Web Activity (TWA)** lub **Capacitor** i wrzucić do Play Store

## Funkcje

- Duży, czytelny wskaźnik postępu (pierścień)
- Szybkie dodawanie: 150 / 250 / 350 / 500 ml
- Własna ilość
- Historia dzisiejszych wpisów + cofanie
- Ustawiany cel dzienny
- Dane tylko lokalnie na urządzeniu

## Linki

**Podgląd:**  
https://htmlpreview.github.io/?https://github.com/Benek2616/hydrate-app/blob/main/index.html

**Repozytorium:**  
https://github.com/Benek2616/hydrate-app

## Jak wrzucić do Google Play?

Najprostsze drogi:
1. **PWA Builder** (https://www.pwabuilder.com) → generuje projekt TWA
2. **Capacitor** – opakowujesz tę apkę w natywną powłokę Android
3. **Bubblewrap** (oficjalne narzędzie Google do TWA)

Potem budujesz AAB i wrzucasz do Google Play Console.

---

Ikony: na razie w manifeście są placeholder’y. Przed publikacją warto dodać prawdziwe `icon-192.png` i `icon-512.png`.
