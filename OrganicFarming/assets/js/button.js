const healthyDiv = document.querySelector('.healthy');
const boxContent = document.getElementById('boxContent');
const imageContainer = document.getElementById('imageContainer');
const buttons = document.querySelectorAll('.healthy-pest-eco-btn button');

const contentMap = {
    soil: `
            <h3>Healthy Soil</h3>
            <p>Healthy soil is the heartbeat of any organic form. it's more than just dirt -
                                        it's a living ecosystem full of nutrients, microbes and organic matter that
                                        support strong, vibrant plants.<br>In organic farming, we can feed the soil so
                                        it can feed the crops. Using natural methods like composting , mulching and crop
                                        rotation, we improve soil structure, boost fertility and retain moisture - all
                                        without chemicals.<br> Healthy soil leads to healthier plants, better yields and
                                        a thriving environment from the ground up.</p>
        `,
    pest: `
            <h3>Pest Control</h3>
           
            <p>In organic farming, pest control does not control harsh chemicals - it means working with nature, not aganist it. By using smart, natural methods, you can keep your crops safe while protecting the environment. From companion planting and neem oil to attracting beneficial insects like  ladybugs and lacewings, organic pest control is about balance and prevention. Healthy soil, diverse planting and good garden habits also play a key role in keeping pests in check. it's safe sustainable and effective - because real growth doesn't come at nature's expense.</p>
        `,
    eco: `
            <h3>Eco-Friendly</h3>
            <p>Organic farming is more than growing food - it's about living in harmony with nature. Eco friendly practices help reduce pollution. protect wildlife, and preserve our planets natural resources for future generations. By avoiding harmful chemicals, conserving water, composting waste and encouraging bio-diversity, organic farmers creates a sustainable system where everything works together naturally. These methods not only support the environment but also improve the quality of our soil, air, and food. Small choices leads into big change - and every seed planted with care is a step forward a greener future.</p>
        `,
};

const defaultContent = `
    <h3>Your journey to Organic Farming Starts Here</h3>
    <p><strong>What is Organic Farming?</strong></p>
    <p>Organic farming is a way of growing crops and raising animals that works in harmony with nature — without using synthetic chemicals, fertilizers, or GMOs. It focuses on natural methods to keep soil healthy, control pests, and support biodiversity.</p>
`;

const defaultBackground = "#FFFFFF"; // original white background
const defaultImageSrc = ""; // No image by default

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    const type = button.getAttribute('data-content');
    const newBg = button.getAttribute('data-bg');
    const newImgSrc = button.getAttribute('data-img');
    const newContent = contentMap[type] || defaultContent;

    healthyDiv.style.backgroundColor = newBg;
    healthyDiv.classList.add('white-text');

    boxContent.classList.add('fade-out');
    setTimeout(() => {
      boxContent.innerHTML = newContent;
      boxContent.classList.remove('fade-out');
    }, 300);

    if (newImgSrc) {
      imageContainer.innerHTML = '';
      const img = document.createElement('img');
      img.src = newImgSrc;
      img.alt = type;
      img.classList.add('visible');
      imageContainer.appendChild(img);
    }
  });

  button.addEventListener('mouseleave', () => {
    healthyDiv.style.backgroundColor = defaultBackground;
    healthyDiv.classList.remove('white-text');

    boxContent.classList.add('fade-out');
    setTimeout(() => {
      boxContent.innerHTML = defaultContent;
      boxContent.classList.remove('fade-out');
    }, 300);

    imageContainer.innerHTML = '';
  });
});