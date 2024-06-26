# RecipeBoo

Per far partire l'applicazione

aprire il server:

1. cd server
2. npm start

per il client:

1. cd client
2. npm install
3. npm start

Per far partire i test

1. cd client
2. npm test

RecipeBoo è un'applicazione web per scoprire e aggiungere ricette. Include funzionalità di ricerca, visualizzazione di dettagli delle ricette e aggiunta di commenti degli utenti.

## Struttura del Progetto

- `App.tsx`
- `Home.tsx`
- `AddItem.tsx`
- `RecipeDetails.tsx`
- `Welcome.tsx`
- `RecipeSearchCard.tsx`
- `NavbarHome.tsx`
- `NavbarAdd.tsx`
- `__tests__`
  - `AddItem.test.tsx`
  - `RecipeDetails.test.tsx`

## Descrizione delle Componenti

### App.tsx
Il file principale del progetto che definisce le rotte principali utilizzando `react-router-dom`.

- **Rotte**:
  - `/`: Componente `Welcome`
  - `/home`: Componente `Home`
  - `/add-item`: Componente `AddItem`
  - `/recipe-details/:id`: Componente `RecipeDetails`

### Home.tsx
Componente per la visualizzazione della pagina principale con le ricette. Include funzionalità di ricerca e paginazione.

- **Stati**:
  - `recipes`: Array di ricette.
  - `currentPage`: Numero della pagina corrente.
  - `showSearch`: Booleano per mostrare/nascondere la barra di ricerca.
  - Filtri: `nameRecipe`, `cuisineName`, `dietaryPref`, `difficulty`.
  - Opzioni preimpostate: `cuisines`, `diets`, `difficulties`.

- **Effetti**:
  - Recupera i dati delle ricette, delle cucine, delle diete e delle difficoltà dal server al caricamento della pagina.

- **Funzioni**:
  - `handleSubmit`: Gestisce l'invio del form di ricerca.
  - `toggleSearch`: Mostra/nasconde la barra di ricerca.

### AddItem.tsx
Componente per aggiungere una nuova ricetta. Include un form per l'inserimento di dettagli della ricetta.

- **Stati**:
  - `recipeName`, `ingredients`, `newIngredient`, `instructions`, `cuisineType`, `dietaryPreference`, `difficulty`, `image`.
  - Opzioni preimpostate: `cuisines`, `diets`, `difficulties`.

- **Effetti**:
  - Recupera i dati delle cucine, delle diete e delle difficoltà dal server al caricamento della pagina.

- **Funzioni**:
  - `handleImageChange`: Gestisce il caricamento dell'immagine.
  - `handleSubmit`: Gestisce l'invio del form.
  - `handleAddIngredient`: Aggiunge un ingrediente alla lista.
  - `handleRemoveIngredient`: Rimuove un ingrediente dalla lista.

### RecipeDetails.tsx
Componente per visualizzare i dettagli di una ricetta e i commenti degli utenti. Include la possibilità di aggiungere un nuovo commento.

- **Stati**:
  - `recipe`: Dettagli della ricetta.
  - `comments`: Array di commenti.
  - `newComment`, `newRating`: Stato per nuovi commenti.

- **Effetti**:
  - Recupera i dati della ricetta e dei commenti dal server al caricamento della pagina.

- **Funzioni**:
  - `formatDate`: Formatta la data dei commenti.
  - `handleCommentSubmit`: Gestisce l'invio di un nuovo commento.

### Welcome.tsx
Componente per la pagina di benvenuto con un'animazione per il pulsante "Explore".

- **Stati**:
  - `isAnimating`: Stato per l'animazione.

- **Funzioni**:
  - `handleExploreClick`: Gestisce il click sul pulsante "Explore".

### RecipeSearchCard.tsx
Componente per visualizzare una card di ricerca della ricetta con dettagli come nome, ingredienti, difficoltà e valutazione.

- **Stati**:
  - `difficulty`: Difficoltà della ricetta.
  - `comment`: Commento della ricetta.

- **Effetti**:
  - Recupera i dati delle difficoltà e dei commenti dal server.

### NavbarHome.tsx
Componente per la barra di navigazione della home page con un pulsante per mostrare/nascondere la barra di ricerca.

### NavbarAdd.tsx
Componente per la barra di navigazione della pagina di aggiunta ricetta con un pulsante per tornare alla home page.

## Test
I test sono scritti utilizzando `@testing-library/react`.

### AddItem.test.tsx
Testa la corretta visualizzazione del form di aggiunta ricetta.

### RecipeDetails.test.tsx
Testa la funzionalità di aggiunta di un commento e la corretta visualizzazione dei commenti.
