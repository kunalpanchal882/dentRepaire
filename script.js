const menuicon = document.querySelector("#menuicon")
const mobilemenu = document.querySelector("#mobile_menu")
const closemenu = document.querySelector("#closeMenu")


const footer = document.querySelector(".footer");
const toggleBtn = document.querySelector(".close_footer");

toggleBtn.addEventListener("click", () => {
  footer.classList.toggle("collapsed");
});


// infinite scrolling
// const track = document.querySelector('.trustedcompany_track');

// let scrollAmount = 0;

// function animate() {
//   scrollAmount += 1;
  
//   if (scrollAmount >= track.scrollWidth / 2) {
//     scrollAmount = 0;
//   }

//   track.style.transform = `translateX(-${scrollAmount}px)`;
//   requestAnimationFrame(animate);
// }

// animate();

// COURASEL

// document.addEventListener("DOMContentLoaded", () => {
//   const slides = document.querySelector(".slides");
//   const images = document.querySelectorAll(".slides img");

//   const nextBtn = document.querySelector(".next");
//   const prevBtn = document.querySelector(".prev");

//   console.log(nextBtn); // debug

//   let index = 0;

//   nextBtn.addEventListener("click", () => {
//     console.log("hello"); // now this WILL work
//     index = (index + 1) % images.length;
//     updateSlide();
//   });

//   prevBtn.addEventListener("click", () => {
//     index = (index - 1 + images.length) % images.length;
//     updateSlide();
//   });

//   function updateSlide() {
//     slides.style.transform = `translateX(-${index * 100}%)`;
//   }
// });


// SLIDE IMAGES
const leftwrape = document.querySelector('.image_right_wrapper')
const handler = document.querySelector('.slider_handle')
const leftContainer = document.querySelector('.left_gallery')

// QUESTION SLIDER
const questions = document.querySelectorAll('.single_question');

questions.forEach(q => {
  const answer = q.querySelector('.answer');

  q.querySelector('.question').addEventListener('click', () => {

    questions.forEach(item => {
      const ans = item.querySelector('.answer');

      if(item !== q){
        item.classList.remove('active');
        ans.style.maxHeight = null;
      }
    });

    q.classList.toggle('active');

    if(q.classList.contains('active')){
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }

  });
});

// SELELCT LINKS
const icons = document.querySelectorAll('#links i')

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            icons.forEach(i => i.classList.remove('active'))

            icon.classList.add('active')
        })
    })

menuicon.addEventListener('click',() => {
    console.log('hello kunal');
    mobilemenu.classList.toggle("active")
})

closemenu.addEventListener('click',() => {
    mobilemenu.classList.remove('active')
})

// slider

// function slidingimage(){
//     let isDragging = false;

// handler.addEventListener('mousedown',() => {
//     isDragging = true
// })

// window.addEventListener("mouseup", () => {
//   isDragging = false;
// });

// window.addEventListener('mousemove',(e) => {
//     if(!isDragging) return;

//     const react = leftContainer.getBoundingClientRect();
//     let x= e.clientX - react.left;

//     if(x <0) x=0;
//     if(x > react.width) x=react.width;

//     handler.style.left = x + "px"

//     leftContainer.style.width = x + "px"

// })
// }

// slidingimage()



// corosel

const slider = document.querySelector('.slides')
const images = document.querySelectorAll('.slides img')
const nextBtn = document.querySelector('.next')
const prevBtn = document.querySelector('.prev')

let isAnimation = false;
let index = 1;

slider.style.transform = `translateX(-${index * 100}%)`

nextBtn.addEventListener('click',() => {

  if(isAnimation) return;
  isAnimation = true;
  animateBtn(nextBtn);
  console.log("hello"); 
  index++;
  slideUpdate()
  slider.style.transition = 'transform 0.5s ease'

})

prevBtn.addEventListener('click',() => {
  if(isAnimation) return ;
  isAnimation = true;
  animateBtn(prevBtn);
  index--;
  slideUpdate();
  slider.style.transition = `transform 0.5s ease`

})

function slideUpdate() {
  console.log("slideUpdate Running");
  slider.style.transform = `translateX(-${index * 100}%)`
  updateUI();
}

