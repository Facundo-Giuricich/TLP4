# Respuestas - Laboratorio de pruebas automatizadas

Alumno: Facundo
TLP IV - Unidad 4

Lo hice con Node v24.12.0 y npm 11.6.2

## 2. Conocer la aplicación

- La regla de cálculo está en `src/services/precios.ts`, en la función `calcularPrecioFinal`.
- La ruta HTTP se define en `src/app.ts`.
- La diferencia es que `precios.ts` solamente hace la cuenta y no tiene nada que ver con HTTP. En cambio `app.ts` es el que recibe la petición, saca los datos del JSON, llama a la función y devuelve la respuesta con el código que corresponda (200, 400 o 500).

Aclaración: en la guía dice `GET /healthy` pero en el código la ruta es `GET /salud`. Probando con `/salud` me devolvió `{"estado":"ok"}`, con `/healthy` me dio 404.

## 3 y 4. Primera ejecución e interpretación de la falla

La primera vez que corrí `npm test` me dieron 5 pruebas, pasaron 4 y falló 1 (la de `rechaza descuentos superiores al 100 %`). El mensaje de Vitest fue "expected function to throw an error, but it didn't".

1. Con un descuento de 150 % sobre $1.000 devuelve -500, porque hace 1000 - 1000 * 150 / 100.
2. No cumple la regla de negocio porque no tiene sentido un descuento mayor al 100 % y el precio final no puede quedar negativo. Según la regla en ese caso tendría que tirar un `RangeError`.
3. La prueba falla aunque la función termine porque lo que se espera no es un resultado sino que la función lance un error. Como la función terminó normal y devolvió -500, no se cumple el `toThrow(RangeError)`. O sea, que no se rompa no quiere decir que esté funcionando bien.

## 5. Corrección de la función

En `src/services/precios.ts` le agregué dos validaciones antes de hacer la cuenta:

- si el precio no es un número finito o es menor a 0, lanza `RangeError`
- si el descuento no es un número finito o no está entre 0 y 100, lanza `RangeError`

La fórmula para los casos válidos la dejé como estaba. Con eso pasaron las 5 pruebas.

## 6. Nuevas pruebas unitarias

En `tests/precios.test.ts` agregué estas:

| Entrada | Esperado | Resultado |
| --- | --- | --- |
| precio 1000, descuento 100 % | total 0 | pasa |
| precio -100, descuento 10 % | RangeError | pasa |
| precio 1000, descuento -10 % | RangeError | pasa |
| (desafío) precio NaN | RangeError | pasa |

Sobre si la validación rechaza `NaN`: sí, porque `Number.isFinite(NaN)` da `false`, entonces entra al if y tira el error. Si hubiera puesto solamente `precio < 0` no lo agarraba, porque cualquier comparación con `NaN` da false.

## 7. Prueba de integración HTTP

En `tests/api.test.ts` agregué la prueba `responde HTTP 400 ante un descuento inválido` y pasa.

Es de integración porque no llama a la función directo, sino que le manda una petición HTTP a la app de Express usando Supertest. Ahí entran en juego varias partes a la vez: la lectura del JSON, la ruta `/api/precios/calcular`, la función `calcularPrecioFinal` y el try/catch de `app.ts` que agarra el `RangeError` y lo convierte en un 400. Una unitaria en cambio prueba la función sola.

## 8. Typecheck y pruebas

`npm run typecheck` no tiró errores.

Conviene usar los dos porque no revisan lo mismo. `npm test` ejecuta el código y se fija que haga lo que tiene que hacer (por ej. que con 150 % tire error). `npm run typecheck` no ejecuta nada, solo revisa que los tipos estén bien (que no le pases un string donde va un number, por ejemplo). Node puede correr los .ts pero no chequea tipos, por eso hace falta el typecheck aparte.

## 9. Integración continua (opcional)

El workflow `.github/workflows/pruebas.yml` hace lo siguiente: baja el repo con `actions/checkout`, configura Node 24 con `actions/setup-node`, instala las dependencias con `npm install`, corre `npm run typecheck` y después `npm test`. Si falla alguna prueba el run queda en rojo en la pestaña Actions.

## 10. Registro de resultados

| Comprobación | Resultado | Observación |
| --- | --- | --- |
| GET /healthy | {"estado":"ok"} | en realidad la ruta es /salud, /healthy da 404 |
| Primera vez npm test | 4 pasan, 1 falla | falla la de 150 %, devuelve -500 en vez de tirar error |
| Corrección del servicio | pasan las 5 | valido precio y descuento con RangeError |
| Pruebas unitarias nuevas | pasan | 100 %, precio negativo, descuento negativo y NaN |
| Integración HTTP 400 | pasa | responde 400 con la propiedad error |
| npm run typecheck | sin errores | no corre pruebas, solo revisa tipos |

Al final quedaron 10 pruebas y pasan las 10.

## 11. Preguntas de cierre

1. Diferencia entre probar a mano y una prueba automatizada: a mano tengo que hacer la petición cada vez y fijarme yo si la respuesta está bien. La automatizada ya tiene escrito qué se espera y la puedo repetir con un comando, y siempre se prueba igual.
2. La primera prueba falló porque la función no validaba lo que le llegaba, entonces aceptaba un 150 % de descuento y devolvía -500 en lugar de lanzar `RangeError`.
3. Hay que incluir casos inválidos porque los errores aparecen justamente con datos raros o fuera de rango. Si pruebo solo casos normales tipo 10 % no me entero de que el sistema acepta cosas que no debería, como pasó con el 150 %.
4. `tests/precios.test.ts` prueba solamente la función `calcularPrecioFinal`, o sea la regla de cálculo. `tests/api.test.ts` prueba la API entera: la ruta de Express, cómo lee el JSON, la llamada al servicio y los códigos que devuelve (200 y 400).
5. Correr las pruebas después de cada cambio sirve para darse cuenta enseguida si rompiste algo que antes andaba (regresión), y además es más fácil encontrar el error porque sabés qué fue lo último que tocaste.

## Preguntas de repaso (teoría)

1. Una API puede devolver 200 y tener errores de negocio porque el 200 solo dice que la petición se procesó, no que el resultado esté bien. Antes de corregirlo, con 150 % devolvía 200 y un total de -500.
2. La prueba unitaria prueba una parte chica aislada (una función), la de integración prueba cómo funcionan varias partes juntas (la ruta + el servicio).
3. `toThrow` recibe una función para que sea Vitest el que la ejecute y pueda atrapar el error. Si le pasás directamente el resultado, la función se ejecuta antes y el error salta afuera del `expect`, y se corta la prueba.
4. `npm test` corre las pruebas y verifica el comportamiento, `typecheck` revisa los tipos sin ejecutar nada.
5. GitHub Actions corre las pruebas y el chequeo de tipos solo en cada push o pull request, así todo el equipo ve si un cambio rompe algo antes de mergearlo.
