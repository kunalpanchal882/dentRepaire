const menuicon = document.querySelector("#menuicon")
const mobilemenu = document.querySelector("#mobile_menu")
const closemenu = document.querySelector("#closeMenu")


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