// loop fixing;

slider.addEventListener('transitionend',()=>{

  // if it reach to dumi end image  -> jump tpo first;
  if(index === images.length-1){
    slider.style.transition = 'none'
    index =1;
    slider.style.transform = `translateX(-${index * 100}%)`
  }

  // if it in first dumi -> go to last 
  if(index === 0){
    slider.style.transition = 'none'
    index = images.length -2;
    slider.style.transform = `translateX(-${index * 100}%)`
  }

  isAnimation = false

})

const dotecontainer = document.querySelector('.track')
const currentNum = document.querySelector('#current')
const totalNum = document.querySelector('#total')

const totalSlides = images.length - 1
totalNum.textContent = totalSlides

console.log("total slide",totalSlides);


let dotes = []

 for(let i=1;i<=totalSlides;i++){
  const dote = document.createElement(`span`);
  dotecontainer.appendChild(dote);
  dotes.push(dote)
 }

function updateUI() {

  let realIndex = index;

  // fix clone positions
  if (index === 0) {
    realIndex = totalSlides;
  } else if (index === images.length - 1) {
    realIndex = 1;
  }

  // update number
  currentNum.textContent = realIndex;

  // update dots
  dotes.forEach(dot => dot.classList.remove('active'));
  dotes[realIndex - 1].classList.add('active');
}

function animateBtn(btn) {
  console.log("button",btn);
  
  btn.classList.remove("active"); // 🔥 reset first

  // force reflow (IMPORTANT)
  void btn.offsetWidth;

  btn.classList.add("active");
}

// auto couosel;

setInterval(() => {
  if(!isAnimation){
    nextBtn.click()
    // animateBtn(nextBtn);
    updateUI();
  }
}, 7000);
                                                                                                                              
// review courosel
document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector('.review_track');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dotes span');

  let index = 0;
  const slideHeight = 322;

  // 🔥 clone slides for infinite loop
  slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index % slides.length].classList.add('active');
  }

  function moveSlide() {
    index++;

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateY(-${index * slideHeight}px)`;

    updateDots();

    if (index ===  slides.length) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = `translateY(0px)`;
        index = 0;
        updateDots();
      }, 1000);
    }
  }

  // 🔥 start after delay (so first slide fully visible)
  setTimeout(() => {
    setInterval(moveSlide, 2500);
  }, 1500);

});




// document.addEventListener("DOMContentLoaded", () => {

//   const slider = document.getElementById('before-after-slider');
//   const before = document.getElementById('before-image');
//   const resizer = document.getElementById('resizer');

//   let active = false;

//   before.style.width = slider.offsetWidth / 2 + "px";

//   // 🔥 better drag area
//   slider.addEventListener('mousedown', () => active = true);
//   document.addEventListener('mouseup', () => active = false);

//   document.addEventListener('mousemove', (e) => {
//     if (!active) return;

//     let x = e.clientX - slider.getBoundingClientRect().left;
//     x = Math.max(0, Math.min(x, slider.offsetWidth));

//     before.style.width = x + "px";
//     resizer.style.left = x + "px";
//   });

// });

const sliders = document.querySelectorAll(".comparison-container");

sliders.forEach((container) => {
  const beforeImage = container.querySelector(".image-before");
  const sliderLine = container.querySelector(".slider-line");
  const sliderKnob = container.querySelector(".slider-knob");

  let isDragging = false;
  let currentPosition = 50;

  function updateSlider(position) {
    position = Math.max(0, Math.min(100, position));
    currentPosition = position;

    beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    sliderLine.style.left = `${position}%`;
    sliderKnob.style.left = `${position}%`;
  }

  function handleMove(clientX) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    updateSlider(percentage);
  }

  // Mouse
  sliderKnob.addEventListener("mousedown", (e) => {
    isDragging = true;
    container.classList.add("dragging");
    e.preventDefault();
  });

  container.addEventListener("mousedown", (e) => {
    if (e.target === sliderKnob) return;
    isDragging = true;
    container.classList.add("dragging");
    handleMove(e.clientX);
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    container.classList.remove("dragging");
  });

  // Init
  updateSlider(50);
});