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

function slidingimage(){
    let isDragging = false;

handler.addEventListener('mousedown',() => {
    isDragging = true
})

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener('mousemove',(e) => {
    if(!isDragging) return;

    const react = leftContainer.getBoundingClientRect();
    let x= e.clientX - react.left;

    if(x <0) x=0;
    if(x > react.width) x=react.width;

    handler.style.left = x + "px"

    leftContainer.style.width = x + "px"

})
}

slidingimage()



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

const totalSlides = images.length -2
totalNum.textContent = totalSlides

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

// client review  COURASEL

// const reviewDotecontainer = document.querySelector('.dotes')

// const totalreviewSlide = 4;

// let reviewDoteTrack = []

// for(let i=0;i<=totalreviewSlide;i++){
//   const reviewDote = document.createElement('span')
//   reviewDotecontainer.appendChild(reviewDote)
//   reviewDoteTrack.push(reviewDote)
// }

// function updatereviewUi() {
  
// }

// REVIEW SLIDER (vertical)

const reviewTrack = document.querySelector('.review_track');
const reviewSlides = document.querySelectorAll('.review_track .slide');
const dotsContainer = document.querySelector('.dotes');

let reviewIndex = 0;
let reviewDots = [];
let reviewtotalSlides = 4; // 👈 jitne dots chahiye

// create dots
for (let i = 0; i < reviewtotalSlides; i++) {
  const dot = document.createElement('span');
  dotsContainer.appendChild(dot);
  reviewDots.push(dot);

  dot.addEventListener('click', () => {
    reviewIndex = i;
    updateReviewSlider();
  });
}

// update function
function updateReviewSlider() {
  reviewTrack.style.transform = `translateY(-${reviewIndex * 100}%)`;

  reviewDots.forEach(d => d.classList.remove('active'));
  reviewDots[reviewIndex].classList.add('active');
}

// autoplay
setInterval(() => {
  reviewIndex = (reviewIndex + 1) % reviewSlides.length;
  updateReviewSlider();
}, 3000);

// initial
updateReviewSlider();