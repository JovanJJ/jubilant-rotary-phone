
function downArrow(){
  document.querySelector('.arrowImage')
.addEventListener('click', () => {
  const downArrowContainer = document.querySelector('.downArrowActive') || document.querySelector('.downArrowHidden');
  const downArrowImage = document.querySelector('.arrowPicture');
  const introText = document.querySelector('.introText');
  if(downArrowContainer.classList.contains('downArrowHidden')){
    downArrowContainer.classList.remove('downArrowHidden');
    downArrowContainer.classList.add('downArrowActive');
    downArrowImage.src = 'images/7444666.png';
  } 
  else if(downArrowContainer.classList.contains('downArrowActive')) {
    downArrowContainer.classList.remove('downArrowActive');
    downArrowContainer.classList.add('downArrowHidden');
    downArrowImage.src = 'images/7444667.png';
  }
});
}

downArrow();