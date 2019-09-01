// Константы
const SIZE = ['big', 'small'];
const SORT = ['sort_1', 'sort_2'];
const APPLE = 'apple';
const PEAR = 'pear';

const appleElement = document.querySelector('.apple');
const pearElement = document.querySelector('.pear');
const dropZone = document.querySelector('.dropzone');
// Выбор одной случайной картинки после попадания фрукта в дроп зону
const appleImage = [
    'https://images-na.ssl-images-amazon.com/images/I/81xQBb5jRzL._SY355_.jpg',
    'https://i5.walmartimages.ca/images/Large/094/514/6000200094514.jpg',
    'https://www.vaporfi.com.au/media/catalog/product/cache/34/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/v/z/vz_eliquid_juicy_red_apple.jpg',
    'https://ecigs-scotland.com/wp-content/uploads/2019/01/apple.jpg',
    'https://www.organichaive.com.ng/wp-content/uploads/2017/01/apple_green-350x350.jpg',
    'https://www.sagefruit.com/wp-content/uploads/2016/08/our-fruit-apples-1.jpg',
    'https://fwtrade.co.uk/ekmps/shops/bcd82e/images/red-apple-fruit-very-realistic-7cm-3-inch-diameter-1095-p.jpg',
    'https://png.pngtree.com/element_our/20190522/ourlarge/pngtree-illustration-hand-drawn-red-apple-fruit-material-ai-vector-fruit-element-image_1076281.jpg',
    'https://www.chelanfresh.com/wp-content/uploads/2018/11/apple-green.png',
    'http://www.ffm-wa.com/wp-content/uploads/2015/04/opalapple3.png'
];
const pearImage = [
    'https://4.imimg.com/data4/UA/CL/ANDROID-46992190/product-500x500.jpeg',
    'https://sc02.alicdn.com/kf/UTB8K6m2tJoSdeJk43Owq6ya4XXa0/Fresh-pear.jpg',
    'https://www.thompson-morgan.com/product_images/100/optimised/PEAR-CWW3398-A_h.jpg',
    'http://www.liberaldictionary.com/wp-content/uploads/2018/11/pear.jpg',
    'https://images.ua.prom.st/1030954322_w640_h640_organajzer-pear-pod.jpg',
    'https://peters-orchards.com/sites/default/files/Pears_Silho_0.png',
    'https://plant.daleysfruit.com.au/trees/m/Pear-Beurre-Bosc-4501.jpeg',
    'https://www.narzt.at/wp-content/uploads/2017/08/Birnen.jpg',
    'https://italianmarblefruit.com/wp-content/uploads/2018/04/Yellow-Pear.jpg',
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/27/0/HEW_Pears_s4x3.jpg.rend.hgtvcom.406.305.suffix/1371612039080.jpeg'
]

let Fruit = {
    isRipe: false,
    size: SIZE[Math.floor(Math.random() * (1 - 0 + 1)) + 0]
};

let Apple = {
    sort: SORT[Math.floor(Math.random() * (1 - 0 + 1)) + 0]
};

let Pear = {};

Apple.__proto__ = Fruit;
Pear.__proto__ = Fruit;

let AppleObj = {};

let PearObj = {};

AppleObj.__proto__ = Apple;
PearObj.__proto__ = Pear;

let switchStateFruit = (e) => {
    switch (e.target) {
        case appleElement:
            if (AppleObj.isRipe) {
                AppleObj.isRipe = false;
                appleElement.classList.remove('active');
            } else {
                AppleObj.isRipe = true;
                appleElement.classList.add('active');
            }
            break;
        case pearElement:
            if (PearObj.isRipe) {
                PearObj.isRipe = false;
                pearElement.classList.remove('active');
            } else {
                PearObj.isRipe = true;
                pearElement.classList.add('active');
            }
            break;
    }
};
// Делегирование на хедер
document.querySelector('header').addEventListener('click', switchStateFruit);


// Drag & drop
let appleMove = false;
let pearMove = false;
let isDrag = false;
let activeFruit;

function handleDragStartApple() {
    appleMove = true;
}

function handleDragStartPear() {
    pearMove = true;
}

function handleDragEnter() {
    if (appleMove || pearMove) {
        this.classList.add('active');
    }
}

function handleDragOver(e) {
    isDrag = true;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragLeave() {
    isDrag = false
    if (appleMove || pearMove) {
        this.classList.remove('active');
    }
}

function handleDragEndApple() {
    appleMove = false;
    if (isDrag) showInfo(APPLE);
}

function handleDragEndPear() {
    pearMove = false;
    if (isDrag) showInfo(PEAR);
}

appleElement.addEventListener('dragstart', handleDragStartApple);
pearElement.addEventListener('dragstart', handleDragStartPear);
dropZone.addEventListener('dragenter', handleDragEnter);
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
appleElement.addEventListener('dragend', handleDragEndApple);
pearElement.addEventListener('dragend', handleDragEndPear);

// Вывод информации после попадания фрукта в дроп зону
let showInfo = (fruit) => {
    let newNode = document.createElement('section');
    let img;
    let state;
    let size;
    let sort;
    if (fruit === APPLE) {
        img = appleImage[Math.floor(Math.random() * (9 - 0 + 1)) + 0];
        state = AppleObj.isRipe;
        size = AppleObj.size;
        sort = AppleObj.sort;
    } else {
        img = pearImage[Math.floor(Math.random() * (9 - 0 + 1)) + 0];
        state = PearObj.isRipe;
        size = PearObj.size;
        sort = 'None';
    }
    newNode.innerHTML = `
        <img class="result-img d-flex justify-content-around align-items-center" src="${img}">
        <p class="state d-flex justify-content-around align-items-center">State: ${state ? 'Ripe' : 'Not ripe'}</p>
        <p class="size d-flex justify-content-around align-items-center">Size: ${size}</p>
        <p class="sort d-flex justify-content-around align-items-center">Sort: ${sort}</p>
    `;
    newNode.classList.add('result');
    dropZone.after(newNode);
    dropZone.remove();
    removeDrapFruit();
};

// Запрет на drag & drop
let removeDrapFruit = () => {
    appleElement.removeAttribute('draggable');
    pearElement.removeAttribute('draggable');
    document.querySelector('header').removeEventListener('click', switchStateFruit);
};

// Восстановление значений по умолчанию
document.querySelector('.clear').addEventListener('click', () => {
    document.querySelector('.result').after(dropZone);
    dropZone.classList.remove('active');
    document.querySelector('.result').remove();

    appleElement.setAttribute('draggable', true);
    pearElement.setAttribute('draggable', true);
    appleElement.classList.remove('active');
    pearElement.classList.remove('active');
    document.querySelector('header').addEventListener('click', switchStateFruit);

    AppleObj.size = SIZE[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
    PearObj.size = SIZE[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
    AppleObj.sort = SORT[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
});
