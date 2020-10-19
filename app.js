const API_KEY = '2f6915bb635eb67ac90e9ff03a191d92';

const input = document.querySelector('#zipForm');
const subBtn = document.querySelector('.subBtn');

subBtn.addEventListener('click', e => {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${input.value}&appid=${API_KEY}&units=imperial`;

    fetch(url)
    .then(data => data.json())
    .then(data => {
        const weather = new Weather(data);
        document.querySelector('.card-container').innerHTML = weather.createCard();
    })
    
    e.preventDefault();
})

class Weather{
    constructor(data){
        this.data = data;    
    }

    images() {
        const images = ['Clear','Clouds','Drizzle','Rain','Thuderstorm', 'Snow', 'Atmo']
        return images;
    }

    createImgCard(image) {
        const card = `
        <div>
            <img src="imgs/${image}.svg" alt="${image}">
        </div>
        `;
        return card;
    }

    createCard() {
        const card =`
        <div class="card">
            ${this.displayImg()}         
            <h1>${this.data.name}</h1>
            ${this.displayTemp()}
        </div>`;
        return card;
    }

    displayImg() {
        let img = ''
        for (let image of this.images()) {
            if(image == 'Atmo') {
                img = image;
            }else if(image == this.data.weather[0].main) {
                img = image;
                break;
            }
        }
        return this.createImgCard(img.toLowerCase());
    }

    displayTemp() {
        const tempBox = `
        <div class="tempBox">
            <h2 class="tempText">${Math.round(this.data.main.temp)}\u00B0F</h2>
            <ul>
                <li>Feels like: ${Math.round(this.data.main.feels_like)}\u00B0F</li>
                <li>Min: ${Math.round(this.data.main.temp_min)}\u00B0F</li>
                <li>Max: ${Math.round(this.data.main.temp_max)}\u00B0F</li>
                <li>Humidity: ${this.data.main.humidity}%</li>
            </ul>
        </div>
        `;
        return tempBox;
    }
}

