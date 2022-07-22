# FRONT-END DEVELOPER MOBILE

Realizzare un'applicazione mobile React Native che mostri i dati meteo di 3 città diverse. I dati meteo devono essere reperiti via API tramite il servizio Open Weather Map (https://openweathermap.org/api). 

La UI/UX della soluzione dev'essere fedele alla UX/UI che è stata
fornita.

Le tecnologie richieste all'interno del prototipo sono:

- React Native + Redux
- Styled Components o librerie alternative comparabili
- Altre librerie a scelta del candidato

## Chiarimenti

1. L'app può essere realizzata utilizzando la piattaforma Expo? Sì
1. Oltre ai test classici, per il completamento del test sono richiesti anche test automatizzati E2E? (lo chiedo principalmente perché impatta sulle tempistiche di consegna) No
1. Per consegna tramite git, va bene un repository pubblico su Github? Va bene
1. Vedo che ci sono diverse lingue nel mockup, devo inserire un supporto multilingua? Quali lingue devono essere supportate? Basta ita eng
1. Deve essere supportato il tema dark? No
1. Le 3 città sono fisse (Londra, Torino, Roma) o deve essere possibile cambiarle dinamicamente? Cambiarle dinamicamente
1. Il gradiente dello sfondo delle card delle 3 città in home, è fisso e legato alla cardinalità della città oppure è legato al risultato della chiamata api? il gradiente di sfondo della schermata di dettaglio deve essere uguale a quello della card della home oppure posso prendere per valore statico quello indicato nel mock? puoi prendere il valore statico
1. Più in generale le CTA che non riguardano le due schermate presenti nel mockup immagino vadano ignorate, corretto? esatto
1. Nella schermata di dettaglio mi sembra di intuire che debba esserci una possibile interazione di swipe per quanto riguarda temperature giornaliere, è corretto? sì
1. Stessa cosa del punto precedente ma per quanto riguarda le previsioni dei prossimi giorni: inoltre volevo sapere quanti giorni dobbiamo visualizzare. sì, 7
1. Se non sbaglio non si è deciso di usare le icone di openweathermap, ma ci sono delle icone custom per la visualizzazione del tempo previsto. Vedo però che i possibili stati restituiti dall'api sono più numerosi. Trattandosi di un esercizio immagino di poter fare delle semplificazioni e quindi associare anche stati completamente diversi alle icone fornite, oppure di vuole una mappatura completa con indicazione sulle icone da usare? Inoltre devo mostrare icone diverse a seconda dell'ora del giorno (ad esempio: di notte continuerò a mostrare il sole?) si tratta di un esercizio, quindi semplificalo il più possibile