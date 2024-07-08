# AngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Zadanie rekrutacyjne Szymon Wiśniewski

## Uwagi

1. Szczegóły dot. wyglądu:
- kolory tabelki,
- wyrównanie ID rekordu, ikonek akcji,
- styl od przycisku do dodawania rekordów w HTMLu,
- marginesy w modalu.

2. Spełnienie wymagań zadania:
- Przy usuwaniu rekordu nie pojawia się modal, lecz alert.
- Lista nie jest w osobnym module. Wynika to z użycia najnowszego angulara, jednak da się stworzyć projekt oparty na modułach.
- Jest stworzony komponent do samego rekordu, jednak nie został użyty. Zawartość rekordu jest zdefiniowana w komponencie od listy.

3. Modal:
- Znacznik `form` ma atrybut `novalidate`, mimo że jest walidowany. Walidacja nie odbywa się za pomocą walidatorów zapewnionych przez Angulara (walidacja nie była wymagana w zadaniu).
- Co prawda gdy dane są nieprawidłowe, to nie da się zapisać formularza, jednak zadeklarowane informacje dot. walidacji nie pojawiają się. W metodzie do zapisywania formularza jest niejasny zapis `if (form.invalid) { return; }`.
- Po prawidłowym dodaniu rekordu i ponownym otworzeniu modala pokazują się komunikaty dot. walidacji.
- Informacje o userze przechowywane są w arrayu o typie `any` (dane są dodawane do arraya poprzez `ngModel`).
- Pojawianie się i znikanie modala odbywa się poprzez atrybut `display` na podstawie informacji z booleana `isVisible`. "Bardziej angularowym" podejściem w takim rozwiązaniu byłoby użycie `*ngIf` lub `@if`, ponieważ modal jest komponentem.
- W trakcie zapisywania formularza da się spamować przyciskiem i tym samym dodać kilka rekordów.