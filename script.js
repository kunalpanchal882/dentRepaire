  const menuicon = document.querySelector("#menuicon")
  const mobilemenu = document.querySelector("#mobile_menu")
  const closemenu = document.querySelector("#closeMenu")


  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("backToTop").addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });



  const container = document.getElementById("videoContainer");
  const video = document.getElementById("myVideo");
  const btn = document.getElementById("playBtn");
  const thumbnail = document.getElementById("thumbnail");

  let isPlaying = false;

  container.addEventListener("click", () => {

    // First click → start video
    if (!isPlaying) {
      thumbnail.style.display = "none";
      video.style.display = "block";
      video.play();
      btn.innerHTML = "❚❚"; // pause icon
      isPlaying = true;
    } 
    // Next click → pause
    else {
      video.pause();
      btn.innerHTML = "▶"; // play icon
      isPlaying = false;
    }

  });

  // SLIDE IMAGES
  const leftwrape = document.querySelector('.image_right_wrapper')
  const handler = document.querySelector('.slider_handle')
  const leftContainer = document.querySelector('.left_gallery')

  // QUESTION SLIDER
  const questions = document.querySelectorAll('.single_question');

  // 👉 open first question by default
  window.addEventListener("load", () => {
  const firstQuestion = document.querySelector('.single_question.active');

  if (firstQuestion) {
    const answer = firstQuestion.querySelector('.answer');
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
});

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

  const totalSlides = images.length - 2
  totalNum.textContent = totalSlides

  console.log("total slide",totalSlides);


  let dotes = []

  for(let i=1;i<=totalSlides;i++){
    const dote = document.createElement(`span`);
    dotecontainer.appendChild(dote);
    dotes.push(dote)
  }

  // ✅ AUTO SLIDE FUNCTION
function runAuto() {
  if (!isAnimation) nextBtn.click();
}

// ✅ START AUTO SLIDE
let autoSlide = setInterval(runAuto, 3000);

// ✅ DOT CLICK FUNCTION
dotes.forEach((dot, i) => {
  dot.addEventListener("click", () => {

    clearInterval(autoSlide); // stop auto
    autoSlide = setInterval(runAuto, 3000); // restart

    if (isAnimation) return;

    isAnimation = true;
    index = i + 1;

    slider.style.transition = 'transform 0.5s ease';
    slideUpdate();
  });
});

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

  // setInterval(() => {
  //   if(!isAnimation){
  //     nextBtn.click()
  //     // animateBtn(nextBtn);
  //     updateUI();
  //   }
  // }, 3000);
                                                                                                                                
  // review courosel
document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector('.review_track');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dotes span');

  let index = 0;
  const slideHeight = 322;

  // console.log("slide length",slides.length);
  

  let autoReview; // ✅ IMPORTANT

  // clone slides
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

    if (index === slides.length) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = `translateY(0px)`;
        index = 0;
        updateDots();
      }, 500);
    }
  }

  // ✅ START AUTO
  setTimeout(() => {
    autoReview = setInterval(moveSlide, 2500);
  }, 1500);

  // ✅ DOT CLICK
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {

      clearInterval(autoReview); // stop auto

      index = i;

      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = `translateY(-${index * slideHeight}px)`;

      updateDots();

      // restart auto
      autoReview = setInterval(moveSlide, 2500);
    });
  });

});


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

    // 📱 TOUCH SUPPORT
sliderKnob.addEventListener("touchstart", () => {
  isDragging = true;
  container.classList.add("dragging");
});

container.addEventListener("touchstart", (e) => {
  isDragging = true;
  container.classList.add("dragging");
  handleMove(e.touches[0].clientX);
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  handleMove(e.touches[0].clientX);
});

document.addEventListener("touchend", () => {
  isDragging = false;
  container.classList.remove("dragging");
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) e.preventDefault();
}, { passive: false });

    // Init
    updateSlider(50);
  });