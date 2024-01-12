

// Här gör jag ett fetch-anrop med en async funktion som tar apiKey som parameter.
// Funktionen hämtar bilder från Unsplash API med den angivna API-nyckeln.
async function fetchImages(apiKey) {
  const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=5`;

  // Kör try & catch för att hantera eventuella anropfel. 
  try {
    const response = await fetch(url); // await, för att invänta svar från anropet
    // för att undvika undefined.

    // Ett if-statement som kontrollerar om fel skulle uppstå, och slänga en error
    // i ett meddelande för användaren för att uppmärksamma felet.
    if (!response.ok) {
      throw new Error(`Ett fel uppstod: ${response.statusText}`);
    }

    const imageData = await response.json(); // Svaret returneras i json-format.
    return imageData;
  } catch (error) {
    console.error(error);
  }
}
// Funktionen hanterar löftet som returneras efter anropet. 
async function preloadImages(images) {
  const promises = []; // En tom array som anropade bild hamnas inuti.

  // En for.each loop som iterar igenom alla bilder, för att kunna 
  // se ifall alla bilder går att hämta enligt löftet.
  images.forEach(imageData => {
    const image = new Image();

    const promise = new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = reject;
    });

    image.src = imageData.urls.regular; // Bilderna hämtas och läggs in 
    // i original storlek
    promises.push(promise); // Metoden push lägger in löften.
  });

  return Promise.all(promises); // Alla löften returneras.
}

// Den här funktionen tar in api-nyckeln och kör try & catch för att hantera
// eventuella fel från anropet.
async function main() {
  const apiKey = "7NL9L20_W18jVy_mwrsMMbptge1UZ2BazM_czXLheTc";

  try {
    const imageData = await fetchImages(apiKey);
    const preloadedImages = await preloadImages(imageData);

    // Här lägger jag in bilderna i min container som är hämtad från html.
    preloadedImages.forEach(image => {
      document.getElementById("imageContainer").appendChild(image);
    });
  } catch (error) {
    console.error(error);
  }
}
// Här anropar jag min funktion.
main();
